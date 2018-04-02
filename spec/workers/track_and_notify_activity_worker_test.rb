# frozen_string_literal: true

require 'rails_helper'

RSpec.describe TrackAndNotifyActivityWorker do
  let(:company) { create :company }
  let(:group) { create :group, company: company }
  let(:user) { create :user, company: company, groups: [group] }
  let!(:admins) { create_list :user, 2, role: 'admin', company: company, groups: [group] }
  let!(:attendance) { create :attendance, user: user }
  let!(:request) { create :request, user: user, attendance: attendance }

  it 'push job on the queue' do
    Sidekiq::Testing.fake! do
      expect { TrackAndNotifyActivityWorker.perform_async(user.id, attendance.id, attendance.class.to_s, 'punch_in') }
        .to change(TrackAndNotifyActivityWorker.jobs, :size).by(1)
    end
  end

  it 'track and notify activity to admin users' do
    Sidekiq::Testing.inline! do
      TrackAndNotifyActivityWorker.perform_async(user.id, attendance.id, attendance.class.to_s, 'punch_in')

      expect(Activity.find_by(user_id: user, activitable: attendance, kind: 'punch_in')).to be_truthy
      expect(admins[0].notifications.where(activitable: attendance)).to be_truthy
      expect(admins[1].notifications.where(activitable: attendance)).to be_truthy
    end
  end

  it 'track and notify activity to owner of activitable' do
    Sidekiq::Testing.inline! do
      TrackAndNotifyActivityWorker.perform_async(admins[0].id, request.id, request.class.to_s, 'approve')

      expect(Activity.find_by(user_id: admins[0], activitable: request, kind: 'approve')).to be_truthy
      expect(user.notifications.where(activitable: request)).to be_truthy
    end
  end
end
