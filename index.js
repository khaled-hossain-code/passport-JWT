const express = require('express'),
      app = express(),
      bodyParser = require('body-parser');

const passport = require('passport');
const {Strategy: jwtStrategy, ExtractJwt} = require('passport-jwt');
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: 'secret',
    algorithms:['HS256']
};

const widgetRouter = require('./routes/widgetRoutes');

passport.use(new jwtStrategy(jwtOptions, (jwtPayload, done)=>{
    done(null , {name: jwtPayload.name});
}));

app.use(passport.authenticate('jwt',{session:false}));
app.use('/api', bodyParser.json());
app.use('/api', widgetRouter);

app.listen(3000, ()=>{
    console.log('Server is listing on port 3000');
})