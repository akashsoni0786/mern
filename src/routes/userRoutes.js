const express = require('express');

const {
  createUser,
  getUsers,
  getUserbyId,
  updateUser,
  deleteUser,
} = require("../controllers/userController");


const router = express.Router();

router.post('/', createUser);
router.get("/", getUsers);
router.get("/:id", getUserbyId);
router.get("/:id", updateUser);
router.get("/:id", deleteUser);
module.exports = router;