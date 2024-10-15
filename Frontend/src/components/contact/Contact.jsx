import React, { useContext, useState } from 'react'
import ProfileIcon from '../ProfileIcon'
import axios from 'axios'
import { ChatContext } from '@/context/userContext'
import { IoSearchOutline } from "react-icons/io5";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const ChatItem = ({pic, name, email, userId, accessChat}) => {
  return (
    <>
      <div onClick={() => accessChat(userId)} className='flex gap-5 items-center px-5 py-3 hover:bg-hover hover:duration-300 cursor-pointer'>
        <ProfileIcon name={name} />
        <div>
          <span>{name}</span>
          <p className='text-sm text-textsecondary'>{email}</p>
        </div>
      </div>
      <hr className='h-px bg-gray-700 border-0 dark:bg-gray-700' />
    </>
  )
}

const Contact = ({setActiveTab}) => {
  const {user, token, selectedChat, setSelectedChat, chats, setChats, smallDevice} = useContext(ChatContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [userList, setUserList] = useState(null)
  const findUsers = () => {
    if(!searchTerm){
      return
    }
    axios.get(`${BACKEND_URL}/api/user?search=${searchTerm}`, {headers: {'Authorization' :`Bearer ${token}`}}).then((response) => {
      setUserList(response.data)
    })
  }
  const accessChat = (userId) => {
    axios.post(`${BACKEND_URL}/api/chat`, {userId}, {headers: {'Authorization' :`Bearer ${token}`}}).then((response) => {
      if(!chats.find((c) => c._id === response.data._id)) setChats([response.data, ...chats])
      
      setSelectedChat(response.data)
      setActiveTab('chat')
    })
  }
  return (
    <div className={`bg-primary w-[30%] rounded-lg border border-primary ${smallDevice ? (selectedChat ? 'hidden' : 'w-full') : 'w-[30%]'}`}>

      <div className='flex gap-3 px-5 py-5 items-start justify-between'>
        <h3 className='font-semibold text-xl'>Contact</h3>
        <button onClick={() => setActiveTab('group')} className='bg-accent px-4 p-1.5 rounded-md text-sm hover:bg-accent/90'>New Group</button>
      </div>
      <div className='w-full flex gap-2 px-3'>
        <input onChange={(e) => setSearchTerm(e.target.value)} className='w-full bg-secondary text-textsecondary outline-none p-1 rounded-md' type="text" placeholder='Enter name or email' />
        <button className='bg-accent px-2 p-1 rounded-md hover:bg-accent/90' onClick={() => findUsers()}><IoSearchOutline /></button>
      </div>

      {userList?.length > 0 ?
      (<div className='mt-5'>
        {userList.map((item, idx) => {
          return (<ChatItem key={item._id} name={item.name} email={item.email} userId={item._id} accessChat={accessChat} />)
        })}
      </div>):
      (<p className='flex justify-center mt-5'>{!userList ? 'Search Friends!' : 'No user found!'}</p>)}
    </div>
  )
}

export default Contact
