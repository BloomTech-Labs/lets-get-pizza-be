exports.seed = function(knex, Promise) {
      return knex('promotions').insert([
        {
          location_id: 1,
          title: 'Cheese Sale!',
          text: 'Half Price extra cheese!',
          start_date: '1/2/2020',
          end_date: '1/3/2020'
        },
        {
          location_id: 2,
            title: 'Double Double Time!',
            text: 'Buy one pizza and pay double for the second!',
            start_date: '1/3/2020',
            end_date: '2/3/2020'
          },
          {
            location_id: 3,
            title: 'Jailhouse Rock!',
            text: 'Sing a song for 10 bucks off your order!',
            start_date: '2/3/2020',
            end_date: '2/3/2020'
          }
      ]);
  };