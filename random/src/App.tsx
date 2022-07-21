import { useEffect, useRef, useState } from 'react';
import './App.css';
import { getTrack } from './utils';
import Cookies from 'universal-cookie';

function App() {

	const [track, setTrack] = useState<{
		image: string
		name: string
		preview_url: string | null
		spotify_url: string
	}>();

	const audioRef = useRef<HTMLAudioElement>(null);

	useEffect(() => {
		handleAction()
	}, [])

	const handleAudioControl = () => {
		if (audioRef.current) {
			if (audioRef.current.paused) {
				audioRef.current.play();
			} else {
				audioRef.current.pause();
			}
		}
	}

	const handleAction = () => {
		getTrack().then(res => setTrack(res[0]));
	}

	const handleLike = () => {
		const cookies = new Cookies();
		const cookie = cookies.get('liked-songs');
		const current = new Date();
		const nextYear = new Date();

		nextYear.setFullYear(current.getFullYear() + 1);
		if (cookie) {
			cookies.set('liked-songs', [...cookie, track], { path: '/', expires: nextYear, });
			return
		}
		cookies.set('liked-songs', [track], { path: '/' });
	}

	return (
		<div className="App">
			<div className="track">
				<div className=" h-100 d-flex justify-content-center align-items-center mt-5">
					{track && (
						<div className="card">
							<div className="wrapper">
								<img onClick={handleAudioControl} src={track.image}
									className="card-img-top rounded mx-auto d-block" alt={track.name} />
								<div className="description">
									<div className="row">
										<div className="col-12">
											<h3 className="fillSpace px-2">{track.name}</h3>
										</div>
									</div>
									<div className="row mt-3">
										<div className="col-12">
											<button onClick={handleAction} type="button" className="btn btn-danger btn-circle btn-xl mr-1">
												<i className="fa-solid fa-thumbs-down fa-xl"></i>
											</button>
											<a href={track.spotify_url} target="_blank" rel="noopener noreferrer">
												<button type="button" className="btn spotify-green btn-circle btn-xl">
													<i
														className="fa-brands fa-spotify fa-xl"></i>
												</button>
											</a>
											<button onClick={() => {
												handleAction()
												handleLike()
											}} type="button" className="btn btn-success btn-circle btn-xl ml-1">
												<i className="fa-solid fa-thumbs-up fa-xl"></i>
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className="card-body">
								<br />
								{track.preview_url ? (<audio
									src={track.preview_url}
									ref={audioRef}
								>
									Your browser does not support the
									<code>audio</code> element.
								</audio>) : (<p className="text-danger">No preview available</p>)}
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
