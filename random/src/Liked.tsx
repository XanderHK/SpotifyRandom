import React, { useEffect, useRef, useState } from 'react';
import './App.css';
import Cookies from 'universal-cookie';

function Liked() {

    const [liked, setLiked] = useState<{
        image: string
        name: string
        preview_url: string | null
        spotify_url: string
    }[]>([]);

    useEffect(() => {
        const cookies = new Cookies();
        const cookie = cookies.get('liked-songs');
        console.log(cookies.get('liked-songs'))
        if (cookie) {
            setLiked(cookie);
        }

    }, [])

    const handleAudioControl = (e: React.MouseEvent) => {
        try {
            const audio = e.currentTarget.parentNode?.parentNode?.lastChild?.lastChild as HTMLAudioElement;
            if (audio) {
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="Liked">
            <div className="container-fluid mt-5">
                <div className="row">
                    {liked.map((track, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="card">
                                <div className="wrapper">
                                    <img onClick={(e) => handleAudioControl(e)} src={track.image}
                                        className="card-img-top rounded mx-auto d-block" alt={track.name} />
                                    <div className="description">
                                        <div className="row">
                                            <div className="col-12">
                                                <h3 className="fillSpace px-2">{track.name}</h3>
                                            </div>
                                        </div>
                                        <div className="row mt-3">
                                            <div className="col-12">
                                                <a href={track.spotify_url} target="_blank" rel="noopener noreferrer">
                                                    <button type="button" className="btn spotify-green btn-circle btn-xl">
                                                        <i
                                                            className="fa-brands fa-spotify fa-xl"></i>
                                                    </button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <br />
                                    {track.preview_url ? (<audio
                                        src={track.preview_url}
                                    >
                                        Your browser does not support the
                                        <code>audio</code> element.
                                    </audio>) : (<p className="text-danger">No preview available</p>)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Liked;
