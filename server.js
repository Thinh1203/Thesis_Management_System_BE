const express = require('express');
const cors = require('cors');

const db = require('./app/config/database.config');
const dotenv = require('dotenv');
const app = express();
dotenv.config();


const student = require('./app/routes/student.route');
const teacher = require('./app/routes/teacher.route');
const auth = require('./app/routes/auth.route');
const year = require('./app/routes/schoolyear.route');
const theses = require('./app/routes/theses.route');
const topic = require('./app/routes/topic.route');
const role = require('./app/routes/role.route');
const grade = require("./app/routes/gradei.route");
const council = require("./app/routes/council.route");

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Well come to my app' });
});

app.use('/api/student', student);
app.use('/api/teacher', teacher);
app.use('/api/auth',auth);
app.use('/api/role',role);
app.use('/api/schoolYear',year);
app.use('/api/theses',theses);
app.use('/api/topic',topic);
app.use('/api/grade',grade);
app.use('/api/council',council);

db.sequelize.authenticate()
    .then(() => {
        
        console.log('Connection has been established successfully.');
        
        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}.`);
        });
    })
    .catch((err) => {
        console.log('Unable to connect to the database:', err);
    })
