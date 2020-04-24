exports.seed = function (knex, Promise) {
  return knex("events").insert([
    {
      user_id: 1,
      location_id: 1,
      title: "Lets Get Pizza!",
      description: "Its dat time boys, pizza!",
      start_time: "1/20/2020",
      end_time: "1/22/2020",
    },
    {
      user_id: 1,
      location_id: 1,
      title: "Nacho Pizza Hunt!",
      description: "Are Nacho pizzas a thing? Lets find out!",
      start_time: "1/20/2020",
      end_time: "1/22/2020",
    },
    {
      user_id: 1,
      location_id: 2,
      title: "The End of Days",
      description:
        "About that time, lets have a slice to celebrate the end of the world.",
      start_time: "1/20/2020",
      end_time: "1/22/2020",
    },
  ]);
};
