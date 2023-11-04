const express = require("express");
const os = require("os");
const { MongoClient } = require("mongodb");

const app = express();
let db;

app.get("/", async (req, res) => {
	const query = await db.collection("test").find().toArray();

	res.send(query);
});

async function start() {
	const client = new MongoClient(
		"mongodb+srv://raamadithyan:raamadithyan@cluster0.r8sszts.mongodb.net/AmazingMernApp?retryWrites=true&w=majority",
	);
	await client.connect();
	db = client.db();
	app.listen(3000);
}

start();
