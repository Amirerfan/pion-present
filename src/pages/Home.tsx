import Hero from "../components/Hero";
import CostEfficiency from "../components/CostEfficiency";
import RealTimeData from "../components/RealTimeData";

const Home = () => {
	// get the window width
	const windowWidth = window.innerWidth;

	if (windowWidth < 960) {
		return (
			<div className='w-screen h-screen flex flex-col gap-8 justify-center items-center'>
				<img className='h-[35vw] max-w-[300px] max-h-[250px]' src='/assets/images/folks-computer-monitor-1.png' alt='' />
				<p className='text-white text-center text-xl px-4 font-medium'>Please visit the website with your laptop or desktop.</p>
			</div>
		)
	}

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