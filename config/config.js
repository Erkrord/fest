const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000
const moment = require('moment');
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');
const session = require('express-session');
const csurf = require('csurf')
const MongoDBStore = require('connect-mongodb-session')(session);
const authMidle = require('../middlewares/auth')
const MONGODB_URI = 'mongodb://localhost:27017/sieff'

const store = new MongoDBStore({collection: 'session', uri: MONGODB_URI, databaseName:'sieff'})


app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(
    session({secret: 'keyboard cat', resave: false, saveUninitialized: false, store: store})
)
app.use(csurf())
app.use(authMidle)


// Register `hbs.engine` with the Express app.
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    extends: false,
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}));
app.set('view engine', 'hbs');

//DB Conection
mongoose.set('useCreateIndex', true);
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

async function start() {

    try {
        db.once('open', function () {
            console.log('DB connected')
        });
        app.listen(PORT, () => {
            console.log('listening on port ' + PORT)
        })
    } catch (err) {
        db.on('error', console.error.bind(console, 'connection error:'));
        console.error(err)
    }

}

// ROUTING
const main = require('../routes/main.route');
const about = require('../routes/about.route');
const admin = require('../routes/admin.route');
const addFilm = require('../routes/addfilm.route');
const schedule = require('../routes/schedule.route');
const film = require('../routes/film.route');
const login = require('../routes/login.route');

app.use('/', main)
app.use('/about', about)
app.use('/admin', admin)
app.use('/schedule', schedule)
app.use('/admin/addfilm', addFilm)
app.use('/film/', film)
app.use('/auth/', login)


module.exports.start = start