import React, { useContext, useState } from 'react'
import ProfileIcon from '../ProfileIcon'
import axios from 'axios'
import { ChatContext } from '@/context/userContext'
import { IoChevronBackOutline, IoCloseOutline, IoSearchOutline } from "react-icons/io5";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const ChatItem = ({item, addUser}) => {
  return (
    <>
      <div onClick={() => addUser(item)} className='flex gap-5 items-center px-5 py-3 hover:bg-hover hover:duration-300 cursor-pointer'>
        <ProfileIcon name={item?.name} />
        <div>
          <span>{item?.name}</span>
          <p className='text-sm text-textsecondary'>{item?.email}</p>
        </div>
      </div>
      <hr className='h-px bg-gray-700 border-0 dark:bg-gray-700' />
    </>
  )
}

const UserItem = ({item, removeUser}) => {
  return (<span className='flex items-center gap-2 bg-graybg p-2 rounded-sm'><ProfileIcon name={item?.name} />{item?.name} <IoCloseOutline className='cursor-pointer' onClick={() => removeUser(item?._id)} /></span>)
}

const Group = ({setActiveTab}) => {
  const {user, token, selectedChat, setSelectedChat, chats, setChats, smallDevice} = useContext(ChatContext)
  const [groupName, setGroupName] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [users, setUsers] = useState([])
  const [userList, setUserList] = useState(null)
  const findUsers = () => {
    if(!searchTerm){
      return
    }
    axios.get(`${BACKEND_URL}/api/user?search=${searchTerm}`, {headers: {'Authorization' :`Bearer ${token}`}}).then((response) => {
      setUserList(response.data)
    })
  }
  const createGroup = () => {
    if(groupName === '') return
    if(users.length < 2) return
    const usersIds = users.map((item) => item._id)

    axios.post(`${BACKEND_URL}/api/chat/createGroup`, {groupName, users: JSON.stringify(usersIds)}, {headers: {'Authorization' :`Bearer ${token}`}}).then((response) => {
      // setUserList(response.data)
      if(!chats.find((c) => c._id === response.data._id)) setChats([response.data, ...chats])
      setSelectedChat(response.data)
      setActiveTab('chat')
    })
  }
  const addUser = (usertoadd) => {
    if (!users.some(user => user._id === usertoadd._id)) {
      setUsers((users) => [...users, usertoadd]);
    }
  }

  const removeUser = (usertoremove) => {
    const filteredUsers = users.filter((user) => user._id !== usertoremove)
    setUsers(filteredUsers)
  }
  return (
    <div className={`bg-primary rounded-lg border border-primary ${smallDevice ? (selectedChat ? 'hidden' : 'w-full') : 'w-[30%]'}`}>

      <div className='flex gap-3 px-5 py-5 items-center justify-between'>
        <div className='flex gap-2'>
          <button onClick={() => setActiveTab('contact')} className='bg-graybg p-1 px-2 rounded-md'><IoChevronBackOutline /></button>
          <h3 className='font-semibold text-xl'>Create Group</h3>
        </div>
        <button onClick={() => createGroup()} className='bg-accent px-4 p-1.5 rounded-md text-sm hover:bg-accent/90'>Create</button>
      </div>
      <div className='w-full flex flex-col gap-3 px-3'>
        <input onChange={(e) => setGroupName(e.target.value)} className='w-full bg-secondary text-textsecondary outline-none p-1 rounded-md' type="text" placeholder='Group Name' />

        {users?.length > 0 && 
        (<div className='flex gap-3 flex-wrap'>
          {users.map((item) => {
            return(<UserItem key={item._id} item={item} removeUser={removeUser} />)
          })}
        </div>)}

        <div className='w-full flex gap-2'>
          <input onChange={(e) => setSearchTerm(e.target.value)} className='w-full bg-secondary text-textsecondary outline-none p-1 rounded-md' type="text" placeholder='Enter name or email' />
          <button className='bg-accent px-2 p-1 rounded-md hover:bg-accent/90' onClick={() => findUsers()}><IoSearchOutline /></button>
        </div>
      </div>

      {userList?.length > 0 &&
      (<div className='mt-4'>
        {userList.map((item) => {
          return (<ChatItem key={item._id} item={item} addUser={addUser} />)
        })}
      </div>)}
      
    </div>
  )
}

export default Group
