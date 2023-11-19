import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { getResults, getSuggestions } from './utils'
import WithSharedHOC, { WrappedComponentProps } from './HOC/Behaviour'

type Options = {
  names: { name: string; artist: string; id: string }[]
}

type Suggestion = {
  image: string
  name: string
  preview_url: string | null
  spotify_url: string
  artist: string
}

const Suggestions: React.FC<WrappedComponentProps> = ({
  handleAudioControl,
}) => {
  const [selectedValue, setSelectedValue] = useState('')
  const [options, setOptions] = useState<Options>({ names: [] })
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value
    getResults<Options>(inputValue)
      .then((res) => {
        const [data, err] = res
        if (!data) return
        if (err) return
        setOptions(data)
        setSelectedValue('')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedValue(event.target.value)
  }

  const setSuggestionsInEffect = useCallback(async () => {
    if (!selectedValue) return
    const [data, err] = await getSuggestions<Suggestion[]>(selectedValue)
    if (err) return
    if (data) setSuggestions(data)
  }, [selectedValue])

  useEffect(() => {
    setSuggestionsInEffect()
  }, [setSuggestionsInEffect])

  const handleLike = (index: number) => {
    const liked = localStorage.getItem('liked-songs')
    if (!liked) {
      localStorage.setItem('liked-songs', JSON.stringify([suggestions[index]]))
      return
    }
    localStorage.setItem(
      'liked-songs',
      JSON.stringify([...JSON.parse(liked), suggestions[index]]),
    )

    setSuggestions(suggestions.filter((_, i) => i !== index))
  }

  return (
    <div className="Suggestions">
      <div className="container-fluid mt-5">
        <div className="row justify-content-center">
          <div className="col-6">
            <input
              type="text"
              placeholder="Enter a value"
              onChange={handleInputChange}
              className="form-control mt-2"
            />

            <select
              value={selectedValue}
              onChange={handleSelectChange}
              className="form-control mt-2"
            >
              <option value="" disabled>
                Select an option
              </option>
              {options.names.map((option, index) => (
                <option key={index} value={option.id}>
                  {option.name} - {option.artist}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row mt-2">
          {suggestions.map((track, index) => (
            <div className="col-md-4" key={index}>
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
                          onClick={() => {
                            handleLike(index)
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
                    <audio src={track.preview_url}>
                      Your browser does not support the
                      <code>audio</code> element.
                    </audio>
                  ) : (
                    <p className="text-danger">No preview available</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="row justify-content-center">
          <button
            onClick={() => {
              setSuggestionsInEffect()
            }}
            type="button"
            className="btn btn-secondary btn-circle btn-xl ml-1"
          >
            <i className="fa fa-repeat fa-xl"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default WithSharedHOC(Suggestions)
