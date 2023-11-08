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
		<>
			<div className="flex flex-col items-center gap-8 ">
				<button className="bg-green-500 rounded-sm text-white px-4 py-2 ">
					Add Album
				</button>
				<div className=" flex flex-wrap justify-center gap-12 w-[90%]">
					{topalbums.map((ta) => {
						return <AlbumCard key={ta._id} topalbums={ta} />;
					})}
				</div>
			</div>
		</>
	);
}

export default App;
