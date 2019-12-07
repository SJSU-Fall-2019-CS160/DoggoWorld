const bcrypt = require("bcrypt");
const _ = require("lodash");
const db = require("../modules/database");
const { User, validateUser } = require("../models/User");
const express = require("express");
const router = express.Router();
const tokenGen = require("../modules/authtoken");

/**
 * Register a User:
 * POST Request.
 *  req.body=
 *  {
 *      "first_name": [STRING],
 *      "last_name": [STRING],
 *      "email": [STRING],
 *      "password": [STRING]
 *  }
 * Response.
 * JsonWebToken in header as x-auth-token
 * res.body =
 * {
 *      "id": [NUMBER],
 *      "firstname": [STRING],
 *      "lastname": [STRING]
 * }
 */
router.post("/", async (req, res) => {
  console.log(req.body);
  const { error } = validateUser(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  let user = await User.findOne({ where: { email: req.body.email } });
  if (user) {
    return res.status(400).send("User already registered");
  }
  user = User.build(
    _.pick(req.body, ["first_name", "last_name", "email", "password"])
  );
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  let transaction;
  try {
    transaction = await db.transaction();
    user = await user.save({ transaction });
    await user.createProfile({ bio: "test2" }, { transaction });
    await transaction.commit();
  } catch (err) {
    console.log(err.message);
    if (transaction) await transaction.rollback();
    return res.status(500).send("Could not create account");
  }
  const token = await tokenGen.generateAuthToken(user);
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["id", "first_name", "last_name", "email"]));
});

module.exports = router;
