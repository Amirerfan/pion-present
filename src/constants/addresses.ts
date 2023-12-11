import {SupportedChainId} from './chains';

export type AddressMap = { [chainId: number]: `0x${string}` };

const GAS_CONSUMPTION_ADDRESSES: AddressMap = {
	[SupportedChainId.GOERLI]: '0x93b70a839cce47Eca0Bfff58e663dDcB5d31037F',
};

export {
	GAS_CONSUMPTION_ADDRESSES
}

