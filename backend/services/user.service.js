const User = require("../models/user.model");

const createUser = async (name, email) => {
  const user = new User({ name, email });
  return await user.save();
};

const updateUser = async (id, updatedData) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    return updatedUser;
  } catch (err) {
    console.log("Error while updateing user: " + err);
    throw err;
  }
};

module.exports = {
  createUser,
  updateUser
};
