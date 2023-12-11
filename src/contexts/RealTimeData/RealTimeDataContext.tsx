import {createContext, ReactNode, useCallback, useState} from 'react';
import {getChatGPTResponseAPI} from "../../apis";

const RealTimeDataContext = createContext<{
	message: string;
	loading: boolean;
	setMessage: (message: string) => void;
	getChatGPTResponse: () => void;
	response: string;
}>({
	message: '',
	loading: false,
	setMessage: () => {},
	getChatGPTResponse: () => {},
	response: '',
});

const RealTimeDataProvider = ({children}: { children: ReactNode }) => {
	const [message, setMessage] = useState('');
	const [response, setResponse] = useState('');
	const [loading, setLoading] = useState(false);

	const getChatGPTResponse = useCallback(async () => {
		setLoading(true);
		try {
			const response = await getChatGPTResponseAPI(message);
			if (response.success) {
				setResponse(response.result.data.result.answer);
			}
			setLoading(false);
		} catch (e) {
			console.log(e);
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
				response
			}}
		>
			{children}
		</RealTimeDataContext.Provider>
	);
};

export {RealTimeDataProvider, RealTimeDataContext};
