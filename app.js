const express = require('express');
const notFoundMiddleware = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');
const connectDB = require('./db/connect');
require('dotenv').config();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ message: "Welcome to the API" });
});

/* app.use(notFoundMiddleware);
app.use(errorMiddleware); */

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(process.env.PORT || 5000, () => {
            console.log(`Server is running on port ${process.env.PORT || 5000}`);
        });
    } catch (err) {
        console.error(err);
    }
}

start();