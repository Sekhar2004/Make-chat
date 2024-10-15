import React, { useEffect, useState } from 'react'
import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'

const Mode = () => {
  const [theme, setTheme] = useState(localStorage.getItem('preferedTheme') || 'dark')
  const changeMode = () => {
    if(theme === 'dark'){
      document.documentElement.style.setProperty('--primary', "#fcfdff");
      document.documentElement.style.setProperty('--secondary', "#c4c5c6");
      document.documentElement.style.setProperty('--graybg', "#b0b1b2");
      document.documentElement.style.setProperty('--maintext', "#000");
      document.documentElement.style.setProperty('--hover', "#e0e4e5");
      document.documentElement.style.setProperty('--textsecondary', "#6a6a6a");
      setTheme('light')
      localStorage.setItem('preferedTheme', 'light')
    }else{
      document.documentElement.style.setProperty('--primary', "#23262f");
      document.documentElement.style.setProperty('--secondary', "#3b3e46");
      document.documentElement.style.setProperty('--graybg', "#3b3e46");
      document.documentElement.style.setProperty('--maintext', "#fff");
      document.documentElement.style.setProperty('--hover', "#3b3e46");
      document.documentElement.style.setProperty('--textsecondary', "#a1a2a4");
      setTheme('dark')
      localStorage.setItem('preferedTheme', 'dark')
    }
  }
  return (
    <span onClick={() => changeMode()} className='cursor-pointer hover:bg-graybg p-2 rounded-full duration-300'>
      {theme === 'dark' ? <MdOutlineLightMode size={20} />: <MdOutlineDarkMode size={20} />}
    </span>
  )
}

export default Mode
