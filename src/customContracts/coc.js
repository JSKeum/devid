const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_admin",
				"type": "address"
			},
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
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "read",
		"outputs": [
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			},
			{
				"internalType": "uint64",
				"name": "_senderPhoneNumber",
				"type": "uint64"
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
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "readWithTimestamp",
		"outputs": [
			{
				"internalType": "address",
				"name": "_sender",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_recipient",
				"type": "address"
			},
			{
				"internalType": "uint64",
				"name": "_senderPhoneNumber",
				"type": "uint64"
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
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

module.exports = {
    abi
}
