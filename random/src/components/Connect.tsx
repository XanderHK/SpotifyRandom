import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { selectData } from '../app/selectors/global'
import { clear } from '../app/reducers/global'
import { CLIENT_ID, REDIRECT_URI, SCOPES } from '../cfg'

function Connect() {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((state) =>
    selectData(state, 'accessToken'),
  )
  const user = useAppSelector((state) => selectData(state, 'user'))

  const [username, setUsername] = useState('')

  useEffect(() => {
    if (!user) return
    setUsername(user.display_name)
  }, [user])

  const handleConnect = () => {
    if (!accessToken) {
      // Change to token for temp key
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=code&show_dialog=true`
    }
    dispatch(clear())
  }

  return (
    <div>
      <button className="btn connect-btn" onClick={handleConnect}>
        {accessToken ? 'Connected | ' + username : 'Connect'}
      </button>
    </div>
  )
}

export default Connect
