import React from "react";
import Figure from 'react-bootstrap/Figure';
import { Container } from "react-bootstrap";
import Stack from 'react-bootstrap/Stack';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import OwnerComponent from "../OwnerComponent/OwnerComponent.components";


import './ItemPage.styles.scss';

class ItemPage extends React.Component
{
    constructor(props)
    {
     super(props);
     this.state={}
   }



  static getDerivedStateFromProps(nextProps) {
    let Data=null;
    if(nextProps.data!=null)
      Data=nextProps.data[window.location.href.charAt(window.location.href.length-1)-1]
    return {
     contract:nextProps.contract,
     account:nextProps.account,
     data:Data
    };
  }






   render()
   {
     if(!this.state.data)
      return (<div></div>)
     else
       return(
           <Container>
              <br/> 
              <Figure>
                <Figure.Image
                  width={400}
                  alt="171x180"
                  src={"https://gateway.pinata.cloud/ipfs/"+this.state.data.cid}
                />
              </Figure>

              {
                (this.state.data.owner===this.state.account)?(
                  <OwnerComponent data={this.state.data} handlestateofApp={this.props.handlestateofApp} contract={this.state.contract}  account={this.state.account}></OwnerComponent>
                ):( 
                 <Stack direction="horizontal" gap={3}>
                    {
                      (this.state.data.isOnSale)?(
                        <div className="bg-light border">
                          <Stack direction="horizontal" gap={3}>
                                <div>Sell Price :: 0.1eth </div>
                                <Button variant="secondary" className="ms-auto">Buy Item</Button>
                          </Stack>
                      </div>
                      ):(
                        <div className="bg-light border ms-auto">
                            <Stack direction="horizontal" gap={3}>
                                <div>Max Bid :: {this.state.data.maxBid}</div>
                            </Stack>
                            <br/><br/>
                            <Stack direction="horizontal" gap={3}>
                                <Form.Control className="me-auto" type="number" placeholder="Your Bid Price..." />
                                  <Button variant="secondary" className="ms-auto">Place Your Bid</Button>
                            </Stack>
                        </div>
                      )
                    }
                  </Stack>
                )
              }

          

                <br/><br/>  <br/><br/>  <br/><br/>

            
            </Container>
       )
   }
}


export default ItemPage