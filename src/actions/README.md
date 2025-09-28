# Actions Structure

โครงสร้าง actions ที่จัดระเบียบแล้วสำหรับจัดการ business logic แยกจาก UI components

## โครงสร้าง

```
src/actions/
├── blog/
│   ├── index.js          # Export หลักสำหรับ blog actions
│   ├── fetch.js          # ดึงข้อมูล blog posts
│   ├── create.js         # สร้าง blog post ใหม่
│   ├── update.js         # อัพเดท blog post และ publish/unpublish
│   ├── delete.js         # ลบ blog post
│   └── bulk.js           # จัดการ bulk operations
└── projects/
    ├── index.js          # Export หลักสำหรับ project actions
    ├── fetch.js          # ดึงข้อมูล projects
    ├── create.js         # สร้าง project ใหม่
    ├── update.js         # อัพเดท project และ publish/unpublish
    ├── delete.js         # ลบ project
    └── bulk.js           # จัดการ bulk operations
```

## การใช้งาน

### Blog Actions

```javascript
import { 
  fetchBlogPosts,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  publishPost,
  unpublishPost,
  togglePublishPost,
  deleteMultiplePosts,
  publishMultiplePosts,
  unpublishMultiplePosts,
  duplicateMultiplePosts,
  exportMultiplePosts,
  exportSinglePost
} from '@/actions/blog'

// ดึงข้อมูล posts
const result = await fetchBlogPosts({
  page: 1,
  limit: 10,
  search: 'keyword',
  published: true,
  sort: 'createdAt_desc'
})

// สร้าง post ใหม่
const newPost = await createBlogPost({
  title: 'Post Title',
  content: 'Post content...',
  published: false
})

// อัพเดท post
const updatedPost = await updateBlogPost(postId, {
  title: 'Updated Title'
})

// Bulk operations
const deleteResult = await deleteMultiplePosts([id1, id2, id3])
```

### Project Actions

```javascript
import { 
  fetchProjects,
  createProject,
  updateProject,
  deleteProject,
  publishProject,
  unpublishProject,
  togglePublishProject,
  deleteMultipleProjects,
  publishMultipleProjects,
  unpublishMultipleProjects,
  duplicateMultipleProjects,
  exportMultipleProjects,
  exportSingleProject
} from '@/actions/projects'

// การใช้งานเหมือนกับ blog actions
```

## ข้อดีของโครงสร้างนี้

1. **Separation of Concerns** - แยก business logic ออกจาก UI components
2. **Reusability** - สามารถนำ actions ไปใช้ซ้ำในหลาย components
3. **Testing** - ง่ายต่อการเขียน unit tests
4. **Maintainability** - จัดการและแก้ไขได้ง่ายขึ้น
5. **Consistency** - API calls มีรูปแบบที่สม่ำเสมอ
6. **Error Handling** - จัดการ error แบบ centralized

## Return Format

Actions ทั้งหมดจะ return object ในรูปแบบ:

```javascript
// สำหรับการทำงานสำเร็จ
{
  success: true,
  data: {...},        // ข้อมูลที่ได้
  message: "..."      // ข้อความแจ้ง (optional)
}

// สำหรับการทำงานล้มเหลว
{
  success: false,
  error: "error message"
}
```

## Migration จากเดิม

Components ที่เคยมี inline API calls ได้ถูกอัพเดทให้ใช้ actions แล้ว:

- ✅ `src/components/admin/blog/ฺblog-list.jsx` - ใช้ blog actions แล้ว
- 🔄 `src/components/admin/projects/project-list.jsx` - รอการอัพเดท (ถ้ามี)
