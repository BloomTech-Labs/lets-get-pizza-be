exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('promotions').del()
    .then(function () {
      // Inserts seed entries
      return knex('promotions').insert([
        {
          business_id: 1,
          image: '5',
          title: 'Cheese Sale!',
          text: 'Half Price extra cheese!',
          startDate: '1/2/19',
          endDate: '1/3/19'
        },
        {
            business_id: 2,
            image: '5',
            title: 'Double Double Time!',
            text: 'Buy one pizza and pay double for the second!',
            startDate: '1/3/19',
            endDate: '2/3/19'
          },
          {
            business_id: 3,
            image: '5',
            title: 'Jailhouse Rock!',
            text: 'Sing a song for 10 bucks off your order!',
            startDate: '2/3/19',
            endDate: '2/3/19'
          }
      ]);
    });
  };