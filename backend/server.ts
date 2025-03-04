import express from 'express';
import * as passport from 'passport';
import configDotenv from './src/config/dotenv';
// import cors from 'cors';
import routes from './src/routes/routes';
import configAuth from "./src/middlewares/checkAuth";

configAuth();
configDotenv();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(passport.initialize());
app.use(express.urlencoded({ extended: true }));
//app.use(cors());
app.use(routes);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
console.log(`${process.env.APP_NAME} app listening at http://localhost:${port}`);
});

