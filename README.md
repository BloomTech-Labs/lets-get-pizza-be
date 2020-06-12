# API Documentation

#### 1️⃣ Backend delpoyed at [lets-get-pizza-be](https://plza.herokuapp.com/) <br>

## 1️⃣ Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- Set up local pg database & connect in knexfile
- **npm run server** to start the local server
- **npm run test** to start server using testing environment

## Code Climate

[![Maintainability](https://api.codeclimate.com/v1/badges/05f3ff0daa4ae455b4fd/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/lets-get-pizza-be/maintainability)

[![Test Coverage](https://api.codeclimate.com/v1/badges/05f3ff0daa4ae455b4fd/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/lets-get-pizza-be/test_coverage)

### Backend framework goes here

Node / Express.js

Postgresql

Foursquare

Geocoding/GeoIP

## 2️⃣ Endpoints OVERVIEW


### [Auth Routes](https://github.com/Lambda-School-Labs/lets-get-pizza-be#auth-routes-1)

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST   | `/auth/register`        | none                | Registers a user & logs them in.                   |
| POST   | `/auth/login`           | none                | Logs the user in and returns a token.              |


### [User Routes](https://github.com/Lambda-School-Labs/lets-get-pizza-be#user-routes-1)

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/users/dashboard`      | user                | Returns info for the logged in user.               |
| GET    | `/users/   `            | user                | Returns an array of all users                      |
| GET    | `/users/:id`            | user                | Returns any users information                      |
| PUT    | `/users`                | user                | Returns info for a single user.                    |
| PUT    | `/users/images`         | user                | Adds profile image and returns info for the user   |
| DELETE | `/users`                | user                | Deletes the user's account                         |


### [Location Routes](https://github.com/Lambda-School-Labs/lets-get-pizza-be#location-routes-1)

| Method | Endpoint                         | Access Control | Description                                                               |
| ------ | -------------------------------- | -------------- | ------------------------------------------------------------------------- |
| GET    | `/locations/map`                 | all            | Returns an array of close pizza places, and their latitude and longitude  |
| GET    | `/locations/list`                | all            | Returns an array of close pizza places, and their thumbnail, if available |
| GET    | `/locations/live/:foursquare_id` | all            | Gets the information from a foursquare id and maps it to the database     |
| GET    | `/locations/:id`                 | all            | Gets the information for a location from the database                     |
| GET    | `/locations/dashboard`           | location       | Gets the locations information for display                                |
| PUT    | `/locations`                     | location       | Edits the information for the logged in location                          |
| PUT    | `/locations/images`              | location       | Adds an image for the logged in location                                  |
| DELETE | `/locations`                     | location       | Deletes the location.                                                     |


### [Events Routes](https://github.com/Lambda-School-Labs/lets-get-pizza-be#events-routes-1)

| Method | Endpoint                        | Access Control      | Description                                                                     |
| ------ | ------------------------------- | ------------------- | ------------------------------------------------------------------------------- |
| GET    | `/events`                       | all                 | Returns an array of all created events                                          |
| GET    | `/events/:id`                   | all                 | Returns all info for a single event                                             |
| GET    | `/events/users/:id`             | all                 | Returns an object with two arrays of events , created events and invited events |
| GET    | `/events/locations/:id`         | all                 | Returns an array of all events at a single location                             | 
| GET    | `/events/:id/invites`           | all                 | Returns an array of all invites for an event                                    |
| POST   | `/events`                       | all                 | Creates an event and returns the info                                           |
| POST   | `/events/:id/invite`            | all                 | Creates an event invitation and returns invite info                             |
| PUT    | `/events/:id/invite/:invite_id` | all                 | Updates event invite and returns an object with all invite info                 |
| PUT    | `/events/:id`                   | all                 | Updates event info and returns all info for single event                        |
| DELETE | `/events/:id`                   | all                 | Deletes a specific event                                                       |


### [Friends Routes](https://github.com/Lambda-School-Labs/lets-get-pizza-be#friends-routes-1)

| Method | Endpoint                        | Access Control      | Description                                                                     |
| ------ | ------------------------------- | ------------------- | ------------------------------------------------------------------------------- |
| GET    | `/friends`                      | all                 | Returns an array of all friendships                                             |
| GET    | `/friends/:id`                  | all                 | Returns info for a single friendship                                            |
| POST   | `/friends`                      | all                 | Creates a friendship instance and returns friendship info                       |
| PUT    | `/friends/:id`                  | all                 | Updates info for a specific friendship instance                                 |
| DELETE | `/friends/:id`                  | all                 | Deletes friendship instance from databse                                        |


### [Promotions Routes](https://github.com/Lambda-School-Labs/lets-get-pizza-be#promotions-routes-1)

| Method | Endpoint                        | Access Control      | Description                                                                     |
| ------ | ------------------------------- | ------------------- | ------------------------------------------------------------------------------- |
| GET    | `/promotions`                   | all                 | Returns an array of all promotions                                              |
| GET    | `/promotions/:id`               | all                 | Returns all info for a single event                                             |
| POST   | `/promotions`                   | all                 | Creates a new promotion                                                         |
| PUT    | `/promotions/:id`               | all                 | Updates a single promotions details and returns all info for that promotion     |
| DELETE | `/promotions/:id`               | all                 | Deletes the promotion                                                           |


### [Reviews Routes](https://github.com/Lambda-School-Labs/lets-get-pizza-be#reviews-routes-1)

| Method | Endpoint                        | Access Control      | Description                                                                     |
| ------ | ------------------------------- | ------------------- | ------------------------------------------------------------------------------- |
| GET    | `/reviews`                      | all                 | Returns an array of all reviews in the database                                 |
| GET    | `/reviews/:id`                  | all                 | Returns all information for a single review                                     |
| GET    | `/reviews/users/:id`            | all                 | Returns an array of all reviews for a single user                               |
| POST   | `/reviews/`                     | all                 | Creates a review instance in db and returns review information                  |
| PUT    | `/reviews/:id`                   | all                 | Updates information for the provided review                                     |
| DELETE | `/reviews/:id`                   | all                 | Deletes the review                                                              |


### [Saved Promos Routes](https://github.com/Lambda-School-Labs/lets-get-pizza-be#saved-promo-routes-1)

| Method | Endpoint                        | Access Control      | Description                                                                     |
| ------ | ------------------------------- | ------------------- | ------------------------------------------------------------------------------- |
| GET    | `/savedPromos/users/:id`        | all                 | Returns all saved promotions for given user                                     |
| POST   | `/savedPromos/`                 | all                 | Creates a saved promotion instance                                              |
| DELETE | `/savedPromos/:id`              | all                 | Deletes the saved promotion                                                     |

## Data Model

### Users
-------------------
```javascript
{
    id: INT,
    username: STRING,
    email: STRING,
    profile_image: STRING,
    display_name: STRING,
    dietary_preference: ARRAY,
    favorite_pizza_toppings: STRING,
    display_location: STRING,
    favorite_pizza_shop: STRING,
    bio: STRING
}
```

### Locations
-------------------
```javascript
{
    id: INT,
    last_name: STRING
    username: STRING,
    email: STRING,
    password: STRING,
    first_name: STRING,
    update_foursquare: BOOLEAN,
    phone_number: STRING,
    foursquare_id: STRING
    business_name: STRING,
    latitude: DOUBLE,
    longitude: DOUBLE,
    address: STRING,
    website_url: STRING,
    official_description: STRING,
    thumbnail_image: STRING,
    inside_image: STRING,
    street_view_image: STRING,
    menu_image: STRING,
    order_service: STRING,
    store_bio: STRING,
    dietary_offerings: ARRAY
}
```

### Event
-------------------
```javascript
{
    id: INT,
    user_id: INT,
    location_id: INT,
    title: STRING,
    description: STRING,
    start_time: DATETIME,
    end_time: DATETIME
}
```

### Friend
------------------- 
```javascript
{
    id: INT,
    user_id: INT,
    friens_id: INT,
    status: STRING
}
```

### Promotion
-------------------
```javascript
{
    id: INT,
    location_id: INT,
    title: STRING,
    text: STRING,
    start_date: DATETIME,
    end_date: DATETIME
}
```

### Review 
-------------------
```javascript
{
    id: INT,
    user_id: INT,
    location_id: INT,
    rating: INT,
    review_title: STRING,
    review_text: STRING
}
```

### Saved Promo
-------------------
```javascript
{
    id: INT,
    user_id: INT,
    promo_id: INT
}
```

## 2️⃣ Actions

### Model Helpers

`find(table, selectConfig='*')` -> Returns all instances from table

`findBy(table, filter, selectConfig='*")` -> Returns all instances by filter

`findById(table, id, selectConfig='*', whereConfig='id')` -> Returns row by ID

`add(table, info)` -> Returns the created instance

`update(table, changes, id)` -> Update an instance by ID

`remove(table, id)` -> Deletes an instance by ID

### Users




### Auth Routes

#### POST '/auth/register'
---------------------------------
 
```javascript
{
    token: "XXXXXXXXXX",
    user: {
        id: 11,
        username: "pizzalover",
        email: "iluvpizza@test.com",
        profile_image: "https://res.cloudinary.com/plza/image/upload/v1588043869/qxhdqbj4sthf57bdgltz.jpg",
        display_name: null,
        dietary_preference: null,
        favorite_pizza_toppings: null,
        display_location: null,
        favorite_pizza_shop: null,
        bio: null
    }
}
```

#### POST 'auth/user/login'
---------------------------------
```javascript
{
    message: "Welome pizzalover",
    token: "XXXXXXXXX",
    user: {
        id: 11,
        username: "pizzalover",
        email: "iluvpizza@test.com",
        profile_image: "https://res.cloudinary.com/plza/image/upload/v1588043869/qxhdqbj4sthf57bdgltz.jpg",
        display_name: null,
        dietary_preference: null,
        favorite_pizza_toppings: null,
        display_location: null,
        favorite_pizza_shop: null,
        bio: null
    }
}
```

#### Location Routes

---------------------------------
 GET '/locations/map'
 --------------------------------
Automatically finds a users location based on IP.
Also takes a search parameter to adjust. (City, City,State, Zip)
```javascript
[
    {
        name: "Dominoes Pizza",
        latitude: 40.7050150708864,
        longitude: -73.9336165250072,
        address: "13 pizza rd",
        location_id: 25
    },
    {
        name: "Robertas Pizza",
        latitude: 40.70501507088636,
        longitude: -73.93361652500724,
        address: "261 Moore St",
        foursquare_id: "47e100b9f964a520414e1fe3"
    },
]
```
---------------------------------
 GET '/locations/list'
 --------------------------------  
 Automatically finds a users location based on IP.
 Also takes a search parameter to adjust. (City, City,State, Zip)

 Returns:
 [
    {
        name: Dominoes Pizza,
        address: 13 pizza rd,
        thumbnail_url: dominoes.com/1.jpg,
        location_id: 25
    },
    {
        name: Roberta's Pizza,
        address: 261 Moore St,
        foursquare_id: 47e100b9f964a520414e1fe3
    },
    ...
 ]

---------------------------------
 GET '/locations/live/:foursquare_id'
 --------------------------------  
 Finds a foursquare resource based on the provided id.
 Automatically parsed & copied into our database and returns the resulting object.

 Returns:
 {
    foursquare_id: 4a593de0f964a52015b91fe3,
    business_name: Saraghina,
    latitude: 40.68359,
    longitude: -73.93534,
    address: [
        435 Halsey St (at Lewis Ave),
        Brooklyn, NY 11233,
        United States
    ],
    website_url: http://www.saraghina.com
}

---------------------------------
 GET '/locations/:id'
 --------------------------------  
 Returns the location item from the database.
 If update_foursquare is true, then it is updated before returned.

{
    id: 25,
    username: dominoes,
    email: betty@dominoes.com,
    password: pizza1, **password is removed before returning location object
    first_name: Noes,
    foursquare_id: 13,
    update_foursquare: null,
    business_name: Dominoes Pizza,
    address: 13 pizza rd,
    website_url: www.dominoes.com,
    official_description: The Old Boardgame of Pizza,
    thumbnail_url: dominoes.com/1.jpg,
    street_view_image: google.com/2.jpg,
    order_service: We Deliver!,
    store_bio: Theres pizza here and you can eat some,
    dietary_offerings: [
        Even the cheese is meat
    ],
    latitude: 40.7050150708864,
    longitude: -73.9336165250072,
    last_name: Dom
}


## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

    * JWT_SECRET  Needed for auth router and password generation
    * PORT Not needed but you can set your own local port for testing on the local machine in case port 4000 is already in use
    * PGPASSWORD Set this as your PostgreSQL local and test databse passwords
    * FSCLIENTID FourSquare API Client ID
    * FSCLIENTSECRET FourSquare API Client Secret

    *  User Survey link: https://s.surveyplanet.com/_BYyEjkf
       Username: teampizzaplza@gmail.com
       Password: 1234P!za
    
## Contributing

When contributing to this repository, please first discuss the change you wish to make via issue, email, or any other method with the owners of this repository before making a change.

Please note we have a [code of conduct](./code_of_conduct.md). Please follow it in all your interactions with the project.

### Issue/Bug Request

 **If you are having an issue with the existing project code, please submit a bug report under the following guidelines:**
 - Check first to see if your issue has already been reported.
 - Check to see if the issue has recently been fixed by attempting to reproduce the issue using the latest master branch in the repository.
 - Create a live example of the problem.
 - Submit a detailed bug report including your environment & browser, steps to reproduce the issue, actual and expected outcomes,  where you believe the issue is originating from, and any potential solutions you have considered.

### Feature Requests

We would love to hear from you about new features which would improve this app and further the aims of our project. Please provide as much detail and information as possible to show us why you think your new feature should be implemented.

### Pull Requests

If you have developed a patch, bug fix, or new feature that would improve this app, please submit a pull request. It is best to communicate your ideas with the developers first before investing a great deal of time into a pull request to ensure that it will mesh smoothly with the project.

Remember that this project is licensed under the MIT license, and by submitting a pull request, you agree that your work will be, too.

#### Pull Request Guidelines

- Ensure any install or build dependencies are removed before the end of the layer when doing a build.
- Update the README.md with details of changes to the interface, including new plist variables, exposed ports, useful file locations and container parameters.
- Ensure that your code conforms to our existing code conventions and test coverage.
- Include the relevant issue number, if applicable.
- You may merge the Pull Request in once you have the sign-off of two other developers, or if you do not have permission to do that, you may request the second reviewer to merge it for you.

### Attribution

These contribution guidelines have been adapted from [this good-Contributing.md-template](https://gist.github.com/PurpleBooth/b24679402957c63ec426).

## Documentation

See [Frontend Documentation] (https://github.com/Lambda-School-Labs/lets-get-pizza-fe/blob/master/README.md) for details on the fronend of our project.
