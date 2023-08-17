let abiData = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_cost",
                "type": "uint256"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "string",
                "name": "useremail",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "useraddress",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "useramount",
                "type": "uint256"
            }
        ],
        "name": "paymentMade",
        "type": "event"
    },
    {
        "inputs": [],
        "name": "ItemCost",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "allPayments",
        "outputs": [
            {
                "internalType": "address",
                "name": "buyerAddress",
                "type": "address"
            },
            {
                "internalType": "string",
                "name": "email",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPaymentDetails",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "buyerAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "email",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct PaymentContract.Payment",
                "name": "userPayment",
                "type": "tuple"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_email",
                "type": "string"
            }
        ],
        "name": "makePayment",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "showPayments",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address",
                        "name": "buyerAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "string",
                        "name": "email",
                        "type": "string"
                    },
                    {
                        "internalType": "uint256",
                        "name": "amount",
                        "type": "uint256"
                    }
                ],
                "internalType": "struct PaymentContract.Payment[]",
                "name": "payments",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "withdraw",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
]

export default abiData;