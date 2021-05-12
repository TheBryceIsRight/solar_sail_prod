import React from "react";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InfoIcon from '@material-ui/icons/Info';


function Message({ children }) {
  return (
      <ListItem>
        <ListItemIcon>
          <InfoIcon/>
        </ListItemIcon>
        <ListItemText>{children}</ListItemText>
      </ListItem>
  );
}

export default Message;