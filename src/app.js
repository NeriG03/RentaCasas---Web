import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import routes from '../routes/index.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 4000;


app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Raiz de mi renta de casas');
});


routes(app);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

