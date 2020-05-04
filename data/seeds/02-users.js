exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('users').insert([
        {
          username: 'Billy',
          email: 'billy@pizzaluv.com',
          password: '$2a$10$xz0c9mw.93dILe4riz9YXeDz7wLOot57zovPBbf01CEqfCiWXQprS',
          display_name: 'PizzaBruh420',
          dietary_preference: ['gluten'],
          favorite_pizza_toppings: 'Mushrooms',
          display_location: 'Miami, Florida',
          bio: "Pizza! Pizza! Pizza! Ain't nothing like it",
          favorite_pizza_shop: 2
        },
        {
            username: 'Roger',
            email: 'roger@pizzaluv.com',
            password: '$2a$10$xz0c9mw.93dILe4riz9YXeDz7wLOot57zovPBbf01CEqfCiWXQprS',
            display_name: 'PizzaDude',
            dietary_preference: ['Vegetarian'],
            favorite_pizza_toppings: 'Fake Meat Pepperoni',
            display_location: 'Santa Monica',
            bio: "Life is like a box of pizza, you never know what you're going to get! - Forest Gump",
            favorite_pizza_shop: 1
          },
          {
            username: 'Betty',
            email: 'betty@pizzaluv.com',
            password: '$2a$10$xz0c9mw.93dILe4riz9YXeDz7wLOot57zovPBbf01CEqfCiWXQprS',
            display_name: 'PizzaGurl',
            dietary_preference: ['gluten'],
            favorite_pizza_toppings: 'Pepperoni',
            display_location: 'Billings',
            bio: "Can't spell pizza without Betty!",
            favorite_pizza_shop: 3
          },
          {
            username: 'BlackMamba',
            email: 'blackmamba@pizzaluv.com',
            password: '$2a$10$xz0c9mw.93dILe4riz9YXeDz7wLOot57zovPBbf01CEqfCiWXQprS',
            display_name: 'PizzaGurl',
            dietary_preference: ['gluten'],
            favorite_pizza_toppings: 'Pepperoni',
            display_location: 'Newport Beach',
            bio: "Nothing is better for a pregame meal than pizza",
            favorite_pizza_shop: 3
          },
          {
            username: 'JustinTime',
            email: 'justintime@pizzaluv.com',
            password: '$2a$10$xz0c9mw.93dILe4riz9YXeDz7wLOot57zovPBbf01CEqfCiWXQprS',
            display_name: 'PizzaGurl',
            dietary_preference: ['gluten'],
            favorite_pizza_toppings: 'Pepperoni',
            display_location: 'Clemson',
            bio: "You can call me the king of pizza",
            favorite_pizza_shop: 2
          },
          {
            username: 'Buddy',
            email: 'buddy@pizzaluv.com',
            password: '$2a$10$xz0c9mw.93dILe4riz9YXeDz7wLOot57zovPBbf01CEqfCiWXQprS',
            display_name: 'PizzaGurl',
            dietary_preference: ['gluten'],
            favorite_pizza_toppings: 'Pepperoni',
            display_location: 'Salt Lake City',
            bio: "Pineapple was made for pizza",
            favorite_pizza_shop: 2
          },
          {
            username: 'JDawg',
            email: 'jdawg@pizzaluv.com',
            password: '$2a$10$xz0c9mw.93dILe4riz9YXeDz7wLOot57zovPBbf01CEqfCiWXQprS',
            display_name: 'PizzaGurl',
            dietary_preference: ['gluten'],
            favorite_pizza_toppings: 'Pepperoni',
            display_location: 'Los Angeles',
            bio: "Ask me about my pizza",
            favorite_pizza_shop: 3
          },
          {
            username: 'SteadyFreddie',
            email: 'steadyfreddy@pizzaluv.com',
            password: '$2a$10$xz0c9mw.93dILe4riz9YXeDz7wLOot57zovPBbf01CEqfCiWXQprS',
            display_name: 'PizzaGurl',
            dietary_preference: ['gluten'],
            favorite_pizza_toppings: 'Pepperoni',
            display_location: 'Savannah',
            bio: "Did somebody say pizza?",
            favorite_pizza_shop: 1
          }
          ,          
          {
            username: 'SouthernKat',
            email: 'southernkat@pizzaluv.com',
            password: '$2a$10$xz0c9mw.93dILe4riz9YXeDz7wLOot57zovPBbf01CEqfCiWXQprS',
            display_name: 'PizzaGurl',
            dietary_preference: ['gluten'],
            favorite_pizza_toppings: 'Pepperoni',
            display_location: 'Charlotte',
            bio: "Hold on grasshopper, pizza is coming",
            favorite_pizza_shop: 1
          },
          {
            username: 'AnimeCody',
            email: 'animecody@pizzaluv.com',
            password: '$2a$10$xz0c9mw.93dILe4riz9YXeDz7wLOot57zovPBbf01CEqfCiWXQprS',
            display_name: 'AnimeCody',
            dietary_preference: ['gluten'],
            favorite_pizza_toppings: 'Pepperoni',
            display_location: 'Beaumont',
            bio: "Kingdom Pizza",
            favorite_pizza_shop: 2
          }
      ]);
  };