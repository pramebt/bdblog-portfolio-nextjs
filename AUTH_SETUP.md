# Admin Authentication System

ระบบ authentication สำหรับ admin ที่สร้างด้วย NextAuth.js และ Prisma

## การติดตั้ง

### 1. ติดตั้ง Dependencies
```bash
npm install next-auth @next-auth/prisma-adapter bcryptjs zod
```

### 2. ตั้งค่า Environment Variables
สร้างไฟล์ `.env.local` และเพิ่ม:

```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/bdblog"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
```

### 3. รัน Database Migration
```bash
npm run db:migrate
```

### 4. Generate Prisma Client
```bash
npm run db:generate
```

## ไฟล์ที่สร้างขึ้น

### Authentication Configuration
- `src/lib/auth.js` - การตั้งค่า NextAuth
- `src/app/api/auth/[...nextauth]/route.js` - NextAuth API route
- `src/app/api/auth/signup/route.js` - API สำหรับสมัครสมาชิก

### Pages
- `src/app/auth/signin/page.jsx` - หน้าเข้าสู่ระบบ
- `src/app/auth/signup/page.jsx` - หน้าสมัครสมาชิก

### Components
- `src/components/ui/input.jsx` - Input component
- `src/components/ui/label.jsx` - Label component
- `src/components/ui/alert.jsx` - Alert component
- `src/components/session-provider.jsx` - Session provider

### Middleware
- `middleware.js` - ป้องกันการเข้าถึง admin routes

## การใช้งาน

1. เข้าไปที่ `/auth/signup` เพื่อสร้างบัญชี admin
2. เข้าไปที่ `/auth/signin` เพื่อเข้าสู่ระบบ
3. หลังจากเข้าสู่ระบบจะถูก redirect ไปที่ `/admin`

## Features

- ✅ Password hashing ด้วย bcryptjs
- ✅ Form validation ด้วย Zod
- ✅ Protected admin routes
- ✅ Session management
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states
- ✅ Password visibility toggle
