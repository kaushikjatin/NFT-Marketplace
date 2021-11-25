import React from 'react';
import sample from "./sample.jpg";
import {getUsername} from "../utils/getUsernameFromAddress"
class UserProfile extends React.Component
{
    constructor(props){
        super(props);
        //this.handleChange= this.handleChange.bind(this)
 //       this.handleSubmit= this.handleSubmit.bind(this)
        this.state={
            
            account:props.account,
            contract:props.contract,
            ownedTokens:0,
            TokensOnSale:0,
            TokensOnBid:0,
            UserName:"...",
            data:props.data,
          };
    }

     async componentDidMount(){
         await this.getUser()
        
    }

    async get_username(){
        const userName_temp= await getUsername(this.state.contract,this.state.account)
        this.setState({UserName:userName_temp.username})
    }

    handleChange = (event) => {
     //   console.log("ssfgf",event.target.value)
        this.setState({UserName: event.target.value})
      }

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
         contract:nextProps.contract,
         account:nextProps.account,
         data:nextProps.data,
        };
    }

    async getUser(){
        console.log("account:",this.state.account)
        console.log("address:",this.state.contract)
        if(this.state.account && this.state.contract){
           
            const userName_temp= await getUsername(this.state.contract,this.state.account)
            this.setState({UserName:userName_temp.username})
           
        }
        else{
            window.alert("no contract or account");
        }
        this.setState({ownedTokens:this.state.data.length})
        
        var saleCount=0;
        for(var i=0;i < this.state.data.length; i++){
            if(this.state.data[i][2] === true){
                saleCount++;
            }
        }
        this.setState({TokensOnSale:saleCount})

        var bidCount=0;
        for(var i=0;i < this.state.data.length; i++){
            if(this.state.data[i][4] === true){
                bidCount++;
            }
        }
        this.setState({TokensOnBid:bidCount})
    }

    async setUserName(name) {
        let usernameChange = await this.state.contract.methods.setUsername(name).send({from:this.state.account})
        console.log("sdfs",usernameChange)
        await this.get_username()
    }




    render()
    {
        // let viewMode = {}
        // let editMode = {}

        // if (this.state.editing) {
        // viewMode.display = "none"
        // } else {
        // editMode.display = "none"
        // }
       
        return(

                <>
                    <div className="container emp-profile">
                        <form method=" " onSubmit={(event)=> {
                            event.preventDefault()
                            const name= this.state.UserName
                            this.setUserName(name)
                        }}>
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="profile-img">
                                    <img src={sample} alt="userImage"/>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className= "profile-head">
                                        <input type="text" value={this.state.UserName} style={{width:"100%"}} onChange={this.handleChange}/>
                                        <button type="submit"> update </button>
                                    
                                        {/* <h5>Arjun Sehrawat</h5> */}
                                        <p className="profile-rating mt-3 mb-5">POPULARITY: <span>1/10</span></p>
                                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Home</button>
                                            </li>
                                            <li className="nav-item" role="presentation">
                                                <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Profile</button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>

                                <div className= "col-md-2">
                                    <input type="submit" onClick={this.changeEditMode} className="profile-edit-btn" name="btnAddMore" value="Edit Profile"/>
                                </div>
                            </div>

                            <div className="row">
                                {/* left side url */}
                                <div className="col-md-4">
                                    <div className="profile-work">
                                        <p> WORK LINK</p>
                                        <a href="" target = "_blank"></a> <br/>
                                    </div>
                                </div>

                                {/* right side data */}
                                <div className ="col-md-8 pl-5 about-info">
                                    <div className="tab-content" id="myTabContent">
                                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>USER ID</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{this.state.account}</p>
                                                </div>   
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>USER NAME</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{this.state.UserName}</p>
                                                </div>   
                                            </div>  
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>USER BALANCE</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{this.state.ownedTokens}</p>
                                                </div>   
                                            </div>    
                                        </div>

                                        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <label>TOKENS OWNED</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{this.state.ownedTokens}</p>
                                                </div>   
                                            </div>
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>TOKENS ON SALE</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{this.state.TokensOnSale}</p>
                                                </div>   
                                            </div>  
                                            <div className="row mt-3">
                                                <div className="col-md-6">
                                                    <label>TOKENS ON BID</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <p>{this.state.TokensOnBid}</p>
                                                </div>   
                                            </div>    
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </form>
                    </div>
                
                </>

        )
    }
}


export default (UserProfile);