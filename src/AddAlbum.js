import Axios from "axios";
// const axios = require("axios");
import React, { useState, useRef } from "react";

function AddAlbum({ setOpenmodal, setTopAlbums }) {
	const [album, setAlbum] = useState("");
	const [artist, setArtist] = useState("");
	const [year, setYear] = useState("");
	const [imageurl, setImageurl] = useState("");

	async function submitHandler(e) {
		e.preventDefault();

		const data = new FormData();

		data.append("album", album);
		data.append("artist", artist);
		data.append("year", year);
		data.append("imageurl", imageurl);
		setAlbum("");
		setArtist("");
		setYear("");
		setImageurl("");
		if (album && artist && year && imageurl !== "") setOpenmodal(false);
		else return;

		console.log(data);
		const newData = await Axios.post(
			"http://localhost:3000/addalbum",
			data,
			{
				headers: { "Content-Type": "application/json" },
			},
		);
		// setTopAlbums((prev) => prev.concat([newData.data]));
		setTopAlbums((prev) => [...prev, newData.data]);
	}
	return (
		<div
			onKeyDown={(e) => {
				if (e.key !== "Escape") return;
				setOpenmodal(false);
			}}
			className="flex justify-center items-center absolute top-0  modal  w-[100vw] h-[100vh] overflow-hidden "
		>
			<div className="border-2 px-12 pt-16 pb-8 bg-black relative ">
				<span
					onClick={() => {
						setOpenmodal(false);
					}}
					className="text-white absolute top-6 left-6 scale-150 cursor-pointer"
				>
					X
				</span>
				<form
					onSubmit={submitHandler}
					className=" [&>div>input]:w-[280px] [&>div>input]:rounded-sm [&>div>input]:text-black [&>div]:flex [&>div]:justify-end flex flex-col  gap-4 text-white"
					action=""
				>
					<div>
						<label htmlFor="">Album</label>
						<input
							onChange={(e) => setAlbum(e.target.value)}
							value={album}
							className=""
							type="text"
						/>
					</div>

					<div>
						<label htmlFor="">Artist</label>
						<input
							onChange={(e) => setArtist(e.target.value)}
							value={artist}
							type="text"
						/>
					</div>

					<div>
						<label htmlFor="">Year</label>
						<input
							onChange={(e) => setYear(e.target.value)}
							value={year}
							type="text"
						/>
					</div>

					<div>
						<label htmlFor="">ImageURL</label>
						<input
							type="url"
							onChange={(e) => setImageurl(e.target.value)}
							value={imageurl}
						/>
					</div>
					<button className="bg-neutral-800  px-4 py-2 mt-4">
						Submit
					</button>
				</form>
			</div>
		</div>
	);
}

export default AddAlbum;
