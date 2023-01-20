import React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import MuiDrawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import MarkUnreadChatAltIcon from '@mui/icons-material/MarkUnreadChatAlt';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import GroupsIcon from '@mui/icons-material/Groups';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {NavLink} from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {styled, useTheme} from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ContactsIcon from '@mui/icons-material/Contacts';
import { useDispatch, useSelector } from 'react-redux';


const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({theme}) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

function Layout({children}) {
    const getUserRole = useSelector((store) => store.profile.userRole);
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const drawer = (getUserRole === "teacher") ? (
        <div>
            <Toolbar/>
            <Divider/>
            <List>
                <NavItem open={open} to="/calendar" icon={<CalendarMonthIcon/>}>Календарь</NavItem>
                <NavItem open={open} to="/review" icon={<RemoveRedEyeIcon/>}>Код ревью</NavItem>
                <NavItem open={open} to="/lectures">Материалы лекции</NavItem>
                <NavItem open={open} to="/chats" icon={<MarkUnreadChatAltIcon/>}>Чаты</NavItem>
                <NavItem open={open} to="/votes" icon={<ThumbsUpDownIcon/>}>Голосования</NavItem>
                <NavItem open={open} to="/pairs" icon={<PeopleAltIcon/>}>Пары</NavItem>
                <NavItem open={open} to="/groups" icon={<GroupsIcon/>}>Группы</NavItem>
                <NavItem open={open} to="/wiki" icon={<AutoStoriesIcon/>}>Вики</NavItem>
            </List>
            <Divider/>
            <List>
                <NavItem open={open} to="/logout" icon={<LogoutIcon/>}>Выйти</NavItem>
            </List>
        </div>
    ) : (        <div>
        <Toolbar/>
        <Divider/>
        <List>
            <NavItem open={open} to="/calendar" icon={<CalendarMonthIcon/>}>Календарь</NavItem>
            <NavItem open={open} to="/lectures">Материалы лекции</NavItem>
            <NavItem open={open} to="/chats" icon={<MarkUnreadChatAltIcon/>}>Чаты</NavItem>
            <NavItem open={open} to="/votes" icon={<ThumbsUpDownIcon/>}>Голосования</NavItem>
            <NavItem open={open} to="/pairs" icon={<PeopleAltIcon/>}>Пары</NavItem>
            <NavItem open={open} to="/wiki" icon={<AutoStoriesIcon/>}>Вики</NavItem>
            <NavItem open={open} to="/contacts" icon={<ContactsIcon/>}>Контакты</NavItem>
        </List>
        <Divider/>
        <List>
            <NavItem open={open} to="/profile" icon={<AccountCircleIcon/>}>Профиль</NavItem>
            <NavItem open={open} to="/logout" icon={<LogoutIcon/>}>Выйти</NavItem>
        </List>
    </div>);

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed" open={open}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerOpen}
                        sx={{
                            marginRight: 5,
                            ...(open && {display: 'none'}),
                        }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        LMS
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                open={open}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                    </IconButton>
                </DrawerHeader>
                {drawer}
            </Drawer>
            <Box
                component="main"
                sx={{flexGrow: 1, p: 3}}
            >
                <DrawerHeader/>
                {children}
            </Box>
        </Box>
    );
}

const NavItem = ({to, children, icon, open}) => {
    return (
        <NavLink to={to} style={{textDecoration: 'none', color: 'inherit'}}>
            {({isActive}) => (
                <ListItem disablePadding sx={{display: 'block'}}>
                    <ListItemButton sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                    }}
                                    selected={isActive}>
                        <ListItemIcon sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                        }}>
                            {icon || <InboxIcon/>}
                        </ListItemIcon>
                        <ListItemText primary={children} sx={{opacity: open ? 1 : 0}}/>
                    </ListItemButton>
                </ListItem>
            )}
        </NavLink>
    )
}

export default Layout;
