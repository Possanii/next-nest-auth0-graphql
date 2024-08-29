import { getAccessToken } from '@auth0/nextjs-auth0'
import { NextResponse } from 'next/server'

export async function GET() {
  const { accessToken } = await getAccessToken()

  return NextResponse.json({ accessToken })
}
