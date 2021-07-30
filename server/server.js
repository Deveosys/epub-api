"use strict";

const express = require("express");
const cors = require("cors");

// Constants
const PORT = 8080;
const HOST = "0.0.0.0";

const books = [
	{
		id: 0,
		name: "Le nom du vent"
	},
	{
		id: 1,
		name: "Sous Off'"
	}
];

// App
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("./statics"));

app.get("/books", (req, res) => {
	res.status(200).json(books);
});

app.get("/books/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const book = books.find(book => book.id === id);
	res.status(200).json(book);
});

app.get("/books/:id/download", (req, res) => {
	const id = parseInt(req.params.id);
	const file = __dirname + "/statics/epub/" + id + ".epub";
	res.status(200).download(file); // Set disposition and send it.
});

app.post("/book", (req, res) => {
	books.push(req.body);
	res.status(200).json(books);
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
