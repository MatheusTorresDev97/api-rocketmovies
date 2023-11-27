const { Router } = require("express");
const routes = Router();

const UsersController = require("../controllers/UsersControllers");
const usersController = new UsersController();
const UsersAvatarController = require("../controllers/UsersAvatarControllers");
const usersAvatarController = new UsersAvatarController();

const ensureAuthenticated = require("../middlewares/ensureAuthenticated");

const multer = require("multer");
const uploadConfigs = require("../configs/upload");
const upload = multer(uploadConfigs.MULTER);

routes
  .post("/", usersController.create)
  .put("/", ensureAuthenticated, usersController.update)
  .patch(
    "/avatar",
    ensureAuthenticated,
    upload.single("avatar"),
    usersAvatarController.update
  );

module.exports = routes;
