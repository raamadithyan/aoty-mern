const express = require("express");
const os = require("os");
const { MongoClient } = require("mongodb");

const app = express();
app.set("view engine", "ejs");
app.set("views", "./view");
let db;

app.get("/", async (req, res) => {
	const query = await db.collection("animals").find().toArray();

	// res.send(`<button>${query.map((ani) => ani.name)}</button>`);
	res.render("home");
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
