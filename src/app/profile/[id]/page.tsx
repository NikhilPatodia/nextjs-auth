import React from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function UserProfile({params}:any) {
    const {id} = params;
  return (
    <div>UserProfile: {id}</div>
  )
}

export default UserProfile