import React, { useContext, useEffect, useRef, useState } from 'react'
import ProfileIcon from './ProfileIcon'
import { LiaCheckDoubleSolid } from "react-icons/lia";
import { IoVideocamOutline, IoCallOutline, IoCloseOutline, IoAttachOutline, IoMicOutline, IoOptionsOutline, IoChevronBackOutline } from "react-icons/io5";
import { IoIosSend } from 'react-icons/io';
import { ChatContext } from '@/context/userContext';
import axios from 'axios';
import io from 'socket.io-client'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const senderName = (users, user) => {
  if(users[0]._id === user._id){
    return users[1].name
  }
  return users[0].name
}

const getSenderUser = (users, user) => {
  if(users[0]._id === user._id){
    return users[1]
  }
  return users[0]
}

const ChatHeader = ({selectedChat, setSelectedChat, user, activeTab, setActiveTab}) => {
  const otherUser = getSenderUser(selectedChat.users, user)
  const handleToggle = () => {
    if(activeTab === 'chat'){
      setActiveTab('info')
    }else{
      setActiveTab('chat')
    }
  }
  return(
    <div className='flex justify-between items-center'>
      <div className='flex gap-3 items-center py-2'>
        <button onClick={() => setSelectedChat(null)} className='bg-graybg p-2 rounded-md'><IoChevronBackOutline /></button>
        <ProfileIcon pic={selectedChat.isGroupChat ? '' : otherUser?.pic} name={selectedChat.isGroupChat ? selectedChat?.chatName : otherUser?.name} />
        <div className='flex flex-col'>
          <span className=''>{selectedChat.isGroupChat ? selectedChat.chatName : senderName(selectedChat.users, user)}</span>
          <span className='text-sm text-textsecondary'>online</span>
          {/* <span className='text-sm text-textsecondary'>Chetan is Typing...</span> */}
        </div>
      </div>

      <div className='px-5 py-2 flex gap-5'>
        <button className='bg-secondary p-2 px-3 rounded-md hover:bg-hover hover:duration-300'><IoVideocamOutline size={20} /></button>
        <button className='bg-secondary p-2 px-3 rounded-md hover:bg-hover hover:duration-300'><IoCallOutline size={20} /></button>
        <button onClick={() => handleToggle()} className='bg-secondary p-2 px-3 rounded-md hover:bg-hover hover:duration-300'>{activeTab === 'chat' ? <IoOptionsOutline size={20} /> : <IoCloseOutline size={20} />}</button>
      </div>

    </div>
  )
}

const Message = ({content, left, time}) => {
  const timeString = new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
  return (
    <div className={`px-5 py-2 my-1 flex ${left ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex flex-col gap-1 ${left ? 'items-start' : 'items-end'}`}>
        <span className='bg-primary px-5 py-2 rounded-sm'>{content}</span>
        <span className='text-sm text-textsecondary flex gap-2 items-center pl-2'>{timeString} <span className='text-accent'><LiaCheckDoubleSolid /></span></span>
      </div>
    </div>
  )
}

const Controls = ({newMessage, handleMessageInput, handleKeyDown, sendMessage}) => {
  return (
    <div className='flex gap-2 items-center'>
      <input value={newMessage} onChange={(e) => handleMessageInput(e)} onKeyDown={(e) => handleKeyDown(e)} type="text" className="bg-primary w-full p-1.5 outline-none px-2 rounded-md" placeholder="Write message" />
      {/* <Button variant="primary"><IoAttachOutline size={20} /></Button>
      <Button variant="primary"><IoMicOutline size={20} /></Button> */}
      <button onClick={() => sendMessage()} className="bg-accent p-2 px-3 rounded-md hover:bg-accent/70"><IoIosSend size={20} /></button>
    </div>
  )
}

var socket, selectedChatCompare;

const ChatWindow = ({activeTab, setActiveTab}) => {
  const {user, selectedChat, setSelectedChat, token, smallDevice} = useContext(ChatContext)
  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [socketConnected, setSocketConnected] = useState(false)
  const messagesContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    if(!selectedChat) return
    try {
      const {data} = await axios.get(`${BACKEND_URL}/api/message/${selectedChat._id}`, {headers: {'Authorization' :`Bearer ${token}`}})
      setMessages(data)      

      socket.emit('join chat', selectedChat._id)
    } catch (error) {
      console.log(error)
      console.log('error loading messages')
    }
  }
  useEffect(() => {
    socket = io(BACKEND_URL)
    socket.emit('setup', user)
    socket.on('connected', () => {
      setSocketConnected(true)
    })

  }, [user])
  
  useEffect(() => {
    fetchMessages()
    selectedChatCompare = selectedChat
  }, [selectedChat])

  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved) => {
      if(!selectedChatCompare || selectedChatCompare._id !== newMessageRecieved.chat._id){
        // give notification
      }else{
        setMessages([...messages, newMessageRecieved])
      }
    })
  })


  const sendMessage = async () => {
    try {
      const {data} = await axios.post(`${BACKEND_URL}/api/message`, {content: newMessage, chatId: selectedChat._id}, {headers: {'Authorization' :`Bearer ${token}`}})
      setNewMessage('')
      setMessages([...messages, data])
      socket.emit('new message', data)
    } catch (error) {
      console.log('errror sending message asejdfflsjd')
    }    
  }

  const handleMessageInput = (e) => {
    setNewMessage(e.target.value)
    // trigger typing event
  }
  const handleKeyDown = (e) => {
    if(e.key === 'Enter'){
      sendMessage()
    }
  }

  return (
    <div className={`bg-primary p-5 rounded-lg flex flex-col ${smallDevice ? (selectedChat ? 'w-full' : 'hidden' ) : 'w-full'}`}>
      {selectedChat ? 
      (<>
        <ChatHeader activeTab={activeTab} setActiveTab={setActiveTab} selectedChat={selectedChat} setSelectedChat={setSelectedChat} user={user} />
        <div className='bg-hover h-full rounded-lg p-5 flex flex-col justify-between'>
          {messages.length > 0 ? 
          (<div className='mb-4 overflow-auto h-[29.5rem] no-scrollbar' ref={messagesContainerRef}>
            {messages.map((message) => {
              return (<Message key={message._id} content={message.content} left={message.sender._id != user._id} time={message.updatedAt} />)
            })}
          </div>):(<div className='flex justify-center items-center h-full text-textsecondary'>No messages</div>)}

          <Controls newMessage={newMessage} handleMessageInput={handleMessageInput} handleKeyDown={handleKeyDown} sendMessage={sendMessage} />
        </div>
      </>):
      (<div className='flex justify-center items-center h-full'>
        <img src="https://img.logoipsum.com/245.svg" alt="Logo" />
      </div>)}   
    </div>
  )
}

export default ChatWindow
