// SPDX-License-Identifier: MIT
pragma solidity 0.8.1;

        contract PaymentContract
        {
        
        uint256 public ItemCost;
        address private _owner;

        struct Payment{
            address buyerAddress;
            string email;
            uint amount;
        }

        Payment[] public allPayments;

        //constructor is called when the smart contract is delpyed
        constructor(uint256 _cost) {
        _owner = msg.sender;
        ItemCost = _cost;
        }

        modifier checkOwner(){
            require(msg.sender == _owner,"Only owner can call this function");
            _;
        }
            //this event will send the following 
        event paymentMade(string useremail, address useraddress, uint useramount );

        function makePayment(string memory _email) external payable  {
            //checking if course is already brought
            for(uint i = 0 ; i < allPayments.length;i++){
                require(msg.sender != allPayments[i].buyerAddress,"Course Already Brought");    
            }
            require(msg.value>=ItemCost,"Amount is inaccurate");
            //create an object for new payment
            Payment memory newPayment = Payment({
                buyerAddress:msg.sender,
                email:_email,
                amount:msg.value
            });
            allPayments.push(newPayment);
            //sends message to centralised backend server about payment made
            emit paymentMade(_email,msg.sender,msg.value);
        }

        function withdraw() external payable checkOwner{
            payable(msg.sender).transfer(address(this).balance);
            //transfers all the money on the smart contract to the owner
        }   

        function showPayments() external view returns(Payment[] memory  payments  ){
            
             Payment[] memory paymentsTillNow = new Payment[](allPayments.length);
            for(uint i = 0 ; i < allPayments.length;i++){
                paymentsTillNow[i] = allPayments[i];
            }
            return paymentsTillNow;

        }

        function getPaymentDetails() external view returns(Payment memory userPayment){
            for(uint i = 0 ; i < allPayments.length;i++){
                if(msg.sender==allPayments[i].buyerAddress){
                    return allPayments[i];
                }
            }

            //basically a null pointer
        }

        


        
}