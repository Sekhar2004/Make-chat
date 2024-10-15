import { ChatContext } from '@/context/userContext'
import React, { useContext, useState } from 'react'
import ProfileIcon from '../ProfileIcon'
import { IoChevronBackOutline } from 'react-icons/io5'
import { FaEdit } from 'react-icons/fa'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const SettingItem = ({info, value}) => {
  return (
    <>
      <div className='flex gap-5 items-center px-5 py-1 cursor-pointer'>
        <div>
          <span className='text-sm text-textsecondary'>{info}</span>
          <p>{value}</p>
        </div>
      </div>
    </>
  )
}

const getSenderUser = (users, user) => {
  if(users[0]._id === user._id){
    return users[1]
  }
  return users[0]
}

const ChatItem = ({pic, name, email, userId, adminId}) => {
  return (
    <>
      <div className='flex items-center justify-between px-5 py-3 hover:bg-hover hover:duration-300 cursor-pointer'>
        <div className='flex gap-5 items-center'>
          <ProfileIcon name={name} />
          <div>
            <span>{name}</span>
            <p className='text-sm text-textsecondary'>{email}</p>
          </div>
        </div>
        {userId === adminId && (<span className='text-sm text-gray-400'>Admin</span>)}
      </div>
      <hr className='h-px bg-gray-700 border-0 dark:bg-gray-700' />
    </>
  )
}

const Info = ({setActiveTab}) => {
  const {user, token, selectedChat, setSelectedChat} = useContext(ChatContext)
  const [updatingName, setUpdateingName] = useState(false)
  const [newGroupName, setnewGroupName] = useState(selectedChat.chatName)

  const renameGroup = () => {
    if(!newGroupName) return
    axios.put(`${BACKEND_URL}/api/chat/renameGroup`, {chatId: selectedChat._id, newGroupName}, {headers: {'Authorization' :`Bearer ${token}`}}).then((response) => {
      setSelectedChat(response.data)
      setUpdateingName(false)
    })
  }
  if(selectedChat.isGroupChat){
    const admin = user._id === selectedChat.groupAdmin._id
    return(
      <div className='bg-primary w-[30%] rounded-lg border border-primary'>
        <div className='flex gap-3 px-5 py-5 items-center'>
          <button onClick={() => setActiveTab('chat')} className='bg-graybg p-1 rounded-md'><IoChevronBackOutline /></button>
          <h3 className='font-semibold text-xl'>Info</h3>
        </div>
        <div className='flex justify-center'>
          <ProfileIcon name={selectedChat?.chatName} />
        </div>

        <div className='flex gap-5 items-center px-5 py-1'>
          <div>
            <span className='text-sm text-textsecondary'>Name</span>
            {!updatingName ? 
            (<p className='flex gap-2 items-center'>{selectedChat?.chatName}<span onClick={() => setUpdateingName(true)} className='text-sm cursor-pointer text-textsecondary'><FaEdit /></span></p>) : 
            (<div className='w-full flex gap-2'>
              <input value={newGroupName} onChange={(e) => setnewGroupName(e.target.value)} className='w-full bg-secondary text-textsecondary outline-none p-0.5 px-1 rounded-md' autoFocus type="text" />
              <button onClick={() => renameGroup()} className='bg-accent px-2 p-1 rounded-md hover:bg-accent/90'>update</button>
            </div>)}
            
            
          </div>
        </div>

        <div className='mt-5 border-t border-gray-700 pt-5'>
          <span className='pl-3'>Participants</span>
          {selectedChat.users.map((item) => {
            return (<ChatItem key={item._id} name={item.name} email={item.email} userId={item._id} adminId={selectedChat.groupAdmin._id} />)
          })}
        </div>

        {admin && 
        (<div className='mt-5'>
          <span className='pl-3'>Manage Participants</span>
          
        </div>)}
      </div>
    )
  }else{
    const otherUser = getSenderUser(selectedChat.users, user)
    return (
      <div className='bg-primary w-[30%] rounded-lg border border-primary'>
        <div className='flex gap-3 px-5 py-5 items-baseline'>
          <button onClick={() => setActiveTab('chat')} className='bg-graybg p-1 rounded-md'><IoChevronBackOutline /></button>
          <h3 className='font-semibold text-xl'>Info</h3>
        </div>
        <div className='flex justify-center'>
          <ProfileIcon pic={otherUser?.pic} name={otherUser?.name} size={100} />
        </div>
        <div>
          <SettingItem info='Name' value={otherUser?.name} />
          <SettingItem info='Email' value={otherUser?.email} />
        </div>
      </div>
    )
  }
}

export default Info
