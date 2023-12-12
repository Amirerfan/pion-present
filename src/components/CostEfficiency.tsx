import {useEffect, useState} from "react";
import useCostEfficiency from "../contexts/CostEfficiency/useCostEfficiency.ts";
import {formatEther} from "ethers";

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

	const {
		gasPrice,
		ETHFibonacci5thGasFee,
		ETHFibonacciNthGasFee,
		ETHSumOfSeries5GasFee,
		ETHSumOfSeriesNGasFee,
		fibonacciNth,
		sumOfSeriesN,
		setFibonacciNth,
		setSumOfSeriesN,
		ethUsdPrice,
	} = useCostEfficiency();

	return (
		<div id='cost-efficiency'
		     className='cost-efficiency flex flex-col w-full h-full items-center relative justify-center'>
			<table className={`table rounded-3xl overflow-hidden transition-all ${hoverState && '-translate-y-12'}`}>
				<thead className='bg-element-header'>
				<tr>
					<th className='text-white font-semibold px-9 py-[30px] text-left'>
						<div><span className='text-xl font-bold'>Cases</span> (cost of calculating each example)</div>
					</th>
					<th className='p-[30px] text-center'>
						<img src='/assets/images/home/pion-table-logo.svg' alt=''/>
					</th>
					<th className='p-[30px] text-center'>
						<img src='/assets/images/home/ethereum-table-logo.svg' alt=''/>
					</th>
					<th className='p-[30px] text-center'>
						<img src='/assets/images/home/solana-table-logo.svg' alt=''/>
					</th>
				</tr>
				</thead>

				<tbody className='bg-element-body py-2.5'>
				<tr className='text-white pl-9 pr-8 h-12 text-[18px]'>
					<td className='font-medium border-b border-table-body-border px-9'>Sum of Series <span
						className='font-noto font-bold'>(1+2+...+N)</span> for <span
						className='text-primary-l1 font-noto font-bold'>N = 5</span></td>
					<td className='px-9 font-semibold border-b border-table-body-border text-center'>≈ $3.21</td>
					<td
						className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {ethUsdPrice ? "$" + Number(formatEther(ethUsdPrice * gasPrice * ETHSumOfSeries5GasFee)).toFixed(3) : (gasPrice * ETHSumOfSeries5GasFee).toString() + 'wei'}
						<span
							className='italic text-[16px] text-red font-bold'>(+62%)</span></td>
					<td className='px-9 font-semibold border-b border-table-body-border text-center'>≈ $15.61 <span
						className='italic text-[16px] text-red font-bold'>(+386%)</span></td>
				</tr>
				<tr className='text-white pl-9 pr-8 h-12 text-[18px]'>
					<td className='font-medium border-b border-table-body-border px-9'>Sum of Series <span
						className='font-noto font-bold'>(1+2+...+N)</span> for <span
						className='text-primary-l1 font-noto font-bold'>N =</span> <input
						onChange={(e) => setSumOfSeriesN(parseInt(e.target.value).toString())}
						value={sumOfSeriesN}
						className='bg-input-bg text-white focus:outline-0 px-2 py-1.5 text-[16px] w-16 rounded-md text-center'
						placeholder='0'/></td>
					<td className='px-9 font-semibold border-b border-table-body-border text-center'>≈ $3.21</td>
					<td
						className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {ethUsdPrice ? "$" + Number(formatEther(ethUsdPrice * gasPrice * ETHSumOfSeriesNGasFee)).toFixed(3) : (gasPrice * ETHSumOfSeriesNGasFee).toString() + 'wei'}
						<span
							className='italic text-[16px] text-red font-bold'>(+62%)</span></td>
					<td className='px-9 font-semibold border-b border-table-body-border text-center'>≈ $15.61 <span
						className='italic text-[16px] text-red font-bold'>(+386%)</span></td>
				</tr>
				<tr className='text-white pl-9 pr-8 h-12 text-[18px]'>
					<td className='font-medium border-b border-table-body-border px-9'><span
						className='font-noto font-bold'>N</span>th Term of Fibonacci Sequence for <span
						className='text-primary-l1 font-noto font-bold'>N = 5</span></td>
					<td className='px-9 font-semibold border-b border-table-body-border text-center'>≈ $3.21</td>
					<td
						className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {ethUsdPrice ? "$" + Number(formatEther(ethUsdPrice * gasPrice * ETHFibonacci5thGasFee)).toFixed(3) : (gasPrice * ETHFibonacci5thGasFee).toString() + 'wei'}
						<span
							className='italic text-[16px] text-red font-bold'>(+62%)</span></td>
					<td className='px-9 font-semibold border-b border-table-body-border text-center'>≈ $15.61 <span
						className='italic text-[16px] text-red font-bold'>(+386%)</span></td>
				</tr>
				<tr className='text-white pl-9 pr-8 h-12 text-[18px]'>
					<td className='font-medium border-b border-table-body-border px-9'><span
						className='font-noto font-bold'>N</span>th Term of Fibonacci Sequence for <span
						className='text-primary-l1 font-noto font-bold'>N =</span> <input
						onChange={(e) => setFibonacciNth(parseInt(e.target.value).toString())}
						value={fibonacciNth}
						className='bg-input-bg text-white focus:outline-0 px-2 py-1.5 text-[16px] w-16 rounded-md text-center'
						placeholder='0'/></td>
					<td className='px-9 font-semibold border-b border-table-body-border text-center'>≈ $3.21</td>
					<td
						className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {ethUsdPrice ? "$" + Number(formatEther(ethUsdPrice * gasPrice * ETHFibonacciNthGasFee)).toFixed(3) : (gasPrice * ETHFibonacciNthGasFee).toString() + 'wei'}
						<span
							className='italic text-[16px] text-red font-bold'>(+62%)</span></td>
					<td className='px-9 font-semibold border-b border-table-body-border text-center'>≈ $15.61 <span
						className='italic text-[16px] text-red font-bold'>(+386%)</span></td>
				</tr>

				<tr className='text-white pl-9 pr-8'>
					<td colSpan={4} className='py-8 pl-9 text-gray-l1'>Fee costs are
						calculated in real-time using smart contracts on <span className='text-primary-l1'>Ethereum</span> and <span
							className='text-primary-l1'>Solana</span>.
					</td>
				</tr>
				</tbody>
			</table>

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