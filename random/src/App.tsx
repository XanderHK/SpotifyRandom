import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import './App.css'
import Liked from './Liked'
import Random from './Random'
import Logo from './assets/images/logo.png'
import Suggestions from './Suggestions'

function App() {
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
            </ul>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Random />}></Route>
          <Route path="liked" element={<Liked />}></Route>
          <Route path="suggestions" element={<Suggestions />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
