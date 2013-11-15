# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

spotting_test = Spotting.create(users_name: 'Test', location: "38.00, -97.00")

spotting_test2 = Spotting.create(users_name: 'Test2', location: "40.67, -73.94")
