import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db';
import { validateToken } from './middlewares/validateJWT';
import { createDatabase, createTables } from './config/createDB';

require('dotenv').config()

const app = express();
const port = process.env.SERVER_PORT || 5600;


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));



app.listen(port, async () => {
   console.log(`Server running!! -> http://localhost:${port}/api/welcome`);
   
   const pool = await connectDB();
   await pool?.request().query(createDatabase);
   await pool?.request().query(createTables);
   console.log('Connected to the database!!');

});

app.use('/api/welcome', (req, res) => {
   res.send('Well done! You are connected to the server, now you can return to the frontend app');
});


app.use('/api/auth', require('./routes/auth'));
app.use(validateToken);
app.use('/api/services', require('./routes/services'));
app.use('/api/bookings', require('./routes/bookings'));
app.use('/api/customers', require('./routes/customers'));
