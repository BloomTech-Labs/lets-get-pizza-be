var knexCleaner = require('knex-cleaner');
// our connections to the database
const db = require('../../data/db-config.js');
const Events = require('../../components/events/events-model.js');
const Locations = require('../../components/locations/locations-model')
const Users = require('../../components/users/users-model')

// Dummy events data for the tests
const good_event_info = { location_id: 1, title: 'Lets Get Pizza!', description: 'Its dat time boys, pizza!',
start_time: '1/20/2020', end_time: '1/22/2020'}
const bad_event_info = { user_id: 1, location_id: 1, title: null, description: null, start_time: null, end_time: null}
const matching_object = {location_id: 1, title: 'Lets Get Pizza!', description: 'Its dat time boys, pizza!'}
const updated_values = {title: 'Lets Have A Party!', description: 'Piza Party Time!!!'}

// Dummy event invites data
const good_invite = {event_id: 1, inviter_user_id: 1, invitee_user_id: 2, response: 'pending'}
const bad_invite = {event_id: 4, inviter_user_id: 2}

// Dummy locations data for tests
const add_location = { id: 1, username: 'pizzahut', email: 'billy@pizzahut.com', password: 'pizza1', first_name: 'Azzip', last_name: 'Tuh', business_name: 'Pizza Hut', latitude: 29.201598971549644, longitude: -98.66165965560205, address: '123 pizza lane', website_url: 'www.pizzahut.com', official_description: 'The Hutt of Pizza', thumbnail_image: 'pizzahut.com/1.jpg',street_view_image: 'google.com/1.jpg', order_service: 'Doordash', store_bio: 'We made this place and that place makes pizza', dietary_offerings: ['vegan']}

// Dummy users data for tests
const users = [
    {username: 'test_user_1', password: 'password', email: "testuser10@user.com"},
    {username: 'test_user_2', password: 'password', email: "testuser13@user.com"}
]


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

    describe("Find By Id Model",  () => {
        it("should return undefined", async () => {
            const noEvent = await Events.findById(3)

            expect(noEvent).toBeUndefined()
        })

        it("should return array of events", async () => {
            await Events.add(good_event_info)

            const foundEvent = await Events.findById(1)

            expect(foundEvent).toBeDefined()
            expect(foundEvent).toMatchObject(matching_object)
        })
    })

    describe("Find By Model",  () => {
        it("should return an empty array when no match", async () => {
            const noEvent = await Events.findBy({location_id: 33})

            expect(noEvent).toHaveLength(0)
            expect(noEvent).toEqual([])
        })

        it("should return array of events", async () => {
            await Events.add(good_event_info)

            const foundEvent = await Events.findBy({location_id: 1})

            expect(foundEvent).toBeDefined()
            expect(foundEvent[0]).toMatchObject(matching_object)
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

    describe("Find By Loc Id Model", () => {
        beforeEach(async () => {
            await Events.add(good_event_info)
        })

        it("should return an empty array with wrong id", async () => {
            const id = 23
            const failedFind = await Events.findByLocId(id)

            expect(failedFind).toHaveLength(0)
            expect(failedFind).toEqual([])
        })

        it("should return array containing event", async () => {
            const id = 1
            const successfulFind = await Events.findByLocId(id)

            expect(successfulFind).toHaveLength(1)
            expect(successfulFind[0]).toHaveProperty("location_id")
        })
    })

    describe('Invite Friends Model', () => {
        beforeEach(async () => {
            await Events.add(good_event_info)
            await users.forEach(user => Users.add(user))
        })

        it('should not add invite and throw an error', async () => {
            const failedInvite = await Events.inviteFriend(bad_invite)

            expect(failedInvite).toMatchObject({ name: "error"})
        })

        it('should add invite and return matching object', async () => {
            const successfulInvite = await Events.inviteFriend(good_invite)

            expect(successfulInvite).toMatchObject(good_invite)
        })
    })

    describe('Update Invites Model', () => {
        beforeEach(async () => {
            await Events.add(good_event_info)
            await users.forEach(user => Users.add(user))
            await Events.inviteFriend(good_invite)
        })

        it('should return an error object with wrong data type', async () => {
            const id = 1
            const failedInviteUpdate = await Events.updateInvite({inviter_id: 4}, id)
            
            expect(failedInviteUpdate).toMatchObject({name: 'error'})
        })

        it('should update invite and return updated info', async () => {
            const id = 1
            const successfulInviteUpdate = await Events.updateInvite({response: "accepted"}, id)

            expect(successfulInviteUpdate).toMatchObject({response: "accepted"})
        })
    })

    describe('Find Invited Events Model', () => {
        beforeEach(async () => {
            await Events.add(good_event_info)
            await users.forEach(user => Users.add(user))
            await Events.inviteFriend(good_invite)
        })

        it("should return empty array", async () => {
            const inviteeInfo = {invitee_user_id: 24}
            const noInvites = await Events.findInvitedEvents(inviteeInfo)

            expect(noInvites).toHaveLength(0)
            expect(noInvites).toEqual([])
        })

        it("should return array with user invites", async () => {
            const inviteeInfo = {invitee_user_id: 2}
            const invites = await Events.findInvitedEvents(inviteeInfo)

            expect(invites).toHaveLength(1)
            expect(invites[0]).toMatchObject({title: "Lets Get Pizza!"})
        })
    })

    describe('Get Invites By Event Model', () => {
        beforeEach(async () => {
            await Events.add(good_event_info)
            await users.forEach(user => Users.add(user))
        })

        it('should return an empty array when no invites exist', async () => {
            const eventInfo = {event_id: 1}
            const noEvents = await Events.getInvitesByEvent(eventInfo)

            expect(noEvents).toHaveLength(0)
            expect(noEvents).toEqual([])
        })

        it('should return an array with invites for event', async () => {
            await Events.inviteFriend(good_invite)

            const eventInfo = {event_id: 1}
            const eventInvites = await Events.getInvitesByEvent(eventInfo)

            expect(eventInvites).toHaveLength(1)
            expect(eventInvites[0]).toMatchObject(eventInfo)
        })
    })

    describe('Get Invite By Id Model', () => {
        beforeEach(async () => {
            await Events.add(good_event_info)
            await users.forEach(user => Users.add(user))
            await Events.inviteFriend(good_invite)
        })

        it('should return undefined when invite does not exist', async () => {
            const id = 24
            const failedInviteFind = await Events.getInviteById(id)

            expect(failedInviteFind).toBeUndefined()
        })

        it('should return undefined when invite does not exist', async () => {
            const id = 1
            const successfulInviteFind = await Events.getInviteById(id)

            expect(successfulInviteFind).not.toBeUndefined()
            expect(successfulInviteFind).toHaveProperty('response', 'pending')
        })
    })
})

