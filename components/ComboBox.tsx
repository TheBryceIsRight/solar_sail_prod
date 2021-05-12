/* eslint-disable no-use-before-define */
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import SaveIcon from '@material-ui/icons/Save';


const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

export default function ComboBox() {
  const classes = useStyles();

  const options = [
    { title: "Client Group" },
    { title: "Single MID"  },
    { title: "Multiple MID" },
    { title: "DBA" },
    { title: "Tax ID"},
  ];

  return (
    <React.Fragment>
    <Grid container direction="row" spacing={3}>
      <Grid item>
        <Autocomplete
        id="search-facet"
        options={options}
        getOptionLabel={(option) => option.title}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Search By" variant="outlined" />}
        />
      </Grid>
      <Grid item>
        <TextField id="outlined-basic" label="Search" variant="outlined" />
      </Grid>
      <Grid item>
      <Button
        variant="contained"
        color="primary"
        size="large" 
        className={classes.button}
        startIcon={<SearchIcon/>}
      >
        Search
      </Button>
      </Grid>
      <Grid item>
      <Button
        variant="outlined"
        color="primary"
        size="large" 
        className={classes.button}
        startIcon={<SaveIcon/>}
      >
        Save
      </Button>
        </Grid>
    </Grid>
    


    </React.Fragment>
    
  );
}

// Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
