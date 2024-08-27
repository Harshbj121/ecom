const app = require("express");
const router = app.Router();
const bcryptjs = require("bcryptjs");
const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "harsh001"


// to register new user
router.post("/register", async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ error: "One or more field missing" });
    }
    const existisingUser = await UserModel.findOne({ email: email });

    if (existisingUser) {
        return res
            .status(500)
            .json({ error: "User With this email already exist" });
    }

    try {
        const user = new UserModel({
            firstname,
            lastname,
            email,
            password,
        });
        user.password = await bcryptjs.hash(password, 10);
        const savedUser = await user.save();
        res.status(201).json({
            result: "User Signed up Successfully",
            // User: { token: tokenGenerator(savedUser._id) },
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({ result: "Something went wrong" });
    }
});

// to login 
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "One or more field missing" });
    }
    try {
        const userInDb = await UserModel.findOne({ email: email });
        if (!userInDb) {
            return res.status(401).json({ error: "No user Found" });
        }
        bcryptjs.compare(password, userInDb.password)
            .then((didMatch) => {
                if (didMatch) {
                    const jwtToken = jwt.sign({ _id: userInDb._id }, JWT_SECRET);
                    const userInfo = { "_id": userInDb._id, "email": userInDb.email, "firstname": userInDb.firstname , "lastname":userInDb.lastname };
                    res.status(200).json({ result: { token: jwtToken, user: userInfo } });
                } else {
                    return res.status(401).json({ error: "Invalid Credentials" });
                }
            }).catch((err) => {
                console.log(err);
            })
    } catch (error) {
        console.log(error);
    }
}
);



// to update user profile info
router.put('/profile/:id', async (req, res) => {
    const { fullname, dob } = req.body;
    const userId = req.params.id;
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(userId, {
            fullname,
            dob,
        }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        console.log(updatedUser)
        return res.status(200).json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});


module.exports = router;
