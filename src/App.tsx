import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import {Web3Provider} from "./contexts/Web3/Web3Context";
import {CostEfficiencyProvider} from "./contexts/CostEfficiency/CostEfficiencyContext.tsx";

function App() {
	return (
		<div className="App">
			<Web3Provider>
				<CostEfficiencyProvider>
					<BrowserRouter>
						<Routes>
							<Route path="/" element={<Home/>}/>
						</Routes>
					</BrowserRouter>
				</CostEfficiencyProvider>
			</Web3Provider>
		</div>
	);
}

export default App;
