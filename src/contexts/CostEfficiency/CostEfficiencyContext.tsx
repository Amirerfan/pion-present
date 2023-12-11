import {createContext, ReactNode, useCallback, useEffect, useState} from 'react';
import {gasConsumptionAbi} from "../../abis/GasConsumptionGoerli.ts";

import {createPublicClient, http} from 'viem'
import {GAS_CONSUMPTION_ADDRESSES} from "../../constants/addresses.ts";
import {getCurrentChainId} from "../../constants/chains.ts";
import {goerli} from "wagmi/chains";
import {formatUnits} from "ethers";

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

	const getGasFee = useCallback(async (functionName: "bitwiseOperation" | "fibonacci" | "nthPrime" | "sumOfNaturalNumbers", arg: string) => {
		return await publicClient.estimateContractGas({
			address: GAS_CONSUMPTION_ADDRESSES[getCurrentChainId()],
			abi: gasConsumptionAbi,
			functionName: functionName,
			args: [BigInt(arg)],
			account
		})
	}, [publicClient])

	useEffect(() => {
		setETHSumOfSeriesNGasFee(BigInt(0))
		getGasFee("sumOfNaturalNumbers", sumOfSeriesN).then((gasFee) => {
			setETHSumOfSeriesNGasFee(gasFee)
		})
	}, [sumOfSeriesN, getGasFee]);

	useEffect(() => {
		setETHFibonacciNthGasFee(BigInt(0))
		getGasFee("fibonacci", fibonacciNth).then((gasFee) => {
			setETHFibonacciNthGasFee(gasFee)
		})
	}, [fibonacciNth, getGasFee]);

	useEffect(() => {
		setETHSumOfSeries5GasFee(BigInt(0))
		getGasFee("sumOfNaturalNumbers", '5').then((gasFee) => {
			setETHSumOfSeries5GasFee(gasFee)
		})
	}, [getGasFee]);

	useEffect(() => {
		setETHFibonacci5thGasFee(BigInt(0))
		getGasFee("fibonacci", '5').then((gasFee) => {
			setETHFibonacci5thGasFee(gasFee)
		})
	}, [getGasFee]);

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
			}}
		>
			{children}
		</CostEfficiencyContext.Provider>
	);
};

export {CostEfficiencyProvider, CostEfficiencyContext};
