import {createContext, useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'

export const ChatContext = createContext(null)

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const ChatContextProvider = (props) => {
    const [allInfo, setAllInfo] = useState(null)
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(null)
    const [selectedChat, setSelectedChat] = useState(null)
    const [chats, setChats] = useState(null)
    const [smallDevice, setSmallDevice] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'))
        setUser(userInfo?.user)
        setToken(userInfo?.token)
        setAllInfo(userInfo)

        if(!userInfo){
            navigate('/')
        }
    }, [navigate])

    useEffect(() => {
        if (smallDevice === false && window.innerWidth < 800) {
            setSmallDevice(true)
            console.log('small device', true)
        }
        else if  (smallDevice === true && window.innerWidth >= 800){
            setSmallDevice(false)
            console.log('small device', false)
        }
    }, [])

    useEffect(() => {
        const theme = localStorage.getItem('preferedTheme') || 'dark'
        if(theme === 'light'){
            document.documentElement.style.setProperty('--primary', "#fcfdff");
            document.documentElement.style.setProperty('--secondary', "#c4c5c6");
            document.documentElement.style.setProperty('--graybg', "#b0b1b2");
            document.documentElement.style.setProperty('--maintext', "#000");
            document.documentElement.style.setProperty('--hover', "#e0e4e5");
            document.documentElement.style.setProperty('--textsecondary', "#6a6a6a");
        }else{
            document.documentElement.style.setProperty('--primary', "#23262f");
            document.documentElement.style.setProperty('--secondary', "#3b3e46");
            document.documentElement.style.setProperty('--graybg', "#3b3e46");
            document.documentElement.style.setProperty('--maintext', "#fff");
            document.documentElement.style.setProperty('--hover', "#3b3e46");
            document.documentElement.style.setProperty('--textsecondary', "#a1a2a4");
        }
    }, [])

    const contextValue = {allInfo, user, setUser, token, selectedChat, setSelectedChat, chats, setChats, BACKEND_URL, smallDevice}
    return(
        <ChatContext.Provider value={contextValue}>
            {props.children}
        </ChatContext.Provider>
    )
}

export default ChatContextProvider