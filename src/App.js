import {Route,Routes} from 'react-router-dom';
import CreateToken from './components/CreateToken/CreateToken.component';
import Navbar from './components/NavBar/NavBar.component';
import MarketPlace from "./containers/marketPlace.jsx";
import ItemPage from './components/ItemPage/ItemPage.component';
import React ,{Component}from 'react';
import Web3 from 'web3';
import './App.css';

class App extends Component
{
  constructor(props)   
  {
    super(props)
    this.handlestateofApp.bind(this);
    this.state={
      data:[],
      account:null,
      contract:null
    }
  }

  handlestateofApp=(name , value)=>{
    console.log("Function called");
    console.log("hbkbdadbakd",this);
    console.log("chsiuv",this.state);
    this.setState({[name]:value});
    console.log("sacha",this.state);
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
     console.log("called here");
     const myContractJson = require('./abis/nftContract.json')
     const web3 = window.web3
     const accounts = await web3.eth.getAccounts()
     const contract = new web3.eth.Contract(myContractJson,"0x607440580FF612Ff20c159a2341bCF4390909094");
     const Data= await contract.methods.alltokens().call();
     this.setState({ contract :contract , account:accounts[0], data:Data})
   }

  render()
  {
    return (
            <div className="App">
            <Navbar></Navbar>
            <Routes>
                <Route exact path='/' element={<CreateToken contract={this.state.contract} account={this.state.account} handlestateofApp={this.handlestateofApp}/>}></Route>
                <Route exact path='/all_tokens' element={<MarketPlace contract={this.state.contract} account={this.state.account} data={this.state.data}></MarketPlace>} ></Route>
                <Route exact path='/your_tokens' element={<MarketPlace contract={this.state.contract} account={this.state.account} data={this.state.data.filter((nft)=>{return nft.owner===this.state.account})}></MarketPlace>}></Route>
                <Route exact path='/all_tokens/:index' element={<ItemPage contract={this.state.contract} account={this.state.account} data={this.state.data} handlestateofApp={this.handlestateofApp}/>}></Route>
            </Routes>
           </div>
           )
  }
}

export default App;