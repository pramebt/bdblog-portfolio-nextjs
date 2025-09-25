# 🚀 Cloudinary Upload System - ตัวอย่างการใช้งาน

## ✅ สิ่งที่ได้สร้างขึ้น

### 1. **Cloudinary Configuration** (`src/lib/cloudinary.js`)
- ✅ Upload images to Cloudinary
- ✅ Delete images from Cloudinary  
- ✅ Get images from specific folders
- ✅ Automatic image optimization
- ✅ Error handling

### 2. **API Routes** (`src/app/api/upload/route.js`)
- ✅ `GET /api/upload` - ดึงรายการรูปภาพ
- ✅ `POST /api/upload` - อัปโหลดรูปภาพ
- ✅ `DELETE /api/upload` - ลบรูปภาพ
- ✅ Authentication & validation
- ✅ File type & size validation

### 3. **React Component** (`src/components/admin/media/CloudinaryUpload.jsx`)
- ✅ Drag & drop file selection
- ✅ Image preview
- ✅ Upload progress
- ✅ Error handling
- ✅ Multiple file support
- ✅ Copy URL functionality

## 🔧 การตั้งค่า

### 1. เพิ่ม Environment Variables ใน `.env.local`
```env
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 2. สมัครสมาชิก Cloudinary
- ไปที่ https://cloudinary.com
- สมัครสมาชิกฟรี (25GB storage)
- คัดลอก API credentials จาก Dashboard

## 📝 ตัวอย่างการใช้งาน

### 1. **ใช้ใน Admin Panel**
```jsx
import CloudinaryUpload from '@/components/admin/media/CloudinaryUpload'

function BlogCreatePage() {
  const [coverImage, setCoverImage] = useState('')

  const handleImageUpload = (url, imageData) => {
    setCoverImage(url)
    console.log('Image uploaded:', imageData)
  }

  return (
    <div>
      <h1>Create Blog Post</h1>
      
      <CloudinaryUpload
        onUpload={handleImageUpload}
        type="blog"
        maxFiles={1}
      />
      
      {coverImage && (
        <div>
          <p>Cover Image:</p>
          <img src={coverImage} alt="Cover" className="w-64 h-32 object-cover" />
        </div>
      )}
    </div>
  )
}
```

### 2. **ใช้สำหรับ Multiple Files**
```jsx
function ProjectCreatePage() {
  const [projectImages, setProjectImages] = useState([])

  const handleImageUpload = (url, imageData) => {
    setProjectImages(prev => [...prev, { url, ...imageData }])
  }

  return (
    <CloudinaryUpload
      onUpload={handleImageUpload}
      type="project"
      maxFiles={5}
    />
  )
}
```

### 3. **ใช้ใน Form**
```jsx
function BlogForm() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    coverImage: ''
  })

  const handleImageUpload = (url) => {
    setFormData(prev => ({
      ...prev,
      coverImage: url
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const response = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    
    const result = await response.json()
    if (result.success) {
      console.log('Blog created:', result.data)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={formData.title}
        onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
      />
      
      <CloudinaryUpload
        onUpload={handleImageUpload}
        type="blog"
        maxFiles={1}
      />
      
      <button type="submit">Create Blog</button>
    </form>
  )
}
```

## 🎯 Features ของระบบ

### ✅ **Automatic Optimization**
- รูปภาพจะถูก optimize อัตโนมัติ
- รองรับ WebP, AVIF formats
- Quality optimization

### ✅ **Folder Organization**
- `bdblog/blog/` - สำหรับ blog images
- `bdblog/project/` - สำหรับ project images
- จัดระเบียบรูปภาพตามประเภท

### ✅ **Security**
- Admin authentication required
- File type validation (images only)
- File size limits (10MB max)
- Error handling

### ✅ **User Experience**
- Image preview
- Upload progress
- Error messages
- Copy URL functionality
- Multiple file support

## 🔄 API Endpoints

### **GET /api/upload**
```javascript
// ดึงรายการรูปภาพ
const response = await fetch('/api/upload?type=blog')
const data = await response.json()

// Response
{
  "success": true,
  "data": [
    {
      "id": "bdblog/blog/image123",
      "filename": "image123.jpg",
      "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/bdblog/blog/image123.jpg",
      "type": "blog",
      "uploadedAt": "2024-01-15T10:30:00Z",
      "size": 1024000,
      "width": 1200,
      "height": 630,
      "format": "jpg"
    }
  ]
}
```

### **POST /api/upload**
```javascript
// อัปโหลดรูปภาพ
const formData = new FormData()
formData.append('file', fileInput.files[0])
formData.append('type', 'blog')

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
})

// Response
{
  "success": true,
  "data": {
    "id": "bdblog/blog/image123",
    "filename": "image123.jpg",
    "url": "https://res.cloudinary.com/your-cloud/image/upload/v1234567890/bdblog/blog/image123.jpg",
    "type": "blog",
    "size": 1024000,
    "width": 1200,
    "height": 630,
    "format": "jpg",
    "uploadedAt": "2024-01-15T10:30:00Z"
  },
  "message": "File uploaded successfully to Cloudinary"
}
```

### **DELETE /api/upload**
```javascript
// ลบรูปภาพ
const response = await fetch('/api/upload?publicId=bdblog/blog/image123', {
  method: 'DELETE'
})

// Response
{
  "success": true,
  "message": "File deleted successfully from Cloudinary"
}
```

## 🚀 ขั้นตอนต่อไป

1. **ตั้งค่า Cloudinary** - เพิ่ม API credentials
2. **ทดสอบระบบ** - อัปโหลดรูปภาพทดสอบ
3. **สร้าง Admin Interface** - ใช้ CloudinaryUpload component
4. **เพิ่ม Image Gallery** - แสดงรูปภาพที่อัปโหลดแล้ว
5. **เพิ่ม Image Editor** - crop, resize, filters

## 💡 Tips

- **ใช้ Cloudinary Transformations** - สร้าง responsive images
- **Optimize Images** - ใช้ quality: 'auto' และ fetch_format: 'auto'
- **Organize Folders** - แยกประเภทรูปภาพให้ชัดเจน
- **Monitor Usage** - ตรวจสอบ storage และ bandwidth usage
- **Backup Strategy** - สำรองข้อมูลสำคัญ
