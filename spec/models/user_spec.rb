# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'associations' do
    it { should belong_to(:company) }
    it { should have_many(:attendances).dependent(:destroy) }
    it { should have_many(:sessions).dependent(:destroy) }
    it { should have_many(:requests).dependent(:destroy) }
    it { should have_many(:user_groups).dependent(:destroy) }
    it { should have_many(:groups).through(:user_groups) }
    it { should have_many(:activities).dependent(:destroy) }
    it { should have_many(:user_notifications).dependent(:destroy) }
    it { should have_many(:notifications).through(:user_notifications).source(:activity) }
  end

  describe 'validations' do
    subject { build :user }
    it { should validate_presence_of(:name) }
    it { should validate_length_of(:name).is_at_most(100) }
    it { should validate_presence_of(:email) }
    it { should validate_length_of(:email).is_at_most(100) }
    it { should validate_uniqueness_of(:email).ignoring_case_sensitivity }
    it { should validate_presence_of(:language) }
    it { should validate_inclusion_of(:language).in_array(I18n.available_locales.map(&:to_s)) }
    # it { should validate_presence_of(:user_permissions) }
  end

  describe '#forgot_punch_in_days_in_month' do
    let(:company) { create :company, :with_business_days }
    let!(:holiday) { create :holiday, company: company, started_at: '2018-04-16', ended_at: '2018-04-17' }
    let!(:attendance_1) { create :attendance, day: '2018-04-02', user: user }
    let!(:attendance_2) { create :attendance, day: '2018-04-03', user: user }

    before { Timecop.freeze(Time.zone.local(2018, 4, 20)) }
    after { Timecop.return }

    context 'when user is activated' do
      let(:user) { create :user, company: company, deactivated_at: '2018-04-04', created_at: '2018-04-01' }

      before { user.update(activated_at: '2018-04-06') }
      subject { user.forgot_punch_in_days_in_month }

      it do
        is_expected
        expect(subject.size).to eq 8
        expect(subject).to include('2018-04-06', '2018-04-09', '2018-04-10', '2018-04-11', '2018-04-12', '2018-04-13', '2018-04-18', '2018-04-19')
      end
    end

    context 'when user.activated=false and user.deactivated_at > user.activated_at' do
      let(:user) { create :user, company: company, deactivated_at: '2018-04-10', created_at: '2018-04-01', activated: false }

      subject { user.forgot_punch_in_days_in_month }

      it do
        is_expected
        expect(subject.size).to eq 4
        expect(subject).to include('2018-04-04', '2018-04-05', '2018-04-06', '2018-04-09')
      end
    end
  end
end
