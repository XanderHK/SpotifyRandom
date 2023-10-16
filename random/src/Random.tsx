import { useEffect, useRef, useState } from 'react'
import Genres from './assets/genres'
import Select, { SingleValue } from 'react-select'
import './App.css'
import { getTrack } from './utils'

function Random() {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([])
  const [selected, setSelected] = useState<
    SingleValue<{ value: string; label: string }>
  >()

  useEffect(() => {
    setOptions(
      Genres.split('\n').map((genre) => {
        return {
          value: genre,
          label: genre,
        }
      }),
    )
  }, [])

  const handleChange = (
    selectedValue: SingleValue<{ value: string; label: string }>,
  ) => {
    setSelected(selectedValue)
  }

  const [track, setTrack] = useState<{
    image: string
    name: string
    preview_url: string | null
    spotify_url: string
  }>()

  const [loading, setLoading] = useState(false)

  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    handleAction()
  }, [])

  const handleAudioControl = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }

  const handleAction = () => {
    setLoading(true)
    if (selected) {
      getTrack(selected.value).then((res) => {
        setTrack(res[0])
        setLoading(false)
      })
      return
    }
    getTrack().then((res) => {
      setTrack(res[0])
      setLoading(false)
    })
  }

  const handleLike = () => {
    const liked = localStorage.getItem('liked-songs')
    if (!liked) {
      localStorage.setItem('liked-songs', JSON.stringify([track]))
      return
    }
    localStorage.setItem(
      'liked-songs',
      JSON.stringify([...JSON.parse(liked), track]),
    )
  }

  return (
    <div className="Random">
      <div className="track">
        <div className=" h-100 d-flex justify-content-center align-items-center mt-5">
          {track ? (
            <div className="card">
              <div className="wrapper">
                <img
                  onClick={handleAudioControl}
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
                        disabled={loading}
                        onClick={handleAction}
                        type="button"
                        className="btn btn-danger btn-circle btn-xl mr-1"
                      >
                        <i className="fa-solid fa-thumbs-down fa-xl"></i>
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
                      <button
                        disabled={loading}
                        onClick={() => {
                          handleAction()
                          handleLike()
                        }}
                        type="button"
                        className="btn btn-success btn-circle btn-xl ml-1"
                      >
                        <i className="fa-solid fa-thumbs-up fa-xl"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <br />
                {track.preview_url ? (
                  <audio src={track.preview_url} ref={audioRef}>
                    Your browser does not support the
                    <code>audio</code> element.
                  </audio>
                ) : (
                  <p className="text-danger">No preview available</p>
                )}
                <form className="">
                  <Select
                    options={options}
                    onChange={handleChange}
                    value={selected}
                    styles={{
                      option: () => ({
                        color: 'black',
                      }),
                    }}
                  />
                </form>
              </div>
            </div>
          ) : (
            <button
              onClick={() => {
                handleAction()
              }}
              type="button"
              className="btn btn-secondary btn-circle btn-xl ml-1"
            >
              <i className="fa fa-repeat fa-xl"></i>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default Random
