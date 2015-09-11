# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


s1 = School.create(	name: "West High School", 
					city: "Tracy, CA", 
					image: "http://cdn2-b.examiner.com/sites/default/files/styles/image_content_width/hash/72/40/1372381290_2474_pack.jpg?itok=4rw4KubM",
					mascot: "Wolfpack")
s2 = School.create(	name: "Tracy High School", 
					city: "Tracy, CA", 
					image: "https://www.tracy.k12.ca.us/sites/ths/PublishingImages/THS%20Logo%20from%20Jason.jpg",
					mascot: "Bulldogs")
s3 = School.create(	name: "Kimball High School", 
					city: "Tracy, CA", 
					image: "https://www.tracy.k12.ca.us/sites/khs/SiteCollectionImages/khslogo-small.jpg",
					mascot: "Jaguars")
