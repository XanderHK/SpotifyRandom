import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { selectData } from './app/selectors/global'
import Portrait_Placeholder from './assets/images/Portrait_Placeholder.png'
import { getPlaylists } from './utils'
import { add } from './app/reducers/global'

function Profile() {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => selectData(state, 'user'))
  const accessToken = useAppSelector((state) =>
    selectData(state, 'accessToken'),
  )
  const [playlists, setPlaylists] = useState<{ id: string; name: string }[]>([])

  const getPlaylistsInEffect = useCallback(async () => {
    const [data, err] = await getPlaylists(accessToken, user.id)
    if (err) return
    if (data) setPlaylists(data)
  }, [user, accessToken])

  useEffect(() => {
    getPlaylistsInEffect()
  }, [getPlaylistsInEffect])

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    dispatch(add({ playlistId: event.target.value }))
  }

  return (
    <div className="Profile">
      <div className=" h-100 d-flex justify-content-center align-items-center mt-5">
        <div className="card">
          <div className="wrapper">
            <img
              src={
                user?.images.length ? user.images[0].url : Portrait_Placeholder
              }
              className="card-img-top rounded mx-auto d-block"
              alt={'userimage'}
            />
            <div className="description">
              <div className="row">
                <div className="col-12">
                  <h3 className="fillSpace px-2">{user.display_name}</h3>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-12"></div>
              </div>
            </div>
          </div>
          <div className="card-body">
            <select onChange={handleSelectChange} className="form-control mt-2">
              <option>None selected</option>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
