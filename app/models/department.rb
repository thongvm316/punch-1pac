# frozen_string_literal: true

# == Schema Information
#
# Table name: departments
#
#  id         :integer          not null, primary key
#  company_id :integer          not null
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#
# Indexes
#
#  index_departments_on_company_id  (company_id)
#

class Department < ApplicationRecord
  belongs_to :company
  has_many :users, dependent: :nullify

  validates :name, presence: true
end
