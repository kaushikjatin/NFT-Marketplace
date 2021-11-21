import React, { Component } from 'react';
import './CreateToken.styles.scss';
import {pinataApiKey, pinataSecretApiKey,url} from '../../pinataApi';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

class CreateToken extends Component
{
    constructor(props)
    {
     super(props);
     this.productName= React.createRef();
     this.productimage = React.createRef();
     this.state={
                 file:null,
                 account:props.account,
                 contract:props.contract
               };
     this.handleChange.bind(this);
   }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
     contract:nextProps.contract,
     account:nextProps.account
    };
   }
  

   handleChange(event) { this.setState({name:event.target.value})};
 
   async onSubmit(name, image) 
     {
       const FormData = require("form-data");
       const axios = require("axios");
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
       this.setState({image: `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`});
       this.state.contract.options.gas= 500000;
 
       if(res.data && res.data.IpfsHash)
       {
         let Data=await this.state.contract.methods.mint(name, res.data.IpfsHash).send({ from:this.state.account });
         Data=Data.events.nftTransaction.returnValues["nfts"]
         this.setState({file:null , name:null});
         this.props.handlestateofApp("data",Data);
         window.alert("Asset Minted Successfully!")
       }
       else 
       {
        window.alert("There was some problem in minting asset , try after some time")
       }
       
     }
 
 
   uploadFile = (event) => {
     event.preventDefault()
     this.setState({file: event.target.files[0]})
   }




  render() 
  {
    return (
        <div className='file_form'>
            <Form onSubmit={(event) => {
                        event.preventDefault()
                        const name = this.productName.value
                        const image = this.state.file
                        this.onSubmit(name, image)}}>

                <Form.Group className="mb-3" controlId="floatingInput">
                    <Form.Label>Asset Name</Form.Label>
                    <Form.Control type="text" ref={(input) => { this.productName = input }} placeholder="Enter the name of asset" name='video_name' required/>
                </Form.Group>

                <Form.Group controlId="formFileLg" className="mb-3">
                    <Form.Label>Upload A Image</Form.Label>
                    <Form.Control name='file' onChange={this.uploadFile}  ref={(input) => { this.productImage = input }}  accept='image/*' type="file" size="lg" required/>
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" className='submit_button'>
                        Submit
                    </Button>
                </div>
          </Form>
        </div>
    );
  }


}

export default CreateToken;