import React, { useState } from "react";
import { Avatar, Button, Tab, Tabs, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { FusePageSimple, FuseAnimate } from "@fuse";

const useStyles = makeStyles((theme) => ({
  layoutHeader: {
    height: 320,
    minHeight: 320,
    [theme.breakpoints.down("md")]: {
      height: 240,
      minHeight: 240,
    },
  },
}));

function EventsPage() {
  const classes = useStyles();
  const [selectedTab, setSelectedTab] = useState(0);

  function handleTabChange(event, value) {
    setSelectedTab(value);
  }

  return (
    <FusePageSimple
      classes={{
        header: classes.layoutHeader,
        toolbar: "px-16 sm:px-24",
      }}
      header={
        <div className="p-24 flex flex-1 flex-col items-center justify-center md:flex-row md:items-end">
          <div className="flex flex-1 flex-col items-center justify-center md:flex-row md:items-center md:justify-start">
            <FuseAnimate animation="transition.expandIn" delay={300}>
              <Avatar
                className="w-96 h-96"
                src="assets/images/avatars/Velazquez.jpg"
              />
            </FuseAnimate>
            <FuseAnimate animation="transition.slideLeftIn" delay={300}>
              <Typography className="md:ml-24" variant="h4" color="inherit">
               Events
              </Typography>
            </FuseAnimate>
          </div>

          
        </div>
      }
     
      content={
        <div className="p-16 sm:p-24">
         
        </div>
      }
    />
  );
}

export default EventsPage;