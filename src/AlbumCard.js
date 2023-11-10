import Axios from "axios";
import React, { memo } from "react";

function AlbumCard({ topalbums, setTopAlbums, id }) {
	async function handleDelete() {
		const deleteData = Axios.delete(`/addalbum/${id}`);
		setTopAlbums((prev) => prev.filter((album) => album._id != id));
	}
	return (
		<section className=" overflow-hidden p-4 bg-neutral-900 h-[324px] w-[200px]    ">
			<div className="h-[168px]">
				<img
					className="w-[168px] h-[168px] object-cover"
					height={200}
					width={200}
					src={topalbums.imageurl}
					alt=""
				/>
			</div>
			<div className="text-white bg-neutral-900 mt-2">
				<header className="overflow-hidden whitespace-nowrap text-ellipsis font-bold">
					{topalbums.album}
				</header>
				<p className="">{topalbums.artist}</p>
				<p className="text-neutral-400">{topalbums.year}</p>
			</div>
			<div className="flex gap-4 bg-neutral-900  pt-2 text-sm font-semibold text-white w-[100%]">
				<button className="px-4 py-2 bg-pink-600 hover:bg-pink-400 rounded-sm w-[100%]">
					Edit
				</button>
				<button
					onClick={handleDelete}
					className="px-4 py-2 bg-red-600 hover:bg-red-400 rounded-sm w-[100%]"
				>
					Delete
				</button>
			</div>
		</section>
	);
}

export default memo(AlbumCard);
