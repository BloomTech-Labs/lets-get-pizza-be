var knexCleaner = require('knex-cleaner')
// our connections to the database
const db = require('../../data/db-config.js')
const Promotions = require('../../components/promotions/promotions-model')

// Promotions Dummy Data 
const good_promotion_details = {location_id: 1, title: "COVID-19 Pizza Party", text: "Social Diastance with a pizza pie", start_date: "4/16/2020", end_date: "5/18/2020"}
const bad_promotion_details = {location_id: 6, title: null, text: null, start_date: "4/20/2020"}
const match_promotion_details = {location_id: 1, title: "COVID-19 Pizza Party", text: "Social Diastance with a pizza pie"}

// Locations Register Dummy Data
const location_creds = {business_name: "testlocation", email: "testlocation@location.com", password: "test", latitude: 29.201598971549644, longitude: -98.66165965560205, address: "123 Test Drive"}

describe("Promotions Tests", () => {
    beforeAll(async () => {
        await knexCleaner.clean(db)
        await db('locations').insert(location_creds)
    })

    beforeEach(async () => {
        await db("promotions").truncate()
    })

    it("Finding promotion tests", async () => {
        expect(false).toBe(false)
    })

    describe("Add Model", () => {
        it("should return an error", async () => {
            const failedPromotion = await Promotions.add(bad_promotion_details)
            const returnedPromotions = await Promotions.find()
            const failedMatch = {name: "error"}

            expect(failedPromotion).toMatchObject(failedMatch)
            expect(returnedPromotions).toEqual([])
            expect(returnedPromotions).toHaveLength(0)
        })

        it("should add promotion to promotions table", async () => {
            const successfulPromotion = await Promotions.add(good_promotion_details)
            
            expect(successfulPromotion).toMatchObject(match_promotion_details)
        })
    })
})

