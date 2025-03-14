# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end
puts "Clearing existing data..."
Dream.destroy_all

user = User.create!(email_address: "user@example.com", password: "password", password_confirmation: "password")
puts "Creating data for #{user.email_address}..."

dreams = {
  dream1: Dream.create!(title: "Dream 1", body: "This is the first dream", dream_date: Date.today),
  dream2: Dream.create!(title: "Dream 2", body: "This is the second dream", dream_date: Date.today - 1.day),
dream3: Dream.create!(title: "Dream 3", body: "This is the third dream", dream_date: Date.today - 2.days)
}

dreams.each do |dream|
  Dream.create!(user: user, **dream)
end

puts "Created #{Dream.count} dreams."
