import useETHGasCalculator from "../hooks/useETHGasCalculator.ts";
import {useEffect, useState} from "react";
import useSolanaGasCalculator from "../hooks/useSolanaGasCalculator.ts";
import useCostEfficiency from "../contexts/CostEfficiency/useCostEfficiency.ts";


const TableForFibonacci = ({
	                           setIsSlideActive
                           }: {
	setIsSlideActive: React.Dispatch<React.SetStateAction<boolean>>
}) => {
	const [fibonacciNth, setFibonacciNth] = useState('');

	const {gas: ETHGasFor10} = useETHGasCalculator("fibonacci", '10');
	const {gas: ETHGasFor20} = useETHGasCalculator("fibonacci", '20');
	const {gas: ETHGasFor30, error: errorForETHGasFor30} = useETHGasCalculator("fibonacci", '30');
	const {
		gas: ETHGasForN,
		error: errorForETHFibN
	} = useETHGasCalculator("fibonacci", fibonacciNth);

	const {gas: solanaGasFor10} = useSolanaGasCalculator("fib", '10');
	const {gas: solanaGasFor20, error: errorForSolanaGasFor20} = useSolanaGasCalculator("fib", '20');
	const {gas: solanaGasFor30, error: errorForSolanaGasFor30} = useSolanaGasCalculator("fib", '30');
	const {gas: solanaGasForN, error: errorForSolanaFibN} = useSolanaGasCalculator("fib", fibonacciNth);

	useEffect(() => {
		if (fibonacciNth === '') {
			setIsSlideActive(true);
		} else {
			setIsSlideActive(false);
		}
	}, [fibonacciNth, setIsSlideActive]);

	useEffect(() => {
		document.getElementById('input-fibonacci')?.addEventListener('focusin', () => {
			setIsSlideActive(false);
		})
		document.getElementById('input-fibonacci')?.addEventListener('focusout', () => {
			setIsSlideActive(true);
		})
	}, [setIsSlideActive]);

	const {pionPrice} = useCostEfficiency();

	const selectInput = (input: HTMLInputElement) => {
		input.select();
	}

	return (
		<span className='flex w-[80%] min-w-[80%] max-w-[80%] mx-auto flex-col gap-8'>
			<p className='text-white mx-auto font-semibold text-3xl'>Fibonacci Series <span
				className='font-noto'>(1, 1, 2, 3, ...)</span></p>
		<table className={`table rounded-3xl overflow-hidden`}>
			<thead className='bg-element-header'>
			<tr>
				<th className='text-white font-semibold px-9 py-[30px] min-w-[25vw] text-left'>
					<p className='text-lg font-semibold'><span className='font-noto'>N</span>th term of Fibonacci Series  </p>
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
				<td className='border-b border-table-body-border px-9 text-primary-l1 font-noto font-bold'>N = 10</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {pionPrice ? '$' + pionPrice.toFixed(2) : '-'}</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {ETHGasFor10}
				</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {solanaGasFor10}
				</td>
			</tr>
			<tr className='text-white pl-9 pr-8 h-12 text-[18px]'>
				<td className='border-b border-table-body-border px-9 text-primary-l1 font-noto font-bold'>N = 20</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {pionPrice ? '$' + pionPrice.toFixed(2) : '-'}</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {ETHGasFor20}
				</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>
					{errorForSolanaGasFor20 ?
						<p className='text-red text-xs font-semibold'>Too complex for <br/> Solana to calculate!
						</p> : '≈ ' + solanaGasFor20
					}
				</td>
			</tr>
			<tr className='text-white pl-9 pr-8 h-12 text-[18px]'>
				<td className='border-b border-table-body-border px-9 text-primary-l1 font-noto font-bold'>N = 30</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {pionPrice ? '$' + pionPrice.toFixed(2) : '-'}</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>
					{errorForETHGasFor30 ?
						<p className='text-red text-xs font-semibold'>Too complex for <br/> Ethereum to calculate!
						</p> : '≈' + ETHGasFor30}
				</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>
					{errorForSolanaGasFor30 ?
						<p className='text-red text-xs font-semibold'>Too complex for <br/> Solana to calculate!
						</p> : '≈ ' + solanaGasFor30}
				</td>
			</tr>
			<tr className='text-white pl-9 pr-8 h-12 text-[18px]'>
				<td className='font-medium border-b border-table-body-border px-9'> <span
					className='text-primary-l1 font-noto font-bold'>N =</span> <input
					id='input-fibonacci'
					type='number'
					onChange={(e) => setFibonacciNth(e.target.value)}
					value={fibonacciNth}
					onClick={(e) => selectInput(e.target as HTMLInputElement)}
					className='bg-input-bg text-white focus:outline-0 px-2 py-1.5 text-[16px] w-32 rounded-md text-center'
					placeholder='0'/></td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>≈ {fibonacciNth === '' ? "$ 0.00" : pionPrice ? '$' + pionPrice.toFixed(2) : '-'}</td>
				<td className='px-9 font-semibold border-b border-table-body-border text-center'>
					{errorForETHFibN ? <p className='text-red text-xs font-semibold'>Too complex for <br/>Ethereum to calculate!
					</p> : '≈ ' + ETHGasForN}
				</td>
				<td
					className='px-9 font-semibold border-b border-table-body-border text-center'>
					{errorForSolanaFibN ?
						<p className='text-red text-xs font-semibold'>Too complex for <br/> Solana to calculate!
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

export default TableForFibonacci;