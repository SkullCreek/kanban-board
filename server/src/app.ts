import express from 'express';
import auth from './auth/auth'
import passport from 'passport';
import expressSession from 'express-session'
import { connectToMongoose } from './database/database';
import kanban from './kanban/kanban';


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(expressSession({secret: "secret", resave: false, saveUninitialized: false}))
app.use(passport.initialize())
app.use(passport.session())
connectToMongoose()

app.use('/api/auth', auth)
app.use('/api/kanban', kanban)


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`listening on port http://localhost${port}...`);
})