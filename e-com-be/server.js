const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ProductRoutes = require('./Routes/products.routes')
const UserRoutes = require('./Routes/user.routes')
const cors = require('cors')
const path = require('path');


app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/e-com');

mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error) => {
    console.error("Error connecting to MongoDB:", error);
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api", ProductRoutes);
app.use("/auth", UserRoutes);


app.listen(5000, () => {
    console.log("Server running on port 5000")
})