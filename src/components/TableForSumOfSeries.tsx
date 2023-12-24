import {useEffect, useState} from "react";
import useETHGasCalculator from "../hooks/useETHGasCalculator.ts";
import useSolanaGasCalculator from "../hooks/useSolanaGasCalculator.ts";
import useCostEfficiency from "../contexts/CostEfficiency/useCostEfficiency.ts";


const TableForSumOfSeries = (
	{
		setIsSlideActive
	}: {
		setIsSlideActive: React.Dispatch<React.SetStateAction<boolean>>
	}) => {
	const [sumOfSeriesN, setSumOfSeriesN] = useState('');

	const {gas: ETHGasFor10000} = useETHGasCalculator("sumOfNaturalNumbers", '5000');
	const {gas: ETHGasFor100000} = useETHGasCalculator("sumOfNaturalNumbers", '100000');
	const {
		gas: ETHGasFor200000,
		error: errorForETHGasFor200000
	} = useETHGasCalculator("sumOfNaturalNumbers", '200000');
	const {
		gas: ETHGasForN,
		error: errorForETHSumN,
	} = useETHGasCalculator("sumOfNaturalNumbers", sumOfSeriesN);

	const {gas: solanaGasFor10000} = useSolanaGasCalculator("sumOfNaturalNumbers", '5000');
	const {
		gas: solanaGasFor100000,
		error: errorForSolanaGasFor100000
	} = useSolanaGasCalculator("sumOfNaturalNumbers", '100000');
	const {
		gas: solanaGasFor200000,
		error: errorForSolanaGasFor200000
	} = useSolanaGasCalculator("sumOfNaturalNumbers", '200000');
	const {gas: solanaGasForN, error: errorForSolanaSumN} = useSolanaGasCalculator("sumOfNaturalNumbers", sumOfSeriesN);

	useEffect(() => {
		if (sumOfSeriesN === '') {
			setIsSlideActive(true);
		} else {
			setIsSlideActive(false);
		}
	}, [sumOfSeriesN, setIsSlideActive]);

	useEffect(() => {
		document.getElementById('input-sum')?.addEventListener('focusin', () => {
			setIsSlideActive(false);
		})
		document.getElementById('input-sum')?.addEventListener('focusout', () => {
			setIsSlideActive(true);
		})
	}, [setIsSlideActive]);

	const {pionPrice} = useCostEfficiency();

	const selectInput = (input: HTMLInputElement) => {
		input.select();
	}

	return (
		<span className='flex w-[80%] min-w-[80%] max-w-[80%] mx-auto flex-col gap-8'>
			<p className='text-white mx-auto font-semibold text-3xl'>Sum of Series <span
				className='font-noto'>(1+2+...+N)</span></p>
		<table className={`table rounded-3xl overflow-hidden`}>
			<thead className='bg-element-header'>
			<tr>
				<th className='text-white font-semibold px-9 py-[30px] text-left min-w-[25vw]'>
					<p className='text-lg font-semibold'>Sum of natural numbers until <span className='font-noto'>N</span></p>
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
				<td className='border-b border-table-body-border px-9 text-primary-l1 font-noto font-bold'>N = 50,000</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {pionPrice ? '$' + pionPrice.toFixed(2) : "-"}</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {ETHGasFor10000}
				</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {solanaGasFor10000}</td>
			</tr>
			<tr className='text-white pl-9 pr-8 h-12 text-[18px]'>
				<td className='border-b border-table-body-border px-9 text-primary-l1 font-noto font-bold'>N = 100,000</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {pionPrice ? '$' + pionPrice.toFixed(2) : "-"}</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>
					≈ {ETHGasFor100000}
				</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>{errorForSolanaGasFor100000 ?
					<p className='text-red text-xs font-semibold'>Too complex for <br/>Solana to calculate!
					</p> : '≈ ' + solanaGasFor100000}</td>
			</tr>
			<tr className='text-white pl-9 pr-8 h-12 text-[18px]'>
				<td className='border-b border-table-body-border px-9 text-primary-l1 font-noto font-bold'>N = 200,000</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {pionPrice ? '$' + pionPrice.toFixed(2) : "-"}</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>
					{errorForETHGasFor200000 ?
						<p className='text-red text-xs font-semibold'>Too complex for <br/>Ethereum to calculate!
						</p> : '≈ ' + ETHGasFor200000}
				</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>{errorForSolanaGasFor200000 ?
					<p className='text-red text-xs font-semibold'>Too complex for <br/>Solana to calculate!
					</p> : '≈ ' + solanaGasFor200000}</td>
			</tr>
			<tr className='text-white pl-9 pr-8 h-12 text-[18px]'>
				<td className='font-medium border-b border-table-body-border px-9'> <span
					className='text-primary-l1 font-noto font-bold'>N =</span> <input
					type='number'
					id='input-sum'
					onChange={(e) => setSumOfSeriesN(e.target.value)}
					onClick={(e) => selectInput(e.target as HTMLInputElement)}
					value={sumOfSeriesN}
					className='bg-input-bg text-white focus:outline-0 px-2 py-1.5 text-[16px] w-32 rounded-md text-center'
					placeholder='0'/></td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {sumOfSeriesN === '' ? "$ 0.00" : pionPrice ? '$' + pionPrice.toFixed(2) : "-"}</td>
				<td className='px-9 font-semibold border-b border-table-body-border text-center'>
					{errorForETHSumN ? <p className='text-red text-xs font-semibold'>Too complex for <br/>Ethereum to calculate!
					</p> : '≈ ' + ETHGasForN}
				</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>
					{errorForSolanaSumN ?
						<p className='text-red text-xs font-semibold'>Too complex for <br/>Solana to calculate!
						</p> : '≈ ' + solanaGasForN}
				</td>
			</tr>

			<tr className='text-white pl-9 pr-8'>
				<td colSpan={4} className='py-8 pl-9 text-gray-l1'>Fee costs are
					calculated in real-time using smart contracts on <span
						className='text-primary-l1 cursor-pointer hover:underline'
						onClick={() => window.open('https://goerli.etherscan.io/address/0x93b70a839cce47Eca0Bfff58e663dDcB5d31037F#code', '_blank')}>Ethereum</span> and <span
						className='text-primary-l1 cursor-pointer hover:underline'
						onClick={() => window.open('https://solscan.io/account/DBYZWu2VUr2LypbdN3dh6GKKGxRCi2cyEXGRjPByMTZf?cluster=testnet', '_blank')}>Solana</span>.
				</td>
			</tr>
			</tbody>
		</table>
		</span>
	)
}

export default TableForSumOfSeries;
