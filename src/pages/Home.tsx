import Hero from "../components/Hero";
import CostEfficiency from "../components/CostEfficiency";
import RealTimeData from "../components/RealTimeData";

const Home = () => {
	return (
		<div id='page' className='page w-full'>
			<section className='page__section hero-section'>
				<Hero />
			</section>

			<section className='page__section cost-efficiency-section'>
				<CostEfficiency />
			</section>

			<section className='page__section real-time-data-section'>
				<RealTimeData />
			</section>
		</div>
	)
}

export default Home;