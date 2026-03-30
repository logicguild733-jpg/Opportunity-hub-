import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import leadsRouter from './routes/leads';

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Dummy auth middleware
app.use((req, res, next) => {
  // For testing, assign default user
  req.user = {
    id: 'test-user-1',
    email: 'logicguild733@gmail.com',
    skills: ['teacher'],
    plan: 'basic'
  };
  next();
});

// Routes
app.use('/api/leads', leadsRouter);

// Default route
app.get('/', (req, res) => res.send('API Server running'));

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
