import React from "react";

function AlbumCard({ topalbums }) {
	return (
		<section className="[&>*]:border-[1px] [&>*]:border-red-500 overflow-hidden px-4 bg-neutral-800 h-fit   ">
			<div className=" ">
				<img
					className=""
					height={300}
					width={300}
					src={topalbums.imageurl}
					alt=""
				/>
			</div>
			<div className="text-white bg-neutral-800">
				<header className="overflow-hidden whitespace-nowrap text-ellipsis font-bold">
					{topalbums.album}
				</header>
				<p className="">{topalbums.artist}</p>
				<p>{topalbums.year}</p>
			</div>
			<div className="flex gap-4 bg-neutral-800 pt-2 text-sm">
				<button className="px-4 py-2 bg-pink-400 rounded-sm">
					Edit
				</button>
				<button className="px-4 py-2 bg-red-400 rounded-sm">
					Delete
				</button>
			</div>
		</section>
	);
}

export default AlbumCard;
