import React from "react";

function AlbumCard({ topalbums }) {
	return (
		<div>
			<li>
				{topalbums.album} - {topalbums.year}
			</li>
		</div>
	);
}

export default AlbumCard;
