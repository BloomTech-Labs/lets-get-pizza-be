var knexCleaner = require('knex-cleaner');
// our connections to the database
const db = require('../../data/db-config.js');
const Events = require('../../components/events/events-model.js');
const Locations = require('../../components/locations/locations-model')

// Dummy events data for the tests
const good_event_info = { location_id: 1, title: 'Lets Get Pizza!', description: 'Its dat time boys, pizza!',
start_time: '1/20/2020', end_time: '1/22/2020'}
const bad_event_info = { user_id: 1, location_id: 1, title: null, description: null, start_time: null, end_time: null}
const matching_object = {location_id: 1, title: 'Lets Get Pizza!', description: 'Its dat time boys, pizza!'}
const updated_values = {title: 'Lets Have A Party!', description: 'Piza Party Time!!!'}

// Dummy locations data for tests
const add_location = { id: 1, username: 'pizzahut', email: 'billy@pizzahut.com', password: 'pizza1', first_name: 'Azzip', last_name: 'Tuh', business_name: 'Pizza Hut', latitude: 29.201598971549644, longitude: -98.66165965560205, address: '123 pizza lane', website_url: 'www.pizzahut.com', official_description: 'The Hutt of Pizza', thumbnail_image: 'pizzahut.com/1.jpg',street_view_image: 'google.com/1.jpg', order_service: 'Doordash', store_bio: 'We made this place and that place makes pizza', dietary_offerings: ['vegan']}


describe('Events Tests', () => {
    beforeEach(async () => {
        await knexCleaner.clean(db)
        await Locations.add(add_location)
    })

    it('Finds Locations test', () => {
        expect(true).toBe(true)
    })

    describe("Add Model", () => {
        it("should return an empty array", async () => {
            const failedEvent = await Events.add(bad_event_info)

            expect(failedEvent).toMatchObject({ name: "error"})
        })

        it("should successfully add event to database", async () => {
            const successfulEvent = await Events.add(good_event_info)

            expect(successfulEvent).toMatchObject(matching_object)
            expect(successfulEvent).toBeDefined()
        })
    })

    describe("Update Model", () => {
        beforeEach(async () => {
            await Events.add(good_event_info)
        })

        it("should return an error with incorrect user id", async () => {
            const id = 2
            const failedUpdate = await Events.update(updated_values, id)

            expect(failedUpdate).toMatchObject({message: 'Undefined binding(s) detected when compiling FIRST. Undefined column(s): [id] query: select * from "events" where "id" = ? limit ?'})
        })

        it("should return the updated event", async () => {
            const id = 1
            const successfulUpdate = await Events.update(updated_values, id)

            expect(successfulUpdate).toMatchObject(updated_values)
        })
    })

    describe("Find Model",  () => {
        it("should return an empty array", async () => {
            const events = await Events.find()

            expect(events).toHaveLength(0)
            expect(events).toEqual([])
        })

        it("should return array of events", async () => {
            await Events.add(good_event_info)

            const events = await Events.find()

            expect(events).toHaveLength(1)
            expect(events[0]).toMatchObject(matching_object)
        })
    })

    describe("Remove Event", () => {
        beforeEach(async () => {
            await Events.add(good_event_info)
        })

        it("should return 0 with incorrect id and not delete event", async () => {
            const id = 4
            const failedDelete = await Events.remove(id)
            const returnedEvents = await Events.find()

            expect(failedDelete).toEqual(0)
            expect(failedDelete).not.toBeTruthy()
            expect(returnedEvents).toHaveLength(1)
        })

        it("should return 1 and delete event", async () => {
            const id = 1
            const successfulDelete = await Events.remove(id)
            const returnedEvents = await Events.find()

            expect(successfulDelete).toBe(1)
            expect(successfulDelete).not.toBeFalsy()
            expect(returnedEvents).toHaveLength(0)
        })
    })
})

