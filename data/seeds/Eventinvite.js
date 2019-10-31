exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('Eventinvites').del()
    .then(function () {
      // Inserts seed entries
      return knex('Eventinvites').insert([
        {
          Event_id: '1',
          Inviter_user_id: '1',
          Invitee_user_id: '2',
          Response: 'Yes'
        },
        {
            Event_id: '2',
            Inviter_user_id: '3',
            Invitee_user_id: '4',
            Response: 'No'
          },
          {
            Event_id: '3',
            Inviter_user_id: '4',
            Invitee_user_id: '1',
            Response: 'Maybe'
          }
      ]);
    });
  };