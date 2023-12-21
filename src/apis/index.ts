import axios from 'axios';

const axiosInstance = axios.create();

export async function getChatGPTResponseAPI(message: string) {
	const response = await axiosInstance.get(('https://explorer.muon.net/alice/query/v1/?app=chatGPT&method=isTrue&params[question]=' + message), {
			headers: {
				'Content-Type': 'application/json',
			}
		}
	)
	return response.data;
}

export async function getSolanaFeeAPI(functionName: string, param: string) {
	const response = await axiosInstance.get((`https://solana-api.muon.net/api/gas-usage/${functionName}/${param}/`), {
			headers: {
				'Content-Type': 'application/json',
			}
		}
	)
	return response.data;
}