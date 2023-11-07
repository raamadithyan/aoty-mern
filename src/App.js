import React, { useState, useEffect } from "react";
import AlbumCard from "./AlbumCard";
import Axios from "axios";

function App() {
	const [topalbums, setTopalbums] = useState([]);

	async function getTopAlbums() {
		const response = await Axios.get("http://localhost:3000/api/topalbums");
		setTopalbums(response.data);
	}

	useEffect(() => {
		getTopAlbums();
	}, []);

	return (
		<div style={{ backgroundColor: "pink" }}>
			{topalbums.map((ta) => {
				return <AlbumCard key={ta._id} topalbums={ta} />;
			})}
		</div>
	);
}

export default App;
