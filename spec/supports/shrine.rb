# frozen_string_literal: true

require 'shrine/storage/file_system'

Shrine.plugin :activerecord

Shrine.storages = {
  cache: Shrine::Storage::FileSystem.new('spec/tmp', prefix: 'uploads/cache'),
  store: Shrine::Storage::FileSystem.new('spec/tmp', prefix: 'uploads/store')
}
