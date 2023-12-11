import {useContext} from 'react';
import {CostEfficiencyContext} from './CostEfficiencyContext.tsx';

const useCostEfficiency = () => {
	const context = useContext(CostEfficiencyContext);

	if (!context) {
		throw new Error('useCostEfficiency must be used within a CostEfficiencyContextProvider.');
	}

	return context;
};

export default useCostEfficiency;
