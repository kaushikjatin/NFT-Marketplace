import {Route,Routes} from 'react-router-dom';
import CreateToken from './components/CreateToken/CreateToken.component';
import Navbar from './components/NavBar/NavBar.component';
import MarketPlace from "./containers/marketPlace.jsx";
import React ,{Component}from 'react';
import Web3 from 'web3';
import './App.css';

class App extends Component
{
  constructor(props)   
  {
    super(props)
    this.state={
      contract:null,
      account:null,
      data:null
    }
  }

  handlestate=(name , value)=>{
    this.setState({[name]:value});
  }

  async componentDidMount() 
   {
     await this.loadWeb3()
     await this.loadBlockchainData()
   }

   async loadWeb3() 
   {
     if (window.ethereum) 
     {
       window.web3 = new Web3(window.ethereum)
       await window.ethereum.enable()
     }
     else if (window.web3) 
       window.web3 = new Web3(window.web3.currentProvider)
     else 
       window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
   }

   async loadBlockchainData() 
   {
     const myContractJson = require('./abis/nftContract.json')
     const web3 = window.web3
     const accounts = await web3.eth.getAccounts()
     const contract = new web3.eth.Contract(myContractJson, "0x910901799dfC01286373178Ae840D4e944E9194a");
     const Data= await contract.methods.alltokens().call();
     this.setState({ contract :contract , account:accounts[0], data:Data})
   }

  render()
  {
    return (
            <div className="App">
            <Navbar></Navbar>
            <Routes>
                <Route exact path='/' element={<CreateToken contract={this.state.contract} account={this.state.account}/>}></Route>
                <Route  path='/all_tokens' element={<MarketPlace contract={this.state.contract} account={this.state.account} data={this.state.data}></MarketPlace>} ></Route>
                <Route exact path='/your_tokens' element={<CreateToken contract={this.state.contract} account={this.state.account}/>}></Route>
                <Route exact path='/mytoken/:index' element={<CreateToken contract={this.state.contract} account={this.state.account}/>}></Route>
            </Routes>
           </div>
           )
  }
}

export default App;