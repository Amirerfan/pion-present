import {useCallback, useEffect, useMemo, useState} from "react";

const Hero = () => {
	const windowHeight = useMemo(() => window.innerHeight, []);
	const [offset, setOffset] = useState(0);

	const onScroll = useCallback((event: any) => {
		setOffset(Math.round(document.getElementById('page')?.scrollTop || 0));

		const animateLinkHero = document.getElementById('animate-link-hero');

		if (animateLinkHero) {
			const translate = offset > windowHeight ? 60 : (offset / windowHeight) * 60;
			animateLinkHero.style.transform = `translateY(${translate}%)`;
		}

		if (offset > windowHeight / 2) {
			document.getElementById('cost-efficiency-link-text')?.classList.add('!text-primary-l1');
			document.getElementById('cost-efficiency-link-number')?.classList.add('!text-primary-l1');
		} else {
			document.getElementById('cost-efficiency-link-text')?.classList.remove('!text-primary-l1');
			document.getElementById('cost-efficiency-link-number')?.classList.remove('!text-primary-l1');
		}

	}, [offset, windowHeight]);

	useEffect(() => {
		document.removeEventListener('scroll', onScroll);
		document.addEventListener('scroll', onScroll, true);
		return () => document.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	return (
		<div id='hero' className='hero flex flex-col w-full h-full items-center relative'>
			<div className='flex w-full justify-center'>
				<div className='flex flex-col'>
					<div className='flex gap-7 items-center mt-32'>
						<img src='/assets/images/home/logo.svg' alt='' className='w-[108px] h-auto'/>
						<div className='bg-gradient-to-r from-gradient-1 to-gradient-2 bg-clip-text text-9xl text-transparent'>
							<p className='text-8xl font-extrabold'>PION</p><p
							className='text-5xl text-center font-semibold'>NETWORK</p></div>
					</div>
					<p className='text-white text-5xl text-center'> vs </p>
					<p className='text-white font-bold text-[68px] text-center leading-[68px]'> Blockchain </p>
				</div>
				<div>
					<img src='/assets/images/home/hero-illustration.svg' alt=''/>
				</div>
			</div>

			<span id='animate-link-hero' className='animate-link absolute bottom-4 group'
			      onClick={() => document.getElementById('cost-efficiency')?.scrollIntoView({
				      behavior: "smooth",
				      block: "start",
				      inline: "start"
			      })}>
				<div
					className='cursor-pointer flex flex-col gap-4 relative w-60 h-60 group-hover:w-64 group-hover:h-64 transition-all items-center justify-center '>
					<p
						id='cost-efficiency-link-number'
						className='font-extrabold text-8xl mx-auto text-white group-hover:text-primary-l1 transition-all -mt-10'>{1}</p>
					<h3 id='cost-efficiency-link-text'
					    className='font-medium text-[28px] leading-[28px] text-white text-center transition-all group-hover:text-3xl group-hover:leading-[30px] group-hover:text-primary-l1'>Cost <br/>Efficiency</h3>
					</div>
				<span
					className='animated-border absolute top-0 w-full h-full border-4 border-dashed rounded-full border-primary-l1 pointer-events-none transition-all group-hover:rotate-[60deg]'></span>
			</span>
		</div>
	)
}

export default Hero;