exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('locations').del()
    .then(function () {
      // Inserts seed entries
      return knex('locations').insert([
        {
          Username: 'pizzahut',
          Email: 'billy@pizzahut.com',
          Password: 'pizza1',
          First_Name: 'Azzip',
          Last_Name: 'Tuh',
          Foursquare_id: '12',
          Business_name: 'Pizza Hut',
          Latitude: '12',
          Longitude: '13',
          Address: '123 pizza lane',
          Website_url: 'www.pizzahut.com',
          Official_description: 'The Hutt of Pizza',
          Thumbnail_url: 'pizzahut.com/1.jpg',
          Street_view_image: 'google.com/1.jpg',
          Order_service: 'Doordash',
          Store_bio: 'We made this place and that place makes pizza',
          Dietary_offerings: ['vegan']
        },
        {
            Username: 'dominoes',
            Email: 'betty@dominoes.com',
            Password: 'pizza1',
            First_Name: 'Noes',
            Last_Name: 'Dom',
            Foursquare_id: '13',
            Business_name: 'Dominoes Pizza',
            Latitude: '14',
            Longitude: '15',
            Address: '13 pizza rd',
            Website_url: 'www.dominoes.com',
            Official_description: 'The Old Boardgame of Pizza',
            Thumbnail_url: 'dominoes.com/1.jpg',
            Street_view_image: 'google.com/2.jpg',
            Order_service: 'We Deliver!',
            Store_bio: 'Theres pizza here and you can eat some',
            Dietary_offerings: ['Even the cheese is meat']
          },
          {
            Username: 'bigpapa',
            Email: 'jacob@papajohns.com',
            Password: 'pizza1',
            First_Name: 'Papa',
            Last_Name: 'John',
            Foursquare_id: '12',
            Business_name: 'Papa Johns',
            Latitude: '20',
            Longitude: '30',
            Address: '30 pizza st',
            Website_url: 'www.papajohns.com',
            Official_description: 'The Papa of Pizza',
            Thumbnail_url: 'papajohns.com/1.jpg',
            Street_view_image: 'google.com/3.jpg',
            Order_service: 'Waitr',
            Store_bio: 'We said some racist stuff but we still got some pizza here',
            Dietary_offerings: ['vegetarian']
          }
      ]);
    });
  };