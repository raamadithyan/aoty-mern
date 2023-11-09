const express = require("express");
const os = require("os");
const { MongoClient, ObjectId } = require("mongodb");
const sanitizeHTML = require("sanitize-html");

const app = express();
app.set("view engine", "ejs");
app.set("views", "./view");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: "false" }));

let db;

app.get("/", async (req, res) => {
	const query = await db.collection("animals").find().toArray();

	// res.send(`<button>${query.map((ani) => ani.name)}</button>`);
	res.render("home", { query });
});

function passwordProtected(req, res, next) {
	res.set("WWW-Authenticate", "Basic realm='AOTY'");
	if (req.headers.authorization === "Basic YWRtaW46YWRtaW4=") {
		next();
	} else {
		console.log(req.headers.authorization);
		res.status(401).send("Try Again");
	}
}

app.use(passwordProtected);

app.get("/admin", (req, res) => {
	res.render("admin");
});

app.get("/api/topalbums", async (req, res) => {
	const query = await db.collection("topalbums").find().toArray();

	res.json(query);
});

app.post("/addalbum", ourCleanup, async (req, res) => {
	console.log(req.body);
	const info = await db.collection("topalbums").insertOne(req.cleanData);
	const newlyCreatedAlbum = await db
		.collection("topalbums")
		.findOne({ _id: new ObjectId(info.insertedId) });

	res.send(newlyCreatedAlbum);
});

function ourCleanup(req, res, next) {
	if (typeof req.body.album != "string") req.body.album = "";
	if (typeof req.body.artist != "string") req.body.artist = "";
	if (typeof req.body.year != "string") req.body.year = "";
	if (typeof req.body.imageurl != "string") req.body.imageurl = "";

	if (typeof req.body._id != "string") req.body._id = "";

	req.cleanData = {
		album: sanitizeHTML(req.body.album.trim(), {
			allowedTags: [],
			allowedAttributes: {},
		}),
		artist: sanitizeHTML(req.body.artist.trim(), {
			allowedTags: [],
			allowedAttributes: {},
		}),
		year: sanitizeHTML(req.body.year.trim(), {
			allowedTags: [],
			allowedAttributes: {},
		}),
		imageurl: sanitizeHTML(req.body.imageurl.trim(), {
			allowedTags: [],
			allowedAttributes: {},
		}),
	};

	next();
}

async function start() {
	const client = new MongoClient(
		"mongodb+srv://raamadithyan:raamadithyan@cluster0.r8sszts.mongodb.net/AmazingMernApp?retryWrites=true&w=majority",
	);
	await client.connect();
	db = client.db();
	app.listen(3000);
}

start();
