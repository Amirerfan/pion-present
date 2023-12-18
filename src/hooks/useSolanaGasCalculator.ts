import useCostEfficiency from "../contexts/CostEfficiency/useCostEfficiency.ts";
import {useCallback, useEffect, useState} from "react";
import {LAMPORTS_PER_SOL} from "@solana/web3.js";
import {getSolanaFeeAPI} from "../apis";

const useSolanaGasCalculator = (functionName: "bitwiseOperation" | "fib" | "nthPrime" | "sumOfNaturalNumbers", args: string, refresh?: string) => {
	const {solUsdPrice} = useCostEfficiency();
	const [solanaGasCalculatorTimeout, setSolanaGasCalculatorTimeout] = useState<NodeJS.Timeout | null>(null);
	const [gas, setGas] = useState('0.0');
	const [error, setError] = useState(false);

	const [costInUSD, setCostInUSD] = useState(0);
	const [costInLamports, setCostInLamports] = useState(0);

	const SolanaGasCalculator = useCallback(() => {
		if (solanaGasCalculatorTimeout) {
			clearTimeout(solanaGasCalculatorTimeout);
		}
		setSolanaGasCalculatorTimeout(setTimeout(async () => {
			if (args === '') {
				setGas('$0.00');
				setCostInUSD(0);
				setCostInLamports(0);
				return;
			}

			try {
				setError(false);

				const response = await getSolanaFeeAPI(functionName, args);
				if (response.error) {
					setGas('-');
					setCostInUSD(0);
					setCostInLamports(0);
					setError(true)
					return;
				}
				setError(false);
				if (solUsdPrice) setCostInUSD(Number(solUsdPrice / BigInt(LAMPORTS_PER_SOL) * BigInt(response.gas))/ LAMPORTS_PER_SOL);
				else setCostInLamports(Number(response.gas));

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

	return {gas, error, costInUSD, costInLamports};
}

export default useSolanaGasCalculator;