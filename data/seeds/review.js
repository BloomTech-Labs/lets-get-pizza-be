exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('reviews').del()
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert([
        // user_id (int, required, foreign key to user table)
        // location_id (int, required, foreign key to business table)
        // rating (int, required)
        // review_title (string, length 128)
        // review_text (string, no set length)
        {
          user_id: 1,
          location_id: 1,
          rating: 5,
          review_title: 'cheese pizza day',
          review_text: 'cheese was good, but I wanted pepperoni'
        },
        {
            user_id: 2,
            location_id: 1,
            rating: 3,
            review_title: 'memorial pizza time',
            review_text: 'not bad, but too pricy'
        },
        {
            user_id: 3,
            location_id: 1,
            rating: 1,
            review_title: 'ran out?!',
            review_text: 'they ran out of cheese, smh'
        },
        {
            user_id: 3,
            location_id: 1,
            rating: 1,
            review_title: 'ran out?!',
            review_text: 'they ran out of cheese, smh'
        }
      ]);
    });
  };