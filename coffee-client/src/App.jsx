import React, { useEffect, useState } from "react";
import './App.css';
import abiData from "./Abi";



const App = () => {

  const [accounts, setAccounts] = useState([]);

  const[web3,setWeb3] = useState()
  const[coffeeContract,setCoffeeContract] = useState()
  const [coffeeCost,setCoffeeCost] = useState();
  const contractAddress = "0x5913461443aCE649AcDba032650b3f31003c6E5c"
  const[email,setEmail] = useState();
  
  console.log(email)
  useEffect(() => {
    
    if(window.ethereum){
      window.ethereum.request({method:"eth_requestAccounts"})
      .then(()=>{
        const web3_Instance = new Web3(window.ethereum);
        setWeb3(web3_Instance);
        const coffeeInstance = new web3_Instance.eth.Contract(abiData,contractAddress);
        setCoffeeContract(coffeeInstance);


        //get coffee price from the contract 
        coffeeInstance.methods.ItemCost().call()
        .then(
          cost=>{
            console.log(cost);
            setCoffeeCost(web3_Instance.utils.fromWei(cost,"ether"));
          }
        )
        .catch(err=>{
          console.log(err);
        })

      })
    }

  }, []);

  const buyCoffee = async () => {
    if (!web3 || !coffeeContract) return;
    const userAccounts = await web3.eth.getAccounts();
    coffeeContract.methods.makePayment(email).send({ from: userAccounts[0], value: web3.utils.toWei(coffeeCost, 'ether') })
    .on("transactionHash",hash=>{console.log("transaction hash:",hash)})
    .on("receipt",receipt=>{console.log("transaction receipt:",receipt)})
    .on("error",err=>{console.log(err)})
  }


  return (
    <div>
      <p>Buy Me A Coffee</p>
      <p className="price">{coffeeCost}ETH</p>
   <div className="container">


        <input type="email" name="email" id="" placeholder="enter your email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        <button onClick={buyCoffee}>Buy with ETH</button>
   </div>
    
    </div>
  );
}

export default App;
