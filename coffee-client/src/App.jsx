import React, { useEffect, useState,BrowserRouter,Routes,Route } from "react";
import './App.css';
import abiData from "./Abi";
import AdminPage from './AdminPage';



const App = () => {

  const [accounts, setAccounts] = useState([]);
  const[purchases,setPurchases] = useState([])
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

  function fetchPayments(){
    console.log(coffeeContract.methods.allPayments)
    coffeeContract.methods.showPayments().call()
    .then(values=>{
      setPurchases(values);
    })
  }
  useEffect(()=>{
    if(web3 && coffeeContract){
      fetchPayments();
      console.log(purchases)
    }
  },[web3,coffeeContract])

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
      <p style={{textAlign:"center"}}>Buy Me A Coffee</p>
      <p className="price">{coffeeCost}ETH</p>
   <div className="container">


        <input type="email" name="email" id="" placeholder="enter your email" value={email} onChange={(e)=>{setEmail(e.target.value)}} />
        <button onClick={buyCoffee}>Buy with ETH</button>
   </div>


      <div
        style=
        {{
          marginTop:"50px",

          color: "white",
          textAlign: "center",
          display: "flex",
          justifyContent:"center",
          alignItems:"center",
          flexDirection: "column",
          gap: "5px",
          height: "30vh",
          overflowY: "scroll",
          width: "100vw"


        }}>
          <h1>My Contributors</h1>
          
          <span style={{fontStyle:"italic",marginBottom:"30px"}}>(scroll to see more)</span>
        {purchases.map((purchase) => {
          return (
        <span>{purchase.email}</span>
      )
        })}

        </div>
    
   
    </div>
  );
}

export default App;
