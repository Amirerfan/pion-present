import useETHGasCalculator from "../hooks/useETHGasCalculator.ts";
import {useState} from "react";
import useSolanaGasCalculator from "../hooks/useSolanaGasCalculator.ts";


const TableForFibonacci = () => {
	const [fibonacciNth, setFibonacciNth] = useState('');

	const {gas: ETHGasFor5} = useETHGasCalculator("fibonacci", '5', fibonacciNth);
	const {gas: ETHGasFor10} = useETHGasCalculator("fibonacci", '10', fibonacciNth);
	const {gas: ETHGasFor15} = useETHGasCalculator("fibonacci", '15', fibonacciNth);
	const {gas: ETHGasForN, error: errorForETHFibN} = useETHGasCalculator("fibonacci", fibonacciNth);

	const {gas: solanaGasFor5} = useSolanaGasCalculator("fib", '5', fibonacciNth);
	const {gas: solanaGasFor10} = useSolanaGasCalculator("fib", '10', fibonacciNth);
	const {gas: solanaGasFor15} = useSolanaGasCalculator("fib", '15', fibonacciNth);
	const {gas: solanaGasForN, error: errorForSolanaFibN} = useSolanaGasCalculator("fib", fibonacciNth);

	return (
		<table className={`table rounded-3xl overflow-hidden mx-auto max-w-[80vw]`}>
			<thead className='bg-element-header'>
			<tr>
				<th className='text-white font-semibold px-9 py-[30px] min-w-[25vw] text-left'>
					<p className='text-lg font-semibold'>Fibonacci Series <span className='font-noto'>(1, 1, 2, 3, ...)</span></p>
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
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {ETHGasFor5}
					<span
						className='italic text-sm text-red font-semibold'> (+62%)</span></td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {solanaGasFor5}
					<span
						className='italic text-sm text-red font-semibold'> (+386%)</span></td>
			</tr>
			<tr className='text-white pl-9 pr-8 h-12 text-[18px]'>
				<td className='border-b border-table-body-border px-9 text-primary-l1 font-noto font-bold'>N = 10</td>
				<td className='px-9 font-semibold border-b border-table-body-border text-center'>≈ $3.21</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {ETHGasFor10}
					<span
						className='italic text-sm text-red font-semibold'> (+62%)</span></td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {solanaGasFor10}
					<span
						className='italic text-sm text-red font-semibold'> (+386%)</span></td>
			</tr>
			<tr className='text-white pl-9 pr-8 h-12 text-[18px]'>
				<td className='border-b border-table-body-border px-9 text-primary-l1 font-noto font-bold'>N = 15</td>
				<td className='px-9 font-semibold border-b border-table-body-border text-center'>≈ $3.21</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {ETHGasFor15}
					<span
						className='italic text-sm text-red font-semibold'> (+62%)</span></td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {solanaGasFor15}
					<span
						className='italic text-sm text-red font-semibold'> (+386%)</span></td>
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
				<td className='px-9 font-semibold border-b border-table-body-border text-center'>
					{errorForETHFibN ? <p className='text-red text-xs font-medium'>Calculation Error!</p> : '≈ ' + ETHGasForN}
					{!errorForETHFibN && <span
              className='italic text-sm text-red font-semibold'> (+62%)</span>}
				</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>
					{errorForSolanaFibN ?
						<p className='text-red text-xs font-medium'>Calculation Error!</p> : '≈ ' + solanaGasForN}
					{!errorForSolanaFibN && <span
              className='italic text-sm text-red font-semibold'> (+386%)</span>}
				</td>
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