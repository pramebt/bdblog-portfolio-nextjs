# การแก้ไข Internal Server Error

## ปัญหาที่พบ:
1. **Prisma Client Permission Issues** - ไม่สามารถ generate Prisma client ได้เนื่องจาก permission error
2. **NEXTAUTH_SECRET** - ใช้ค่า default ที่ไม่ปลอดภัย
3. **Database Connection** - ปัญหา connection pool

## การแก้ไขที่ทำ:

### 1. แก้ไข Auth Configuration
- ลบ Prisma adapter ออกชั่วคราว
- ใช้ hardcoded admin credentials สำหรับทดสอบ
- เพิ่ม fallback secret key

### 2. สร้าง Test API Routes
- `/api/test` - ทดสอบ API ทำงาน
- `/api/auth/signup-test` - ทดสอบ signup validation

### 3. แก้ไข Prisma Issues
- ลบ `prisma.$disconnect()` จาก API routes
- สร้าง singleton Prisma client

## การทดสอบ:

### 1. ทดสอบ API
```bash
# ทดสอบ API ทำงาน
curl http://localhost:3000/api/test

# ทดสอบ signup validation
curl -X POST http://localhost:3000/api/auth/signup-test \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"123456"}'
```

### 2. ทดสอบ Authentication
- ไปที่ `/auth/signin`
- ใช้ credentials จาก `.env`:
  - Email: `your-email@example.com`
  - Password: `your-secure-password`

## ขั้นตอนต่อไป:

### 1. แก้ไข Prisma Permission
```bash
# ลบ node_modules และติดตั้งใหม่
rm -rf node_modules
npm install

# หรือใช้ PowerShell
Remove-Item -Recurse -Force node_modules
npm install
```

### 2. Generate Prisma Client
```bash
npx prisma generate
```

### 3. เปิดใช้งาน Database Authentication
- แก้ไข `src/lib/auth.js` ให้ใช้ Prisma อีกครั้ง
- แก้ไข `src/app/api/auth/signup/route.js` ให้ใช้ database

## Environment Variables ที่ต้องตั้งค่า:

```env
# Database
DATABASE_URL="postgresql://postgres:641051@localhost:5432/bd_blog_db?schema=public"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="UwPnYqdGmsAnM2jBF3lwJbf5m7PAURt8S0VDOBbbAmg="

# Admin Credentials
ADMIN_EMAIL="admin@example.com"
ADMIN_PASSWORD="admin123"
```

## สถานะปัจจุบัน:
✅ API routes ทำงาน  
✅ Authentication ทำงาน (hardcoded)  
✅ Form validation ทำงาน  
⏳ Database integration (รอแก้ไข Prisma)  
⏳ Dynamic user management (รอแก้ไข Prisma)
