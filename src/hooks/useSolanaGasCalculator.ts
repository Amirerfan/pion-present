import useCostEfficiency from "../contexts/CostEfficiency/useCostEfficiency.ts";
import {useCallback, useEffect, useState} from "react";
import {LAMPORTS_PER_SOL} from "@solana/web3.js";
import {getSolanaFeeAPI} from "../apis";

const useSolanaGasCalculator = (functionName: "bitwiseOperation" | "fib" | "nthPrime" | "sumOfNaturalNumbers", args: string, refresh?: string) => {
	const {solUsdPrice} = useCostEfficiency();
	const [solanaGasCalculatorTimeout, setSolanaGasCalculatorTimeout] = useState<NodeJS.Timeout | null>(null);
	const [gas, setGas] = useState('0.0');
	const [error, setError] = useState(false);

	const SolanaGasCalculator = useCallback(() => {
		if (solanaGasCalculatorTimeout) {
			clearTimeout(solanaGasCalculatorTimeout);
		}
		setSolanaGasCalculatorTimeout(setTimeout(async () => {
			if (args === '') {
				setGas('$0.00');
				return;
			}

			try {
				setError(false);

				const response = await getSolanaFeeAPI(functionName, args);
				if (response.error) {
					setGas('-');
					setError(true)
					return;
				}
				setError(false);
				setGas(solUsdPrice ?
					"$" + (Number(solUsdPrice / BigInt(LAMPORTS_PER_SOL) * BigInt(response.gas)) / LAMPORTS_PER_SOL).toFixed(7) :
					BigInt(response.gas).toString() + ' lamports');
			} catch (e) {
				console.log(e);
				setGas('-');
			}
		}, 500));

		return () => {
			if (solanaGasCalculatorTimeout) {
				clearTimeout(solanaGasCalculatorTimeout);
			}
		}
	}, [args, solUsdPrice, functionName, refresh])

	useEffect(() => {
		SolanaGasCalculator();
	}, [SolanaGasCalculator]);

	return {gas, error}
}

export default useSolanaGasCalculator;