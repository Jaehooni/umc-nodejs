import express from 'express';
import { status } from './config/response.status.js';
import { BaseError } from './config/error.js';
import { tempRouter } from './src/routes/temp.route.js';
import { response } from './config/response.js';

const app = express();
const port = 3000;

app.use('/temp', tempRouter);

app.use((req, res, next) => {
    const err = new BaseError(status.BAD_REQUEST);
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;   
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; 
    res.status(err.data.status).send(response(err.data));
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

