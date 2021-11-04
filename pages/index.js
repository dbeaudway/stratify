import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"

const Home = () => {
  const { data: session } = useSession()

  const getRecentTracks = async () => {
    const res = await fetch('/api/spotify/tracks')
    const data = await res.json()
    console.log(data)
  }
    
  if (session) {
      return (
          <>
              Signed in as {session.user.email} <br />
              <button onClick={() => signOut()}>Sign out</button>
              <p>{session.user.name}</p>
              <p>{session.user.email}</p>
              <img src={session.user.image} />
              <button onClick={getRecentTracks}>Get Tracks</button>
          </>
      )
  }

  return (
      <>
        Not signed in <br />
        <button onClick={() => signIn()}>Sign in</button>
      </>
  )
}

export default Home
