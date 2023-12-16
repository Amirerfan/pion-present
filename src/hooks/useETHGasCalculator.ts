import {useCallback, useEffect, useState} from "react";
import {GAS_CONSUMPTION_ADDRESSES} from "../constants/addresses.ts";
import {getCurrentChainId} from "../constants/chains.ts";
import {gasConsumptionAbi} from "../abis/GasConsumptionGoerli.ts";
import {createPublicClient, http} from "viem";
import {goerli} from "wagmi/chains";
import {formatEther} from "ethers";
import useCostEfficiency from "../contexts/CostEfficiency/useCostEfficiency.ts";


const publicClient = createPublicClient({
	chain: goerli,
	transport: http(
		'https://ethereum-goerli.publicnode.com'
	),
})

const useETHGasCalculator = (functionName: "bitwiseOperation" | "fibonacci" | "nthPrime" | "sumOfNaturalNumbers", args: string, refresh?: string) => {
	const {ethUsdPrice} = useCostEfficiency();
	const [ETHGasCalculatorTimeout, setETHGasCalculatorTimeout] = useState<NodeJS.Timeout | null>(null);
	const [gasPrice, setGasPrice] = useState(BigInt(0));
	const account = '0xf39fd6e51aad88f6f4ce6ab8827279cff2b92266';
	const [error, setError] = useState(false);

	const [gas, setGas] = useState('0.0');

	useEffect(() => {
		publicClient.getGasPrice().then((gasPrice) => {
			setGasPrice(gasPrice)
		})
	}, []);

	const ETHGasCalculator = useCallback(async () => {
		if (ETHGasCalculatorTimeout) {
			clearTimeout(ETHGasCalculatorTimeout);
		}
		setETHGasCalculatorTimeout(setTimeout(async () => {
			if (args === '') {
				setGas('$0.00');
				return;
			}
			try {
				setError(false);
				const response = await publicClient.estimateContractGas({
					address: GAS_CONSUMPTION_ADDRESSES[getCurrentChainId()],
					abi: gasConsumptionAbi,
					functionName: functionName,
					args: [BigInt(args === '' ? 0 : args)],
					account
				})
				setError(false);
				setGas(ethUsdPrice ? '$' + Number(formatEther(ethUsdPrice * gasPrice * response)).toFixed(2) : (gasPrice * response).toString() + 'wei');
			} catch (e) {
				console.log(e);
				setGas('-');
				setError(true);
			}
		}, 500));

		return () => {
			if (ETHGasCalculatorTimeout) {
				clearTimeout(ETHGasCalculatorTimeout);
			}
		}
	}, [args, ethUsdPrice, functionName, gasPrice, refresh])

	useEffect(() => {
		ETHGasCalculator();
	}, [ETHGasCalculator]);


	return {gas, error}
}

export default useETHGasCalculator;