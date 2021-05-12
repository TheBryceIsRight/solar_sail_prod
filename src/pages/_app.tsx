import { Box, Container, CssBaseline } from '@material-ui/core';
import red from '@material-ui/core/colors/red';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import App from 'next/app';
import Head from 'next/head';
import { SWRConfig } from 'swr';
import { Nav } from '../components/Nav';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles'
import ThemeContext from '../../components/Theme';
import { responsiveFontSizes } from '@material-ui/core/styles';
import { lightTheme, darkTheme } from '../../components/Theme'
import React, { useState, useEffect } from 'react'
import { AppProps } from 'next/app';
import { Router } from 'next/dist/client/router';
import 'nprogress/nprogress.css';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Menu,
  MenuItem,
  ListItemText,
 } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert'; 
import NotificationsIcon from '@material-ui/icons/Notifications';
import SettingsIcon from '@material-ui/icons/Settings';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import MessageIcon from '@material-ui/icons/Message';
import Brightness3Icon from '@material-ui/icons/Brightness3';
import { useRouter } from 'next/router';
import Tooltip from '@material-ui/core/Tooltip';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import StoreIcon from '@material-ui/icons/Store';
import WorkIcon from '@material-ui/icons/Work'; 
import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import Grid from '@material-ui/core/Grid';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';


NProgress.configure({ showSpinner: false, trickleRate: 0.1, trickleSpeed: 300 });

Router.events.on('routeChangeStart', () => {
    NProgress.start() 
})

Router.events.on('routeChangeComplete', () => {
    NProgress.done();
})

Router.events.on('routeChangeError', () => {
    NProgress.done();
})


const themeContext = {
  name: 'dark',
  type: [
    'light',
    'dark'
  ],
  switch: true,
  language: [
    'en',
    'fr',
    'pl',
    'es'
  ],
  index: 0,
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  body: {
      margin:0,
    },
    list: {
        width: 'auto',
      },
      fullList: {
        width: 'auto',
      },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 2,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'primary',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-end',
    },
}));


function MyApp({ Component, pageProps }: AppProps) {

  const containerSmall = {
    maxWidth: '36rem',
    padding: '0 1rem',
    margin: '3rem auto 6rem'
  };

  const containerMedium = {
    maxWidth: '45rem',
    padding: '0 1rem',
    margin: '3rem auto 6rem'
  };

  const containerLarge = {
    maxWidth: '56rem',
    padding: '0 1rem',
    margin: '3rem auto 6rem'
  };

  const containerHuge = {
    maxWidth: '72rem',
    padding: '0 1rem',
    margin: '3rem auto 6rem'
  };

  const [isMounted, setIsMounted] = useState(false);
	const [darkState, setDarkState] = useState(true);

	const handleThemeChange = () => {
    setDarkState(!darkState);
    themeContext.name = darkState ? themeContext.type[0] : themeContext.type[1] ;
    themeContext.switch = darkState ? false : true ;
  };

  let theme = darkState ? lightTheme : darkTheme;

  theme = responsiveFontSizes(theme);

	useEffect(() => {
    setIsMounted(true)}, [])


  const NavigationBar: React.FC = () => {
  
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isNotificationsMenuOpen = Boolean(notificationsAnchorEl);

  const handleProfileMenuOpen = (event: any) => {
      setAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuOpen = (event: any) => {
    setNotificationsAnchorEl(event.currentTarget);
  };


  const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
      setAnchorEl(null);
      handleMobileMenuClose();
  };

  const handleNotificationsMenuCLose  = () => {
    setNotificationsAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: any) => {
      setMobileMoreAnchorEl(event.currentTarget);
  };

  function Logo() {
    if (!darkState) {
      return (
      <Link href="/search" passHref>
        <ButtonBase>
        <img src='/logo_dark.svg' alt='Logo' height={36} width={94} />
        </ButtonBase>
      </Link>
      );
    } else {
    return (
      <Link href="/search" passHref>
        <ButtonBase>
        <img src='/logo.svg' alt='Logo' height={36} width={94}/>
        </ButtonBase>
      </Link>
      );
    }
  }


  const menuId = 'primary-search-account-menu';

  const renderMenu = (
      <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      >
      <Link href="/Login" passHref>
      <MenuItem>
            <ListItemIcon>
              <VpnKeyIcon/>
            </ListItemIcon>
            <ListItemText>
                  <Typography>
                    Login
                  </Typography>
            </ListItemText>
      </MenuItem>
      </Link>
      <Link href="/Login" passHref>

      <MenuItem>
            <ListItemIcon>
              <PersonAddIcon/>
            </ListItemIcon>
            <ListItemText>
                  <Typography>
                  Sign up
                  </Typography>
            </ListItemText>
      </MenuItem>
      </Link>
      <Link href="/tableDemo" passHref >
      <MenuItem>
        
            <ListItemIcon>
              <VideogameAssetIcon/>
            </ListItemIcon>
            <ListItemText>
                  <Typography>
                  Demo
                  </Typography>
            </ListItemText>

      </MenuItem>
      </Link>

      <MenuItem>
        
            <ListItemIcon>
              <SettingsIcon/>
            </ListItemIcon>
            <ListItemText>
                  <Typography>
                    Settings
                  </Typography>
            </ListItemText>

      </MenuItem>

      </Menu>
  );

  // const languageMenuId = 'language settings';
  // const renderLanguageMenu = (
  //   <React.Fragment>
      
  //     <Menu
  //       id={languageMenuId}
  //       anchorEl={languageAnchorEl}
  //       keepMounted
  //       open={Boolean(languageAnchorEl)}
  //       onClose={handleClose}
  //     >
  //       {locales.map((option, index) => (
  //         <MenuItem
  //           key={option}
  //           data-my-value={[option]}
  //           id={languageNames[option]}
  //           selected={index === themeContext.index}
  //           onClick={(event) => handleMenuItemClick(event, index)}
  //         >
  //           {languageNames[option]}
  //         </MenuItem>
  //       ))}
  //     </Menu>
  // </React.Fragment> 
  // );

  const notificationsMenuId = 'notifications-menu';
  const renderNotifcationsMenu = (
      <Menu
      anchorEl={notificationsAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={notificationsMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isNotificationsMenuOpen}
      onClose={handleNotificationsMenuCLose}
      >
      <MenuItem>
      All notifications are read!
      </MenuItem>
      </Menu>
  );


  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
      <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      >
      <Link href="/tableDemo" passHref >
      <MenuItem>
          <ListItemIcon><VideogameAssetIcon />
          </ListItemIcon>
          <ListItemText primary="Demo" />
      </MenuItem>
      </Link>
      <MenuItem onClick={handleNotificationMenuOpen}>
          <ListItemIcon><NotificationsIcon />
          </ListItemIcon>
          <ListItemText primary="Notifications"/>
      </MenuItem>
      <MenuItem onClick={handleThemeChange} >
          <ListItemIcon><Brightness3Icon/>
          </ListItemIcon>
          <ListItemText primary="Dark Mode" />
      </MenuItem>
      {/* <MenuItem onClick={handleLanguageMenuOpen}>
          <ListItemIcon><TranslateIcon/>
          </ListItemIcon>
          <ListItemText primary="Language" />
      </MenuItem> */}
      </Menu>
  );

  const [state, setState] = React.useState({
      top: false,
      left: false,
      bottom: false,
      right: false,
      checkedA: true,
      checkedB: true,
  });

  const toggleDrawer = (anchor:any, open:any) => (event:any) => {
      if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
      }

      setState({ ...state, [anchor]: open });
  };

  const list = (anchor:any) => (
      // eslint-disable-next-line jsx-a11y/no-static-element-interactions
      <React.Fragment>
      <div className={classes.drawerHeader}>
        <Grid container direction="row" spacing={1} justify="flex-end" alignItems="center">
            <Grid item>
            <Box style={{width:140}}/>
            </Grid>
            <Grid item>
            <IconButton onClick={toggleDrawer(anchor, false)}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
            </Grid>
        </Grid>
          
        </div>
      <div
      // className={clsx(classes.list, {
      //     [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      // })}
      // role="navigation"
      // onClick={toggleDrawer(anchor, false)}
      // onKeyDown={toggleDrawer(anchor, false)}
      >
      <List>
      <Link href="/" passHref >
      <ListItem button>
          <ListItemIcon><StoreIcon/>
          </ListItemIcon>
          <ListItemText primary='Merchants' />
      </ListItem>
      </Link>
      <Link href="/" passHref >
      <ListItem button>
          <ListItemIcon><WorkIcon/>
          </ListItemIcon>
          <ListItemText primary="Cases" />
      </ListItem>
      </Link>

      <ListItem button>
          <ListItemIcon><InsertDriveFileIcon/>
          </ListItemIcon>
          <ListItemText primary="Reports" />
      </ListItem>
      <ListItem button>
          <ListItemIcon><SettingsIcon/>
          </ListItemIcon>
          <ListItemText primary='Settings' />
      </ListItem>
      <Divider/>

      <ListItem button>
          <ListItemIcon><MessageIcon/>
          </ListItemIcon>
          <ListItemText primary="Feedback" />
      </ListItem>
      <Divider/>
      
      </List>
      </div>
      </React.Fragment>
  );

{/*End of Top */}
    
    
    return (
      
    
        <div className={classes.grow}>
            <AppBar position="static" style={{ background: 'transparent', boxShadow:'none'}}>
              <Toolbar disableGutters={true}>
                <IconButton
                    className={classes.menuButton}
                    color="primary"
                    aria-label="open menu"
                    onClick={toggleDrawer('left', true)}
                    > 
                <MenuIcon />
                </IconButton>   
                <Drawer 
                    anchor={'left'} 
                    // variant="persistent"
                    open={state['left']} 
                    onClose={toggleDrawer('left', false)}>{list('left')}
                    
                </Drawer>
                <Logo/>
                <div className={classes.grow} />
                {/* <div className={classes.sectionDesktop}>
                <Tooltip title="Language">
                  <IconButton
                    edge='end'
                    aria-label="Language"
                    aria-haspopup='true'
                    onClick={handleLanguageMenuOpen}
                    color='primary'>
                      <TranslateIcon/>
                    </IconButton>
                  </Tooltip>
                </div> */}
                <div className={classes.sectionDesktop}>
                <Tooltip title="Dark Mode">
                  <IconButton
                    edge="end"
                    aria-label="Dark Mode"
                    aria-haspopup="false"
                    onClick={handleThemeChange}
                    color="primary"
                  >
                    <Brightness3Icon />
                  </IconButton>
                  </Tooltip>
                </div>
                <div className={classes.sectionDesktop}>
                <Tooltip title="Notifications">
                  <IconButton
                    edge="end"
                    aria-label="Notifications"
                    aria-controls={notificationsMenuId}
                    aria-haspopup="true"
                    onClick={handleNotificationMenuOpen}
                    color="primary"
                  >
                    <NotificationsIcon />
                  </IconButton>
                </Tooltip>
                </div>
                
  
                <div className={classes.sectionDesktop}>
                <Tooltip title="Profile">
                  <IconButton
                      aria-label="Profile"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleProfileMenuOpen}
                      color="primary"
                    >
                      <AccountCircle />
                    </IconButton>
                </Tooltip>
                </div>
                
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="primary"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
            <br/>
            {renderMobileMenu}
            {renderMenu}
            {renderNotifcationsMenu}
            {/* {renderLanguageMenu} */}
          </div>
    );
    };



  // componentDidMount() {
  //   // Remove the server-side injected CSS.
  //   const jssStyles = document.querySelector('#jss-server-side');
  //   if (jssStyles) {
  //     jssStyles.parentElement!.removeChild(jssStyles);
  //   }
  // }

  return (<React.Fragment>
          <ThemeContext.Provider value={themeContext.switch}>
        <Head>
          <title>Boost</title>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
        </Head>
        <div style={containerHuge} >

        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <NavigationBar/>          
          <SWRConfig
            value={{ fetcher: (url: string) => axios(url).then((r) => r.data) }}
          >
            <Container maxWidth={false}>
              <Box marginTop={2}>
              <main role='main'>
                {isMounted && <Component {...pageProps} />}
                <br/>
              </main>
              </Box>
            </Container>
          </SWRConfig>
        </ThemeProvider>
        </div>
        </ThemeContext.Provider> 
      </React.Fragment>
    );
  }

export default MyApp
