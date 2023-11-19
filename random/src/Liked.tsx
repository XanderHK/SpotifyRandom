import React, { ReactNode, useEffect, useState } from 'react'
import './App.css'
import WithSharedHOC, { WrappedComponentProps } from './HOC/Behaviour'
import Pagination from './components/Pagination'

type LikedT = {
  image: string
  name: string
  preview_url: string | null
  spotify_url: string
}

const Liked: React.FC<WrappedComponentProps> = ({ handleAudioControl }) => {
  const [liked, setLiked] = useState<LikedT[]>([])
  const [likedHTMLElements, setLikedHTMLElements] = useState<ReactNode[]>([])

  useEffect(() => {
    const liked = localStorage.getItem('liked-songs')
    if (liked) {
      setLiked(JSON.parse(liked))
    }
  }, [])

  useEffect(() => {
    const convertedToElems = liked.map((track: LikedT, index: number) => {
      return (
        <div className="card" key={index}>
          <div className="wrapper">
            <img
              onClick={(e) => handleAudioControl(e)}
              src={track.image}
              className="card-img-top rounded mx-auto d-block"
              alt={track.name}
            />
            <div className="description">
              <div className="row">
                <div className="col-12">
                  <h3 className="fillSpace px-2">{track.name}</h3>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12">
                  <button
                    onClick={handleRemove}
                    type="button"
                    className="btn btn-danger btn-circle btn-xl mr-1"
                    id={`${index}`}
                  >
                    <i
                      className="fa-solid fa-minus fa-xl"
                      style={{ color: 'black' }}
                    ></i>
                  </button>
                  <a
                    href={track.spotify_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      type="button"
                      className="btn spotify-green btn-circle btn-xl"
                    >
                      <i className="fa-brands fa-spotify fa-xl"></i>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <br />
            {track.preview_url ? (
              <audio src={track.preview_url}>
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            ) : (
              <p className="text-danger">No preview available</p>
            )}
          </div>
        </div>
      )
    })

    setLikedHTMLElements(convertedToElems)
  }, [liked, handleAudioControl])

  const handleRemove = (e: React.MouseEvent) => {
    const liked = localStorage.getItem('liked-songs')
    if (liked) {
      const parsed = JSON.parse(liked)
      parsed.splice(e.currentTarget.id, 1)
      localStorage.removeItem('liked-songs')
      localStorage.setItem('liked-songs', JSON.stringify(parsed))
      setLiked(parsed)
    }
  }

  return (
    <div className="Liked">
      <div className="container-fluid mt-5">
        <Pagination<ReactNode>
          items={likedHTMLElements}
          amount={12}
          render={(item) => <>{item}</>}
        />
      </div>
    </div>
  )
}

export default WithSharedHOC(Liked)
