import React, { useEffect, useContext } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('userInfo'))
    if(user) navigate('/chat')
  }, [navigate])

  return (
    <div className='flex justify-around items-center min-h-screen'>
      {/* <div>
        <h2 className='font-semibold text-3xl'>Welcome.</h2>
      </div> */}
      <div className='bg-primary p-10 w-[90vw] lg:w-[30vw] rounded-lg'>
        <Tabs defaultValue="login" className="w-full">
          <TabsList>
            <TabsTrigger value="signup">SignUp</TabsTrigger>
            <TabsTrigger value="login">Login</TabsTrigger>
          </TabsList>
          <TabsContent value="signup">
            <Register />
          </TabsContent>
          <TabsContent value="login">
            <Login />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Home
