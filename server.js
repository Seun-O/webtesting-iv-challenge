const express = require("express");
const server = express();
const pg = require("./database");

server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json({ message: "I'm a Server!" });
});

server.get("/api/dbz", async (req, res) => {
  try {
    const data = await pg.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

server.post("/api/dbz", async (req, res) => {
  const char = req.body;
  try {
    const data = await pg.addChar(char);
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

module.exports = server;
