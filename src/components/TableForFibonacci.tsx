import useCostEfficiency from "../contexts/CostEfficiency/useCostEfficiency.ts";
import {LAMPORTS_PER_SOL} from "@solana/web3.js";
import {formatEther} from "ethers";


const TableForFibonacci = () => {

	const {
		gasPrice,
		ETHFibonacci5thGasFee,
		ETHFibonacciNthGasFee,
		ETHSumOfSeries5GasFee,
		ETHSumOfSeriesNGasFee,
		solanaFibonacciNthGasFee,
		solanaFibonacci5thGasFee,
		solanaSumOfSeries5GasFee,
		solanaSumOfSeriesNGasFee,
		fibonacciNth,
		setFibonacciNth,
		ethUsdPrice,
		solUsdPrice,
	} = useCostEfficiency();

	return (
		<table className={`table rounded-3xl overflow-hidden mx-auto max-w-[80vw]`}>
			<thead className='bg-element-header'>
			<tr>
				<th className='text-white font-semibold px-9 py-[30px] min-w-[25vw] text-left'>
					<p className='text-lg font-semibold'>Fibonacci Series</p>
				</th>
				<th className='p-[30px] text-center'>
					<img className='mx-auto' src='/assets/images/home/pion-table-logo.svg' alt=''/>
				</th>
				<th className='p-[30px] text-center'>
					<img className='mx-auto' src='/assets/images/home/ethereum-table-logo.svg' alt=''/>
				</th>
				<th className='p-[30px] text-center'>
					<img className='mx-auto' src='/assets/images/home/solana-table-logo.svg' alt=''/>
				</th>
			</tr>
			</thead>

			<tbody className='bg-element-body py-2.5'>
			<tr className='text-white pl-9 pr-8 h-12 text-[18px]'>
				<td className='border-b border-table-body-border px-9 text-primary-l1 font-noto font-bold'>N = 5</td>
				<td className='px-9 font-semibold border-b border-table-body-border text-center'>≈ $3.21</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {ethUsdPrice ? "$" + Number(formatEther(ethUsdPrice * gasPrice * ETHSumOfSeries5GasFee)).toFixed(3) : (gasPrice * ETHSumOfSeries5GasFee).toString() + 'wei'}
					<span
						className='italic text-[16px] text-red font-bold'>(+62%)</span></td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {solUsdPrice ? "$" + (Number(solUsdPrice / BigInt(LAMPORTS_PER_SOL) * solanaSumOfSeries5GasFee) / LAMPORTS_PER_SOL).toFixed(7) : solanaSumOfSeries5GasFee.toString() + 'lamports'}
					<span
						className='italic text-[16px] text-red font-bold'>(+386%)</span></td>
			</tr>
			<tr className='text-white pl-9 pr-8 h-12 text-[18px]'>
				<td className='border-b border-table-body-border px-9 text-primary-l1 font-noto font-bold'>N = 5</td>
				<td className='px-9 font-semibold border-b border-table-body-border text-center'>≈ $3.21</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {ethUsdPrice ? "$" + Number(formatEther(ethUsdPrice * gasPrice * ETHSumOfSeriesNGasFee)).toFixed(3) : (gasPrice * ETHSumOfSeriesNGasFee).toString() + 'wei'}
					<span
						className='italic text-[16px] text-red font-bold'>(+62%)</span></td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {solUsdPrice ? "$" + (Number(solUsdPrice / BigInt(LAMPORTS_PER_SOL) * solanaSumOfSeriesNGasFee) / LAMPORTS_PER_SOL).toFixed(7) : solanaSumOfSeriesNGasFee.toString() + 'lamports'}
					<span
						className='italic text-[16px] text-red font-bold'>(+386%)</span></td>
			</tr>
			<tr className='text-white pl-9 pr-8 h-12 text-[18px]'>
				<td className='border-b border-table-body-border px-9 text-primary-l1 font-noto font-bold'>N = 5</td>
				<td className='px-9 font-semibold border-b border-table-body-border text-center'>≈ $3.21</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {ethUsdPrice ? "$" + Number(formatEther(ethUsdPrice * gasPrice * ETHFibonacci5thGasFee)).toFixed(3) : (gasPrice * ETHFibonacci5thGasFee).toString() + 'wei'}
					<span
						className='italic text-[16px] text-red font-bold'>(+62%)</span></td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {solUsdPrice ? "$" + (Number(solUsdPrice / BigInt(LAMPORTS_PER_SOL) * solanaFibonacci5thGasFee) / LAMPORTS_PER_SOL).toFixed(7) : solanaFibonacci5thGasFee.toString() + 'lamports'}
					<span
						className='italic text-[16px] text-red font-bold'>(+386%)</span></td>
			</tr>
			<tr className='text-white pl-9 pr-8 h-12 text-[18px]'>
				<td className='font-medium border-b border-table-body-border px-9'> <span
					className='text-primary-l1 font-noto font-bold'>N =</span> <input
					type='number'
					onChange={(e) => setFibonacciNth(e.target.value)}
					value={fibonacciNth}
					className='bg-input-bg text-white focus:outline-0 px-2 py-1.5 text-[16px] w-16 rounded-md text-center'
					placeholder='0'/></td>
				<td className='px-9 font-semibold border-b border-table-body-border text-center'>≈ $3.21</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {ethUsdPrice ? "$" + Number(formatEther(ethUsdPrice * gasPrice * ETHFibonacciNthGasFee)).toFixed(3) : (gasPrice * ETHFibonacciNthGasFee).toString() + 'wei'}
					<span
						className='italic text-[16px] text-red font-bold'>(+62%)</span></td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {solUsdPrice ? "$" + (Number(solUsdPrice / BigInt(LAMPORTS_PER_SOL) * solanaFibonacciNthGasFee) / LAMPORTS_PER_SOL).toFixed(7) : solanaFibonacciNthGasFee.toString() + 'lamports'}
					<span
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
	)
}

export default TableForFibonacci;