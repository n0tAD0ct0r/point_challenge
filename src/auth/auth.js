const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const UserModel = require('../model/user');

const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

passport.use(
    new JWTstrategy(
        {
            secretOrKey: 'TOP_SECRET',
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken('Authorization')
        },
        async (token, done) => {
            try {
                return done(null, token.username);
            } catch (error) {
                done(error);
            }
        }
    )
);


passport.use(
    'signup',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true
        },
        async ({ body }, username, password, done) => {
            try {
                const exists = await UserModel.findOne({ username: username.toLowerCase() })

                if (exists) {
                    return done("user already exists")
                }

                const user = await UserModel.create({ ...body, username, password });

                return done(null, user);
            } catch (error) {
                done(error);
            }
        }
    )
);

passport.use(
    'login',
    new localStrategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        },
        async (username, password, done) => {
            try {
                const user = await UserModel.findOne({ username: username.toLowerCase() }, { _id: false });

                if (!user) {
                    return done(null, false, { message: 'User not found' });
                }

                const validate = await user.isValidPassword(password);

                if (!validate) {
                    return done(null, false, { message: 'Wrong Password' });
                }

                return done(null, user, { message: 'Logged in Successfully' });
            } catch (error) {
                return done(error);
            }
        }
    )
);

