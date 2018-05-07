# frozen_string_literal: true

FactoryBot.create_list(:user, 1000, company: Company.find_by(namespace: 'namespace_1'))
