import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Credentials cho admin
const ADMIN_USERNAME = 'minhquyen'
const ADMIN_PASSWORD = 'donganh'

// Hàm kiểm tra basic auth
function checkBasicAuth(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return false
  }

  // Decode base64 credentials
  const base64Credentials = authHeader.split(' ')[1]
  const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
  const [username, password] = credentials.split(':')

  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD
}

export function middleware(request: NextRequest) {
  // Chỉ áp dụng cho đường dẫn /admin
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!checkBasicAuth(request)) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Admin Area"'
        },
      })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*'
} 