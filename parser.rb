require 'json'

raw_json = File.read("./data.json")

puts "\nRaw: #{raw_json.inspect}\n"

json = JSON.parse(raw_json)

categories = {}
json["data"].map do |e|
  categories[e["category"]] ||= 0
  categories[e["category"]] += 1
end

File.open("./categories.json", "w") do |f|
  f.puts categories.to_json
end
