import React from "react";
import Figure from 'react-bootstrap/Figure';
import { Container } from "react-bootstrap";
import OwnerComponent from "../OwnerComponent/OwnerComponent.components";
import ViewerComponent from "../ViewerComponent/ViewerComponent.jsx";
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
              <div className='fullinfo'>
                <img className='image' height={500} alt="171x180" src={"https://gateway.pinata.cloud/ipfs/"+this.state.data.cid}/>
                <div className='rightsideinfo'>
                  <div className='assetname'>{this.state.data.name}</div>
                  <div className='description'>Description: {this.state.data.description}</div>
                  <div>Created At:{new Date(parseInt(this.state.data.time)).toString()}</div>
                </div>
              </div>
              <br/>

              {
                (this.state.data.owner===this.state.account)?(
                  <OwnerComponent data={this.state.data} handlestateofApp={this.props.handlestateofApp} contract={this.state.contract}  account={this.state.account}></OwnerComponent>
                ):( 
                  <ViewerComponent data={this.state.data} handlestateofApp={this.props.handlestateofApp} contract={this.state.contract}  account={this.state.account}></ViewerComponent>
                )
              }

          

                <br/><br/>  <br/><br/>  <br/><br/>

            
            </Container>
       )
   }
}


export default ItemPage