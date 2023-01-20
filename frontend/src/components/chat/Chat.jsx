import React from 'react';
import {useState, useEffect} from "react";
import ScrollToBottom, {useScrollToBottom} from "react-scroll-to-bottom";
import io from "socket.io-client";
import InputEmoji from 'react-input-emoji';
import {css} from '@emotion/css';
import {useSelector} from "react-redux";
import Divider from '@mui/material/Divider';


const ROOT_CSS = css({
    height: window.innerHeight - 210,
});

function Chat() {

    const chatId= useSelector((store) => store.chatId)

    const [currentMessage, setCurrentMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const scrollToBottom = useScrollToBottom();
    const userName = localStorage.getItem('userName') || "";
    const [socket, setSocket] = useState(null);
    const [chatName, setChatName] = useState("");
    const [ourId, setOurId] = useState("");
    const [isPublic, setIsPublic] = useState(false);
    const [img, setImg] = useState("");

    useEffect(() => {
        if (!chatId) return;
        const socket = io('http://localhost:3100');
        socket.emit('join_contact', {chatId});
        setSocket(socket);
        return () => {
            socket.close();
        }
    }, [chatId]);

    useEffect(() => {
        if (!chatId) return;
        fetch(`/api/chats/${chatId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        }).then((data) => {
            setMessages(data.messages);
            setChatName(data.name);
            setOurId(data.our_id);
            setIsPublic(data.isPublic);
            setImg(data.img);
        })

        // {messages:[], chat_name: "Main public"}
    }, [chatId]);

    const sendMessage = async () => {
        scrollToBottom();
        if (currentMessage !== "") {
            const messageData = {
                chatId,
                user_id: ourId,
                message: currentMessage,
                time: new Date(Date.now()).toISOString(),
                user_name: userName,
            }
            await socket.emit('send_message', messageData);
            setMessages((messages) => [...messages, messageData]);
            setCurrentMessage('');
        }
    }

    useEffect(() => {
        if (socket) {
            socket.on('receive_message', (data) => {
                setMessages((messages) => [...messages, data]);
            })
        }
    }, [socket]);

    if (!chatId) {
        return (
            <div style={{display: "flex", width: "50%", justifyContent: "center", border:"1px solid #e0e0e0", margin:"200px auto",padding:"24px", alignItems:"center"}}>
                <h1 style={{textAlign: "center", color: "#b7b7b7", fontSize: "24px"}}>Пожалуйста, выберите чат или новый контакт из поиска...</h1>
            </div>
        )
    }

    return (
        <div>
            <div style={{paddingBottom: "14px"}}>
                <img
                    style={{
                        display: "inline",
                        width: "24px",
                        height: "24px",
                        borderRadius: "50%",
                        marginLeft: "8px",
                        marginBottom: "-5px",
                        backgroundColor: "#b7b7b7",
                    }}

                    src={img ? `/images/${img}` : `https://avatars.dicebear.com/api/bottts/${chatName}.svg`}
                    alt=""
                />
                <span style={{marginLeft: "8px", fontWeight: "bold", color: "#d7a7eb"}}>{chatName}</span>
            </div>
            <Divider />
            <div className="">
                <ScrollToBottom className={ROOT_CSS}>
                    {messages.map((message, index) => {
                        return (
                            <div
                                style={{
                                    textAlign: ourId === message.user_id ? "right" : "left",
                                    width: "100%",
                                }}
                                key={index}>
                                {isPublic && ourId !== message.user_id && (
                                    <img
                                        style={{
                                            width: "24px",
                                            height: "24px",
                                            borderRadius: "50%",
                                            marginLeft: "8px",
                                            marginBottom: "24px",
                                            backgroundColor: "#b7b7b7",
                                            display: "inline"
                                        }}
                                        src={`https://avatars.dicebear.com/api/bottts/${message.user_name}.svg`}
                                        alt=""
                                    />
                                )}
                                <span
                                    style={{
                                        backgroundColor: ourId === message.user_id ? "rgba(253,224,4, 0.1)" : "rgba(22,118,210,0.1)",
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        textAlign: "left",
                                        display: "inline-block",
                                        borderRadius: "8px",
                                        padding: "8px",
                                        margin: "8px",

                                    }}
                                >
                                    {isPublic && ourId !== message.user_id && (
                                        <span
                                            style={{
                                                display: "block",
                                                fontSize: "10px",
                                                color: "#b7b7b7"
                                            }}
                                        >{message.user_name}</span>
                                    )}
                                    <span style={{fontSize: "14px"}}>{message.message}</span>
                                    <span
                                        style={{
                                            display: "block",
                                            fontSize: "10px",
                                            color: "#b7b7b7"
                                        }}
                                    >{new Date(message.time).toLocaleTimeString()}</span>
                            </span>
                            </div>
                        )
                    })}
                </ScrollToBottom>
            </div>
            <div style={{padding: "0 16px", display: "flex", justifyContent: "between"}}>
                <InputEmoji
                    value={currentMessage}
                    onChange={setCurrentMessage}
                    cleanOnEnter
                    onEnter={sendMessage}
                    placeholder="Type a message"
                />
            </div>
        </div>
    );
}

export default Chat;
