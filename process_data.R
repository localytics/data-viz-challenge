library(rjson)
library(plyr)
library(dplyr)
library(maps)
library(maptools)
library(sp)
gpclibPermit()
setwd('/Users/Runze/Google Drive/data_viz_challenge')
options(stringsAsFactors = F)

bl = fromJSON(file = 'data/data.json')
bl = lapply(bl[[1]], unlist)
nm = names(table(unlist(lapply(bl, names))))

#function to fill NA values to missing variables
fill_na = function(x) {
  for (i in 1:length(nm)) {
   x[nm[i]] = ifelse(is.na(x[nm[i]]), NA, x[nm[i]])
  }
  x = x[nm]
  return(x)
}
bl_w_na = lapply(bl, fill_na)

bl_df = ldply(bl_w_na)
bl_df$amount = as.numeric(bl_df$amount)
bl_df$amount[is.na(bl_df$amount)] = 0
bl_df$location.latitude = as.numeric(bl_df$location.latitude)
bl_df$location.longitude = as.numeric(bl_df$location.longitude)
save(bl_df, file = 'app/data/bl_df.RData')

bl_f = filter(bl_df, event_name == 'Fund Project')

#create county shapfile
counties = map('county', fill = T, col = 'transparent', plot = F)
ids = sapply(strsplit(counties$names, ':'), function(x) x[1])
counties_sp = map2SpatialPolygons(counties, IDs = ids,
                                proj4string = CRS('+proj=longlat +datum=WGS84'))
save(counties_sp, file = 'data/counties_sp.RData')

#function to get counties from longitude and latitude
get_counties = function(lon, lat) {
  coords = data.frame(cbind(lon, lat))
  points_sp = SpatialPoints(coords)
  proj4string(points_sp) = proj4string(counties_sp)
  i = over(points_sp, counties_sp)
  names = sapply(counties_sp@polygons, function(x) x@ID)
  return (names[i])
}

#get counties
bl_f$county = get_counties(bl_f$location.longitude, bl_f$location.latitude)
sum(is.na(bl_f$county)) / nrow(bl_f) #1% missing
bl_f = filter(bl_f, !is.na(county))

#check if a session id uniquely identifies all attributes of a user
by_session_id =
  bl_f %>%
  group_by(session_id) %>%
  summarize(n = n())

by_session_id_others =
  bl_f %>%
  group_by(session_id, age, device, gender, marital_status) %>%
  summarize(n2 = n())

#seems that gender is not unique - replace with the first value
by_session_id_others2 =
  bl_f %>%
  group_by(session_id, age, device, marital_status) %>%
  arrange(session_id, gender) %>%
  summarize(n2 = n(), gender = first(gender))
#that appears to have solved the issue :-)

save(bl_f, file = 'app/data/bl_f.RData')

#process map data
county_map = fortify(counties)
county_map$county = paste(county_map$region, county_map$subregion, sep = ',')

#abbreviate state names (for annotation later)
data(state)
county_map$state_abb = state.abb[match(county_map$region, tolower(state.name))]

state_abbs =
  county_map %>%
  group_by(state_abb) %>%
  summarize(long = mean(long), lat = mean(lat))

save(county_map, file = 'app/data/county_map.RData')
save(state_abbs, file = 'app/data/state_abbs.RData')
