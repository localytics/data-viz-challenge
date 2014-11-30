# Check working directory
# getwd()

# Load the json file as a data frame
data <- as.data.frame(fromJSON("data.json"))

# Get the column headers
names(data)

# [1] "data.category"       "data.event_name"     "data.gender"         "data.age"           
# [5] "data.marital_status" "data.session_id"     "data.device"         "data.client_time"   
# [9] "data.location"       "data.amount"

# Subset data to individuals who funded an Environment or Sports project
dataFund <- subset(data, (data$data.category == "Environment" & data$data.amount > 0) | 
                         (data$data.category == "Sports"      & data$data.amount > 0)
                   )

# De-duplicate the dataset to get unique persons
dataFund$duplicate <- duplicated(dataFund$data.session_id)
dataFund_dedup <- subset(dataFund, dataFund$duplicate == F)


# Function that creates frequency tables to plot categorical variables
CreateFreq <- function(vector) {
  table(vector)
}

# Function that creates a barplot
CreateBarplot <- function(table, color, limit){
  barplot(table[order(table, decreasing = TRUE)],
          col = color,
          xlim = c(0, limit)) # To control what is displayed
}

# Run the functions across all individuals who funded an Environment or Sports project
gender.freq         <- CreateFreq(dataFund_dedup$data.gender)
age.freq            <- CreateFreq(dataFund_dedup$data.age)
marital_status.freq <- CreateFreq(dataFund_dedup$data.marital_status)
device.freq         <- CreateFreq(dataFund_dedup$data.device)
state.freq          <- CreateFreq(dataFund_dedup$data.location$state)

CreateBarplot(gender.freq, "light blue", 4)
# Result: No difference between genders!

CreateBarplot(age.freq, "light blue", 6)
# Result: 18-24 year olds fund more than other age groups

CreateBarplot(marital_status.freq, "light blue", 3)
# Result: Funders tend to be Married

CreateBarplot(device.freq, "light blue", 3)
# Result: iOS users tend to fund more than Android

CreateBarplot(state.freq, "light blue", 8)
# Result: Most popular states are IN, GA, OR, CO, CA, TX, NY


# Deeper dive into funders living in Indiana (IN) as an example (n = 1002)
IN <- subset(dataFund_dedup, dataFund_dedup$data.location$state == "IN")

CreateBarplot(CreateFreq(IN$data.gender), "red", 4)
# Result: No signifcant difference between genders

CreateBarplot(CreateFreq(IN$data.age), "red", 6)
# Result: Spread pretty evenly across all age groups

CreateBarplot(CreateFreq(IN$data.marital_status), "red", 3)
# Result: Nearly all funders are married

CreateBarplot(CreateFreq(IN$data.device), "red", 3)
# Result: Nearly all funders use iOS

# Based on these results, I recommend sending push notifications to users
# living in Indiana who are either gender, any age, married and using an iOS phone.