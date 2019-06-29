const knex = require("knex");

const config = {
  client: "postgresql",
  connection: {
    database: "webtestiv"
    // user:     'username',
    // password: 'password'
  }
};

const pg = knex(config);

function find(id) {
  if (id) {
    return pg("village").where({ id });
  }
  return pg("village");
}

function addChar(char) {
  return pg("village")
    .insert(char)
    .returning("*");
}

// const execute = async () => {
//   try {
//     // const data = await addChar({ name: "Super Buu" });
//     // const data = await find();
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// execute();

module.exports = {
  find,
  addChar
};
