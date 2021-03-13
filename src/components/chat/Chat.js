import React, {useEffect, useState} from 'react'
import './Chat.css'
import { Avatar, IconButton } from "@material-ui/core";
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined, Mic } from '@material-ui/icons'
import { useParams } from "react-router-dom";
import db from '../../firebase';
import { useStateValue } from '../../StateProvider';
import firebase from "firebase"

function Chat() {
    const [seed, setSeed] = useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    // eslint-disable-next-line
    const [{ user }, dispatch] = useStateValue()

    useEffect(() => {
        if ( roomId ) {
            db.collection("rooms").doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))
            db.collection("rooms").doc(roomId).collection("messages").orderBy("timestamp", "asc").onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) =>
                doc.data()))
              );
        } 
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [roomId])


    const sendMessage = (e) => {
        e.preventDefault();
        console.log("Message saisi ", input);
        if ( input ){
            db.collection('rooms').doc(roomId).collection('messages').add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            })
        }
        
        
        setInput("");
    }

    return (
        <div className="chat">
            <div className="chat-header">
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                <div className="chat-headerInfo">
                    <h3>{roomName}</h3>
                    <p>Last seen { " " }</p>
                    {messages.timestamp ? new Date(messages[messages.length - 1].timestamp?.toDate()).toUTCString() : 'no time'}
                </div>

                <div className="chat-headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className="chat-body">
                {messages.map((message) => (
                    <p className={`chat-message ${message.name === user.displayName && 'chat-receiver'}`}>
                        <span className="chat-name">
                            {message.name} 
                        </span>
                        {message.message} 
                        <span className="chat-timeStamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>
                ))}
            </div>
            <div className="chat-footer">
                <InsertEmoticon />
                <form>
                    <input 
                        value={input} 
                        onChange={e => setInput(e.target.value)} 
                        placeholder="Type a message" 
                        type="text" 
                    />
                    <button onClick={sendMessage} type="submit">Send a message</button>
                </form>
                <Mic />
            </div>
        </div>
    )
}

export default Chat
