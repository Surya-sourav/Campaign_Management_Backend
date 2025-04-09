import express from 'express';
import cors from 'cors';
import campaignRoutes from './routes/campaignRoutes';
import messageRoutes from './routes/messageRoutes';

const app = express();

// Middleware
app.use(cors(
  {
      origin : 'https://campaign-management-frontend.vercel.app/ , https://campaign-management-frontend-git-main-surya-souravs-projects.vercel.app/ , https://campaign-management-frontend-dv86b4er0-surya-souravs-projects.vercel.app/'
  }
));
app.use(express.json());

// Routes
app.use('/api/campaigns', campaignRoutes);
app.use('/api/personalized-message', messageRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

export default app;
