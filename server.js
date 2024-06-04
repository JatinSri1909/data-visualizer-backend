const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const dataRoutes = require('./routes/dataRoutes');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', dataRoutes);

const connectDb = async () => {
    await mongoose.connect('mongodb://127.0.0.1:27017/data-visualizer');
    console.log(`Connected to MongoDB with ${mongoose.connection.host}`);
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
      });
};

connectDb();