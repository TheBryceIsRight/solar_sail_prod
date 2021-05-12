import React from "react";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from '@material-ui/core/Grid';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const styles = theme => ({
  legend: {
    padding: 0,
    width: "fit-content",
    margin: "0 2px",
    fontFamily: 'Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    "& li": {
      display: "inline-flex",
      listStyle: "none",
      alignItems: "center",
      marginRight: theme.spacing.unit * 2,
      lineHeight: 1,
      fontSize: 12,
      fontWeight: 500
    }
  },
  marker: {
    flexShrink: 0,
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: theme.spacing.unit
  }
});

function Legend({ classes, data }) {
  return (
    <Grid container spacing={3} direction='row' alignItems='flex-start' justify='flex-start' className={classes.root} >

      {data.map(({ name, color }, i) => {
        return (
            <Grid item key={i}>
            <Grid container spacing={1} direction='row' alignItems='flex-start' justify='flex-start' className={classes.root} >
              <Grid item>
                <FiberManualRecordIcon style={{ color: color }}/>
              </Grid>
              <Grid item>
                 <Typography variant='body1'>{name}</Typography>
              </Grid>
            </Grid>
            </Grid>

        );
      })}
          </Grid>
  );
}



export default withStyles(styles)(Legend);