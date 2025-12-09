import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import { connectDB } from './utils/db.js';

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use( 
  cors({
    origin: process.env.Allowed_Url,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
)

const port = process.env.PORT || 3001;

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})