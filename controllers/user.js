const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDBUsers = await User.find({});
  return res.json(allDBUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  return res.json(user);
}

async function handlePatchUserById(req, res) {
  await User.findByIdAndUpdate(req.params.id, {
    ...req.body,
  });
  return res.json({ status: "Done" });
}

async function handleDeleteUserById(req, res) {
  await User.findByIdAndDelete(req.params.id);
  return res.json({ status: "Done" });
}

async function handleCreateUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.email ||
    !body.last_name ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  // users.push({ id: users.length + 1, ...body });
  // fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
  //   return res.status(201).json({ status: "done" });
  // });

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    job_title: body.job_title,
    gender: body.gender,
  });
  console.log("Result :", result);

  return res.status(201).json({ status: "done", id: result._id });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handlePatchUserById,
  handleDeleteUserById,
  handleCreateUser,
};
