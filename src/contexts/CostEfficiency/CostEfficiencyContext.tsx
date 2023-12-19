import {createContext, ReactNode, useEffect, useState} from 'react';

import {useContractReads} from "wagmi";
import {ethUsdAbi} from "../../abis/ETH_USD.ts";
import {solUsdAbi} from "../../abis/SOL_USD.ts";
import {bnbUsdAbi} from "../../abis/BNB_USD.ts";

const CostEfficiencyContext = createContext<{
	ethUsdPrice: null | bigint;
	solUsdPrice: null | bigint;
	bnbUsdPrice: null | bigint;
	hoverState: boolean;
	setHoverState: (hoverState: boolean) => void;
}>({
	ethUsdPrice: null,
	solUsdPrice: null,
	bnbUsdPrice: null,
	hoverState: false,
	setHoverState: () => {},
});

const CostEfficiencyProvider = ({children}: { children: ReactNode }) => {
	const [ethUsdPrice, setEthUsdPrice] = useState<null | bigint>(null);
	const [solUsdPrice, setSolUsdPrice] = useState<null | bigint>(null);
	const [bnbUsdPrice, setBnbUsdPrice] = useState<null | bigint>(null);
	const [hoverState, setHoverState] = useState(false);


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
			},
			{
				address: '0x14e613ac84a31f709eadbdf89c6cc390fdc9540a',
				abi: bnbUsdAbi,
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
			if (data[2].status === 'success') {
				setBnbUsdPrice(data[2].result)
			}
		}
	}, [data]);


	return (
		<CostEfficiencyContext.Provider
			value={{
				ethUsdPrice,
				solUsdPrice,
				bnbUsdPrice,
				hoverState,
				setHoverState
			}}
		>
			{children}
		</CostEfficiencyContext.Provider>
	);
};

export {CostEfficiencyProvider, CostEfficiencyContext};
