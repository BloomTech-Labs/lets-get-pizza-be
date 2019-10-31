exports.seed = function(knex, Promise) {
    // Deletes ALL existing entries
    return knex('promotions').del()
    .then(function () {
      // Inserts seed entries
      return knex('promotions').insert([
        {
          Business_id: 1,
          Image: '5',
          Title: 'Cheese Sale!',
          Text: 'Half Price extra cheese!',
          StartDate: '1/2/19',
          EndDate: '1/3/19'
        },
        {
            Business_id: 2,
            Image: '5',
            Title: 'Double Double Time!',
            Text: 'Buy one pizza and pay double for the second!',
            StartDate: '1/3/19',
            EndDate: '2/3/19'
          },
          {
            Business_id: 3,
            Image: '5',
            Title: 'Jailhouse Rock!',
            Text: 'Sing a song for 10 bucks off your order!',
            StartDate: '2/3/19',
            EndDate: '2/3/19'
          }
      ]);
    });
  };