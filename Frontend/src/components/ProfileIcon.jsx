import React from 'react'

const ProfileIcon = ({name = 'chetan', pic, size = 30}) => {
  if(pic) {
    return (<img title='profile' className='cursor-pointer' src={pic} alt="profile" width={size} />)
  }
  return (<span title='profile' className={`bg-green-600 p-1 px-3 rounded-full`}>{name.toUpperCase().slice(0, 1)}</span>)
}

export default ProfileIcon