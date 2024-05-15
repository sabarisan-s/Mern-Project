const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("./models/UserModel");
const uploadsMiddleware = multer({ dest: "uploads/" });

const auth = require("./auth");
const PostModel = require("./models/PostModel");
app.use('/uploads',express.static('uploads'))
app.use(cors());
app.use(express.json());

//post /register
app.post("/register", async (req, res) => {
    const { userName, phone, email, password } = req.body;
    try {
        if (!userName || !phone || !email || !password) {
            return res
                .status(400)
                .json({ error: true, message: "Fill * required" });
        }

        const phonePattern = /^[\d]{10}$/;
        if (!phonePattern.test(phone)) {
            return res
                .status(400)
                .json({ error: true, message: "Phone number 10" });
        }

        const checkPhone = await UserModel.findOne({ phone });
        if (checkPhone) {
            return res
                .status(400)
                .json({ error: true, message: "Phone already taken" });
        }

        const emailPattern = /^[\w]+@[\w]+.[\w]+$/;
        if (!emailPattern.test(email)) {
            return res
                .status(400)
                .json({ error: true, message: "Email pattern wrong" });
        }

        const checkEmail = await UserModel.findOne({ email });
        if (checkEmail) {
            return res
                .status(400)
                .json({ error: true, message: "Email already taken" });
        }

        if (password.length <= 8) {
            return res
                .status(400)
                .json({ error: true, message: "Password min 8" });
        }

        const genSalt = await bcryptjs.genSalt(8);
        const hashedPassword = await bcryptjs.hash(password, genSalt);

        const user = await UserModel.create({
            userName,
            email,
            phone,
            password: hashedPassword,
        });
        const token = jwt.sign({ user }, process.env.SECRET_KEY);
        res.status(201).json({
            user,
            token,
            error: false,
            message: "Register successfully!",
        });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
});

//post method /login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res
                .status(400)
                .json({ error: true, message: "Fill * required" });
        }

        const emailPattern = /^[\w]+@[\w]+.[\w]+$/;
        if (!emailPattern.test(email)) {
            return res
                .status(400)
                .json({ error: true, message: "Email pattern wrong" });
        }

        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: true, message: "Not user" });
        }

        const checkPassword = await bcryptjs.compare(password, user.password);
        if (!checkPassword) {
            return res
                .status(400)
                .json({ error: true, message: "Wrong password" });
        }

        const token = jwt.sign({ user }, process.env.SECRET_KEY);
        res.status(201).json({
            user,
            token,
            error: false,
            message: "Login successfully!",
        });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
});

//get method  /user
app.get("/user", auth, async (req, res) => {
    try {
        const { user } = req.user;
        const findUser = await UserModel.findOne({ _id: user._id });
        if (!findUser) {
            return res.status(401).json({ error: true, message: "Not user" });
        }
        res.json({ error: false, user });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
});

// post method  /post
app.post("/post", auth, uploadsMiddleware.single("photo"), async (req, res) => {
    try {
        const { title, description } = req.body;
        const { user } = req.user;

        let newPath;
        if (req.file) {
            const { originalname, path } = req?.file;
            const parts = originalname.split(".");
            const ext = parts[parts.length - 1];
            newPath = path + "." + ext;
            fs.renameSync(path, newPath);
        }

        const checkUser = await UserModel.findOne({ _id: user._id });
        if (!checkUser) {
            return res
                .status(403)
                .json({ error: true, message: "Not authorized user" });
        }

        const post = await PostModel.create({
            title,
            description,
            photo: newPath ? newPath : null,
            author: user._id,
        });
        res.status(201).json({ post, error: false, message: "Post Created!" });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
});

// get method /post/:id
app.get("/post/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const post = await PostModel.find({ _id: id })
            .populate("author", ["userName"])
            .sort({ createdAt: -1 })
            .limit(20);
        res.json({ post, error: false });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
});

// get method /post
app.get("/post", async (req, res) => {
    try {
        const post = await PostModel.find({})
            .populate("author", ["userName"])
            .sort({ createdAt: -1 })
            .limit(20);
        res.json({ post, error: false });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
});

// put method /post/:id
app.put("/post/:id", auth, async (req, res) => {
    try {
        const { title, description } = req.body;
        const { user } = req.user;
        const { id } = req.params;

        let newPath;
        if (req.file) {
            const { originalname, path } = req?.file;
            const parts = originalname.split(".");
            const ext = parts[parts.length - 1];
            newPath = path + "." + ext;
            fs.renameSync(path, newPath);
        }

        const checkUser = await UserModel.findOne({ _id: user._id });
        if (!checkUser) {
            return res
                .status(403)
                .json({ error: true, message: "Not authorized user" });
        }

        const post = await PostModel.findOne({ _id: id, author: user._id });

        await post.updateOne({
            title,
            description,
            photo: newPath ? newPath : post.photo,
            author: user._id,
        });
        console.log(post);

        res.status(200).json({
            post,
            error: false,
            message: "Updated successfully!",
        });
    } catch (error) {
        res.status(500).json({ error: true, message: "Internal server error" });
    }
});

mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("connected"))
    .catch((e) => console.log(e.message, "not connected"));

app.listen(8000, (e) => {
    if (e) {
        console.log("not server running", e.message);
    }
    console.log("server running");
});
