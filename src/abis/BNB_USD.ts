export const bnbUsdAbi = [{
	"inputs": [{
		"internalType": "address",
		"name": "_aggregator",
		"type": "address"
	}, {"internalType": "address", "name": "_accessController", "type": "address"}],
	"stateMutability": "nonpayable",
	"type": "constructor"
}, {
	"anonymous": false,
	"inputs": [{"indexed": true, "internalType": "int256", "name": "current", "type": "int256"}, {
		"indexed": true,
		"internalType": "uint256",
		"name": "roundId",
		"type": "uint256"
	}, {"indexed": false, "internalType": "uint256", "name": "updatedAt", "type": "uint256"}],
	"name": "AnswerUpdated",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{"indexed": true, "internalType": "uint256", "name": "roundId", "type": "uint256"}, {
		"indexed": true,
		"internalType": "address",
		"name": "startedBy",
		"type": "address"
	}, {"indexed": false, "internalType": "uint256", "name": "startedAt", "type": "uint256"}],
	"name": "NewRound",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{"indexed": true, "internalType": "address", "name": "from", "type": "address"}, {
		"indexed": true,
		"internalType": "address",
		"name": "to",
		"type": "address"
	}],
	"name": "OwnershipTransferRequested",
	"type": "event"
}, {
	"anonymous": false,
	"inputs": [{"indexed": true, "internalType": "address", "name": "from", "type": "address"}, {
		"indexed": true,
		"internalType": "address",
		"name": "to",
		"type": "address"
	}],
	"name": "OwnershipTransferred",
	"type": "event"
}, {
	"inputs": [],
	"name": "acceptOwnership",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [],
	"name": "accessController",
	"outputs": [{"internalType": "contract AccessControllerInterface", "name": "", "type": "address"}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "aggregator",
	"outputs": [{"internalType": "address", "name": "", "type": "address"}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{"internalType": "address", "name": "_aggregator", "type": "address"}],
	"name": "confirmAggregator",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [],
	"name": "decimals",
	"outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "description",
	"outputs": [{"internalType": "string", "name": "", "type": "string"}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{"internalType": "uint256", "name": "_roundId", "type": "uint256"}],
	"name": "getAnswer",
	"outputs": [{"internalType": "int256", "name": "", "type": "int256"}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{"internalType": "uint80", "name": "_roundId", "type": "uint80"}],
	"name": "getRoundData",
	"outputs": [{"internalType": "uint80", "name": "roundId", "type": "uint80"}, {
		"internalType": "int256",
		"name": "answer",
		"type": "int256"
	}, {"internalType": "uint256", "name": "startedAt", "type": "uint256"}, {
		"internalType": "uint256",
		"name": "updatedAt",
		"type": "uint256"
	}, {"internalType": "uint80", "name": "answeredInRound", "type": "uint80"}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{"internalType": "uint256", "name": "_roundId", "type": "uint256"}],
	"name": "getTimestamp",
	"outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "latestAnswer",
	"outputs": [{"internalType": "int256", "name": "", "type": "int256"}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "latestRound",
	"outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "latestRoundData",
	"outputs": [{"internalType": "uint80", "name": "roundId", "type": "uint80"}, {
		"internalType": "int256",
		"name": "answer",
		"type": "int256"
	}, {"internalType": "uint256", "name": "startedAt", "type": "uint256"}, {
		"internalType": "uint256",
		"name": "updatedAt",
		"type": "uint256"
	}, {"internalType": "uint80", "name": "answeredInRound", "type": "uint80"}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "latestTimestamp",
	"outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "owner",
	"outputs": [{"internalType": "address payable", "name": "", "type": "address"}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{"internalType": "uint16", "name": "", "type": "uint16"}],
	"name": "phaseAggregators",
	"outputs": [{"internalType": "contract AggregatorV2V3Interface", "name": "", "type": "address"}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "phaseId",
	"outputs": [{"internalType": "uint16", "name": "", "type": "uint16"}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{"internalType": "address", "name": "_aggregator", "type": "address"}],
	"name": "proposeAggregator",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [],
	"name": "proposedAggregator",
	"outputs": [{"internalType": "contract AggregatorV2V3Interface", "name": "", "type": "address"}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{"internalType": "uint80", "name": "_roundId", "type": "uint80"}],
	"name": "proposedGetRoundData",
	"outputs": [{"internalType": "uint80", "name": "roundId", "type": "uint80"}, {
		"internalType": "int256",
		"name": "answer",
		"type": "int256"
	}, {"internalType": "uint256", "name": "startedAt", "type": "uint256"}, {
		"internalType": "uint256",
		"name": "updatedAt",
		"type": "uint256"
	}, {"internalType": "uint80", "name": "answeredInRound", "type": "uint80"}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [],
	"name": "proposedLatestRoundData",
	"outputs": [{"internalType": "uint80", "name": "roundId", "type": "uint80"}, {
		"internalType": "int256",
		"name": "answer",
		"type": "int256"
	}, {"internalType": "uint256", "name": "startedAt", "type": "uint256"}, {
		"internalType": "uint256",
		"name": "updatedAt",
		"type": "uint256"
	}, {"internalType": "uint80", "name": "answeredInRound", "type": "uint80"}],
	"stateMutability": "view",
	"type": "function"
}, {
	"inputs": [{"internalType": "address", "name": "_accessController", "type": "address"}],
	"name": "setController",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [{"internalType": "address", "name": "_to", "type": "address"}],
	"name": "transferOwnership",
	"outputs": [],
	"stateMutability": "nonpayable",
	"type": "function"
}, {
	"inputs": [],
	"name": "version",
	"outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
	"stateMutability": "view",
	"type": "function"
}] as const;