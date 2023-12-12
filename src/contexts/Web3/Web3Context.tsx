import {createContext, ReactNode, useCallback} from 'react';
import '@rainbow-me/rainbowkit/styles.css';

import {
	darkTheme,
	getDefaultWallets,
	RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {configureChains, createConfig, mainnet, WagmiConfig} from 'wagmi';
import {goerli} from 'wagmi/chains';
import {jsonRpcProvider} from 'wagmi/providers/jsonRpc';

const Web3Context = createContext({});


const Web3Provider = ({children}: { children: ReactNode }) => {
	const getRPCURL = useCallback((chainID: number) => {
		switch (chainID) {
			case 1:
				return 'https://ethereum.publicnode.com';
			case 5:
				return 'https://ethereum-goerli.publicnode.com';
			default:
				return 'https://ethereum-goerli.publicnode.com';
		}
	}, []);

	const {chains, publicClient} = configureChains(
		[mainnet, goerli],
		[
			jsonRpcProvider({
				rpc: (chain) => ({
					http: getRPCURL(chain.id),
				}),
			}),
		],
	);

	const {connectors} = getDefaultWallets({
		appName: 'PION',
		projectId: '76b32982e9b97ae09f81d531761798ba',
		chains,
	});

	const wagmiConfig = createConfig({
		autoConnect: true,
		connectors,
		publicClient,
	});

	return (
		<WagmiConfig config={wagmiConfig}>
			<RainbowKitProvider
				chains={chains}
				theme={darkTheme({
					accentColor: '#4D3E9E',
					accentColorForeground: '#FFFFFF',
				})}
			>
				<Web3Context.Provider value={{}}>{children}</Web3Context.Provider>
			</RainbowKitProvider>
		</WagmiConfig>
	);
};

export {Web3Provider, Web3Context};
