import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from "./pages/Home";
import {Web3Provider} from "./contexts/Web3/Web3Context";
import {CostEfficiencyProvider} from "./contexts/CostEfficiency/CostEfficiencyContext.tsx";
import {RealTimeDataProvider} from "./contexts/RealTimeData/RealTimeDataContext.tsx";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<div className="App">
			<Web3Provider>
				<CostEfficiencyProvider>
					<RealTimeDataProvider>
						<BrowserRouter>
							<Routes>
								<Route path="/" element={<Home/>}/>
							</Routes>
						</BrowserRouter>
						<ToastContainer/>
					</RealTimeDataProvider>
				</CostEfficiencyProvider>
			</Web3Provider>
		</div>
	);
}

export default App;
