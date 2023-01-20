import React from 'react';
import{useEffect} from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import ListItemText from "@mui/material/ListItemText";
import {setChatIdAC} from "../../store/chatId/actionsCreators";
import {useDispatch, useSelector} from "react-redux";
import {initChatsAC} from "../../store/chats/actionsCreators";

function Contacts() {

    const dispatch = useDispatch();
    const chats = useSelector((store) => store.chats);

    useEffect(() => {
       dispatch(initChatsAC());
    }, []);

    return (
        <div>
            <h3>Личные сообщения</h3>
            <List sx={{ width: '100%', maxWidth: 360}}>
                {chats && chats.map((chat) => (
                    <ContactItem chat={chat} />
                ))}
            </List>
        </div>
    );
}

function ContactItem({chat}) {

    const dispatch = useDispatch();

    return (
        <ListItem sx={{cursor:"pointer", borderBottom:"1px solid #e0e0e0"}} key={chat.id}
                  onClick={() => {
                      dispatch(setChatIdAC(chat.id));
                  }}>
            <ListItemAvatar>
                <Avatar src={`/images/${chat?.User?.UserInfos?.[0]?.photo}`}>
                    <ImageIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={chat.name} secondary="Recently" />
        </ListItem>
    );
}

export default Contacts;
