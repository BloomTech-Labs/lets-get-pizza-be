exports.seed = function(knex, Promise) {
      return knex('reviews').insert([
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
  };