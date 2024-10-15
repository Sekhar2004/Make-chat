import React, { useContext, useState } from 'react'
import ProfileIcon from '../ProfileIcon'
import { ChatContext } from '@/context/userContext'
import { IoCameraOutline } from 'react-icons/io5'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
const UPLOAD_PRESET = import.meta.env.VITE_UPLOAD_PRESET
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME

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

const Setting = () => {
  const {user, token, setUser, selectedChat, smallDevice} = useContext(ChatContext)
  const [selectedFile, setSelectedFile] = useState(null)
  
  const uploadImage = () => {
    const data = new FormData()
    data.append("file", selectedFile)
    data.append("upload_preset", UPLOAD_PRESET)
    data.append("cloud_name", CLOUD_NAME)
    fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "post",
        body: data
    }).then(resp => resp.json()).then(data => {
      axios.post(`${BACKEND_URL}/api/user/uploadPic`, {newPic: data.url}, {headers: {'Authorization' :`Bearer ${token}`}}).then((response) => {
        setUser(response.data)
      })
    }).catch(err => console.log(err)).finally(setSelectedFile(null))      
  }

  return (
    <div className={`bg-primary w-[30%] rounded-lg border border-primary ${smallDevice ? (selectedChat ? 'hidden' : 'w-full') : 'w-[30%]'}`}>
      <div className='flex gap-3 px-5 py-5 items-baseline'>
        <h3 className='font-semibold text-xl'>Profile</h3>
      </div>

      <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col items-end relative'>
          <ProfileIcon pic={user?.pic} name={user?.name} size={100} />
          {!selectedFile && (<label htmlFor="fileInput" className="cursor-pointer absolute bottom-0 right-0">
            <span className="relative inline-block">
              <span className="relative">
                <IoCameraOutline className="text-white bg-graybg p-2 rounded-full" size={30} />
              </span>
            </span>
            <input type="file" id="fileInput" className="hidden" accept="image/*" onChange={(e) => setSelectedFile(e.target.files[0])} />
          </label>)}
        </div>
        {selectedFile && (<button onClick={() => uploadImage()} className='bg-accent px-2 p-1 rounded-md hover:bg-accent/90 mt-2'>upload</button>)}
      </div>


      <div>
        <SettingItem info='Name' value={user?.name} />
        <SettingItem info='Email' value={user?.email} />
      </div>
    </div>
  )
}

export default Setting
