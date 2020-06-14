# API Documentation

#### 1️⃣ Backend delpoyed at [lets-get-pizza-be](https://plza.herokuapp.com/) <br>

## 1️⃣ Getting started

To get the server running locally:

**With Docker**
- Clone this repo
- Create a `.env` file with needed [environment variables](https://github.com/Lambda-School-Labs/lets-get-pizza-be#environment-varables)
- run **docker-compose -d up** to install all required dependencies, create pg database, and start local server
- run **docker exec -d plza-server sh -c  "npm run seed"** to seed the database (only need to do this on initial setup)
- run **docker-compose down** to stop server

**Without Docker**
- Clone this repo
- Create a .env file with needed environment variables
- **npm install** to install all required dependencies
- Set up local pg database & connect in knexfile
- **npm run server** to start the local server
- **npm run test** to start server using testing environment

## Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

    * POSTGRES_USER Set this as the user for your postgres database **recommended to set as postgres**
    * POSTGRES_DB Name of your postgres database
    * POSTGRES_PASSWORD Set this as your postgres local and test database passwords
    * POSTGRES_HOST Needed to establish postgres connection. Set as plza-postgres
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

## 2️⃣ Actions

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


## Endpoints DETAILS

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
