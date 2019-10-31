exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {
          Account_creator_id: '1',
          Business_id: '1',
          Title: 'Lets Get Pizza!',
          Description: 'Its dat time boys, pizza!',
          DateTime: '1/2/19'
        },
        {
            Account_creator_id: '2',
            Business_id: '2',
            Title: 'Nacho Pizza Hunt!',
            Description: 'Are Nacho pizzas a thing? Lets find out!',
            DateTime: '1/3/19'
          },
        {
            Account_creator_id: '3',
            Business_id: '3',
            Title: 'The End of Days',
            Description: 'About that time, lets have a slice to celebrate the end of the world.',
            DateTime: '1/4/19'
          }
      ]);
    });
  };