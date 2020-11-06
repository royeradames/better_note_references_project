
exports.seed = function(knex) {
      // Inserts seed entries
      return knex('table_name').insert([
        {
          name: 'rowValue1',
          url: "",
          tag_name: "",
        },
        {
          name: 'rowValue2',
          url: "",
          tag_name: "",
        },
        {
          name: 'rowValue3',
          url: "",
          tag_name: "",
        }
      ]);
};
