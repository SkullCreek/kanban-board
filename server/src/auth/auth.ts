import express from 'express';
import { User } from '../database/database'
import passport from 'passport'
import { initializePassport } from './passportConfig'


const router = express.Router()

initializePassport(passport)
router.post('/register', async (req, res) => {
    const user = await User.findOne({ username: req.body.username })
    if(user) return res.status(409).send("User already exists")
    const newUser = await User.create(req.body)
    res.status(201).send(newUser)
})

router.post('/login', passport.authenticate("local"), (req, res) => {
    res.status(200).send(req.user)
})

router.post('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).send("Error during logout");
        }
        return res.status(200).send("Logged out successfully");
    });
    res.status(200).send("Logged out successfully");
});

export default router