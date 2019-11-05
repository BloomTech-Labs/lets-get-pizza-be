exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('eventinvites').del()
    .then(function () {
      // Inserts seed entries
      return knex('eventinvites').insert([
        {
          event_id: '1',
          inviter_user_id: '1',
          invitee_user_id: '2',
          response: 'Yes'
        },
        {
            event_id: '2',
            inviter_user_id: '3',
            invitee_user_id: '4',
            response: 'No'
          },
          {
            event_id: '3',
            inviter_user_id: '4',
            invitee_user_id: '1',
            response: 'Maybe'
          }
      ]);
    });
  };