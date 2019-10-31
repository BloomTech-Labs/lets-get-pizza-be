exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('reviews').del()
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert([
        {
          User_id: 1,
          Business_id: 1,
          Rating: '5',
          Review_Title: 'cheese pizza day',
          Review_Body: 'cheese was good, but I wanted pepperoni'
        },
        {
            User_id: 2,
            Business_id: 2,
            Rating: '3',
            Review_Title: 'memorial pizza time',
            Review_Body: 'not bad, but too pricy'
        },
        {
            User_id: 3,
            Business_id: 3,
            Rating: '1',
            Review_Title: 'ran out?!',
            Review_Body: 'they ran out of cheese, smh'
        }
      ]);
    });
  };