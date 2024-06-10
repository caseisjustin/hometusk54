import express from 'express';
import authRoutes from './routers/authRoutes.js';
import debtRoutes from './routers/debtRoutes.js';
import adminRoutes from './routers/adminRoutes.js';
import errorMiddleware from './middlewares/errorMiddleware.js';

const app = express();

app.use(express.json());


app.use('/api/users', authRoutes);
app.use('/api/debts', debtRoutes);
app.use('/api/admin', adminRoutes);

app.use(errorMiddleware);


export default app;