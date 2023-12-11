import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import {Web3Provider} from "./contexts/Web3/Web3Context";

function App() {
	return (
		<div className="App">
			<Web3Provider>
				<BrowserRouter>
					<Routes>
						<Route path="/" element={<Home/>}/>
					</Routes>
				</BrowserRouter>
			</Web3Provider>
		</div>
	);
}

export default App;
