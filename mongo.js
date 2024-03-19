const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// Replace with your MongoDB Atlas connection string
const dbURI = 'mongodb+srv://cryjapan001:KLAYLH6oDdiTSi59@cluster0.pnrkilh.mongodb.net/';

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

app.use(bodyParser.json());

// Define a simple schema for our collection
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// Create a model from the schema
const User = mongoose.model('User', UserSchema);

// Define routes for our REST API
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post('/users', async (req, res) => {
  const newUser = new User(req.body);
  const savedUser = await newUser.save();
  res.json(savedUser);
});

app.get('/users/:id', async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});

app.put('/users/:id', async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(user);
});

app.delete('/users/:id', async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  res.json(user);
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));