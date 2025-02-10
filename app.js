import session from 'express-session';
import requestIp from 'request-ip';
import express from 'express';
import morgan from 'morgan';

import usersRouter from './routes/user.routes.js';
import adminRouter from './routes/admin.routes.js';
import authRouter from './routes/auth.routes.js';

import './db.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(requestIp.mw());
app.use(morgan('dev'));

app.use(session({
    secret: 'Practica06 FOCA#AbishaiPractica-PersistentSessions',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 5*60*1000}
}))

app.use((req, res,next)=>{
    
    const currentDate = new Date();
    if(req.session){
        if(!req.session.createdAt){
            req.session.createdAt = currentDate;
        }
        req.session.lastAccess = currentDate;
    }
    next();
})

app.use('/user',usersRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);


app.listen(3001, () => {
    console.log('App iniciada en el puerto: 3001');
})