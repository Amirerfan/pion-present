export enum SupportedChainId {
	GOERLI = 5,
	MAINNET = 1,
}

export const CHAIN_IDS_TO_NAMES = {
	[SupportedChainId.GOERLI]: 'goerli',
	[SupportedChainId.MAINNET]: 'mainnet',
};

export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(
	SupportedChainId,
).filter((id) => typeof id === 'number') as SupportedChainId[];

export const SUPPORTED_GAS_ESTIMATE_CHAIN_IDS = [
	SupportedChainId.GOERLI,
];

/**
 * All the chain IDs that are running the Ethereum protocol.
 */
export const L1_CHAIN_IDS = [SupportedChainId.GOERLI] as const;

export type SupportedL1ChainId = (typeof L1_CHAIN_IDS)[number];

export const L2_CHAIN_IDS: readonly SupportedChainId[] = [] as const;

export function isSupportedChain(
	chainId: number | null | undefined,
): chainId is SupportedChainId {
	return !!chainId && !!SupportedChainId[chainId];
}

export function getCurrentChainId(): SupportedChainId {
	return Number(import.meta.env.VITE_APP_CHAIN_ID) as SupportedChainId;
}
