import express from 'express';
import asyncHandler from 'express-async-handler';
import cors from 'cors';
import { status } from './config/response.status.js';
import { response } from './config/response.js';
import { specs } from './config/swagger.config.js';
import SwaggerUi from 'swagger-ui-express';
// import { BaseError } from './config/error.js';
// import { tempRouter } from './src/routes/temp.route.js';

const app = express();

app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// swagger
app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(specs));

app.use((err, req, res, next) => {
    res.locals.message = err.message;   
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {}; 
    console.log("error", err);
    res.status(err.data.status || status.INTERNAL_SERVER_ERROR).send(response(err.data));
});

// app.use((req, res, next) => {
//     res.locals.message = err.message;
//     res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
//     console.log("error", err);
//     res.status(err.data.status || status.INTERNAL_SERVER_ERROR).send(response(err.data));
// });

app.listen(app.get('port'), () => {
    console.log(`Example app listening on port ${app.get('port')}`)
});

