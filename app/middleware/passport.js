const passport = require('passport');
const passportJwt = require('passport-jwt');
const ExtractJwt = passportJwt.ExtractJwt;
const StrategyJwt = passportJwt.Strategy;
const db = require('../config/database.config');

passport.use(new StrategyJwt({
    secretOrKey: process.env.JWT_SECRET,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }, (payload, done) => {
        try {
            const user = db.users.findOne({ where: { id: payload.id }});
            if(!user) return done(error, false);
            return done(null, payload);
        } catch(error) {
            return done(error, false);
        }
    }) 
);

const requireAdmin = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }
        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }
        if (user.role == 'admin' || user.role == 'TK') {
            req.user = user;  
            return next();
        }
        return res.status(403).json({ message: 'Admin access required.' });
    })(req, res, next);
}

const requireUser = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }
        if (!user) {
            return res.status(401).json({ message: 'User not found.' });
        }
        res.locals.user = user;   
        next();
    })(req, res, next);
}

module.exports = {
    requireAdmin,
    requireUser
}
