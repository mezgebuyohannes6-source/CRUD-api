import express from 'express';
import taskRoutes from './routes/taskRoutes';


const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: "API is alive" });
});

app.use('/tasks', taskRoutes);


app.listen(3000, () => console.log('Server running on port 3000'));