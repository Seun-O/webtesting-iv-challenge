exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("village")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("village").insert([
        { name: "Goku" },
        { name: "Vegeta" },
        { name: "Krillin" },
        { name: "Picolo" },
        { name: "Trunks" }
      ]);
    });
};
