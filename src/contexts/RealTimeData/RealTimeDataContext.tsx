import {createContext, ReactNode, useCallback, useState} from 'react';
import {getChatGPTResponseAPI} from "../../apis";

const RealTimeDataContext = createContext<{
	message: string;
	loading: boolean;
	setMessage: (message: string) => void;
	getChatGPTResponse: () => void;
	response: boolean | null;
	error: boolean;
}>({
	message: '',
	loading: false,
	setMessage: () => {},
	getChatGPTResponse: () => {},
	response: null,
	error: false,
});

const RealTimeDataProvider = ({children}: { children: ReactNode }) => {
	const [message, setMessage] = useState('');
	const [response, setResponse] = useState<null | boolean>(null);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);

	const getChatGPTResponse = useCallback(async () => {
		setLoading(true);
		setError(false);
		setResponse(null);

		try {
			const response = await getChatGPTResponseAPI(message);
			if (response.success) {
				setResponse(response.result.data.result.answer);
			} else {
				setError(true);
			}
			setLoading(false);
		} catch (e) {
			console.log(e);
			setError(true);
			setLoading(false);
		}
	}, [message]);

	return (
		<RealTimeDataContext.Provider
			value={{
				message,
				loading,
				setMessage,
				getChatGPTResponse,
				response,
				error,
			}}
		>
			{children}
		</RealTimeDataContext.Provider>
	);
};

export {RealTimeDataProvider, RealTimeDataContext};
