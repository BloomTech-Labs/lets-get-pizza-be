exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          Username: 'Billy',
          Email: 'billy@pizzaluv.com',
          Password: 'pizza1',
          Profile_Image: 'www.something.com/1.jpg',
          Display_Name: 'PizzaBruh420',
          Dietary_Preference: ['gluten'],
          Favorite_pizza_toppings: 'Mushrooms',
          City: 'Miami',
          State: 'Florida'
        },
        {
            Username: 'Roger',
            Email: 'roger@pizzaluv.com',
            Password: 'pizza1',
            Profile_Image: 'www.something.com/2.jpg',
            Display_Name: 'PizzaDude',
            Dietary_Preference: ['Vegetarian'],
            Favorite_pizza_toppings: 'Fake Meat Pepperoni',
            City: 'Santa Monica',
            State: 'California'
          },
          {
            Username: 'Betty',
            Email: 'betty@pizzaluv.com',
            Password: 'pizza1',
            Profile_Image: 'www.something.com/1.jpg',
            Display_Name: 'PizzaGurl',
            Dietary_Preference: ['gluten'],
            Favorite_pizza_toppings: 'Pepperoni',
            City: 'Billings',
            State: 'Minnesota'
          }
      ]);
    });
  };