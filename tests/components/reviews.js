var knexCleaner = require('knex-cleaner')
// our connections to the database
const db = require('../../data/db-config.js')
const Reviews = require('../../components/reviews/reviews-model')

// Reviews Dummy Data
const good_review_details = {user_id: 1, location_id: 1, rating: 3}
const bad_review_details = {user_id: null, location_id: null, review: "Hello"}

// User Login Credentials
const user_creds = {username: "testing", password: "pizzaTime", email: "test@username.com"}

// Locations Login Credentials
const location_creds = { id: 1, username: 'pizzahut', email: 'billy@pizzahut.com', password: 'pizza1', first_name: 'Azzip', last_name: 'Tuh', business_name: 'Pizza Hut', latitude: 29.201598971549644, longitude: -98.66165965560205, address: '123 pizza lane', website_url: 'www.pizzahut.com', official_description: 'The Hutt of Pizza', thumbnail_image: 'pizzahut.com/1.jpg',street_view_image: 'google.com/1.jpg', order_service: 'Doordash', store_bio: 'We made this place and that place makes pizza', dietary_offerings: ['vegan']}

describe("Reviews Tests", () => {
    beforeAll(async () => {
        await knexCleaner.clean(db)
        await db("users").insert(user_creds)
        await db("locations").insert(location_creds)
    })

    beforeEach(async () => {
        await db("reviews").truncate()
    })

    it("Find Review Tests", () => {
        expect(5).toBe(5)
    })

    describe("Add Model", () => {
        it("should return an error with incorrect information", async () => {
            const failedReview = await Reviews.add(bad_review_details)

            expect(failedReview).toMatchObject({"name": "error"})
            expect(failedReview).not.toBeUndefined()
        })

        it("should add review to database", async () => {
            const successfulReview = await Reviews.add(good_review_details)

            expect(successfulReview).toMatchObject(good_review_details)
            expect(successfulReview).not.toBeUndefined()
        })
    })

    describe("Find Model", () => {
        it("should return an empty array", async () => {
            const returnedReviews = await Reviews.find()

            expect(returnedReviews).toEqual([])
            expect(returnedReviews).toHaveLength(0)
        })

        it("should return array of reviews", async () => {
            await Reviews.add(good_review_details)
            const returnedReviews = await Reviews.find()

            expect(returnedReviews).toHaveLength(1)
            expect(returnedReviews[0]).toMatchObject(good_review_details)
        })
    })
})