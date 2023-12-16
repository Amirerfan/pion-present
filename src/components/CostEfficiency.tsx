import {useEffect, useState} from "react";

'use client';

import {Carousel} from 'flowbite-react';
import TableForSumOfSeries from "./TableForSumOfSeries.tsx";
import TableForFibonacci from "./TableForFibonacci.tsx";

const CostEfficiency = () => {
	const [hoverState, setHoverState] = useState(false);

	useEffect(() => {
		document.getElementById('animated-link-cost')?.addEventListener('mouseenter', () => {
			setHoverState(true);
		});
		document.getElementById('animated-link-cost')?.addEventListener('mouseleave', () => {
			setHoverState(false);
		});
	}, []);

	return (
		<div id='cost-efficiency'
		     className='cost-efficiency flex flex-col w-full h-full items-center relative justify-center'>

			<div className={`h-auto max-w-[90vw] transition-all ${hoverState && '-translate-y-12'}`}>
				<Carousel slide={false}>
					<TableForSumOfSeries />
					<TableForFibonacci />
				</Carousel>
			</div>

			<span id='animated-link-cost'
			      className='animate-link absolute bottom-0 translate-y-1/2 hover:translate-y-12 transition-all group'
			      onClick={() => document.getElementById('real-time-data')?.scrollIntoView({
				      behavior: "smooth",
				      block: "start",
				      inline: "start"
			      })}>
				<div
					className='cursor-pointer flex flex-col gap-4 relative w-60 h-60 group-hover:w-64 group-hover:h-64 transition-all items-center justify-center '>
					<p
						id='real-time-link-number'
						className='font-extrabold text-8xl mx-auto text-white group-hover:text-primary-l1 transition-all -mt-5'>{2}</p>
					<h3
						id='real-time-link-text'
						className='font-medium text-[28px] leading-[28px] text-white text-center transition-all group-hover:text-3xl group-hover:leading-[30px] group-hover:text-primary-l1'>Real-Time <br/> Data</h3>
					</div>
				<span
					className='animated-border absolute top-0 w-full h-full border-4 border-dashed rounded-full border-primary-l1 pointer-events-none transition-all group-hover:rotate-[60deg]'></span>
			</span>
		</div>
	)
}

export default CostEfficiency;