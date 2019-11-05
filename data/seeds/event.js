exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('events').del()
    .then(function () {
      // Inserts seed entries
      return knex('events').insert([
        {
          account_creator_id: '1',
          business_id: '1',
          title: 'Lets Get Pizza!',
          description: 'Its dat time boys, pizza!',
          dateTime: '1/2/19'
        },
        {
            account_creator_id: '2',
            business_id: '2',
            title: 'Nacho Pizza Hunt!',
            description: 'Are Nacho pizzas a thing? Lets find out!',
            dateTime: '1/3/19'
          },
        {
            account_creator_id: '3',
            business_id: '3',
            title: 'The End of Days',
            description: 'About that time, lets have a slice to celebrate the end of the world.',
            dateTime: '1/4/19'
          }
      ]);
    });
  };