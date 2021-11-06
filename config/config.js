const express = require('express')
const path = require('path')
const app = express()
const PORT = 3000
require('dotenv').config()
const mongoose = require('mongoose')
const exphbs = require('express-handlebars');
const session = require('express-session');
const flash = require('connect-flash');
const csurf = require('csurf')
const MongoDBStore = require('connect-mongodb-session')(session);
const authMidle = require('../middlewares/auth')
const MONGODB_URI = process.env.DB_HOST
const salt = process.env.SALT
const slug = require('mongoose-slug-generator')
const HandlebarsI18n = require("handlebars-i18n");
HandlebarsI18n.init();
mongoose.plugin(slug)


const i18next = require('i18next');

i18next.init({
	resources : {
        "en" : {
            translation : {
                "phrase1": "What is good?",
                "phrase2": "{{what}} is good."
            }
        },
        "de" : {
            translation: {
                "phrase1": "Was ist gut?",
                "phrase2": "{{what}} ist gut."
           }
        }
    },
    lng : "en"
});



const store = new MongoDBStore(
    {collection: 'session', uri: MONGODB_URI, databaseName: 'sieff'}
)

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(
    session({secret: salt, resave: false, saveUninitialized: false, store: store, cookie: {}})
)

app.use(csurf())
app.use(authMidle)
app.use(flash());
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
const err404 = require('../routes/404.route');

app.use('/', main)
app.use('/about', about)
app.use('/admin', admin)
app.use('/schedule', schedule)
app.use('/admin/addfilm', addFilm)
app.use('/film/', film)
app.use('/auth/', login)
app.use('/', err404)

module.exports.start = start