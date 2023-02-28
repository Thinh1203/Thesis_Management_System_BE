const express = require('express');
const cors = require('cors');

const db = require('./app/config/database.config');
const dotenv = require('dotenv');
const app = express();
dotenv.config();


const user = require('./app/routes/user.route');
const auth = require('./app/routes/auth.route');
const point = require('./app/routes/pointi.route');

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({ message: 'Well come to my app' });
});

app.use('/api/user', user);
app.use('/api/auth',auth);
app.use('/api/point',point);

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
