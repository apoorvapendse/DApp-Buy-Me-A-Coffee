import React, { useEffect, useState } from "react";
import './App.css';
import abiData from "./Abi";



const App: React.FC = () => {

  const [accounts, setAccounts] = useState<string[]>([]);

  const[web3,setWeb3] = useState()

  useEffect(() => {
    console.log(abiData)
    if(window.ethereum){
      window.ethereum.request({method:"eth_requestAccounts"})
      .then(()=>{
        const web3_Instance = new Web3(window.ethereum);
        setWeb3(web3_Instance);

      })
    }

  }, []);

  return (
    <div>
      <p>Buy Me A Coffee</p>
      <p className="price">0.000000001ETH</p>
      <form action="" method="post">
        <input type="email" name="email" id="" placeholder="enter your email" />
        <button >Buy with ETH</button>
      </form>
    </div>
  );
}

export default App;
