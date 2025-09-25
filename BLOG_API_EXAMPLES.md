# 📚 Blog API Routes - ตัวอย่างการใช้งาน

## 🚀 API Endpoints ที่สร้างขึ้น

### 1. **GET /api/blog** - ดึงรายการ blog posts
```javascript
// ตัวอย่างการเรียกใช้
const response = await fetch('/api/blog?page=1&limit=10&search=react&published=true')
const data = await response.json()

// Response format
{
  "success": true,
  "data": {
    "posts": [
      {
        "id": "clx1234567890",
        "title": "Getting Started with React",
        "slug": "getting-started-with-react",
        "content": "React is a JavaScript library...",
        "excerpt": "Learn the basics of React development",
        "coverImage": "/images/blog/react-cover.jpg",
        "published": true,
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z",
        "author": {
          "id": "user123",
          "name": "John Doe",
          "email": "john@example.com"
        }
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

### 2. **POST /api/blog** - สร้าง blog post ใหม่
```javascript
// ตัวอย่างการเรียกใช้
const response = await fetch('/api/blog', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'My New Blog Post',
    content: 'This is the content of my blog post...',
    excerpt: 'A brief description of the post',
    coverImage: '/images/blog/my-cover.jpg',
    published: false
  })
})

// Response format
{
  "success": true,
  "data": {
    "id": "clx1234567890",
    "title": "My New Blog Post",
    "slug": "my-new-blog-post",
    "content": "This is the content of my blog post...",
    "excerpt": "A brief description of the post",
    "coverImage": "/images/blog/my-cover.jpg",
    "published": false,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "author": {
      "id": "user123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  },
  "message": "Blog post created successfully"
}
```

### 3. **GET /api/blog/[id]** - ดึง blog post เดียว
```javascript
// ตัวอย่างการเรียกใช้
const response = await fetch('/api/blog/clx1234567890')
const data = await response.json()

// Response format
{
  "success": true,
  "data": {
    "id": "clx1234567890",
    "title": "Getting Started with React",
    "slug": "getting-started-with-react",
    "content": "React is a JavaScript library...",
    "excerpt": "Learn the basics of React development",
    "coverImage": "/images/blog/react-cover.jpg",
    "published": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z",
    "author": {
      "id": "user123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  }
}
```

### 4. **PUT /api/blog/[id]** - แก้ไข blog post
```javascript
// ตัวอย่างการเรียกใช้
const response = await fetch('/api/blog/clx1234567890', {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    title: 'Updated Blog Post Title',
    content: 'Updated content...',
    published: true
  })
})

// Response format
{
  "success": true,
  "data": {
    "id": "clx1234567890",
    "title": "Updated Blog Post Title",
    "slug": "updated-blog-post-title",
    "content": "Updated content...",
    "excerpt": "Learn the basics of React development",
    "coverImage": "/images/blog/react-cover.jpg",
    "published": true,
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T11:45:00Z",
    "author": {
      "id": "user123",
      "name": "John Doe",
      "email": "john@example.com"
    }
  },
  "message": "Blog post updated successfully"
}
```

### 5. **DELETE /api/blog/[id]** - ลบ blog post
```javascript
// ตัวอย่างการเรียกใช้
const response = await fetch('/api/blog/clx1234567890', {
  method: 'DELETE'
})

// Response format
{
  "success": true,
  "message": "Blog post deleted successfully"
}
```

### 6. **POST /api/upload** - อัปโหลดรูปภาพ
```javascript
// ตัวอย่างการเรียกใช้
const formData = new FormData()
formData.append('file', fileInput.files[0])
formData.append('type', 'blog') // หรือ 'project'

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
})

// Response format
{
  "success": true,
  "data": {
    "id": "1705312200000-abc123",
    "filename": "1705312200000-abc123.jpg",
    "originalName": "my-image.jpg",
    "url": "/images/blog/1705312200000-abc123.jpg",
    "type": "blog",
    "size": 1024000,
    "uploadedAt": "2024-01-15T10:30:00Z",
    "uploadedBy": "user123"
  },
  "message": "File uploaded successfully"
}
```

### 7. **GET /api/upload** - ดึงรายการรูปภาพ
```javascript
// ตัวอย่างการเรียกใช้
const response = await fetch('/api/upload?type=blog')
const data = await response.json()

// Response format
{
  "success": true,
  "data": [
    {
      "id": "1",
      "filename": "sample-blog-cover.jpg",
      "url": "/images/blog/sample-blog-cover.jpg",
      "type": "blog",
      "uploadedAt": "2024-01-15T10:30:00Z",
      "size": 1024000
    }
  ]
}
```

## 🔐 Authentication & Authorization

- **Admin Only**: POST, PUT, DELETE operations require admin authentication
- **Public Access**: GET operations are public (แต่สามารถ filter เฉพาะ published posts)
- **User Ownership**: Users can only edit/delete their own posts

## 📝 Validation Rules

### Blog Post Schema:
- `title`: Required, 1-200 characters
- `content`: Required, minimum 1 character
- `excerpt`: Optional
- `coverImage`: Optional, must be valid URL or empty string
- `published`: Boolean, defaults to false

## 🚨 Error Handling

### Common Error Responses:
```javascript
// 401 Unauthorized
{
  "success": false,
  "error": "Unauthorized"
}

// 400 Validation Error
{
  "success": false,
  "error": "Validation error",
  "details": [
    {
      "path": ["title"],
      "message": "Title is required"
    }
  ]
}

// 404 Not Found
{
  "success": false,
  "error": "Post not found"
}

// 500 Server Error
{
  "success": false,
  "error": "Failed to create blog post"
}
```

## 🎯 Next Steps

1. **สร้าง Admin Interface** - สำหรับจัดการ blog posts
2. **เพิ่ม Rich Text Editor** - สำหรับเขียน content
3. **สร้าง Public Pages** - แสดงผลสำหรับผู้เยี่ยมชม
4. **เพิ่ม SEO Features** - metadata, sitemap
5. **เพิ่ม Categories/Tags** - จัดหมวดหมู่ posts
