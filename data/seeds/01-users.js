exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').insert([
        {
          username: 'Billy',
          email: 'billy@pizzaluv.com',
          password: 'pizza1',
          profile_image: 'www.something.com/1.jpg',
          display_name: 'PizzaBruh420',
          dietary_preference: ['gluten'],
          favorite_pizza_toppings: 'Mushrooms',
          display_location: 'Miami, Florida'
        },
        {
            username: 'Roger',
            email: 'roger@pizzaluv.com',
            password: 'pizza1',
            profile_image: 'www.something.com/2.jpg',
            display_name: 'PizzaDude',
            dietary_preference: ['Vegetarian'],
            favorite_pizza_toppings: 'Fake Meat Pepperoni',
            display_location: 'Santa Monica',
          },
          {
            username: 'Betty',
            email: 'betty@pizzaluv.com',
            password: 'pizza1',
            profile_image: 'www.something.com/1.jpg',
            display_name: 'PizzaGurl',
            dietary_preference: ['gluten'],
            favorite_pizza_toppings: 'Pepperoni',
            display_location: 'Billings',
          }
      ]);
  };