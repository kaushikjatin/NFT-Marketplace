import React, { Component } from 'react';
import { Container, Typography} from "@material-ui/core";
import MarketTab from "../components/marketCard/marketTap";



class MarketPlace extends Component {

  constructor(props)
  {
   super(props);
   this.state={
               account:props.account,
               contract:props.contract,
               data:null
             };
 }

static getDerivedStateFromProps(nextProps) {
  return {
   contract:nextProps.contract,
   account:nextProps.account
  };
 }

 
  loaddata= async ()=>{
    if(this.state.contract!=null && this.state.data==null)
    {
      const Data= await this.state.contract.methods.alltokens().call();
      this.setState({data:Data})
    }
  }



  render()
  {
    this.loaddata();
    return (
      <Container maxWidth="md">
        {
          this.state.data?
          (
            <div>
              <Typography variant="h4" style={{ marginBottom: 20, marginTop: 30 }}>MarketPlace</Typography>
              <MarketTab data={this.state.data} style={{ marginTop: 10 }} /> 
            </div>
          ):
          (   <div></div>)
        }
      </Container>
    )
  }
}

export default MarketPlace;