import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import EventAvailableTwoTone from "@material-ui/icons/EventAvailableTwoTone";
import MoreVert from "@material-ui/icons/MoreVert";
import { withStyles } from "@material-ui/core/styles";

import BarChart from "./BarChart";
import Legend from "./Legend";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InfoIcon from '@material-ui/icons/Info';
import useTranslation from '../hooks/useTranslation';

import item from "../public/item"; // import data
import { Media, MediaContextProvider } from "../utils/media";


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = theme => ({
  avatar: {
    color: 'background.paper',
  },
  card: {
    margin: "24px auto",
  },
  containerSmall: {
    margin: "0 auto",
    height: 200
  },
  container: {
    margin: "0 auto",
    height: 260
  },
  title: {
    fontSize: 15,
    fontWeight: 500,
    fontFamily: "'Roboto', sans-serif",
    lineHeight: "1.35417em",
    textAlign: "left"
  },
  subheader: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 14,
    fontWeight: 500,
    textAlign: "left"
  },
  info: {
    margin: "20 20"
  },
  text: {
    fontFamily: "'Roboto', sans-serif",
    fontSize: 14,
    fontWeight: 400
  }

});

function TranslateDays() {
  const { t } = useTranslation();

  return [t('sunday'), t('monday'), t('tuesday'), t('wednesday'), t('thursday'), t('friday'), t('saturday')]

}


function WeeklySales(props) {
  const { t } = useTranslation();
    const { classes } = props;
    const { entries } = item;

    const days = TranslateDays(); // x-axis labels

    const wlbData = []; // hours coded during and outside of work per day
    const codingAtWorkMinutes = []; // minutes coded at work per day
    const codingOutsideWorkMinutes = []; // minutes coded outside work per day

    let codingAtWorkTotalMinutes; // minutes for the entire week
    let codingOutsideWorkTotalMinutes; // minutes for the entire week

    let codingAtWorkTotalHours;
    let codingOutsideWorkTotalHours;
    let codingTotalHours;

    // create the dataset
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const workLifeBalanceCalcs = (item) => {
      // map data to two new arrays
      entries.map(day => {
        codingAtWorkMinutes.push(day.workMinutes);
        codingOutsideWorkMinutes.push(day.nonWorkMinutes);
        return true;
      });

      // create data for the chart
      let i;
      for (i = 0; i < days.length; i++) {
        wlbData[i] = {
          "Day": days[i],
          "In-person": parseFloat((codingAtWorkMinutes[i] / 60).toFixed(2)),
          "Online": parseFloat((codingOutsideWorkMinutes[i] / 60).toFixed(2)),
          "In-personColor": "#1F77B4",
          "OnlineColor": "#FF7F0E"

        };
      }
    }
    workLifeBalanceCalcs(item);

    // calculate totals
    function total(total, num) {
      return total + num;
    }
    if (wlbData && codingAtWorkMinutes.length > 0 && codingOutsideWorkMinutes.length > 0) {
      codingAtWorkTotalMinutes = codingAtWorkMinutes.reduce(total);
      codingOutsideWorkTotalMinutes = codingOutsideWorkMinutes.reduce(total);
    }
    // eslint-disable-next-line prefer-const
    codingAtWorkTotalHours = (codingAtWorkTotalMinutes / 60).toFixed(1);
    // eslint-disable-next-line prefer-const
    codingOutsideWorkTotalHours = (codingOutsideWorkTotalMinutes / 60).toFixed(1);
    // eslint-disable-next-line prefer-const
    codingTotalHours = (parseFloat(codingAtWorkTotalHours) + parseFloat(codingOutsideWorkTotalHours)).toFixed(1);

    // create 5 evenly-spaced tick values
    const tickValues = () => {
      const t = wlbData.map(d => {
        return Math.ceil(d[keys[0]] + d[keys[1]]);
      });
      const max = Math.max(...t);
      return [0, max * 0.25, max * 0.5, max * 0.75, max];
    };

    // create the message
    let message;
    if (codingAtWorkTotalMinutes > codingOutsideWorkTotalMinutes) {
      message = t('most_in_person');
    } else {
      message = `Most of your sales were online (${codingOutsideWorkTotalHours} out of ${codingTotalHours} total hours).`;
    }

    // create legend
    const keys = ["In-person", "Online"];
    const legend = [
      {
        name: t('in_person'),
        color: "#1F77B4"
      },
      {
        name: t('online'),
        color: "#FF7F0E"
      }
    ];

    // create date range for the card subheader
    // const fromDateLabel = moment.unix(parseInt(from, 10)).format("ddd, MMM D");
    // const toDateLabel = moment.unix(parseInt(to, 10)).format("ddd, MMM D");

    return (
      <React.Fragment>
        <MediaContextProvider>
        <Media at='sm'>
        <Card className={classes.card}>
          <CardHeader
            classes={{
              title: classes.title,
              subheader: classes.subheader
            }}
            avatar={
              <Avatar aria-label={t('weekly_sales')} className={classes.avatar}>
                <EventAvailableTwoTone color='background.paper' />
              </Avatar>
            }
            action={
              <IconButton aria-label='Menu Icon'>
                <MoreVert className={classes.menuIcon} />
              </IconButton>
            }
            title= {t('weekly_sales')}
            subheader={t('week_of')}
          />
          <CardContent>
            <div>
              <Legend data={legend} />
            </div>
            <div className={classes.containerSmall} aria-label='bar chart of weekly sales'>
              <BarChart
                aria-label='bar chart of weekly sales'
                alt='bar chart of weekly sales'
                role='group'
                data={wlbData}
                keys={keys}
                colors={{ scheme: 'pastel2' }}
                tickValues={tickValues()}
                index={"Day"}
                groupMode={"stacked"}
                layout={"vertical"}
                colorBy={function (e) {
                  const t = e.id;
                  return e.data["".concat(t, "Color")];
                }}
              />
            </div>
            <div className={classes.info}>
              <List>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon/>
                </ListItemIcon>
                <ListItemText>{message}</ListItemText>
              </ListItem>
              </List>
              
            </div>
          </CardContent>
        </Card>
        </Media>
        <Media at='mo'>
        <Card className={classes.card}>
          <CardHeader
            classes={{
              title: classes.title,
              subheader: classes.subheader
            }}
            avatar={
              <Avatar aria-label={t('weekly_sales')} className={classes.avatar}>
                <EventAvailableTwoTone color='background.paper' />
              </Avatar>
            }
            action={
              <IconButton aria-label='Menu Icon'>
                <MoreVert className={classes.menuIcon} />
              </IconButton>
            }
            title= {t('weekly_sales')}
            subheader={t('week_of')}
          />
          <CardContent>
            <div>
              <Legend data={legend} />
            </div>
            <div className={classes.containerSmall} aria-label='bar chart of weekly sales'>
              <BarChart
                aria-label='bar chart of weekly sales'
                alt='bar chart of weekly sales'
                role='group'
                data={wlbData}
                keys={keys}
                colors={{ scheme: 'pastel2' }}
                tickValues={tickValues()}
                index={"Day"}
                groupMode={"stacked"}
                layout={"vertical"}
                colorBy={function (e) {
                  const t = e.id;
                  return e.data["".concat(t, "Color")];
                }}
              />
            </div>
            <div className={classes.info}>
              <List>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon/>
                </ListItemIcon>
                <ListItemText>{message}</ListItemText>
              </ListItem>
              </List>
              
            </div>
          </CardContent>
        </Card>
        </Media>
        <Media greaterThanOrEqual='md'>
        <Card className={classes.card} >
          <CardHeader
            classes={{
              title: classes.title,
              subheader: classes.subheader
            }}
            avatar={
              <Avatar aria-label={t('weekly_sales')} className={classes.avatar}>
                <EventAvailableTwoTone color='primary' />
              </Avatar>
            }
            action={
              <IconButton aria-label='Menu Icon'>
                <MoreVert className={classes.menuIcon} />
              </IconButton>
            }
            title= {t('weekly_sales')}
            subheader={t('week_of')}
          />
          <CardContent>
            <div>
              <Legend data={legend} />
            </div>
            <div className={classes.container} aria-label='bar chart of weekly sales'>
              <BarChart
                aria-label='bar chart of weekly sales'
                alt='bar chart of weekly sales'
                role='group'
                colors={{ scheme: 'pastel2' }}
                data={wlbData}
                keys={keys}
                tickValues={tickValues()}
                index={"Day"}
                groupMode={"stacked"}
                layout={"vertical"}
                colorBy={function (e) {
                  const t = e.id;
                  return e.data["".concat(t, "Color")];
                }}
              />
            </div>
            <div className={classes.info}>
              <List>
              <ListItem>
                <ListItemIcon>
                  <InfoIcon/>
                </ListItemIcon>
                <ListItemText>{message}</ListItemText>
              </ListItem>
              </List>
              
            </div>
          </CardContent>
        </Card>

        </Media>
       
        </MediaContextProvider>
      </React.Fragment>
    );
  }


export default withStyles(styles)(WeeklySales);