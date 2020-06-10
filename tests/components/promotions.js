var knexCleaner = require('knex-cleaner')
// our connections to the database
const db = require('../../data/db-config.js')
const Promotions = require('../../components/promotions/promotions-model')

// Promotions Dummy Data 
const good_promotion_details = {location_id: 1, title: "COVID-19 Pizza Party", text: "Social Diastance with a pizza pie", start_date: "4/16/2020", end_date: "5/18/2020"}
const bad_promotion_details = {location_id: 6, title: null, text: null, start_date: "4/20/2020"}
const updated_promotion_details = {title: "NFL Draft Party", text: "25% off pizza when your team is drafting"}
const match_promotion_details = {location_id: 1, title: "COVID-19 Pizza Party", text: "Social Diastance with a pizza pie"}


// Locations Register Dummy Data
const location_creds = {business_name: "testlocation", email: "testlocation@location.com", password: "test", latitude: 29.201598971549644, longitude: -98.66165965560205, address: "123 Test Drive"}

describe("Promotions Tests", () => {
    beforeEach(async () => {
        await knexCleaner.clean(db)
        await db('locations').insert(location_creds)
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
            expect(successfulPromotion).not.toBeUndefined()
        })
    })

    describe("Find Model", () => {
        it("should return an array of length 0", async () => {
            const returnedPromotions = await Promotions.find()

            expect(returnedPromotions).toHaveLength(0)
            expect(returnedPromotions).toEqual([])
        })

        it("should return array of promotions", async () => {
            await Promotions.add(good_promotion_details)
            const returnedPromotions = await Promotions.find()

            expect(returnedPromotions).toHaveLength(1)
            expect(returnedPromotions[0]).toMatchObject(match_promotion_details)
        })
    })

    describe("Update Model", () => {
        beforeEach(async () => {
            await Promotions.add(good_promotion_details)
        })

        it("should return an error when no id or wrong provided", async () => {
            const id = 24
            const failedMatch = {message: 'Undefined binding(s) detected when compiling FIRST. Undefined column(s): [id] query: select * from "promotions" where "id" = ? limit ?'}

            const failedUpdateId = await Promotions.update(updated_promotion_details, id)

            expect(failedUpdateId).toMatchObject(failedMatch)
        })

        it("should return error with no id provided", async () => {
            const failedMatch = {message: 'Undefined binding(s) detected when compiling UPDATE. Undefined column(s): [id] query: update "promotions" set "title" = ?, "text" = ? where "id" = ? returning "id"'}

            const failedUpdateNoId = await Promotions.update(updated_promotion_details)

            expect(failedUpdateNoId).toMatchObject(failedMatch)
        })

        it("should update promotion and return updated promotion", async () => {
            const id = 1
            const successfulUpdate = await Promotions.update(updated_promotion_details, id)

            expect(successfulUpdate).toMatchObject(updated_promotion_details)
        })
    })

    describe("Remove Model", () => {
        beforeEach(async () => {
            await Promotions.add(good_promotion_details)
        })

        it("should return error when passed wrong id", async () => {
            const id = 55
            const returned = await Promotions.remove(id)

            expect(returned).toEqual(0)
            expect(returned).toBeFalsy()
        })

        it("should remove the item", async () => {
            const id = 1
            const returned = await Promotions.remove(id)

            expect(returned).toEqual(1)
            expect(returned).toBeTruthy()
        })
    })
})

