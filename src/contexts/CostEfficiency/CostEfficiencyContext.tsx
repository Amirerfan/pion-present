import {createContext, ReactNode, useCallback, useEffect, useState} from 'react';
import {gasConsumptionAbi} from "../../abis/GasConsumptionGoerli.ts";

import {createPublicClient, http} from 'viem'
import {GAS_CONSUMPTION_ADDRESSES} from "../../constants/addresses.ts";
import {getCurrentChainId} from "../../constants/chains.ts";
import {goerli} from "wagmi/chains";
import * as solanaWeb3 from "@solana/web3.js";
import {Buffer} from 'buffer';
import {useContractReads} from "wagmi";
import {ethUsdAbi} from "../../abis/ETH_USD.ts";
import {solUsdAbi} from "../../abis/SOL_USD.ts";

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

	//
	// const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl('testnet'));
	//
	// const programId = new solanaWeb3.PublicKey('DBYZWu2VUr2LypbdN3dh6GKKGxRCi2cyEXGRjPByMTZf');
	// const argumentValue = 5;
	// const encodedArgument = Buffer.from([argumentValue]);
	//
	// const instruction = new solanaWeb3.TransactionInstruction({
	// 	keys: [],
	// 	programId: programId,
	// 	data: encodedArgument
	// });
	//
	// const estimateSolana = useCallback(async () => {
	// 	const transaction = new solanaWeb3.Transaction().add(instruction);
	//
	// 	const { blockhash } = await connection.getLatestBlockhash();
	// 	transaction.recentBlockhash = blockhash;
	//
	// 	const feeCalculator = await connection.getFeeCalculatorForBlockhash(blockhash);
	// 	const fee = feeCalculator.value!.lamportsPerSignature * transaction.signatures.length;
	// 	if (!fee) return;
	// 	console.log('Fee: ' + fee);
	// }, [connection, instruction]);
	//
	//
	// useEffect(() => {
	// 	estimateSolana();
	// }, [estimateSolana]);


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
			args: [BigInt(arg ?? 0)],
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


	const [ethUsdPrice, setEthUsdPrice] = useState<null | bigint>(null);
	const [solUsdPrice, setSolUsdPrice] = useState<null | bigint>(null);

	const { data } = useContractReads({
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
