import express from "express";
import * as dotenv from 'dotenv';
import cors from 'cors';

import dalleeRoutes from './routes/dalle.routes.js'

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello from DALL E'});
})

app.use('/api/v1/dalle', dalleeRoutes);

app.listen(3000, () => console.log('Server has started on port 3000'));