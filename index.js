import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { config } from 'dotenv';
config();

const app = express();

// Middleware
app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({limit: '1mb', extended: true}));
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.send(`Server listening on port ${port}`);
});

// Register the routes
app.use("/api/lesson", lessonRoute);
app.use("/api/courese", courseRoute);


// Start server
const port = process.env.PORT
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});