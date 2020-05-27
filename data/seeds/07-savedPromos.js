exports.seed = function (knex) {
  return knex("savedPromos").insert([
    { user_id: 1, promo_id: 2 },
    { user_id: 1, promo_id: 3 },
    { user_id: 2, promo_id: 1 },

    { user_id: 2, promo_id: 3 },
    { user_id: 3, promo_id: 2 },
    { user_id: 4, promo_id: 3 },
    { user_id: 4, promo_id: 2 },
  ]);
};
