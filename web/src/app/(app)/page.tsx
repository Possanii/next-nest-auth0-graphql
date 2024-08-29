'use client'

import { useUser } from '@auth0/nextjs-auth0/client'
import { useEffect } from 'react'

export default function Home() {
  const { user } = useUser()

  useEffect(() => {
    ;(async function a() {
      const data = await fetch('http://localhost:3000/api/auth/accessToken')

      console.log(await data.json())
    })()
  }, [])

  return (
    <div>
      <h1 className="flex h-full w-full flex-col gap-2">Hello World!</h1>

      <pre>{JSON.stringify(user, null, 2)}</pre>

      <a href="/api/auth/login">Login</a>
    </div>
  )
}
