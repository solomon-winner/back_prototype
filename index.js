import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConfig } from './src/config/dbConfig.js';
import {errorHandler} from './src/helpers/errorHandler.js';
import AuthRoutes from './src/routes/authRoute.js';
import bannerCardsRoutes from './src/routes/bannerCardsRoute.js';
import GeneralInforRoutes from './src/routes/generalInfoRoute.js';
import MessageRoutes from './src/routes/messageRoute.js';
import songRoutes from './src/routes/songRoute.js';
import TestimonyRoutes from './src/routes/testimonyRoute.js';
import { specs, swaggerUi } from "./src/config/swaggerConfig.js";

dotenv.config();

const app = express();
const port  = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

dbConfig();

app.get('/',(req,res) => {
    res.send('Welcome to European Union Deforestation Regulation');
})

app.use('/api/authentication', AuthRoutes);
app.use('/api/bannercards', bannerCardsRoutes);
app.use('/api/general', GeneralInforRoutes);
app.use('/api/messages', MessageRoutes);
app.use('/api/songs', songRoutes);
app.use('/api/testimonies',TestimonyRoutes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use(errorHandler);

app.listen(
    port, () => {
        console.log(`Server is running on port ${port}`);
    }
);