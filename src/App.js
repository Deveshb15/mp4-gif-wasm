import { useState, useEffect } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
const ffmpeg = createFFmpeg({ log: true });

function App() {
	const [ready, setReady] = useState(false);
	const [video, setVideo] = useState(null);
	const [gif, setGif] = useState(null);

	const load = async () => {
		await ffmpeg.load();
		setReady(true);
	};

	useEffect(() => {
		load();
	}, []);

	console.log(typeof video);
	// console.log(URL.createObjectURL(video))
	const convertToGif = async () => {
		ffmpeg.FS("writeFile", "test.mp4", await fetchFile(video));

		await ffmpeg.run(
			"-i",
			"test.mp4",
			// "-t",
			// "2.5s",
			// "-ss",
			// "2.0",
			"-f",
			"gif",
			"out.gif"
		);

		const data = ffmpeg.FS("readFile", "out.gif");

		const url = URL.createObjectURL(
			new Blob([data.buffer], { type: "image/gif" })
		);
		setGif(url);
	};

	return (
		<div className="flex justify-center items-center min-h-screen bg-black text-white">
			{ready ? (
				<div>
					{video && (
						<video
							controls
							width="250px"
							src={
								typeof video == "object" ? URL.createObjectURL(video) : video
							}
						/>
					)}

					<div className="flex flex-col justify-center items-center">
						<input
							type="file"
							onChange={(e) => setVideo(e.target?.files?.item(0))}
						/>
						<p>or</p>
						<input
							className="text-black px-4 py-2"
							type="text"
              placeholder="Enter a video url"
							onChange={(e) => setVideo(e.target?.value)}
						/>
					</div>

					<h1 className="py-4 text-xl font-bold">Results: </h1>

					{video && <button className="text-base py-2 px-4 rounded-lg font-bold bg-white text-black border hover:bg-black hover:text-white" onClick={convertToGif}>Convert to GIF</button>}

					{gif && <img src={gif} width="250px" alt="gif" />}
				</div>
			) : (
				<h1 className="text-3xl font-bold">Loading...</h1>
			)}
		</div>
	);
}

export default App;
