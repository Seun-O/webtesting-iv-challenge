exports.up = async knex => {
  await knex.schema.createTable("village", tbl => {
    tbl.increments("id");
    tbl
      .string("name")
      .unique()
      .notNullable();
  });
};

exports.down = async knex => {
  await knex.schema.dropTable("village");
};
