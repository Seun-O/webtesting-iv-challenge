const knex = require("knex");

const config = {
  client: "postgresql",
  connection: {
    database: "webtestiv"
    // user:     'username',
    // password: 'password'
  }
};

const db = knex(config);

function find(id) {
  if (id) {
    return db("village")
      .first()
      .where({ id });
  }
  return db("village");
}

function addChar(char) {
  return db("village")
    .insert(char)
    .returning("*");
}

function delChar(id) {
  return db("village")
    .del()
    .where({ id });
}

// const execute = async () => {
//   try {
//     const data = await find(1);
//     // const data = await addChar({ name: "Trunks" });
//     // const data = await delChar(25);
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// execute();

module.exports = {
  find,
  addChar,
  delChar,
  db
};
