import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Liked from './Liked'
import Random from './Random'
import Logo from './assets/images/logo.png'
import Suggestions from './Suggestions'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { useCallback, useEffect } from 'react'
import Connect from './components/Connect'
import { add, clear } from './app/reducers/global'
import { getAccessToken, getRefreshToken, getUser } from './utils'
import { selectData } from './app/selectors/global'
import Profile from './Profile'

function App() {
  const dispatch = useAppDispatch()
  const accessToken = useAppSelector((state) =>
    selectData(state, 'accessToken'),
  )
  const refreshToken = useAppSelector((state) =>
    selectData(state, 'refreshToken'),
  )

  const getRefreshTokenInEffect = useCallback(
    async (code: string) => {
      const [data, err] = await getRefreshToken<{ [key: string]: string }>(code)
      if (err) return
      if (data) {
        dispatch(
          add({
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
            expiresIn: data.expires_in,
          }),
        )
      }
    },
    [dispatch],
  )

  // Probably gonna need to add a check that checks if accesstoken and refresh are still in the persisted state to refresh them but only on the first load

  useEffect(() => {
    const url = window.location.href
    const urlParams = new URLSearchParams(url.substring(url.indexOf('?')))
    const code = urlParams.get('code')

    if (code) {
      getRefreshTokenInEffect(code)
    }
  }, [getRefreshTokenInEffect])

  const refreshAccessTokenInEffect = useCallback(async () => {
    if (!(refreshToken && accessToken)) return
    const [data, err] = await getAccessToken(refreshToken)
    if (err) {
      dispatch(clear())
      return
    }
    if (data) {
      dispatch(
        add({ accessToken: data.access_token, expiresIn: data.expires_in }),
      )
    }
  }, [refreshToken, accessToken, dispatch])

  useEffect(() => {
    const intervalId = setInterval(
      () => refreshAccessTokenInEffect(),
      3600 * 1000,
    )

    return () => {
      clearInterval(intervalId)
    }
  }, [refreshAccessTokenInEffect])

  const getUserInEffect = useCallback(async () => {
    const [data, err] = await getUser(accessToken)
    if (err) return
    if (data) {
      dispatch(add({ user: data }))
    }
  }, [accessToken, dispatch])

  useEffect(() => {
    if (!accessToken) return
    getUserInEffect()
  }, [accessToken, getUserInEffect])

  return (
    <div className="App">
      <BrowserRouter>
        <nav className="navbar fixed-top navbar-expand-lg custom-nav navbar-dark">
          <a className="navbar-brand" href="/">
            <img src={Logo} style={{ width: 32, height: 32 }} alt="logo" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/liked" className="nav-link">
                  Liked
                </Link>
              </li>
              <li>
                <Link to="/suggestions" className="nav-link">
                  Suggestions
                </Link>
              </li>
              {accessToken ? (
                <li>
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                </li>
              ) : null}
              <li>
                <Connect />
              </li>
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Random />}></Route>
          <Route path="liked" element={<Liked />}></Route>
          <Route path="suggestions" element={<Suggestions />}></Route>
          {accessToken ? (
            <Route path="profile" element={<Profile />}></Route>
          ) : null}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
