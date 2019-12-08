const bcrypt = require("bcrypt");
const _ = require("lodash");
const db = require("../modules/database");
const { User, validateUser } = require("../models/User");
const { Profile, validateProfile } = require("../models/Profile");
const { Chat } = require("../models/Chat");
const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const tokenGen = require("../modules/authtoken");
const { alertNewChat } = require("../modules/socketHandler");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

/**
 * Get user's own information
 * GET request.
 * Provide JWT token
 * Response
 * {
 *      "id": [number],
 *      "first_name": [string],
 *      "last_name": [string],
 *      "email": [string],
 *      "profile": {
 *          "img_path": [string],
 *          "bio": [string],
 *          "userId": [number]
 *      }
 * }
 * */
router.get("/profile", auth, async (req, res) => {
  const user = await User.findByPk(req.user.id, {
    attributes: { exclude: ["password"] },
    include: [Profile]
  });
  res.send(user);
});

/**
 * Update user's own profile
 * POST request.
 * Provide JWT token
 * req.body (optional fields)=
 * {
 *      "img_path" : [STRING],
 *      "bio" : [STRING]
 * }
 * */
router.post("/profile", auth, async (req, res) => {
  const { error } = validateProfile(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const profile = await Profile.findOne({
    where: { user_id: req.user.id }
  });
  if (req.body.img_path) {
    profile.img_path = req.body.img_path;
  }
  if (req.body.bio) {
    profile.bio = req.body.bio;
  }
  await profile.save();
  res.status(200).send("Updated profile");
});

/**
 * Get another user's information
 * GET request.
 * Response
 * {
 *      "id": [number],
 *      "first_name": [string],
 *      "last_name": [string],
 *      "email": [string],
 *      "profile": {
 *          "img_path": [string],
 *          "bio": [string],
 *          "userId": [number]
 *      }
 * }
 * */
router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["password"] },
    include: [Profile]
  });
  if (!user) {
    return res.status(404).send("user not found");
  }
  res.send(user);
});

/**
 * Initiate Chat request with another user.
 * POST request.
 * Provide JWT token.
 * Will automatically alert chatbox to update if user is online
 * */
router.post("/:id/chat", auth, async (req, res) => {
  const otherUser = await User.findByPk(req.params.id);
  if (!otherUser) {
    return res.status(404).send("user not found");
  }
  const [chat, isCreated] = await Chat.findOrCreate({
    where: {
      [Op.or]: [
        { user1_id: req.user.id, user2_id: req.params.id },
        { user2_id: req.user.id, user1_id: req.params.id }
      ]
    },
    defaults: {
      user1_id: req.user.id,
      user2_id: req.params.id
    }
  });
  if (isCreated) {
    alertNewChat(req.user.id, chat.id, otherUser.first_name);
    alertNewChat(otherUser.id, chat.id, req.user.first_name);
    res.send(`Chat established with ${otherUser.first_name}`);
  } else {
    res.send("Chat already exists");
  }
});

module.exports = router;
