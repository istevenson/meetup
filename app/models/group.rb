class Group < ActiveRecord::Base
  has_many :spottings
  before_create :generate_secret_id

  def generate_secret_id
    self.secret_id = SecureRandom.urlsafe_base64(7, false)
  end
end
