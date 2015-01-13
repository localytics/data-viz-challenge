# Localytics Data Visualization Challenge

Have you been itching to try that new data visualization library you saw on Hacker News? Do you enjoy data science or frontend development? Looking for a weekend project to hone your skills? Localytics is hosting a challenge with prizes to help bolster the data visualization community.

Given some analytics data, you'll create a visualization for BootLoader, a fictional crowdfunding mobile app, to help determine what segment of users would be interested in a new bicycle project. Read on for more details, and don't forget to checkout out our promotion site at http://data-viz-challenge.localytics.com

## Your task

BootLoader is a mobile app that helps people crowdfund their creative projects. Anyone with an idea, dream, and 2-minute video can post their project on BootLoader. Others then donate money to the project to help bring it to fruition.

Dennis Ridesalot, a BootLoader user, has a new concept for a 3-speed bicycle made from recycled parts with a $20 price point. The BootLoader team wants to send a push notification to their users, prompting them to fund the project. However, they don't want to send a message to all of their users--only those who they think would be interested.

That's where you come in. You're the resident data expert at BootLoader. You'd like to create a visualization that helps answer: what kinds of users would be interested in the bicycle project?

Luckily, you've been collecting analytics data on how your users fund projects. You also have software that can send push notification to segments of users, based on attributes like location, age range, gender, and mobile device.

For example, you can send a push notification to all iOS users in Chicago, IL that says "Deep dish lovers unite! Help fund the largest pizza in the world on BootLoader."

## The Data

Your analytics software tracks the events: "View Project" and "Fund Project," for when a user views details about a project and for when they fund a project. The events also have the following attributes:
* `category`: what the project is about, e.g. "Sports", "Fashion", "Technology", etc.
* `client_time`: a UNIX timestamp of when the event occurred.
* `amount`: how much the user donated (for "Fund Project" only)

*Note:* The bicycle project belongs to two categories: "Sports" and "Environment."

Additionally, you know some information about each user on your site, that they supplied in a survey when they signed up. Specifically, you know:

* `session_id`: unique identifier for each user
* `age range`: one of ['18-24', '25-34', '35-44', '45-54', '55+']
* `gender`: one of ['M', 'F', 'U']
* `location`:
 * `city`: a city in the United States
 * `state`: a state in the United States
 * `latitude`
 * `longitude`
* `marital_status`: one of ['single', 'married']
* `device`: one of ['iOS', 'android']

From past experiments, you know that each user generally likes projects from the same category. For example, User A almost always views and funds projects from the "Technology" category. The bicycle project belongs to two categories: "Sports" and "Environment."

You have a sampled time series of 50,000 events from one month this year in a JSON blob. User data is added into every event. Note that BootLoader has more users than are represented by this sample.

Here's an example of two events by the same user:

    {
      "event_name": "View Project",
      "gender": "M",
      "marital_status": "single",
      "session_id": "98ccfbe8c29845c0a44f8e56213d1def",
      "device": "android",
      "category": "Technology",
      "age": "25-34",
      "client_time": 1393632024,
      "location": {
        "latitude": 33.786594,
        "city": "Covina",
        "state": "CA",
        "longitude": -118.298662,
        "zip_code": "91723"
      }
    }

    {
      "event_name": "Fund Project",
      "gender": "M",
      "marital_status": "single",
      "session_id": "98ccfbe8c29845c0a44f8e56213d1def",
      "device": "android",
      "amount": 20,
      "category": "Technology",
      "age": "25-34",
      "client_time": 1393632301,
      "location": {
        "latitude": 33.786594,
        "city": "Covina",
        "state": "CA",
        "longitude": -118.298662,
        "zip_code": "91723"
      }
    }

## Your submission

Once again, you want to create a visualization that answers: what segments of users would be interested in the bicycle project? Based on your visualization, BootLoader would send a push notification to those segments that advertises the bicycle project.

You can create any kind of visualization that you think best answers the question. e.g. static or interactive, using HTML5 or python. Feel free to use any tools you're familiar with, or try out that new data viz library you heard so much about.

To submit your visualization, star and fork the data viz challenge repo on Github here https://github.com/localytics/data-viz-challenge. This github repository also contains the JSON data. Submit a pull request when your submission is ready with some instructions on how to run your code or a link to a hosted version. Submit an issue on Github with any questions you have, or email dthompson@localytics.com.

While our prize pool challenge ended December 1st, 2014, feel free to continue submissions, as Localytics is always looking for new talents and ideas in the field of data viz. If you'd like to see our winner, feel free to take a look here at http://domajno.github.io/data-viz-challenge/

