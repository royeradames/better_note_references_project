
exports.seed = function(knex) {
      // Inserts seed entries
      return knex('tags').insert([
        {name: 'frontend'},
        {name: 'backend'},
      ]);
};
