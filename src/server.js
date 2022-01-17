import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import controller from '../controller/controller';

const app = express();
const PORT = 3000;

// mongoose.connect('mongodb://localhost/devices', { useNewUrlParser: true});
mongoose.connect('mongodb://mongo:27017/devices', { useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to database'));

app.use(cors());
app.use(express.json());
app.use('/devices', controller);

app.listen(PORT, () => {
    console.log(`Server is running at PORT http://localhost:${PORT}`);
});