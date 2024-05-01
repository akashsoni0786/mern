const UserModel = require("../modules/userModule");
const { createFactory, getFactory } = require("../utils/crudFactory");

const createUser = createFactory(UserModel);
const getUsers = getFactory(UserModel);

const getUserbyId = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await UserModel.findById(id);
    if (!user) {
      res.status(400).json({
        status: "failure",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Users data found!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      res.status(400).json({
        status: "failure",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User data deleted successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    let user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      res.status(400).json({
        status: "failure",
      });
    }
    res.status(200).json({
      status: "success",
      message: "User data deleted successfully!",
      data: user,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserbyId,
  updateUser,
  deleteUser,
};
