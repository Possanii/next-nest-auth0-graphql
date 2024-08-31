import { getAccessToken } from '@auth0/nextjs-auth0'
import { redirect } from 'next/navigation'

export default async function Dashboard() {
  let accessToken: string | undefined

  try {
    const { accessToken: token } = await getAccessToken()
    accessToken = token
  } catch {
    redirect('/api/auth/logout')
  }

  if (!accessToken) {
    throw new Error('Invalid access token')
  }

  return (
    <div>
      <h1>Dashboard</h1>

      <pre>{accessToken}</pre>

      <a href="/api/auth/logout">Logout</a>
    </div>
  )
}
