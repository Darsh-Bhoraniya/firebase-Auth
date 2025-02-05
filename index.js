import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from './routes/userRoutes.js';
dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))

app.use('/uploads', express.static('uploads'));

app.use(routes);
app.listen(process.env.PORT, () => {
    console.log(`Server  is running on port ${process.env.PORT}`);
});