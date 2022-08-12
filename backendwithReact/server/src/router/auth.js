const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
router.use(express.json());
const User = require("../model/userSchema");
router.get('/', (req, res) => {
    res.send("hello from router");
});
router.post('/', (req, res) => {
    res.json({ message: req.body })
});
router.post("/signup", async (req, res) => {
    console.log("hello ytsh")
    const { name, email, password, phone } = req.body;
    let token;
    try {
        if (!name || !email || !password || !phone) {
            return res.status(422).json({
                error: "please filled all field",
                status: 422
            });

        };
        const userExist = await User.findOne({ email: email });


        if (userExist) {
            return res.status(422).json({
                error: "Email already exist",
                status: 422
            });
        };
        // generating token
        //  tokens=jwt.sign({email:email},process.env.PRIVATE_KEY);


        const user = new User({ name, email, password, phone });
        // const checkEmail = await User.findOne({ email: email });



        await user.save();
        res.status(201).json({
            message: "user is successfully registered",
            status: 201
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "user is not registred", status: 500 });
    }

    // const salt=await bcrypt.genSalt(4);

    // const hashPassword=await bcrypt.hash(req.body.password, salt);
    // console.log(salt);
    // console.log(hashPassword);
});
router.post("/login", async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(422).json({ message: "please filled all field", status: 422 })
        };
        const checkEmail = await User.findOne({ email: email });
        if (!checkEmail) {
            return res.status(400).json({ message: 'invalid Credential', status: 400 });
        };
        const tokens = await checkEmail.generateAuthToken();
        if (!tokens) {
            return res.json({ message: 'something went wrong Please try again ', status: 400 })
        }
        // console.log(tokens);
        res.cookie("woken", tokens)
        const passwordChecker = await bcrypt.compare(password, checkEmail.password);
        if (!passwordChecker) {
            return res.status(400).json({ message: 'invalid Credential ', status: 400 })
        };


        if (passwordChecker) {
            return res.status(200).json({ message: "user is successfully login", status: 200 })
        }
        // if (password !== checkEmail.password) {
        //     return res.status(400).json({ message: 'email or password wrong' })
        // }
        // if (password == checkEmail.password) {
        //     return res.status(200).json({ message: "user is successfully login" })
        // };

    } catch (error) {
        res.status(500).json({ message: 'user in not login', status: 500 });
        console.log(error);
    }
});
router.get('/about', authenticate, async (req, res) => {

    res.send(req.rootUser)


});
router.get('/contact', authenticate, (req, res) => {
    res.send(req.rootUser)
})
module.exports = router;