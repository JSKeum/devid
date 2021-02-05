const address = "0x50a575B4b9440437e3EC31b069Ed07C36e988AF2";

const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "uint64",
				"name": "_phoneNumber",
				"type": "uint64"
			}
		],
		"name": "addCOCUser",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			},
			{
				"internalType": "uint64",
				"name": "_senderPhoneNumber",
				"type": "uint64"
			},
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			},
			{
				"internalType": "uint64",
				"name": "_recipientPhoneNumber",
				"type": "uint64"
			},
			{
				"internalType": "string",
				"name": "_cocHash",
				"type": "string"
			}
		],
		"name": "createCOC",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			}
		],
		"name": "getReceivedCOCs",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_cocAddresses",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			}
		],
		"name": "getSentCOCs",
		"outputs": [
			{
				"internalType": "address[]",
				"name": "_cocAddresses",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint64",
				"name": "_userPhoneNumber",
				"type": "uint64"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"internalType": "address",
				"name": "_address",
				"type": "address"
			},
			{
				"internalType": "uint64",
				"name": "_phoneNumber",
				"type": "uint64"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

module.exports = {
    address,
    abi
}
