import cors from 'cors';
import express from 'express';
import setupSwagger from './swagger';
import { Laborer } from './models/laborer';
import initializeLaborers from './models/seed';
import laborerRoutes from './routes/laborerRoutes';
import path from 'path';

const app = express();
const port = 3000;

app.use(cors({
  origin: 'http://localhost:5173', 
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

app.use(express.json());

app.use('/api', laborerRoutes);
app.use('/assets', express.static(path.join(__dirname, 'assets')));
setupSwagger(app);

const startServer = async () => {
  try {
    await Laborer.sync({ force: true });

    await initializeLaborers();

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error during initialization:', error);
  }
};

startServer();