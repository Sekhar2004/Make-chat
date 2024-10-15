import React, { useContext } from 'react'
import { MdOutlineExplore } from "react-icons/md";
import { IoChatbubblesOutline, IoCallOutline, IoPeopleOutline, IoSettingsOutline, IoLogOutOutline, IoChevronForward, IoChevronBackOutline } from "react-icons/io5";
import ProfileIcon from './ProfileIcon';
import Logout from './auth/Logout';
import { ChatContext } from '@/context/userContext';

const SideBarItem = ({name, icon: IconComponent, active, small, setActiveTab}) => {
  return <span onClick={() => setActiveTab(name.toLowerCase())} className={`${active ? 'border-l-4 border-black' : ''} px-5 py-3 flex gap-3 items-center cursor-pointer ${small ? 'justify-center' : ''} hover:bg-hover hover:duration-300`}>{IconComponent} {small ? '' : name}</span>
}

const SideBarTitle = ({small, user, setActiveTab}) => {
  return(
    <div className='px-5 flex gap-4 py-10 items-center'>
      {user && (<span onClick={() => setActiveTab('setting')} className='cursor-pointer flex'><ProfileIcon pic={user.pic} name={user.name} size={40} /></span>)}
      {!small && <span className='font-semibold'>{user.name}</span>}
    </div>
  )
}

const ToogleButton = ({small, setSmall}) => {
  return(
    <div className='flex justify-end'>
      <span onClick={() => setSmall(!small)} className='bg-secondary p-1.5 cursor-pointer text-sm rounded-md shadow-md hover:bg-hover hover:duration-300'>
        {small ? <IoChevronForward /> : <IoChevronBackOutline />}
      </span>
    </div>
  )
}

const SideBarItems = [
  {name: "Explore", icon: <MdOutlineExplore size={20} />, active: false},
  {name: "Chat", icon: <IoChatbubblesOutline size={20} />, active: true},
  {name: "Calls", icon: <IoCallOutline size={20} />, active: false},
  {name: "Contact", icon: <IoPeopleOutline size={20} />, active: false},
  {name: "Setting", icon: <IoSettingsOutline size={20} />, active: false},
]

const Sidebar = ({small = false, setSmall, setActiveTab, activeTab}) => {
  const {user} = useContext(ChatContext)
  return (
    <div className={`flex flex-col bg-primary rounded-lg justify-between ${!small ? 'w-[20vw]' : ''} duration-300`}>
      <div>
        <SideBarTitle small={small} user={user} setActiveTab={setActiveTab} />
        
        {SideBarItems.map((item, idx) => {
          return (<SideBarItem key={idx} small={small} name={item.name} icon={item.icon} active={item.name.toLowerCase() === activeTab} setActiveTab={setActiveTab} />)
        })}
        
      </div>
      <div className='pb-5'>
        <ToogleButton small={small} setSmall={setSmall} />
        <Logout small={small} />
      </div>
    </div>
  )
}

export default Sidebar
