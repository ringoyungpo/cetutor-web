import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'
import mongoose from 'mongoose'
import User from '../models/User'
import { secretOrKey } from './keys'

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = secretOrKey

export default passport => {
  try {
    passport.use(
      new JwtStrategy(opts, async (jwt_payload, done) => {
        const user = await User.findById(jwt_payload.id)
        if (user) return done(null, user)
        return done(null, false)
      }),
    )
  } catch (error) {
    console.log(error)
  }
}
