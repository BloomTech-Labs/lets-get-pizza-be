# API Documentation

#### 1️⃣ Backend delpoyed at [lets-get-pizza-be](https://plza.herokuapp.com/) <br>

## 1️⃣ Getting started

To get the server running locally:

- Clone this repo
- **npm install** to install all required dependencies
- Set up local pg database & connect in knexfile
- **npm run server** to start the local server
- **npm run test** to start server using testing environment

### Backend framework goes here

Node / Express.js

Postgresql

Foursquare

Geocoding/GeoIP

## 2️⃣ Endpoints OVERVIEW

#### Location Routes

| Method | Endpoint                         | Access Control | Description                                                               |
| ------ | -----------------------          | -------------- | --------------------------------------------                              |
| GET    | '/locations/map'                 | all            | Returns an array of close pizza places, and their latitude and longitude  |
| GET    | '/locations/list'                | all            | Returns an array of close pizza places, and their thumbnail, if available |
| GET    | '/locations/live/:foursquare_id' | all            | Gets the information from a foursquare id and maps it to the database     |
| GET    | '/locations/:id'                 | all            | Gets the information for a location from the database                     |
| GET    | '/locations/dashboard'           | location       | Gets the locations information for display                                |
| PUT    | '/locations'                     | location       | Edits the information for the logged in location                          |
| DELETE | '/locations'                     | location       | Deletes the location.                                                     |


#### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/users/dashboard`      | user                | Returns info for the logged in user.               |
| GET    | `/users/:id`            | user                | Returns any users information                      |
| PUT    | `/users`                | user                | Returns info for a single user.                    |
| DELETE | `/users`                | user                | Deletes the user's account                         |


#### Auth Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST   | `/auth/register`        | none                | Registers a user & logs them in.                   |
| POST   | `/auth/login`           | none                | Logs the user in and returns a token.              |



## 2️⃣ Endpoints OVERVIEW

#### Location Routes

---------------------------------
 GET '/locations/map'
 --------------------------------
Automatically finds a users location based on IP.
Also takes a "search" parameter to adjust. ("City", "City,State", "Zip")

[
    {
        "name": "Dominoes Pizza",
        "latitude": 40.7050150708864,
        "longitude": -73.9336165250072,
        "address": "13 pizza rd",
        "location_id": 25
    },
    {
        "name": "Roberta's Pizza",
        "latitude": 40.70501507088636,
        "longitude": -73.93361652500724,
        "address": "261 Moore St",
        "foursquare_id": "47e100b9f964a520414e1fe3"
    },
]

---------------------------------
 GET '/locations/list'
 --------------------------------  
 Automatically finds a users location based on IP.
 Also takes a "search" parameter to adjust. ("City", "City,State", "Zip")

 Returns:
 [
    {
        "name": "Dominoes Pizza",
        "address": "13 pizza rd",
        "thumbnail_url": "dominoes.com/1.jpg",
        "location_id": 25
    },
    {
        "name": "Roberta's Pizza",
        "address": "261 Moore St",
        "foursquare_id": "47e100b9f964a520414e1fe3"
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
    "foursquare_id": "4a593de0f964a52015b91fe3",
    "business_name": "Saraghina",
    "latitude": 40.68359,
    "longitude": -73.93534,
    "address": [
        "435 Halsey St (at Lewis Ave)",
        "Brooklyn, NY 11233",
        "United States"
    ],
    "website_url": "http://www.saraghina.com"
}

---------------------------------
 GET '/locations/:id'
 --------------------------------  
 Returns the location item from the database.
 If "update_foursquare" is true, then it is updated before returned.

{
    "id": 25,
    "username": "dominoes",
    "email": "betty@dominoes.com",
    "password": "pizza1", **password is removed before returning location object
    "first_name": "Noes",
    "foursquare_id": "13",
    "update_foursquare": null,
    "business_name": "Dominoes Pizza",
    "address": "13 pizza rd",
    "website_url": "www.dominoes.com",
    "official_description": "The Old Boardgame of Pizza",
    "thumbnail_url": "dominoes.com/1.jpg",
    "street_view_image": "google.com/2.jpg",
    "order_service": "We Deliver!",
    "store_bio": "Theres pizza here and you can eat some",
    "dietary_offerings": [
        "Even the cheese is meat"
    ],
    "latitude": 40.7050150708864,
    "longitude": -73.9336165250072,
    "last_name": "Dom"
}

| GET    | '/locations/dashboard'           | location       | Gets the locations information for display                                |
| PUT    | '/locations'                     | location       | Edits the information for the logged in location                          |
| DELETE | '/locations'                     | location       | Deletes the location.                                                     |


#### User Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| GET    | `/users/dashboard`      | user                | Returns info for the logged in user.               |
| GET    | `/users/:id`            | user                | Returns any users information                      |
| PUT    | `/users`                | user                | Returns info for a single user.                    |
| DELETE | `/users`                | user                | Deletes the user's account                         |


#### Auth Routes

| Method | Endpoint                | Access Control      | Description                                        |
| ------ | ----------------------- | ------------------- | -------------------------------------------------- |
| POST   | `/auth/register`        | none                | Registers a user & logs them in.                   |
| POST   | `/auth/login`           | none                | Logs the user in and returns a token.              |



## 2️⃣ Actions

`getOrgs()` -> Returns all organizations

`getOrg(orgId)` -> Returns a single organization by ID

`addOrg(org)` -> Returns the created org

`updateOrg(orgId)` -> Update an organization by ID

`deleteOrg(orgId)` -> Delete an organization by ID
<br>
<br>
<br>
`getUsers(orgId)` -> if no param all users

`getUser(userId)` -> Returns a single user by user ID

`addUser(user object)` --> Creates a new user and returns that user. Also creates 7 availabilities defaulted to hours of operation for their organization.

`updateUser(userId, changes object)` -> Updates a single user by ID.

`deleteUser(userId)` -> deletes everything dependent on the user

## 3️⃣ Environment Variables

In order for the app to function correctly, the user must set up their own environment variables.

create a .env file that includes the following:

    * JWT_SECRET  Needed for auth router and password generation
    * PORT Not needed but you can set your own local port for testing on the local machine in case port 4000 is already in use
    * PGPASSWORD Set this as your PostgreSQL local and test databse passwords
    * FSCLIENTID FourSquare API Client ID
    * FSCLIENTSECRET FourSquare API Client Secret

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
