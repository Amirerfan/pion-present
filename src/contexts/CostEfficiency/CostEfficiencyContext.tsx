import {createContext, ReactNode, useEffect, useMemo, useState} from 'react';

import {useContractReads} from "wagmi";
import {ethUsdAbi} from "../../abis/ETH_USD.ts";
import {solUsdAbi} from "../../abis/SOL_USD.ts";
import {bnbUsdAbi} from "../../abis/BNB_USD.ts";
import {pionWbnbAbi} from "../../abis/PION_WBNB.ts";

const CostEfficiencyContext = createContext<{
	ethUsdPrice: null | bigint;
	solUsdPrice: null | bigint;
	bnbUsdPrice: null | bigint;
	pionPrice: null | bigint;
	hoverState: boolean;
	setHoverState: (hoverState: boolean) => void;
}>({
	ethUsdPrice: null,
	solUsdPrice: null,
	bnbUsdPrice: null,
	pionPrice: null,
	hoverState: false,
	setHoverState: () => {},
});

const CostEfficiencyProvider = ({children}: { children: ReactNode }) => {
	const [ethUsdPrice, setEthUsdPrice] = useState<null | bigint>(null);
	const [solUsdPrice, setSolUsdPrice] = useState<null | bigint>(null);
	const [bnbUsdPrice, setBnbUsdPrice] = useState<null | bigint>(null);
	const [pionWbnbPrice, setPionWbnbPrice] = useState<null | bigint>(null);

	const pionPrice = useMemo(() => {
		if (bnbUsdPrice && pionWbnbPrice) {
			return bnbUsdPrice * pionWbnbPrice / 10n ** 18n;
		}
		return null;
	}, [bnbUsdPrice, pionWbnbPrice])

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
			},
			{
				address: '0xdc1e387fc2697f3737ee197712bfef9e1101ccd5',
				abi: pionWbnbAbi,
				functionName: 'getReserves',
				chainId: 56,
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
			if (data[3].status === 'success') {
				const reserves = data[3].result;
				const wbnbReserve = reserves[1];
				const pionReserve = reserves[0];
				const wbnbReserveInEth = wbnbReserve * 10n ** 18n / 10n ** 9n;
				const pionReserveInEth = pionReserve * 10n ** 18n / 10n ** 9n;
				const pionWbnbPrice = wbnbReserveInEth / pionReserveInEth;
				setPionWbnbPrice(pionWbnbPrice);
			}
		}
	}, [data]);


	return (
		<CostEfficiencyContext.Provider
			value={{
				ethUsdPrice,
				solUsdPrice,
				bnbUsdPrice,
				pionPrice,
				hoverState,
				setHoverState
			}}
		>
			{children}
		</CostEfficiencyContext.Provider>
	);
};

export {CostEfficiencyProvider, CostEfficiencyContext};
