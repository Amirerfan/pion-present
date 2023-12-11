import {useContext} from 'react';
import {RealTimeDataContext} from './RealTimeDataContext.tsx';

const useRealTimeData = () => {
	const context = useContext(RealTimeDataContext);

	if (!context) {
		throw new Error('useRealTimeData must be used within a RealTimeDataProvider.');
	}

	return context;
};

export default useRealTimeData;
