const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const compression = require('compression');
const path = require('path');
const session = require('express-session');
const MemoryStore = require('memorystore')(session); 

app.use(bodyParser.urlencoded({extended: false}));
app.use(compression());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join('C:\\newTodoList\\upload\\profile_thums\\')));

const maxAge = 60 * 60 * 30;
const sessionObj = {
    secret: 'green$%^&',
    resave: false,
    saveUninitialized: true,
    store: new MemoryStore({ checkPeriod: maxAge }),
    cookie: {
        maxAge: maxAge,
    },
};
app.use(session(sessionObj));

app.set('view engine', 'ejs');
app.set('views', './view/');

// 라우팅
app.get('/', (req, res) => {
    console.log('/');
    res.redirect('/home');

});

// 라우터 설정
const homeRouter = require('./routes/homeRouter');
const memberRouter = require('./routes/memberRouter');
const todoRouter = require('./routes/todoRouter');
app.use('/home', homeRouter);
app.use('/member', memberRouter);
app.use('/todo', todoRouter);

app.listen(3000);