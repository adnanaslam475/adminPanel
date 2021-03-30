import React from "react";
import { Icon, Typography } from "@material-ui/core";
import { FuseExample, FusePageSimple } from "@fuse";
// import { Link } from "react-router-dom";

/* eslint import/no-webpack-loader-syntax: off */

function FuseChipSelectDoc() {
  return (
    <FusePageSimple
      header={
        <div className="flex flex-1 items-center justify-between p-24">
          <div className="flex flex-col">
            <div className="flex items-center mb-16">
              <Icon className="text-18" color="action">
                home
              </Icon>
              <Icon className="text-16" color="action">
                chevron_right
              </Icon>
              <Typography color="textSecondary">Documentation</Typography>
              <Icon className="text-16" color="action">
                chevron_right
              </Icon>
              <Typography color="textSecondary">Fuse Components</Typography>
            </div>
            <Typography variant="h6">FuseChipSelect</Typography>
          </div>
        </div>
      }
      content={
        <div className="p-24 max-w-2xl">
          

          <hr />
          <FuseExample
            className="mb-64"
            component={require("./examples/SimpleExample.js").default}
            raw={require("!raw-loader!./examples/SimpleExample.js")}
          />
          
        </div>
      }
    />
  );
}

export default FuseChipSelectDoc;
