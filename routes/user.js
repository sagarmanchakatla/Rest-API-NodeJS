const express = require("express");

const {
  handleGetAllUsers,
  handleGetUserById,
  handlePatchUserById,
  handleDeleteUserById,
  handleCreateUser,
} = require("../controllers/user");

const router = express.Router();

router.route("/").get(handleGetAllUsers).post(handleCreateUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .put((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users[index] = { id, ...req.body };
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "Done" });
      });
    } else {
      return res.json({ status: "Error" });
    }
  })
  .patch(handlePatchUserById)
  .delete(handleDeleteUserById);

router.get("/html", async (req, res) => {
  const allDBUsers = await User.find({});
  const html = `
    <ul>
        ${allDBUsers
          .map((user) => `<li>${user.first_name} - ${user.email}</li>`)
          .join(" ")}</ul>
    </ul>
  `;
  return res.send(html);
});

module.exports = router;
