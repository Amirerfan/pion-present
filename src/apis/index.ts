import axios from 'axios';

const axiosInstance = axios.create();

export async function getChatGPTResponseAPI(message: string) {
	const response = await axiosInstance.get(('http://18.221.100.91:8011/v1/?app=chatGPT&method=isTrue&params[question]=' + message), {
			headers: {
				'Content-Type': 'application/json',
			}
		}
	)
	return response.data;
}

export async function getSolanaFeeAPI(functionName: string, param: string) {
	const response = await axiosInstance.get((`/gas-usage/${functionName}/${param}/`), {
			headers: {
				'Content-Type': 'application/json',
			}
		}
	)
	return response.data;
}