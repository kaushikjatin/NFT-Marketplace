import React from "react";
import './ItemPage.styles.scss';

class ItemPage extends React.Component
{
    constructor(props)
    {
     super(props);
     this.state={
                 account:props.account,
                 contract:props.contract
               };
     this.handleChange.bind(this);
   }

  static getDerivedStateFromProps(nextProps) {
    return {
     contract:nextProps.contract,
     account:nextProps.account
    };
   }


   render()
   {
       return(
           <div>
              
           </div>
       )
   }
}


export default ItemPage