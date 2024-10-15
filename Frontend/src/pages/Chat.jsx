import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import NavBar from '../components/NavBar'
import Inbox from '../components/Inbox'
import ChatWindow from '../components/ChatWindow'
import Contact from '@/components/contact/Contact'
import Setting from '@/components/setting/Setting'
import Group from '@/components/group/Group'
import Info from '@/components/Info/Info'
const Chat = () => {
  const [activeTab, setActiveTab] = useState('chat')
  const [small, setSmall] = useState(true)
  return (
    <div className='flex min-h-screen bg-secondary p-5 gap-5'>
      <Sidebar setActiveTab={setActiveTab} activeTab={activeTab} small={small} setSmall={setSmall} />
      <div className='w-full flex flex-col gap-5'>
        <NavBar setActiveTab={setActiveTab} />
        <div className='flex w-full h-full gap-5'>
          {activeTab === 'chat' && (<Inbox />)}
          {activeTab === 'contact' && (<Contact setActiveTab={setActiveTab} />)}
          {activeTab === 'setting' && (<Setting />)}
          {activeTab === 'group' && (<Group setActiveTab={setActiveTab} />)}
          {activeTab === 'info' && (<Info setActiveTab={setActiveTab} />)}
          {/* <Contact /> */}
          <ChatWindow activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </div>
  )
}

export default Chat
