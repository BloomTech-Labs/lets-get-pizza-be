exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('reviews').del()
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert([
        {
          user_id: 1,
          business_id: 1,
          rating: '5',
          review_title: 'cheese pizza day',
          review_body: 'cheese was good, but I wanted pepperoni'
        },
        {
            user_id: 2,
            business_id: 2,
            rating: '3',
            review_title: 'memorial pizza time',
            review_body: 'not bad, but too pricy'
        },
        {
            user_id: 3,
            business_id: 3,
            rating: '1',
            review_title: 'ran out?!',
            review_body: 'they ran out of cheese, smh'
        }
      ]);
    });
  };