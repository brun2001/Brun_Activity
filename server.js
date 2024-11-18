const express = require("express"); // to import the express package
const app = express(); // to create an express application
require("dotenv").config(); // to import the dotenv package

app.use(express.json()); // to parse the incoming requests with JSON payloads

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
}); // to start the server

// sample data
let mockData = [
  { id: 1, name: "Product A", price: 10 },
  { id: 2, name: "Product B", price: 20 },
  { id: 3, name: "Product C", price: 30 },
];

// GET /items: Fetch and display all items in mockData
app.get("/items", (req, res) => {
  res.json(mockData); // to send the mockData array as a response
});

// GET /items/:id: Retrieve a specific item by id from mockData
app.get("/items/:id", (req, res) => {
  const item = mockData.find((i) => i.id === parseInt(req.params.id)); // to find the item by id
  if (!item) return res.status(404).json({ message: "Item not found" }); // to send a 404 status code and a message if the item is not found
  res.json(item); // to send the item as a response
});

// POST /items: Add a new item to mockData
app.post("/items", (req, res) => {
  const { name, price } = req.body; // to get the name and price from the request body
  const newItem = { id: mockData.length + 1, name, price }; // to create a new item object
  mockData.push(newItem); // to add the new item to the mockData array
  res.status(201).json(newItem); // to send the new item as a response
});

// PUT /items/:id: Update an existing item in mockData
app.put("/items/:id", (req, res) => {
  const item = mockData.find((i) => i.id === parseInt(req.params.id)); // to find the item by id
  if (!item) return res.status(404).json({ message: "Item not found" }); // to send a 404 status code and a message if the item is not found

  const { name, price } = req.body; // to get the name and price from the request body
  item.name = name; // to update the name of the item
  item.price = price; // to update the price of the item
  res.json(item); // to send the updated item as a response
});

// DELETE /items/:id: Remove an item from mockData by id
app.delete("/items/:id", (req, res) => {
  const index = mockData.findIndex((i) => i.id === parseInt(req.params.id)); // to find the index of the item by id
  if (index === -1) return res.status(404).json({ message: "Item not found" }); // to send a 404 status code and a message if the item is not found

  mockData.splice(index, 1); // to delete the item from the mockData array
  res.status(204).send(); // to send a 204 status code
});
