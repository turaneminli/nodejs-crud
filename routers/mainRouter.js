const router = require("express").Router();
const postsController = require("../controllers/posts");
const authController = require("../controllers/auth");
const isAuth = require("../middleware/isAuth");
const { addUserId } = require("../controllers/posts");

router.get("/", postsController.getAllPosts);
router.post("/post", isAuth, addUserId, postsController.createPost);
router.patch("/post/:id", isAuth, postsController.updatePost);
router.delete("/post/:id", isAuth, postsController.deletePost);
router.get("/post/:id", postsController.getPost);

router.put("/signup", authController.signup);
router.get("/user/:id", authController.getUser);
router.post("/login", authController.login);

module.exports = router;
