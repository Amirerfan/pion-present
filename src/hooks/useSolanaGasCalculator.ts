import useCostEfficiency from "../contexts/CostEfficiency/useCostEfficiency.ts";
import {useCallback, useEffect, useState} from "react";
import {LAMPORTS_PER_SOL} from "@solana/web3.js";
import {getSolanaFeeAPI} from "../apis";

const useSolanaGasCalculator = (functionName: "bitwiseOperation" | "fib" | "nthPrime" | "sumOfNaturalNumbers", args: string, refresh?: string) => {
	const {solUsdPrice} = useCostEfficiency();

	const [gas, setGas] = useState('0.0');

	const SolanaGasCalculator = useCallback(async () => {

		if (args === '') {
			setGas('$0.00');
			return;
		}

		try {
			const response = await getSolanaFeeAPI(functionName, args);
			setGas(solUsdPrice ?
				"$" + (Number(solUsdPrice / BigInt(LAMPORTS_PER_SOL) * BigInt(response.gas)) / LAMPORTS_PER_SOL).toFixed(7) :
				BigInt(response.gas).toString() + ' lamports');
		} catch (e) {
			console.log(e);
			setGas('-');
		}

	}, [args, solUsdPrice, functionName, refresh])

	useEffect(() => {
		SolanaGasCalculator();
	}, [SolanaGasCalculator]);

	return {gas}
}

export default useSolanaGasCalculator;