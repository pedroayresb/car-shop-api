import express from 'express';
import CarRouter from './Routes/Car.routes';
import MotorcycleRouter from './Routes/Motorcycle.routes';
import ErrorHandler from './Middlewares/ErrorHandler';

const app = express();
app.use(express.json());
app.use('/cars', CarRouter);
app.use('/motorcycles', MotorcycleRouter);
app.use(ErrorHandler.handle);

export default app;
