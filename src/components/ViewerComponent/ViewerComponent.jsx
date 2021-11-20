import React from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/Stack'
import './ViewerComponent.styles.scss'

class ViewerComponent extends React.Component
{
    constructor(props)
    {
        super(props)
        this.state={
            data:props.data,
            bidprice:0,
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
        this.setState({bidprice:event.target.value})
    }

    handleBidSubmit=async (event)=>{
        event.preventDefault();
        let Data=await this.state.contract.methods.bid(this.state.data.token_id).send({ from:this.state.account,value:this.state.bidprice});
        Data=Data.events.nftTransaction.returnValues["nfts"]
        this.props.handlestateofApp("data",Data);
        
    }

   
    handleBuyItem= async (event)=>{
        event.preventDefault();
        let Data=await this.state.contract.methods.buyFromSale(this.state.data.token_id).send({ from:this.state.account , value:this.state.data.sellPrice+1});
        Data=Data.events.nftTransaction.returnValues["nfts"]
        this.props.handlestateofApp("data",Data);
    }


    render()
    {
        if(this.state.data.isOnSale)
        {
            return(
                <div className="bg-light border">
                          <Stack direction="horizontal" gap={3}>
                                <div>{this.state.data.sellPrice}</div>
                                <Button variant="secondary" className="ms-auto" onClick={this.handleBuyItem}>Buy Item</Button>
                          </Stack>
                </div>
            )
        }
        else if(this.state.data.isBiddable)
        {
            return(

                <div className='main_form'>
                    <div>Max Bid :: {this.state.data.maxBid}</div>
                    <br/><br/>
                    <Form onSubmit={this.handleBidSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Enter Your Bid Price</Form.Label>
                            <Form.Control className="me-auto" type="number" placeholder="Your Bid Price..." onChange={this.handlechange}/>
                            <Form.Text className="text-muted">This amount will be deducted from your metamask account</Form.Text>
                        </Form.Group>
                        <Button variant="primary" className="ms-auto" type="submit">Place Your Bid</Button>
                    </Form>
                </div>
            )
        }
        return(
            <div>
                This Item is Not for Selling or Auction
            </div> 
        )
    }
}

export default ViewerComponent