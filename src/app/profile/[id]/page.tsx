import React from 'react'

function UserProfile({params}) {
    const {id} = params;
  return (
    <div>UserProfile: {id}</div>
  )
}

export default UserProfile