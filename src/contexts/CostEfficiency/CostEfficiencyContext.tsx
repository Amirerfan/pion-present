import {createContext, ReactNode, useCallback, useEffect, useState} from 'react';
import {gasConsumptionAbi} from "../../abis/GasConsumptionGoerli.ts";

import {createPublicClient, http} from 'viem'
import {GAS_CONSUMPTION_ADDRESSES} from "../../constants/addresses.ts";
import {getCurrentChainId} from "../../constants/chains.ts";
import {goerli} from "wagmi/chains";
import {useContractReads} from "wagmi";
import {ethUsdAbi} from "../../abis/ETH_USD.ts";
import {solUsdAbi} from "../../abis/SOL_USD.ts";
import {getSolanaFeeAPI} from "../../apis";

const CostEfficiencyContext = createContext<{
	gasPrice: bigint;
	setSumOfSeriesN: (sumOfSeriesN: string) => void;
	sumOfSeriesN: string;
	setFibonacciNth: (fibonacciNth: string) => void;
	fibonacciNth: string;
	ETHSumOfSeries5GasFee: bigint;
	ETHSumOfSeriesNGasFee: bigint;
	ETHFibonacci5thGasFee: bigint;
	ETHFibonacciNthGasFee: bigint;
	solanaSumOfSeries5GasFee: bigint;
	solanaSumOfSeriesNGasFee: bigint;
	solanaFibonacci5thGasFee: bigint;
	solanaFibonacciNthGasFee: bigint;
	ethUsdPrice: null | bigint;
	solUsdPrice: null | bigint;
}>({
	gasPrice: BigInt(0),
	setSumOfSeriesN: () => {
	},
	sumOfSeriesN: '',
	setFibonacciNth: () => {
	},
	fibonacciNth: '',
	ETHSumOfSeries5GasFee: BigInt(0),
	ETHSumOfSeriesNGasFee: BigInt(0),
	ETHFibonacci5thGasFee: BigInt(0),
	ETHFibonacciNthGasFee: BigInt(0),
	solanaSumOfSeries5GasFee: BigInt(0),
	solanaSumOfSeriesNGasFee: BigInt(0),
	solanaFibonacci5thGasFee: BigInt(0),
	solanaFibonacciNthGasFee: BigInt(0),
	ethUsdPrice: null,
	solUsdPrice: null,
});

const publicClient = createPublicClient({
	chain: goerli,
	transport: http(
		'https://ethereum-goerli.publicnode.com'
	),
})

const CostEfficiencyProvider = ({children}: { children: ReactNode }) => {
	const [sumOfSeriesN, setSumOfSeriesN] = useState('');
	const [fibonacciNth, setFibonacciNth] = useState('');
	const [sumOfSeriesNTimeout, setSumOfSeriesNTimeout] = useState<NodeJS.Timeout | null>(null);
	const [fibonacciNthTimeout, setFibonacciNthTimeout] = useState<NodeJS.Timeout | null>(null);

	const [ETHSumOfSeries5GasFee, setETHSumOfSeries5GasFee] = useState(BigInt(0));
	const [ETHSumOfSeriesNGasFee, setETHSumOfSeriesNGasFee] = useState(BigInt(0));
	const [ETHFibonacci5thGasFee, setETHFibonacci5thGasFee] = useState(BigInt(0));
	const [ETHFibonacciNthGasFee, setETHFibonacciNthGasFee] = useState(BigInt(0));

	const [solanaSumOfSeries5GasFee, setSolanaSumOfSeries5GasFee] = useState(BigInt(0));
	const [solanaSumOfSeriesNGasFee, setSolanaSumOfSeriesNGasFee] = useState(BigInt(0));
	const [solanaFibonacci5thGasFee, setSolanaFibonacci5thGasFee] = useState(BigInt(0));
	const [solanaFibonacciNthGasFee, setSolanaFibonacciNthGasFee] = useState(BigInt(0));

	const account = '0xf39fd6e51aad88f6f4ce6ab8827279cff2b92266';

	const [gasPrice, setGasPrice] = useState(BigInt(0));


	useEffect(() => {
		publicClient.getGasPrice().then((gasPrice) => {
			setGasPrice(gasPrice)
		})
	}, []);

	const getEthereumGasFee = useCallback(async (functionName: "bitwiseOperation" | "fibonacci" | "nthPrime" | "sumOfNaturalNumbers", arg: string) => {
		return await publicClient.estimateContractGas({
			address: GAS_CONSUMPTION_ADDRESSES[getCurrentChainId()],
			abi: gasConsumptionAbi,
			functionName: functionName,
			args: [BigInt(arg ?? 0)],
			account
		})
	}, [])

	const getSolanaGasFee = useCallback(async (functionName: "bitwiseOperation" | "fib" | "nthPrime" | "sumOfNaturalNumbers", arg: string) => {
		try {
			const response = await getSolanaFeeAPI(functionName, arg);
			return BigInt(response.gas);
		} catch (e) {
			console.log(e);
			return BigInt(0);
		}
	}, [])

	useEffect(() => {
		if (fibonacciNthTimeout) {
			clearTimeout(fibonacciNthTimeout)
		}
		const timer = setTimeout(() => {
			if (fibonacciNth === '') {
				setETHFibonacciNthGasFee(BigInt(0))
				setSolanaFibonacciNthGasFee(BigInt(0))
				return
			}
			getEthereumGasFee("fibonacci", fibonacciNth === '' ? '0' : fibonacciNth).then((gasFee) => {
				setETHFibonacciNthGasFee(gasFee)
			})
			getEthereumGasFee("fibonacci", '5').then((gasFee) => {
				setETHFibonacci5thGasFee(gasFee)
			})
			getSolanaGasFee("fib", fibonacciNth === '' ? '0' : fibonacciNth).then((gasFee) => {
				setSolanaFibonacciNthGasFee(gasFee)
			})
			getSolanaGasFee("fib", '5').then((gasFee) => {
				setSolanaFibonacci5thGasFee(gasFee)
			})
		}, 500)

		setFibonacciNthTimeout(timer)
		return () => clearTimeout(timer)
	}, [fibonacciNth, getEthereumGasFee, getSolanaGasFee]);

	useEffect(() => {
		if (sumOfSeriesNTimeout) {
			clearTimeout(sumOfSeriesNTimeout)
		}
		const timer = setTimeout(() => {
			if (sumOfSeriesN === '') {
				setETHSumOfSeriesNGasFee(BigInt(0))
				setSolanaSumOfSeriesNGasFee(BigInt(0))
				return
			}
			getEthereumGasFee("sumOfNaturalNumbers", sumOfSeriesN === '' ? '0' : sumOfSeriesN).then((gasFee) => {
				setETHSumOfSeriesNGasFee(gasFee)
			})
			getEthereumGasFee("sumOfNaturalNumbers", '5').then((gasFee) => {
				setETHSumOfSeries5GasFee(gasFee)
			})
			getSolanaGasFee("sumOfNaturalNumbers", sumOfSeriesN === '' ? '0' : sumOfSeriesN).then((gasFee) => {
				setSolanaSumOfSeriesNGasFee(gasFee)
			})
			getSolanaGasFee("sumOfNaturalNumbers", '5').then((gasFee) => {
				setSolanaSumOfSeries5GasFee(gasFee)
			})
		}, 500)
		setSumOfSeriesNTimeout(timer)
		return () => clearTimeout(timer)
	}, [sumOfSeriesN, getSolanaGasFee, getEthereumGasFee]);


	const [ethUsdPrice, setEthUsdPrice] = useState<null | bigint>(null);
	const [solUsdPrice, setSolUsdPrice] = useState<null | bigint>(null);

	const {data} = useContractReads({
		contracts: [
			{
				address: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419',
				abi: ethUsdAbi,
				functionName: 'latestAnswer',
				chainId: 1,
			},
			{
				address: '0x4ffc43a60e009b551865a93d232e33fce9f01507',
				abi: solUsdAbi,
				functionName: 'latestAnswer',
				chainId: 1,
			}
		],
		watch: true,
	})

	useEffect(() => {
		if (data && data.length > 0) {
			if (data[0].status === 'success') {
				setEthUsdPrice(data[0].result)
			}
			if (data[1].status === 'success') {
				setSolUsdPrice(data[1].result)
			}
		}
	}, [data]);


	return (
		<CostEfficiencyContext.Provider
			value={{
				gasPrice,
				setSumOfSeriesN,
				sumOfSeriesN,
				setFibonacciNth,
				fibonacciNth,
				ETHSumOfSeries5GasFee,
				ETHSumOfSeriesNGasFee,
				ETHFibonacci5thGasFee,
				ETHFibonacciNthGasFee,
				solanaSumOfSeries5GasFee,
				solanaSumOfSeriesNGasFee,
				solanaFibonacci5thGasFee,
				solanaFibonacciNthGasFee,
				ethUsdPrice,
				solUsdPrice,
			}}
		>
			{children}
		</CostEfficiencyContext.Provider>
	);
};

export {CostEfficiencyProvider, CostEfficiencyContext};
