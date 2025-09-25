# Cloudinary Configuration

## Environment Variables ที่ต้องเพิ่มใน .env.local

```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## วิธีการตั้งค่า Cloudinary

### 1. สมัครสมาชิก Cloudinary
- ไปที่ https://cloudinary.com
- สมัครสมาชิกฟรี (มี free tier 25GB storage)
- เข้าสู่ระบบและไปที่ Dashboard

### 2. ดูข้อมูล API Credentials
- ใน Dashboard จะเห็น:
  - **Cloud Name**: ชื่อ cloud ของคุณ
  - **API Key**: API key สำหรับ authentication
  - **API Secret**: API secret สำหรับ authentication

### 3. เพิ่ม Environment Variables
- เพิ่มข้อมูลข้างต้นในไฟล์ `.env.local`
- อย่าลืม restart development server หลังจากเพิ่ม env vars

## ตัวอย่างการใช้งาน

### Upload รูปภาพ
```javascript
const formData = new FormData()
formData.append('file', fileInput.files[0])
formData.append('type', 'blog') // หรือ 'project'

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
})

const result = await response.json()
console.log(result.data.url) // URL ของรูปภาพใน Cloudinary
```

### ดึงรายการรูปภาพ
```javascript
const response = await fetch('/api/upload?type=blog')
const data = await response.json()
console.log(data.data) // รายการรูปภาพทั้งหมด
```

### ลบรูปภาพ
```javascript
const response = await fetch(`/api/upload?publicId=${publicId}`, {
  method: 'DELETE'
})
```

## Features ของ Cloudinary

### ✅ **Automatic Optimization**
- รูปภาพจะถูก optimize อัตโนมัติ
- รองรับ WebP, AVIF formats
- Quality optimization

### ✅ **Responsive Images**
- สามารถสร้าง responsive images ได้
- รองรับ different sizes และ formats

### ✅ **Image Transformations**
- Crop, resize, rotate
- Filters และ effects
- Watermark support

### ✅ **CDN Delivery**
- รูปภาพจะถูก serve ผ่าน CDN
- Fast loading ทั่วโลก

### ✅ **Folder Organization**
- จัดระเบียบรูปภาพใน folders
- `bdblog/blog/` - สำหรับ blog images
- `bdblog/project/` - สำหรับ project images

## การใช้งานใน Frontend

### ตัวอย่าง React Component
```jsx
import { useState } from 'react'

function ImageUpload({ onUpload }) {
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState(null)

  const handleFileChange = async (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Show preview
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(file)

    // Upload to Cloudinary
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', 'blog')

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      const result = await response.json()
      if (result.success) {
        onUpload(result.data.url)
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange}
        disabled={uploading}
      />
      {preview && (
        <img src={preview} alt="Preview" style={{ maxWidth: '200px' }} />
      )}
      {uploading && <p>Uploading...</p>}
    </div>
  )
}
```

## Security Considerations

### ✅ **File Type Validation**
- ตรวจสอบ file type ก่อน upload
- รองรับเฉพาะ image files

### ✅ **File Size Limits**
- จำกัดขนาดไฟล์ไม่เกิน 10MB
- ป้องกันการ upload ไฟล์ขนาดใหญ่

### ✅ **Authentication**
- ต้องเป็น admin เท่านั้นที่สามารถ upload ได้
- ตรวจสอบ session ก่อนทำการ upload

### ✅ **Folder Structure**
- จัดระเบียบรูปภาพใน folders
- แยกประเภท blog และ project
