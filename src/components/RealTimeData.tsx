import TextArea from "./TextInput";
import {useCallback, useEffect, useMemo, useState} from "react";
import useRealTimeData from "../contexts/RealTimeData/useRealTimeData.ts";
import {toast} from 'react-toastify';

const RealTimeData = () => {
	const {message, setMessage, getChatGPTResponse, loading, response, error} = useRealTimeData();

	const [result, setResult] = useState<boolean | null>(null);
	const [showFirstLine, setShowFirstLine] = useState(false);
	const [showSecondLine, setShowSecondLine] = useState(false);
	const [showThirdLine, setShowThirdLine] = useState(false);

	useEffect(() => {
		if (loading) {
			setShowFirstLine(true);
			setShowSecondLine(false);
			setShowThirdLine(false);
			setResult(null);
		}
	}, [loading]);

	useEffect(() => {
		if (response !== null) {
			setShowSecondLine(true);
			setTimeout(() => {
				setShowThirdLine(true);
				setResult(response);
			}, 1000);
		}
	}, [response]);

	useEffect(() => {
		if (error) {
			setShowFirstLine(false);
			setShowSecondLine(false);
			setShowThirdLine(false);
			toast.error('Something went wrong! please try again.', {
				position: "bottom-right",
				theme: 'dark',
				style: {
					backgroundColor: '#4D3E9E',
					color: '#fff',
					marginRight: '12px',
				}
			});
		}
	}, [error]);


	const [hoverState, setHoverState] = useState(false);

	useEffect(() => {
		document.getElementById('animated-link-real-time')?.addEventListener('mouseenter', () => {
			setHoverState(true);
		});
		document.getElementById('animated-link-real-time')?.addEventListener('mouseleave', () => {
			setHoverState(false);
		});
	}, []);

	const windowHeight = useMemo(() => window.innerHeight, []);
	const [offset, setOffset] = useState(0);

	const onScroll = useCallback(() => {
		setOffset(Math.round(document.getElementById('page')?.scrollTop || 0));

		if (offset > 3 * windowHeight / 2) {
			document.getElementById('real-time-link-text')?.classList.add('!text-primary-l1');
			document.getElementById('real-time-link-number')?.classList.add('!text-primary-l1');
		} else {
			document.getElementById('real-time-link-text')?.classList.remove('!text-primary-l1');
			document.getElementById('real-time-link-number')?.classList.remove('!text-primary-l1');
		}

	}, [offset, windowHeight]);

	useEffect(() => {
		document.removeEventListener('scroll', onScroll);
		document.addEventListener('scroll', onScroll, true);
		return () => document.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	return (
		<div id='real-time-data'
		     className='real-time-data flex flex-col w-full h-full items-center justify-center relative'>
			<section className={`real-time-data-body flex flex-col gap-6 transition-all ${hoverState && '-translate-y-11'}`}>
				<p className='text-white text-xl font-bold text-left'>PION enables you to get Real-time data in a secure and
					decentralized way. </p>
				<div className='flex gap-8 w-[928px]'>
					<div className='card rounded-3xl overflow-hidden flex-1'>
						<div className='card__header bg-element-header flex justify-between items-center px-7 py-4'>
							<p className='card__header__title text-white text-xl font-bold'>Ask ChatGPT</p>
							<img src='/assets/images/home/chat-gpt.svg' alt='' className='h-11 w-auto'/>
						</div>
						<div className='card__body bg-element-body px-7 py-4 pb-8'>
							<p className='font-medium text-white mb-5'>You should ask questions that chatGPT can answer with a simple
								TRUE/FALSE state</p>
							<TextArea className='mb-7 resize-none h-28 p-4 py-5 text-sm placeholder-xyz-75 text-white'
							          placeholder='Example: Did real Madrid win the last El Clásico? answer with true or false only'
							          onChange={setMessage} value={message}/>
							<button
								disabled={message === '' || loading}
								onClick={() => getChatGPTResponse()}
								className='pl-9 pr-8 py-4 text-primary disabled:cursor-not-allowed bg-primary-l3 rounded-lg flex items-center ml-auto text-xl font-semibold'> Submit
								<img src='/assets/images/home/send-icon.svg' alt='' className='ml-3'/>
							</button>
						</div>
					</div>
					<div className='card rounded-3xl overflow-hidden flex-1 flex flex-col '>
						<div className='card__header bg-element-header flex justify-between items-center px-7 py-4'>
							<p className='card__header__title text-white text-xl font-bold'>Result</p>
							<img src='/assets/images/home/pion-table-logo.svg' alt='' className='h-11 w-auto'/>
						</div>
						<div className='card__body bg-element-body px-7 py-4 pb-8 flex-1 flex flex-col justify-between'>
							<div className='flex flex-col gap-4'>
								{showFirstLine &&
                    <p className='transition-all flex gap-1 font-medium text-gray-l1'><img
                        src='/assets/images/home/right-arrow.svg' alt=''/>Retrieving
                        data ...
                    </p>}
								{showSecondLine &&
                    <p className='transition-all flex gap-1 font-medium text-gray-l1'><img
                        src='/assets/images/home/right-arrow.svg' alt=''/>12/32
                        Block Confirmation</p>}
								{showThirdLine &&
                    <p className='transition-all flex gap-1 font-medium text-gray-l1'><img
                        src='/assets/images/home/right-arrow.svg'
                        alt=''/>Status: <span
                        className='text-green'>Success</span>
                    </p>}
							</div>
							<div>
								{result === null ? <div className='flex items-center w-full text-primary-l3 gap-2'>
									<img src='/assets/images/home/right-double-arrow.svg' alt=''/> <p>...</p>
								</div> : <div className='flex items-center w-full gap-2'>
									<img src='/assets/images/home/right-double-arrow.svg' alt=''/><p
									className='font-medium text-primary-l3'>{result ? 'True' : 'False'}</p>
								</div>}
							</div>
						</div>
					</div>
				</div>
			</section>

			<span id='animated-link-real-time'
			      className='animate-link absolute bottom-0 translate-y-1/2 hover:translate-y-14 transition-all group'>
				<div
					className='cursor-pointer flex flex-col gap-4 relative w-60 h-60 group-hover:w-64 group-hover:h-64 transition-all items-center justify-center '>
				<div className='pion-logo w-11 h-[52px] transition-all group-hover:bg-primary-l1 bg-white'/>
				<h3
					className='font-medium text-[28px] leading-[28px] text-white text-center transition-all group-hover:text-3xl group-hover:leading-[30px] group-hover:text-primary-l1'>More About<br/>PION</h3>
				</div>
				<span
					className='animated-border absolute top-0 w-full h-full border-4 border-dashed rounded-full border-primary-l1 pointer-events-none transition-all group-hover:rotate-[60deg]'></span>
				</span>
		</div>
	)
}

export default RealTimeData;