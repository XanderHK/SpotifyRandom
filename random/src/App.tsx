import { useEffect, useRef, useState } from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Liked from './Liked';
import Random from './Random';
import Logo from './assets/images/logo.png'
import Select, { SingleValue } from 'react-select'
import Genres from './assets/genres';

function App() {

	const [options, setOptions] = useState<{ value: string, label: string }[]>([])
	const [selected, setSelected] = useState<SingleValue<{ value: string, label: string }>>()

	useEffect(() => {
		setOptions(Genres.split("\n").map(genre => {
			return {
				value: genre,
				label: genre
			}
		}))
	}, [])

	const handleChange = (selectedValue: SingleValue<{ value: string; label: string; }>) => {
		setSelected(selectedValue)
	}

	return (
		<div className="App">
			<BrowserRouter>
				<nav className="navbar fixed-top navbar-expand-lg custom-nav navbar-dark">
					<a className="navbar-brand" href="/"><img src={Logo} style={{ width: 32, height: 32 }} alt="logo" /></a>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav mr-auto mt-2 mt-lg-0">
							<li className="nav-item">
								<Link to="/" className="nav-link">Home</Link>
							</li>
							<li className="nav-item">
								<Link to="/liked" className="nav-link">Liked</Link>
							</li>
						</ul>
						<form className="form-inline my-2 my-lg-0">
							<Select options={options} onChange={handleChange} value={selected} styles={{
								option: () => ({
									color: 'black',
								})
							}} />
						</form>
					</div>
				</nav>
				<Routes>
					<Route path="/" element={<Random genre={selected} />}></Route>
					<Route path="liked" element={<Liked />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
