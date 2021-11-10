import React, { Component } from 'react';
import './CreateToken.styles.css';
import Web3 from 'web3'
import {pinataApiKey, pinataSecretApiKey,url} from '../../pinataApi'

class CreateToken extends Component
{
    constructor(props)
    {
     super(props);
     this.productName= React.createRef();
     this.productimage = React.createRef();
     this.State={
                 file:null,
                 account:null,
                 contract:null
               };
     this.handleChange.bind(this);
   }
 
   async componentWillMount() 
   {
     await this.loadWeb3()
     await this.loadBlockchainData()
   }
 

   handleChange(event) { this.setState({name:event.target.value})};
 
   async onSubmit(name, image) 
     {
       const FormData = require("form-data");
       const axios = require("axios");
       console.log("submitting file to ipfs")
       let data = new FormData();
       data.append("file", image);
       const res =  await axios.post(url, data, {
                         maxContentLength: "Infinity", 
                         headers: {
                         "Content-Type": `multipart/form-data; boundary=${data._boundary}`,
                         pinata_api_key: pinataApiKey, 
                         pinata_secret_api_key: pinataSecretApiKey,
                         }
                     });
       console.log(res.data);
       this.setState({image: `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`});
       this.state.contract.options.gas= 500000;
 
       if(res.data && res.data.IpfsHash)
       {
         const transaction = await this.state.contract.methods.mint(name, res.data.IpfsHash).send({ from:this.state.account });
         console.log("token id generated is :", transaction)
       }
       else 
       {
         console.log('error occured while uploading the file');
       }
       
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
     const myContractJson = require('../../abis/nftContract.json')
     const web3 = window.web3
     const accounts = await web3.eth.getAccounts()
     this.setState({ account: accounts[0] })
     console.log("account no is", this.state.account)
     const contract = new web3.eth.Contract(myContractJson, "0x0E87182fF9ee1ecc2f65C88052df0c91888F5Da4");
     this.setState({ contract })
   }
 
 
   uploadFile = (event) => {
     event.preventDefault()
     this.setState({file: event.target.files[0]})
   }




  render() 
  {
    return (
      <div>

        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col d-flex text-center">
              <div className="content mr-auto ml-auto">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    <h1>upload Image here </h1>
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        const name = this.productName.value
                        const image = this.state.file
                        this.onSubmit(name, image)}}>
                                <div className="form-group mr-sm-2">
                                    <input
                                    id="productName"
                                    type="text"
                                    ref={(input) => { this.productName = input }}
                                    className="form-control"
                                    placeholder="Asset Name"
                                    required />
                                </div>
                            <div className="form-group mr-sm-2">
                                    <input
                                    id="productImage"
                                    type="file"
                                    onChange={this.uploadFile}
                                    ref={(input) => { this.productImage = input }}
                                    className="form-control"
                                    placeholder="Asset Image"
                                    required />
                                </div>
                                <button type="submit" className="btn btn-primary">Add Asset</button>
                    </form>
              </div>
            </main>
          </div>
        </div>


      </div>
    );
  }


}

export default CreateToken;