import { Strategy as LocalStrategy } from 'passport-local';
import { User } from '../database/database'
export const initializePassport = (passport: any) => {
    passport.use(new LocalStrategy(async (username, password, done)=>{

        try {
            const user = await User.findOne({username})
            if(!user) return done(null, false)

            if(user.password !== password) return done(null, false)

            return done(null, user)
        } catch (error) {
            return done(error, false)
        }
        
    }))

    passport.serializeUser((user: any, done: any) => {
        done(null, user.id)
    })

    passport.deserializeUser(async (id:any, done: any)=>{
        try {
            const user = await User.findById(id)
            done(null, user)
        } catch (error) {
            done(error, false)
        }
    })
}

export const isAuthorized = (req: any, res: any, next: any) => {
    if(req.user ) return next()
    return res.status(401).send('Unauthorized')
}