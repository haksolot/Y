const { userService } = require("../services");

const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    // console.log(req);
    userService.createUser(name, email);
    res.status(200).json("User succesfully created !");
  } catch (err) {
    res.status(401).json("Error while creating user : " + err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    console.log(req);
    // const id = req.params.id;
    const { id, name, email } = req.body;
    const updated = await userService.updateUser(id, { name, email });
    // const updated = await userService.updateUser(id, req.body);
    if (!updated) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json("User succesfully updated : " + updated);
  } catch (err) {
    res.status(401).json("Error while updating user : " + err);
  }
};

module.exports = {
  createUser,
  updateUser,
};
