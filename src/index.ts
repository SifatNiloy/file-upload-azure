import express from 'express';
import dotenv from 'dotenv';
import fileRoutes from './routes/file.routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use('/api/files', fileRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
