import {useEffect, useState} from "react";

'use client';

import {Carousel} from 'flowbite-react';
import TableForSumOfSeries from "./TableForSumOfSeries.tsx";
import TableForFibonacci from "./TableForFibonacci.tsx";
import useRealTimeData from "../contexts/RealTimeData/useRealTimeData.ts";
import useCostEfficiency from "../contexts/CostEfficiency/useCostEfficiency.ts";

const CostEfficiency = () => {
	const { hoverState: hoverStateForRealTimeData } = useRealTimeData();
	const { hoverState, setHoverState } = useCostEfficiency();

	useEffect(() => {
		document.getElementById('animated-link-cost')?.addEventListener('mouseenter', () => {
			setHoverState(true);
		});
		document.getElementById('animated-link-cost')?.addEventListener('mouseleave', () => {
			setHoverState(false);
		});
	}, [setHoverState]);

	const [isSlideActive, setIsSlideActive] = useState(true);

	return (
		<div id='cost-efficiency'
		     className='cost-efficiency flex flex-col w-full gap-2 h-full items-center relative justify-center'>

			{/*<div className={`max-w-[90vw] w-full transition-all ${hoverState && '-translate-y-16'}`}>*/}
			{/*<p className='text-white w-[80%] mx-auto text-xl font-bold text-left'>PION enables you to get Real-time data in a secure and*/}
			{/*	decentralized way. </p>*/}
			{/*</div>*/}

			<div className={`h-auto w-[90vw] max-w-[1380px] transition-all ${hoverState && '-translate-y-16'}`}>
				<Carousel slideInterval={5000} pauseOnHover slide={isSlideActive}>
					<TableForSumOfSeries setIsSlideActive={setIsSlideActive}/>
					<TableForFibonacci setIsSlideActive={setIsSlideActive}/>
				</Carousel>
			</div>

			<span id='animated-link-cost'
			      className={`animate-link absolute bottom-0 translate-y-1/2 hover:translate-y-12 transition-all group ${hoverStateForRealTimeData && 'translate-y-12'}`}
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