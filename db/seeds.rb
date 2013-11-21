# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# spotting_test = Spotting.create(users_name: 'Test', lat: "38.00", lon: "-97.00", group_id: 1)

10.times do
  g = Group.create()
  num = Random.rand(10)
  num.times do
    f = Faker::Address
    fn = Faker::Name
    s = Spotting.create(users_name: fn.name, lat: f.latitude.to_s, lon: f.longitude.to_s, group_id: g.id)
  end
end
# Spotting.create(users_name: 'Test', lat: "38.00", lon: "-97.00")


