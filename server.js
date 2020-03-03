import express from 'express';
import cors from 'cors';
import routes from './src/routes/routes';
import database from './src/models/database';


const app = express();

app.use(express.json());
app.use(cors({origin: true}));
app.use(routes);
const PORT = 3001;

database.connectDb().then(() => {
    console.log('database is connected');
    app.listen(PORT, () => {
        console.log(`server is listening on port ${PORT}`)
    })
});
