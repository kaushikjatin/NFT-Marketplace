import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack'
import './OwnerComponent.styles.scss'

class OwnerComponent extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            data:props.data,
            sellingprice:0,
            account:props.account,
            contract:props.contract
        }
    }


  static getDerivedStateFromProps(nextProps) {
    let Data=null;
    if(nextProps.data!=null)
      Data=nextProps.data
    return {
     contract:nextProps.contract,
     account:nextProps.account,
     data:Data
    };
  }

    handlechange=(event)=>{
        this.setState({sellingprice:event.target.value})
    }

    handleSaleSubmit=async (event)=>{
        event.preventDefault();
        this.props.handlestateofApp("spinner",true);
        let Data=await this.state.contract.methods.putOnSale(this.state.data.token_id,this.state.sellingprice).send({ from:this.state.account });
        Data=Data.events.nftTransaction.returnValues["nfts"]
        this.setState({sellingprice:null})
        this.props.handlestateofApp("data",Data);
        
    }

    handleAuctionClick= async (event)=>{
        event.preventDefault();
        this.props.handlestateofApp("spinner",true);
        let Data=await this.state.contract.methods.putOnAuction(this.state.data.token_id).send({ from:this.state.account });
        Data=Data.events.nftTransaction.returnValues["nfts"]
        this.props.handlestateofApp("data",Data);
    }

    handleCancelSale= async (event)=>{
        event.preventDefault();
        this.props.handlestateofApp("spinner",true);
        let Data=await this.state.contract.methods.cancelSale(this.state.data.token_id).send({ from:this.state.account });
        Data=Data.events.nftTransaction.returnValues["nfts"]
        this.props.handlestateofApp("data",Data);
    }


    handleAcceptBid= async (event)=>{
        event.preventDefault();
        this.props.handlestateofApp("spinner",true);
        let Data=await this.state.contract.methods.acceptHighestBid(this.state.data.token_id).send({ from:this.state.account });
        Data=Data.events.nftTransaction.returnValues["nfts"]
        this.props.handlestateofApp("data",Data);
    }


    render()
    {
        if(this.state.data.isOnSale)
        {
            return(
                <Stack direction="horizontal" gap={3}>
                            <div>Sell Price :: {this.state.data.sellPrice} wei</div>
                            <Button variant="secondary" className="ms-auto" onClick={this.handleCancelSale}>Cancel Sale</Button>
                </Stack>
            )
        }
        else if(this.state.data.isBiddable)
        {
            return(
                <Stack direction="horizontal" gap={3}>
                          <div>Max Bid :: {this.props.data.maxBid}</div>
                          <Button variant="secondary" className="ms-auto" onClick={this.handleAcceptBid}>Accept Bid</Button>
                </Stack>
            )
        }
        return(
            <div className='main_form'>
                <Form onSubmit={this.handleSaleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Selling Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter Selling Price" onChange={this.handlechange}/>
                        <Form.Text className="text-muted">
                         Buyer will pay these ether into your marketplace account
                        </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit">Put On Sale</Button>
                </Form>

                <br/>
                <h1>OR</h1>
                <br/>
                <Button variant="primary" onClick={this.handleAuctionClick}>Put On Auction</Button>
            </div> 
        )
    }
}

export default OwnerComponent