import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {Card, CardActionArea, CardMedia, Tooltip, Typography} from "@material-ui/core/";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PanToolSharpIcon from "@material-ui/icons/PanToolSharp";
import LocalOfferSharpIcon from "@material-ui/icons/LocalOfferSharp";
import { Grid} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#080808",
    maxWidth: 345,
    borderRadius: 8,
    color: "#f1ffe3",
    maxHeight: 395,
    "&:hover": {
      boxShadow:
        "0 1px 3px rgba(255,255,255,0.12), 0 1px 3px rgba(255,255,255,0.24)",
      transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
    },
  },
  media: {
    height: 220,
    width: "100%",
    borderRadius: 5,
    transition: "transform 0.15s ease-in-out",
    "&:hover": {
      transform: "scale3d(1.05, 1.05, 1)",
    },
  },
  bidPriceInfoContainer: {
    marginLeft: 15,
  },
  myButton: {
    color: "#00D54B",
    backgroundColor: "#080808",
    height: 23,
    position: "relative",
    top: 7,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 12,
    borderRadius: 5,
    border: "1px solid",
    borderColor: "#00D54B",
    "&:hover": {
      backgroundColor: "#00D54B",
      borderColor: "#00D54B",
      color: "#000",
    },
  },
});


const MyTooltip = withStyles((theme) => ({
  tooltip: {fontSize: 20},
}))(Tooltip);

const MarketCard = ({name,cid,isOnSale,sellPrice,isBiddable,maxBid,}) => {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <Grid container>
        <Grid item xs>
          <CardActionArea
            disableRipple
            onClick={() => {
              window.location.href ="https://gateway.pinata.cloud/ipfs/"+cid ;
            }}
          >
            <Grid container>
              <CardMedia
                className={classes.media}
                image={"https://gateway.pinata.cloud/ipfs/"+cid} 
                title={name}
              />
            </Grid>
            <Grid container direction="column" style={{ marginTop: 15 }}>
              <Grid item style={{ marginLeft: 15, marginBottom: 6 }}>
                
                <Typography    gutterbottom="true" variant="h6" component="h1">
                  {name}
                </Typography>
              </Grid>
              <Grid item style={{ alignSelf: "flex-start", marginLeft: 15 }}>
                <div style={{ textAlign: "left" }}>
                  <div>
                    <LocalOfferSharpIcon
                      style={{
                        verticalAlign: "middle",
                        marginRight: 5,
                        fontSize: 20,
                      }}
                    />
                    <MyTooltip title={window.web3.utils.fromWei(sellPrice.toString())} arrow>
                      <Typography variant="caption">
                        Price: {isOnSale ? window.web3.utils.fromWei(sellPrice.toString()).slice(0,5) + " Ξ" : "-"}
                      </Typography>
                    </MyTooltip>
                  </div>
                </div>
                <div style={{ marginTop: 7, textAlign: "left" }}>
                  <div>
                    <PanToolSharpIcon
                      style={{
                        verticalAlign: "middle",
                        marginRight: 5,
                        fontSize: 20,
                      }}
                    />
                    <MyTooltip title={window.web3.utils.fromWei(maxBid.toString())} arrow>
                      <Typography variant="caption">
                        Highest bid: {isBiddable ? window.web3.utils.fromWei(maxBid.toString()).slice(0,5) + " Ξ" : "-"}
                      </Typography>
                    </MyTooltip>
                  </div>
                </div>
              </Grid>
            </Grid>
          </CardActionArea>
          <Grid container style={{ marginTop: 13, marginBottom: 5 }}>
            <div className={classes.bidPriceInfoContainer}>
              <AccountCircleIcon
                style={{
                  verticalAlign: "middle",
                  marginRight: 4,
                  fontSize: 24,
                }}
              />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default MarketCard;