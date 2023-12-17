import {useState} from "react";
import useETHGasCalculator from "../hooks/useETHGasCalculator.ts";
import useSolanaGasCalculator from "../hooks/useSolanaGasCalculator.ts";


const TableForSumOfSeries = () => {
	const [sumOfSeriesN, setSumOfSeriesN] = useState('');

	const {gas: ETHGasFor5} = useETHGasCalculator("sumOfNaturalNumbers", '5', sumOfSeriesN);
	const {gas: ETHGasFor10} = useETHGasCalculator("sumOfNaturalNumbers", '10', sumOfSeriesN);
	const {gas: ETHGasFor15} = useETHGasCalculator("sumOfNaturalNumbers", '15', sumOfSeriesN);
	const {gas: ETHGasForN, error: errorForETHSumN} = useETHGasCalculator("sumOfNaturalNumbers", sumOfSeriesN);

	const {gas: solanaGasFor5} = useSolanaGasCalculator("sumOfNaturalNumbers", '5', sumOfSeriesN);
	const {gas: solanaGasFor10} = useSolanaGasCalculator("sumOfNaturalNumbers", '10', sumOfSeriesN);
	const {gas: solanaGasFor15} = useSolanaGasCalculator("sumOfNaturalNumbers", '15', sumOfSeriesN);
	const {gas: solanaGasForN, error: errorForSolanaSumN} = useSolanaGasCalculator("sumOfNaturalNumbers", sumOfSeriesN);


	const selectInput = (input: HTMLInputElement) => {
		input.select();
		input.setSelectionRange(0, 9999999999);
	}

	return (
		<table className={`table rounded-3xl overflow-hidden w-[80%] min-w-[80%] max-w-[80%] mx-auto`}>
			<thead className='bg-element-header'>
			<tr>
				<th className='text-white font-semibold px-9 py-[30px] text-left min-w-[25vw]'>
					<p className='text-lg font-semibold'>Sum of Series <span className='font-noto'>(1+2+...+N)</span></p>
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
						className='italic text-[16px] text-red font-bold'>(+62%)</span></td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {solanaGasFor5}
					<span
						className='italic text-[16px] text-red font-bold'>(+386%)</span></td>
			</tr>
			<tr className='text-white pl-9 pr-8 h-12 text-[18px]'>
				<td className='border-b border-table-body-border px-9 text-primary-l1 font-noto font-bold'>N = 10</td>
				<td className='px-9 font-semibold border-b border-table-body-border text-center'>≈ $3.21</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {ETHGasFor10}
					<span
						className='italic text-[16px] text-red font-bold'>(+62%)</span></td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {solanaGasFor10}
					<span
						className='italic text-[16px] text-red font-bold'>(+386%)</span></td>
			</tr>
			<tr className='text-white pl-9 pr-8 h-12 text-[18px]'>
				<td className='border-b border-table-body-border px-9 text-primary-l1 font-noto font-bold'>N = 15</td>
				<td className='px-9 font-semibold border-b border-table-body-border text-center'>≈ $3.21</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {ETHGasFor15}
					<span
						className='italic text-[16px] text-red font-bold'>(+62%)</span></td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {solanaGasFor15}
					<span
						className='italic text-[16px] text-red font-bold'>(+386%)</span></td>
			</tr>
			<tr className='text-white pl-9 pr-8 h-12 text-[18px]'>
				<td className='font-medium border-b border-table-body-border px-9'> <span
					className='text-primary-l1 font-noto font-bold'>N =</span> <input
					type='number'
					onChange={(e) => setSumOfSeriesN(e.target.value)}
					onClick={(e) => selectInput(e.target as HTMLInputElement)}
					value={sumOfSeriesN}
					className='bg-input-bg text-white focus:outline-0 px-2 py-1.5 text-[16px] w-32 rounded-md text-center'
					placeholder='0'/></td>
				<td className='px-9 font-semibold border-b border-table-body-border text-center'>≈ $3.21</td>
				<td className='px-9 font-semibold border-b border-table-body-border text-center'>
					{errorForETHSumN ? <p className='text-red text-xs font-medium'>Calculation Error!</p> : '≈ ' + ETHGasForN}
					{!errorForETHSumN && <span
              className='italic text-sm text-red font-semibold'> (+62%)</span>}
				</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>
					{errorForSolanaSumN ?
						<p className='text-red text-xs font-medium'>Calculation Error!</p> : '≈ ' + solanaGasForN}
					{!errorForSolanaSumN && <span
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

export default TableForSumOfSeries;
