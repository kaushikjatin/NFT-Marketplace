import {Route,Routes} from 'react-router-dom';
import CreateToken from './components/CreateToken/CreateToken.component';
import Navbar from './components/NavBar/NavBar.component';
import MarketPlace from "./containers/marketPlace.jsx";
import ItemPage from './components/ItemPage/ItemPage.component';
import React ,{Component}from 'react';
import Web3 from 'web3';
import './App.css';
import Home from './components/home/home.component';
import UserProfile from '../src/UserProfile/UserProfile';
import Spinner from 'react-bootstrap/Spinner'

class App extends Component
{
  constructor(props)   
  {
    super(props)
    this.handlestateofApp.bind(this);
    this.state={
      data:[],
      account:null,
      contract:null,
      spinner:false
    }
  }

  handlestateofApp=(name , value)=>{
    if(name=='spinner')
      this.setState({[name]:value});
    else 
      this.setState({[name]:value , spinner:false})
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
     const contract = new web3.eth.Contract(myContractJson,"0x20C899F27F6700F6E0928d94Fc8625528cEE425B");
     const Data= await contract.methods.alltokens().call();
     this.setState({ contract :contract , account:accounts[0], data:Data})
   }

  render()
  {
    return (
            <div className="App">
            <Navbar></Navbar>
            {
              (this.state.spinner)?(
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              ):(<div/>)
            }
            <Routes>
                <Route path='/upload' element={<CreateToken contract={this.state.contract} account={this.state.account} handlestateofApp={this.handlestateofApp}/>}></Route>
                <Route  path='/Home' element={<Home contract={this.state.contract} account={this.state.account} data={this.state.data}></Home>} ></Route>
                <Route exact path='/all_tokens' element={<MarketPlace contract={this.state.contract} account={this.state.account} data={this.state.data}></MarketPlace>} ></Route>
                <Route exact path='/profile' element={<UserProfile contract={this.state.contract} account={this.state.account} data={this.state.data.filter((nft)=>{return nft.owner===this.state.account})}></UserProfile>} ></Route>
                <Route exact path='/your_tokens' element={<MarketPlace contract={this.state.contract} account={this.state.account} data={this.state.data.filter((nft)=>{return nft.owner===this.state.account})} ></MarketPlace>}></Route>
                <Route exact path='/all_tokens/:index' element={<ItemPage contract={this.state.contract} account={this.state.account} data={this.state.data} handlestateofApp={this.handlestateofApp}/>}></Route>
            </Routes>
           </div>
           )
  }
}

export default App;