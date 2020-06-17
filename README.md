# API Documentation
![GitHub repo size](https://img.shields.io/github/repo-size/Lambda-School-Labs/lets-get-pizza-be) [![Maintainability](https://api.codeclimate.com/v1/badges/05f3ff0daa4ae455b4fd/maintainability)](https://codeclimate.com/github/Lambda-School-Labs/lets-get-pizza-be/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/05f3ff0daa4ae455b4fd/test_coverage)](https://codeclimate.com/github/Lambda-School-Labs/lets-get-pizza-be/test_coverage) 

### Backend delpoyed at [lets-get-pizza-be](https://plza.herokuapp.com/) <br>

### Backend Framework Used

Node / Express.js

Postgresql

Foursquare

Geocoding/GeoIP

## 1️⃣ Getting started

To get the server running locally:

**With Docker**
- Clone this repo
- Create a `.env` file with needed [environment variables](https://github.com/Lambda-School-Labs/lets-get-pizza-be#environment-varables)
- run **docker-compose -d up** to install all required dependencies, create pg database, and start local server
- run **docker exec -d plza-server sh -c  "npm run seed"** to seed the database (only need to do this on initial setup)
- run **docker-compose down** to stop server
- run **docker exec plza-server sh -c "npm run test"** to run tests locally
- run **docker exec plza-server sh -c "npm run coverage"** to gather test coverage locally

**Without Docker**
- Create a `.env` file with needed [environment variables](https://github.com/Lambda-School-Labs/lets-get-pizza-be#environment-varables)
- **npm install** to install all required dependencies
- Set up local pg database & connect in knexfile
- **npm run server** to start the local server
- **npm run test** to start server using testing environment
- **npm run coverage** to gather test coverage

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

    * POSTGRES_USER Set this as the user for your postgres database **recommended to set as postgres**
    * POSTGRES_DB Name of your postgres database
    * POSTGRES_TEST_DB Name of your postgres database
    * POSTGRES_PASSWORD Set this as your postgres local and test database passwords
    * POSTGRES_HOST Needed to establish postgres connection. Set as plza-postgres
    * POSTGRES_TEST_HOST Needed to establish postgres connection. Set as plza-test-db
    * JWT_SECRET  Needed for auth router and password generation
    * FSCLIENTID FourSquare API Client ID
    * FSCLIENTSECRET FourSquare API Client Secret
    * MAPQUEST_API_KEY Mapquest API Key
    * CLOUDINARY_CLOUD_NAME Cloudinary username
    * CLOUDINARY_API_KEY Cloudinary API Key
    * CLOUDINARY_API_SECRET Cloudinary API Client Secret

    *  User Survey link: https://s.surveyplanet.com/_BYyEjkf
       Username: teampizzaplza@gmail.com
       Password: 1234P!za

## 2️⃣ Data Model

### Users
-------------------
```javascript
{
    id: INT
    username: STRING
    email: STRING
    profile_image: STRING
    display_name: STRING
    dietary_preference: ARRAY
    favorite_pizza_toppings: STRING
    display_location: STRING
    favorite_pizza_shop: STRING
    bio: STRING
}
```

### Locations
-------------------
```javascript
{
    id: INT
    last_name: STRING
    username: STRING
    email: STRING
    password: STRING
    first_name: STRING
    update_foursquare: BOOLEAN
    phone_number: STRING
    foursquare_id: STRING
    business_name: STRING
    latitude: DOUBLE
    longitude: DOUBLE
    address: STRING
    website_url: STRING
    official_description: STRING
    thumbnail_image: STRING
    inside_image: STRING
    street_view_image: STRING
    menu_image: STRING
    order_service: STRING
    store_bio: STRING
    dietary_offerings: ARRAY
}
```

### Event
-------------------
```javascript
{
    id: INT
    user_id: INT
    location_id: INT
    title: STRING
    description: STRING
    start_time: DATETIME
    end_time: DATETIME
}
```

### Friend
------------------- 
```javascript
{
    id: INT
    user_id: INT
    friens_id: INT
    status: STRING
}
```

### Promotion
-------------------
```javascript
{
    id: INT
    location_id: INT
    title: STRING
    text: STRING
    start_date: DATETIME
    end_date: DATETIME
}
```

### Review 
-------------------
```javascript
{
    id: INT
    user_id: INT
    location_id: INT
    rating: INT
    review_title: STRING
    review_text: STRING
}
```

### Saved Promo
-------------------
```javascript
{
    id: INT
    user_id: INT
    promo_id: INT
}
```

## 3️⃣ Endpoints OVERVIEW


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
| POST   | `/reviews`                     | all                 | Creates a review instance in db and returns review information                  |
| PUT    | `/reviews/:id`                   | all                 | Updates information for the provided review                                     |
| DELETE | `/reviews/:id`                   | all                 | Deletes the review                                                              |


### [Saved Promos Routes](https://github.com/Lambda-School-Labs/lets-get-pizza-be#saved-promo-routes-1)

| Method | Endpoint                        | Access Control      | Description                                                                     |
| ------ | ------------------------------- | ------------------- | ------------------------------------------------------------------------------- |
| GET    | `/savedPromos/users/:id`        | all                 | Returns all saved promotions for given user                                     |
| POST   | `/savedPromos/`                 | all                 | Creates a saved promotion instance                                              |
| DELETE | `/savedPromos/:id`              | all                 | Deletes the saved promotion                                                     |


## 4️⃣ Actions

### Model Helpers

**All components, with the exception of friends, have access to the following model helpers.
    Any other models listed below are specfic to it's respective component**

`find(table, selectConfig='*')` -> Returns all instances from table

`findBy(table, filter, selectConfig='*")` -> Returns all instances by filter

`findById(table, id, selectConfig='*', whereConfig='id')` -> Returns row by ID

`add(table, info)` -> Returns the created instance

`update(table, changes, id)` -> Update an instance by ID

`remove(table, id)` -> Deletes an instance by ID

### Events

`getInvitesByEvent(event_id)` -> Returns invites by Event ID

`getInviteById(id)` -> Returns invite info by ID

`findByLocId(id)` -> Return all events for a single location

`findInvitedEvents(user_id)` -> Returns all invites by User ID

`inviteFriend(info)` -> Returns created invtie info

`updateInvite(info, id)` -> Update an event invite by ID


### Friends

`getFriends()` -> Returns all friend instances 

`getById(id)` -> Returns friendship info by ID

`getByUserId(id)` -> Returns all friends by User ID

`insertFriends(friendsData)` -> Returns created friendship info

`updateFriend(id,updates)` -> Update friendship by ID

`removeFriend(id)` -> Deletes friendship by ID


### Locations

`findClosestMapLocations(longitude, latitude)` -> Returns all locations within a 0.5 of both latitude and longitude

`findByFourSquareId(id)` -> Returns location info by FourSquare ID

`getReviews(id)` -> Returns all reviews by Location ID

`getAvgRating(id)` -> Returns avg rating of reviews by Location ID

`getPromotions(id)` -> Returns all promotions by Location ID

`getEvents(id)` -> Returns all events by Location ID


## 5️⃣ Endpoints DETAILS

## Auth Routes

### POST '/auth/register'
---------------------------------
 
 #### Body

| Name                    | Type          | Required | Description                               | Unique |
| ------------------------| ------------- | -------- | ------------------------------------------| ------ |
| username                | string        | Y        | User's desired username                   | Y      |
| password                | string        | Y        | User's password                           | Y      |
| email                   | string        | Y        | User's email address                      | Y      |
| dietary_preference      | array[string] | N        | Array of user's dietary preferences       | N      |
| display_name            | string        | N        | User's desired display name               | N      |
| favorite_pizza_toppings | string        | N        | User's favorite toppings                  | N      |
| bio                     | string        | N        | Short blurb of the user                   | N      |
| favorite_pizza_shop     | integer       | N        | Location ID of user's favorite pizza shop | N      |
 
 #### Response 
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

### POST 'auth/user/login'
---------------------------------

#### Body

| Name                    | Type          | Required | Description                               | Unique |
| ------------------------| ------------- | -------- | ------------------------------------------| ------ |
| username                | string        | Y        | User's username                           | Y      |
| password                | string        | Y        | User's password                           | N      |

#### Response
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

## User Routes 

### GET '/users/dashboard'
-----------------------------

#### Headers
| Name          | Required | Description                            |
| ------------- | -------- | -------------------------------------- |
| Authorization | Y        | Token provided upon login/registration |

#### Response 
```javascript
{
    id: 6,
    username: "Buddy",
    email: "buddy@pizzaluv.com",
    profile_image: "https://res.cloudinary.com/plza/image/upload/v1591238224/w5mrwhnercdpdugqlcdu.png",
    display_name: "justsomebuddy",
    dietary_preference: [
        "gluten"
    ],
    favorite_pizza_toppings: "Pepperoni",
    display_location: "Salt Lake City",
    favorite_pizza_shop: 2,
    bio: "Pineapple was made for pizza"
}
```

### GET '/users?username=searchTerm'
-----------------------------------------

#### Headers
| Name          | Required | Description                                                  |
| ------------- | -------- | ------------------------------------------------------------ |
| Authorization | Y        | Token provided upon login/registration (can be empty string) |

#### Query Params

| Name     | Required | Description               |
| -------- | -------- | ------------------------- |
| username | Y        | Query string of usernames |

```javascript
{
    users: [
        {
            id: 1,
            username: "Billy",
            email: "billy@pizzaluv.com",
            password: "$2a$10$xz0c9mw.93dILe4riz9YXeDz7wLOot57zovPBbf01CEqfCiWXQprS",
            profile_image: "https://res.cloudinary.com/plza/image/upload/v1588043869/qxhdqbj4sthf57bdgltz.jpg",
            display_name: "PizzaBruh420",
            dietary_preference: [
                "gluten"
            ],
            favorite_pizza_toppings: "Mushrooms",
            display_location: "Miami, Florida",
            favorite_pizza_shop: 2,
            bio: "Pizza! Pizza! Pizza! Ain't nothing like it"
        },
        {
            id: 3,
            username: "Betty",
            email: "betty@pizzaluv.com",
            password: "$2a$10$xz0c9mw.93dILe4riz9YXeDz7wLOot57zovPBbf01CEqfCiWXQprS",
            profile_image: "https://res.cloudinary.com/plza/image/upload/v1588043869/qxhdqbj4sthf57bdgltz.jpg",
            display_name: "PizzaGurl",
            dietary_preference: [
                "gluten"
            ],
            favorite_pizza_toppings: "Pepperoni",
            display_location: "Billings",
            favorite_pizza_shop: 3,
            bio: "Can't spell pizza without Betty!"
        },
        ...
    ]
}
```

### GET 'users/:id'
----------------------------

#### Headers
| Name          | Required | Description                            |
| ------------- | -------- | -------------------------------------- |
| Authorization | Y        | Token provided upon login/registration |

#### Response
```javascript
{
    id: 3,
    username: "Betty",
    email: "betty@pizzaluv.com",
    password: "$2a$10$xz0c9mw.93dILe4riz9YXeDz7wLOot57zovPBbf01CEqfCiWXQprS",
    profile_image: "https://res.cloudinary.com/plza/image/upload/v1588043869/qxhdqbj4sthf57bdgltz.jpg",
    display_name: "PizzaGurl",
    dietary_preference: [
        "gluten"
    ],
    favorite_pizza_toppings: "Pepperoni",
    display_location: "Billings",
    favorite_pizza_shop: 3,
    bio: "Can't spell pizza without Betty!"
}
```

### PUT '/users/'
-----------------------

#### Headers
| Name          | Required | Description                            |
| ------------- | -------- | -------------------------------------- |
| Authorization | Y        | Token provided upon login/registration |

#### Body

| Name                    | Type          | Required | Description                               | Unique |
| ------------------------| ------------- | -------- | ------------------------------------------| ------ |
| username                | string        | N        | User's desired username                   | Y      |
| password                | string        | N        | User's password                           | N      |
| email                   | string        | N        | User's email address                      | Y      |
| dietary_preference      | array[string] | N        | Array of user's dietary preferences       | N      |
| display_name            | string        | N        | User's desired display name               | N      |
| favorite_pizza_toppings | string        | N        | User's favorite toppings                  | N      |
| bio                     | string        | N        | Short blurb of the user                   | N      |
| favorite_pizza_shop     | integer       | N        | Location ID of user's favorite pizza shop | N      |

#### Response
```javascript
{
    id: 11,
    username: "pizzalover",
    email: "iluvpizza@test.com",
    profile_image: "https://res.cloudinary.com/plza/image/upload/v1588043869/qxhdqbj4sthf57bdgltz.jpg",
    display_name: "PizzaLover",
    dietary_preference: null,
    favorite_pizza_toppings: "Pineapple",
    display_location: "Denver, CO",
    favorite_pizza_shop: 2,
    bio: "I could eat pizza for every meal"
}
```

### PUT '/users/images'
---------------------------

#### Headers
| Name          | Required | Description                            |
| ------------- | -------- | -------------------------------------- |
| Authorization | Y        | Token provided upon login/registration |

#### Form-data

| Name      | Required | Description                      | 
| --------- | -------- | -------------------------------- |
| image-raw | Y        | Data URI of user's desired image |

#### Response
```javascript
{
    id: 11,
    username: "pizzalover",
    email: "iluvpizza@test.com",
    profile_image: "https://res.cloudinary.com/plza/image/upload/v1592089926/bcdtzp5eoh9twubtrfmq.png",
    display_name: "PizzaLover",
    dietary_preference: null,
    favorite_pizza_toppings: "Pineapple",
    display_location: "Denver, CO",
    favorite_pizza_shop: 2,
    bio: "I could eat pizza for every meal"
}
```

### DELETE '/users'
------------------------

#### Headers
| Name          | Required | Description                            |
| ------------- | -------- | -------------------------------------- |
| Authorization | Y        | Token provided upon login/registration |

#### Response
```javascript
{
    message: "pizzalover successfully deleted"
}
```

## Location Routes

### GET '/locations/map'
---------------------------------

#### Query Params
| Name   | Required | Description           |
| ------ | -------- | --------------------- |
| search | N        | City, City,State, Zip |

#### Response
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

### GET '/locations/list'
---------------------------------  

#### Query Params
| Name   | Required | Description           |
| ------ | -------- | --------------------- |
| search | N        | City, City,State, Zip |

#### Response
 ```javascript
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
 ```

### GET '/locations/live/:foursquare_id'
--------------------------------------------  

#### Response
```javascript
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
```


### GET '/locations/:id'
----------------------------------  

#### Response
```javascript
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
```

### GET '/locations/dashboard'
---------------------------------

#### Headers 
| Name          | Required | Description                            |
| ------------- | -------- | -------------------------------------- |
| Authorization | Y        | Token returned upon login/registration |

#### Response
```javascript
{
    id: 1,
    last_name: "Tuh",
    username: "pizzahut",
    email: "billy@pizzahut.com",
    first_name: "Azzip",
    update_foursquare: true,
    phone_number: null,
    foursquare_id: null,
    business_name: "Pizza Hut",
    latitude: 29.201598971549643,
    longitude: -98.66165965560205,
    address: "123 pizza lane",
    website_url: "https://www.pizzahut.com",
    official_description: "The Hutt of Pizza",
    thumbnail_image: "https://res.cloudinary.com/plza/image/upload/v1589334585/pizzaIcon_vt9vq9.png",
    inside_image: null,
    street_view_image: "google.com/1.jpg",
    menu_image: null,
    order_service: "Doordash",
    store_bio: "We made this place and that place makes pizza",
    dietary_offerings: [
        "vegan"
    ]
}
```

### PUT '/locations/'
---------------------------

#### Headers 
| Name          | Required | Description                            |
| ------------- | -------- | -------------------------------------- |
| Authorization | Y        | Token returned upon login/registration |

#### Body
| Name                 | Type          | Required | Description                                           | Unique |
| -------------------- | ------------- | -------- | ----------------------------------------------------- | ------ |
| last_name            | string        | N        | Business owner's last name                            | N      |
| username             | string        | N        | Desired username                                      | Y      |
| email                | string        | N        | Business owner's email address                        | Y      |
| first_name           | string        | N        | Business owner's first name                           | N      |
| phone_number         | string        | N        | Business's phone number                               | N      |
| business_name        | string        | N        | Name of the business                                  | N      |
| address              | string        | N        | Business' physical address                            | N      |
| website_url          | string        | N        | Url to the business' website                          | N      |
| official_description | string        | N        | Short description of the business                     | N      |
| order_service        | string        | N        | Service the business uses for online orders           | N      |
| store_bio            | string        | N        | Short bio/blurb for the business                      | N      |
| dietary_offerings    | array[string] | N        | List of special dietary offerings the business offers | N      |

#### Response
```javascript
{
    id: 1,
    last_name: "Tuh",
    username: "pizzahut",
    email: "billy@pizzahut.com",
    first_name: "Azzip",
    update_foursquare: true,
    phone_number: null,
    foursquare_id: null,
    business_name: "Pizza Hut",
    latitude: 29.201598971549643,
    longitude: -98.66165965560205,
    address: "123 pizza lane",
    website_url: "https://www.pizzahut.com",
    official_description: "The Hutt of Pizza",
    thumbnail_image: "https://res.cloudinary.com/plza/image/upload/v1589334585/pizzaIcon_vt9vq9.png",
    inside_image: null,
    street_view_image: "google.com/1.jpg",
    menu_image: null,
    order_service: "Doordash",
    store_bio: "We made this place and that place makes pizza",
    dietary_offerings: [
        "vegan"
    ]
}
```

### PUT '/locations/images'
-----------------------------

#### Headers 
| Name          | Required | Description                            |
| ------------- | -------- | -------------------------------------- |
| Authorization | Y        | Token returned upon login/registration |

#### Form-data

| Name      | Required | Description                      | 
| --------- | -------- | -------------------------------- |
| image-raw | Y        | Data URI of user's desired image |

#### Response
```javascript
{
    id: 1,
    last_name: "Tuh",
    username: "pizzahut",
    email: "billy@pizzahut.com",
    first_name: "Azzip",
    update_foursquare: true,
    phone_number: null,
    foursquare_id: null,
    business_name: "Pizza Hut",
    latitude: 29.201598971549643,
    longitude: -98.66165965560205,
    address: "123 pizza lane",
    website_url: "https://www.pizzahut.com",
    official_description: "The Hutt of Pizza",
    thumbnail_image: "https://res.cloudinary.com/plza/image/upload/v1589334585/pizzaIcon_vt9vq9.png",
    inside_image: null,
    street_view_image: "google.com/1.jpg",
    menu_image: null,
    order_service: "Doordash",
    store_bio: "We made this place and that place makes pizza",
    dietary_offerings: [
        "vegan"
    ]
}
```

### DELETE '/locations'
--------------------------

#### Headers 
| Name          | Required | Description                            |
| ------------- | -------- | -------------------------------------- |
| Authorization | Y        | Token returned upon login/registration |

#### Response
```javascript
"Success"
```

## Events Routes

### GET '/events'
--------------------------

### Response
```javascript
[
    {
        location_id: 1,
        user_id: 1,
        id: 1,
        title: "Lets Get Pizza!",
        description: "Its dat time boys, pizza!",
        start_time: "2020-01-20T00:00:00.000Z",
        end_time: "2020-01-22T00:00:00.000Z",
        business_name: "Pizza Hut",
        address: "123 pizza lane"
    },
    {
        location_id: 1,
        user_id: 1,
        id: 2,
        title: "Nacho Pizza Hunt!",
        description: "Are Nacho pizzas a thing? Lets find out!",
        start_time: "2020-01-20T00:00:00.000Z",
        end_time: "2020-01-22T00:00:00.000Z",
        business_name: "Pizza Hut",
        address: "123 pizza lane"
    },
    ...
```

### GET 'events/:id'
-----------------------

#### Response
```javascript
{
    event: {
        location_id: 1,
        user_id: 1,
        id: 1,
        title: "Lets Get Pizza!",
        description: "Its dat time boys, pizza!",
        start_time: "2020-01-20T00:00:00.000Z",
        end_time: "2020-01-22T00:00:00.000Z",
        business_name: "Pizza Hut",
        address: "123 pizza lane"
    }
}
```
### GET 'events/users/:id'
-----------------------------

#### Response
```javascript
{
    createdEvents: [
        {
            location_id: 1,
            user_id: 1,
            id: 1,
            title: "Lets Get Pizza!",
            description: "Its dat time boys, pizza!",
            start_time: "2020-01-20T00:00:00.000Z",
            end_time: "2020-01-22T00:00:00.000Z",
            business_name: "Pizza Hut",
            address: "123 pizza lane"
        },
        {
            location_id: 1,
            user_id: 1,
            id: 2,
            title: "Nacho Pizza Hunt!",
            description: "Are Nacho pizzas a thing? Lets find out!",
            start_time: "2020-01-20T00:00:00.000Z",
            end_time: "2020-01-22T00:00:00.000Z",
            business_name: "Pizza Hut",
            address: "123 pizza lane"
        },
        {
            location_id: 2,
            user_id: 1,
            id: 3,
            title: "The End of Days",
            description: "About that time, lets have a slice to celebrate the end of the world.",
            start_time: "2020-01-20T00:00:00.000Z",
            end_time: "2020-01-22T00:00:00.000Z",
            business_name: "Dominoes Pizza",
            address: "13 pizza rd"
        }
        ...
    ],
    invitedEvents: [
        {
            location_id: 2,
            user_id: 4,
            id: 4,
            title: "BYOP Party - Bring Your Own Pizza",
            description: "Bring your own pizza party, plates will be provided",
            start_time: "2020-06-20T00:00:00.000Z",
            end_time: "2020-06-22T00:00:00.000Z",
            business_name: "Dominoes Pizza",
            address: "13 pizza rd"
        }
        ...
    ]
}
```

### GET '/events/locations/:id'
----------------------------------

#### Response 
```javascript
[
    {
        id: 1,
        user_id: 1,
        location_id: 1,
        title: "Lets Get Pizza!",
        description: "Its dat time boys, pizza!",
        start_time: "2020-01-20T00:00:00.000Z",
        end_time: "2020-01-22T00:00:00.000Z"
    },
    {
        id: 2,
        user_id: 1,
        location_id: 1,
        title: "Nacho Pizza Hunt!",
        description: "Are Nacho pizzas a thing? Lets find out!",
        start_time: "2020-01-20T00:00:00.000Z",
        end_time: "2020-01-22T00:00:00.000Z"
    },
    ...
]
```

### GET '/events/:id/invites
-------------------------------

#### Response
```javascript
[
    {
        id: 1,
        event_id: 5,
        inviter_user_id: 6,
        invitee_user_id: 7,
        response: "pending"
    },
    {
        id: 2,
        event_id: 5,
        inviter_user_id: 6,
        invitee_user_id: 3,
        response: "pending"
    },
    {
        id: 3,
        event_id: 5,
        inviter_user_id: 6,
        invitee_user_id: 2,
        response: "pending"
    },
    ...
]
```

### POST '/events'
---------------------

#### Body
| Name        | Type      | Required | Description                                      |
| ----------- | --------- | -------- | ------------------------------------------------ |
| user_id     | integer   | N        | ID of the user who created the event             |
| location_id | integer   | Y        | ID of the location where the event is being held |
| title       | string    | Y        | Title of the event                               |
| description | string    | Y        | Description of the event                         |
| start_time  | datetime  | Y        | Start time of the event                          |
| end_time    | datetime  | Y        | End time of the event                            |


#### Response
```javascript
{
    id: 5,
    user_id: 6,
    location_id: 3,
    title: "Stonefire party",
    description: "Stonefire pizza all 1% off all orders over $100",
    start_time: "2020-01-20T00:00:00.000Z",
    end_time: "2020-01-22T00:00:00.000Z"
}
```

### POST '/events/:id/invite'
--------------------------------

#### Body
| Name            | Type          | Required | Description                                      |
| --------------- | ------------- | -------- | ------------------------------------------------ |
| inviter_user_id | integer       | Y        | ID of the user who created the event             |
| invitee_user_id | integer       | Y        | ID of the user being invited to the event        |


#### Response
```javascript
{
    id: 1,
    event_id: 5,
    inviter_user_id: 6,
    invitee_user_id: 7,
    response: "pending"
}
```

### PUT '/events/:id/invite/:invite_id
-----------------------------------------

#### Body
| Name     | Type   | Reuired | Description                                                                 |
| -------- | ------ | ------- | --------------------------------------------------------------------------- |
| response | string | Y       | Invite status. Must be one of the following: accepted, interested, declined |

#### Response
```javascript
{
    invited: {
        id: 2,
        event_id: 5,
        inviter_user_id: 6,
        invitee_user_id: 3,
        response: "accepted"
    }
}
```

### PUT '/events/:id'
-------------------------

#### Body
| Name        | Type      | Required | Description                                      |
| ----------- | --------- | -------- | ------------------------------------------------ |
| user_id     | integer   | N        | ID of the user who created the event             |
| location_id | integer   | N        | ID of the location where the event is being held |
| title       | string    | N        | Title of the event                               |
| description | string    | N        | Description of the event                         |
| start_time  | datetime  | N        | Start time of the event                          |
| end_time    | datetime  | N        | End time of the event                            |

#### Response
```javascript
{
    id: 5,
    user_id: 6,
    location_id: 3,
    title: "Stonefire party",
    description: "Stonefire pizza all 1% off all orders over $100",
    start_time: "2020-01-20T00:00:00.000Z",
    end_time: "2020-01-22T00:00:00.000Z"
}
```

### DELETE '/events/:id'
----------------------------

#### Response
```javascript
"Success."
```

## Friends Routes

### GET '/friends'
---------------------------

#### Response
```javascript
[
    {
        user_id: 1,
        friends_id: 1,
        status: "accepted",
        id: 1
    },
    {
        user_id: 2,
        friends_id: 2,
        status: "accepted",
        id: 2
    },
    {
        user_id: 3,
        friends_id: 3,
        status: "accepted",
        id: 3
    }
    ...
]
```

### GET 'friends/:id'

### Response
```javascript
[
    {
        id: 2,
        username: "Roger",
        display_name: "PizzaDude",
        friends_id: 2,
        friend_username: "Roger",
        friend_display_name: "PizzaDude",
        friend_location: "Santa Monica",
        friend_profile_image: "https://res.cloudinary.com/plza/image/upload/v1588043869/qxhdqbj4sthf57bdgltz.jpg",
        friend_bio: "Life is like a box of pizza, you never know what you're going to get! - Forest Gump",
        friend_favorite_pizza_shop: 1
    }
]
```

### POST '/friends'
-----------------------
#### Body
| Name        | Type      | Required | Description                                      |
| ----------- | --------- | -------- | ------------------------------------------------ |
| user_id     | integer   | Y        | ID of the user sending/creating the request      |
| friends_id  | integer   | Y        | ID of the user becoming the friend               |


#### Response
```javascript
{
    user_id: 6,
    friends_id: 7,
    status: "requested",
    id: 18
}
```

### PUT '/friends/:id'
---------------------------------

#### Body
| Name      | Type     | Required | Description                                                                            |
| --------- | -------- | -------- | -------------------------------------------------------------------------------------- |
| response  | string   | Y        | status of the friendship. Must be one of the following: requested, accepted, blocked   |

#### Response
```javascript
{
    success: true,
    message: "friend with id 18 was updated."
}
```

### DELETE '/friends/:id'
------------------------------

#### Response
```javascript
{
    success: true,
    message: "friend with id 18 was deleted"
}
```


## Promotions Routes

## GET '/promotions'
----------------------------

#### Response
```javascript
[
    {
        id: 1,
        location_id: 1,
        title: "Cheese Sale!",
        text: "Half Price extra cheese!",
        start_date: "2020-01-02T00:00:00.000Z",
        end_date: "2020-01-03T00:00:00.000Z"
    },
    {
        id: 2,
        location_id: 2,
        title: "Double Double Time!",
        text: "Buy one pizza and pay double for the second!",
        start_date: "2020-01-03T00:00:00.000Z",
        end_date: "2020-02-03T00:00:00.000Z"
    },
    {
        id: 3,
        location_id: 3,
        title: "Jailhouse Rock!",
        text: "Sing a song for 10 bucks off your order!",
        start_date: "2020-02-03T00:00:00.000Z",
        end_date: "2020-02-03T00:00:00.000Z"
    },
    ...
]
```

### GET '/promotions/:id'
----------------------------------

#### Response
```javascript
    {
        id: 2,
        location_id: 2,
        title: "Double Double Time!",
        text: "Buy one pizza and pay double for the second!",
        start_date: "2020-01-03T00:00:00.000Z",
        end_date: "2020-02-03T00:00:00.000Z"
    }
```

### POST '/promotions'
------------------------------

#### Body
| Name           | Type     | Required | Description                                       |
| -------------- | ---------| -------- | ------------------------------------------------- |
| location_id    | integer  | Y        | ID of the location creating the promotion         |
| title          | string   | Y        | Title of the promotion                            |
| text           | string   | Y        | Description and extra details about the promotion |
| start_date     | datetime | Y        | Time when the promotion starts                    |
| end_date       | datetime | Y        | Time when the promotion ends                      |

#### Response
```javascript
    {
        id: 4,
        location_id: 1,
        title: "We Survived COVID Promo",
        text: "19% off any purchases over $19",
        start_date: "2020-01-03T00:00:00.000Z",
        end_date: "2020-02-03T00:00:00.000Z"
    }
```

### PUT '/promotions/:id'
------------------------------

#### Body
| Name        | Type     | Required | Description                                       |
| ----------- | ---------| -------- | ------------------------------------------------- |
| title       | string   | N        | Title of the promotion                            |
| text        | string   | N        | Description and extra details about the promotion |
| start_date  | datetime | N        | Time when the promotion starts                    |
| end_date    | datetime | N        | Time when the promotion ends                      |

#### Response
```javascript
    {
        id: 4,
        location_id: 1,
        title: "We Survived COVID Party Promo",
        text: "19% off any purchases over $19",
        start_date: "2020-01-03T00:00:00.000Z",
        end_date: "2020-02-03T00:00:00.000Z"
    }
```

### DELETE '/promotions/:id'
------------------------------------

#### Response
```javascript
"Success."
```

## Reviews 

### GET '/reviews'
-------------------------

#### Response
```javascript
[
    {
        id: 1,
        user_id: 1,
        location_id: 1,
        rating: 5,
        review_title: "cheese pizza day",
        review_text: "cheese was good, but I wanted pepperoni"
    },
    {
        id: 2,
        user_id: 2,
        location_id: 1,
        rating: 3,
        review_title: "memorial pizza time",
        review_text: "not bad, but too pricy"
    },
    {
        id: 3,
        user_id: 3,
        location_id: 1,
        rating: 1,
        review_title: "ran out?!",
        review_text: "they ran out of cheese, smh"
    },
    ...
]
```

### GET '/reviews/:id'
-------------------------

#### Response
```javascript
{
    id: 2,
    user_id: 2,
    location_id: 1,
    rating: 3,
    review_title: "memorial pizza time",
    review_text: "not bad, but too pricy"
}
```

### GET '/reviews/users/:id'
-------------------------

#### Response
```javascript
[
    {
        id: 1,
        user_id: 6,
        location_id: 3,
        rating: 5,
        review_title: "cheese pizza day",
        review_text: "cheese was good, but I wanted pepperoni",
        business_name: "Pizzaria Pizza",
        address: "1254 Pizza Dr"
    },
    {
        id: 9,
        user_id: 6,
        location_id: 11,
        rating: 3,
        review_title: "memorial pizza time",
        review_text: "not bad, but too pricy",
        business_name: "Pizza Pizzaria",
        address: "1254 Pizza Cir"
    },
    {
        id: 19,
        user_id: 6,
        location_id: 17,
        rating: 3,
        review_title: "ran out?!",
        review_text: "they ran out of cheese, smh",
        business_name: "Pizzaria Pizzaria",
        address: "1254 Pizza Rd"
    },
    ...
]
```

### POST '/reviews'
--------------------------

#### Body
| Name         | Type    | Required | Description                          |
| ------------ | ------- | -------- | ------------------------------------ |
| user_id      | integer | Y        | ID of the user writing the review    |
| location_id  | integer | Y        | ID of the location the review is for |
| rating       | integer | Y        | Rating score for the review (1-5)    |
| review_title | string  | N        | Title of the review                  |
| review_text  | string  | N        | Additional text for the review       |

#### Response
```javascript
    {
        id: 9,
        user_id: 6,
        location_id: 11,
        rating: 3,
        review_title: "memorial pizza time",
        review_text: "not bad, but too pricy",
        business_name: "Pizza Pizzaria",
        address: "1254 Pizza Cir"
    }
```

### PUT '/reviews/:id'
--------------------------

#### Body
| Name         | Type    | Required | Description                          |
| ------------ | ------- | -------- | ------------------------------------ |
| user_id      | integer | N        | ID of the user writing the review    |
| location_id  | integer | N        | ID of the location the review is for |
| rating       | integer | N        | Rating score for the review (1-5)    |
| review_title | string  | N        | Title of the review                  |
| review_text  | string  | N        | Additional text for the review       |

#### Response
```javascript
    {
        id: 9,
        user_id: 6,
        location_id: 11,
        rating: 3,
        review_title: "Pi Day Celebration",
        review_text: "not bad, but too pricy",
        business_name: "Pizza Pizzaria",
        address: "1254 Pizza Cir"
    }
```

### DELETE '/reviews/:id'
-----------------------------

#### Response
```javascript
"Success."
```


## Saved Promos Routes

### GET '/savedPromos/users/:id'
----------------------------------

#### Response
```javascript
[
    {
        location_id: 2,
        title: "Double Double Time!",
        text: "Buy one pizza and pay double for the second!",
        promo_id: 2,
        user_id: 1,
        id: 1,
        business_name: "Dominoes Pizza",
        address: "13 pizza rd"
    },
    {
        location_id: 3,
        title: "Jailhouse Rock!",
        text: "Sing a song for 10 bucks off your order!",
        promo_id: 3,
        user_id: 1,
        id: 2,
        business_name: "Papa Johns",
        address: "30 pizza st"
    }
]
```

### POST '/savedPromos'
-----------------------------

#### Body
| Name     | Type    | Required | Description                     |
| ---------| ------- | -------- | --------------------------------|
| user_id  | integer | Y        | ID of the user saving the promo |
| promo_id | integer | Y        | ID of the promotion being saved |

#### Response
```javascript
{
    user_id: 6,
    promo_id: 2,
    id: 8
}
```


### DELETE '/savedPromos/:id'
-------------------------------

#### Response
```javascript
"Success."
```


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
