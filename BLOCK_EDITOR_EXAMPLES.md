# ตัวอย่างเนื้อหาสำหรับ Block Editor

## 📝 **ตัวอย่างการใช้งาน Block Editor**

### **🎯 ตัวอย่างเนื้อหาที่แนะนำ:**

---

## **1. บทความเกี่ยวกับ Next.js**

### **Block Structure:**
```
Block 1: Heading 1 → "Next.js 15: สิ่งใหม่ที่น่าตื่นเต้น"
Block 2: Paragraph → "Next.js 15 มาพร้อมกับฟีเจอร์ใหม่ที่น่าตื่นเต้นมากมาย..."
Block 3: Heading 2 → "ฟีเจอร์ใหม่ที่น่าสนใจ"
Block 4: List (Bullet) → 
  - App Router ที่เสถียรขึ้น
  - Server Components ปรับปรุงใหม่
  - Turbopack เร็วขึ้น 10 เท่า
  - TypeScript support ที่ดีขึ้น
Block 5: Code Block (JavaScript) → 
  ```javascript
  import { NextResponse } from 'next/server'
  
  export async function GET() {
    return NextResponse.json({ message: 'Hello Next.js 15!' })
  }
  ```
Block 6: Quote → "Next.js 15 ทำให้การพัฒนาเว็บแอปพลิเคชันง่ายขึ้นมาก" - Vercel Team
Block 7: Image → อัปโหลดรูป screenshot ของ Next.js dashboard
Block 8: Paragraph → "สรุปแล้ว Next.js 15 เป็นอัปเดตที่คุ้มค่ามาก..."

---

## **2. บทความเกี่ยวกับ React Hooks**

### **Block Structure:**
```
Block 1: Heading 1 → "React Hooks: เปลี่ยนวิธีการเขียน React"
Block 2: Paragraph → "React Hooks เป็นฟีเจอร์ที่เปลี่ยนวิธีการเขียน React components..."
Block 3: Heading 2 → "useState Hook"
Block 4: Code Block (JavaScript) →
  ```javascript
  import { useState } from 'react'
  
  function Counter() {
    const [count, setCount] = useState(0)
    
    return (
      <div>
        <p>Count: {count}</p>
        <button onClick={() => setCount(count + 1)}>
          Increment
        </button>
      </div>
    )
  }
  ```
Block 5: Paragraph → "useState เป็น Hook พื้นฐานที่ใช้จัดการ state..."
Block 6: Heading 2 → "useEffect Hook"
Block 7: Code Block (JavaScript) →
  ```javascript
  import { useState, useEffect } from 'react'
  
  function DataFetcher() {
    const [data, setData] = useState(null)
    
    useEffect(() => {
      fetch('/api/data')
        .then(res => res.json())
        .then(data => setData(data))
    }, [])
    
    return <div>{data ? data.message : 'Loading...'}</div>
  }
  ```
Block 8: Quote → "Hooks ทำให้ functional components มีพลังเท่ากับ class components" - React Team
Block 9: List (Numbered) →
  1. useState - จัดการ state
  2. useEffect - side effects
  3. useContext - context API
  4. useReducer - complex state
  5. useMemo - memoization
Block 10: Paragraph → "สรุปแล้ว React Hooks ทำให้โค้ดอ่านง่ายและ maintain ง่ายขึ้น..."

---

## **3. บทความเกี่ยวกับ Database Design**

### **Block Structure:**
```
Block 1: Heading 1 → "Database Design: หลักการออกแบบฐานข้อมูลที่ดี"
Block 2: Paragraph → "การออกแบบฐานข้อมูลที่ดีเป็นพื้นฐานสำคัญของแอปพลิเคชัน..."
Block 3: Heading 2 → "Normalization"
Block 4: Paragraph → "Normalization เป็นกระบวนการจัดระเบียบข้อมูล..."
Block 5: Code Block (SQL) →
  ```sql
  -- Before Normalization
  CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_name VARCHAR(100),
    customer_email VARCHAR(100),
    product_name VARCHAR(100),
    product_price DECIMAL(10,2),
    order_date DATE
  );
  
  -- After Normalization
  CREATE TABLE customers (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
  );
  
  CREATE TABLE products (
    id INT PRIMARY KEY,
    name VARCHAR(100),
    price DECIMAL(10,2)
  );
  
  CREATE TABLE orders (
    id INT PRIMARY KEY,
    customer_id INT,
    product_id INT,
    order_date DATE,
    FOREIGN KEY (customer_id) REFERENCES customers(id),
    FOREIGN KEY (product_id) REFERENCES products(id)
  );
  ```
Block 6: Heading 2 → "Indexing"
Block 7: Paragraph → "Indexing ช่วยเพิ่มความเร็วในการค้นหาข้อมูล..."
Block 8: List (Bullet) →
  - Primary Key Index (อัตโนมัติ)
  - Foreign Key Index
  - Composite Index
  - Unique Index
  - Full-text Index
Block 9: Quote → "Database design ที่ดีคือการออกแบบที่รองรับการเติบโตในอนาคต" - Database Expert
Block 10: Image → รูป diagram แสดง relationship ของ tables
Block 11: Paragraph → "สรุปแล้วการออกแบบฐานข้อมูลที่ดีต้องคำนึงถึง..."

---

## **4. บทความเกี่ยวกับ API Design**

### **Block Structure:**
```
Block 1: Heading 1 → "RESTful API: หลักการออกแบบ API ที่ดี"
Block 2: Paragraph → "RESTful API เป็นมาตรฐานการออกแบบ API..."
Block 3: Heading 2 → "HTTP Methods"
Block 4: List (Bullet) →
  - GET - ดึงข้อมูล
  - POST - สร้างข้อมูลใหม่
  - PUT - อัปเดตข้อมูลทั้งหมด
  - PATCH - อัปเดตข้อมูลบางส่วน
  - DELETE - ลบข้อมูล
Block 5: Heading 2 → "Status Codes"
Block 6: Code Block (JSON) →
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "message": "User created successfully"
  }
  ```
Block 7: Paragraph → "การใช้ status codes ที่ถูกต้องช่วยให้ client เข้าใจผลลัพธ์..."
Block 8: Heading 2 → "API Endpoints"
Block 9: Code Block (bash) →
  ```bash
  # User Management
  GET    /api/users          # ดึงรายการ users
  GET    /api/users/1        # ดึง user id 1
  POST   /api/users           # สร้าง user ใหม่
  PUT    /api/users/1         # อัปเดต user id 1
  DELETE /api/users/1         # ลบ user id 1
  
  # Blog Posts
  GET    /api/posts           # ดึงรายการ posts
  GET    /api/posts/1         # ดึง post id 1
  POST   /api/posts           # สร้าง post ใหม่
  PUT    /api/posts/1         # อัปเดต post id 1
  DELETE /api/posts/1         # ลบ post id 1
  ```
Block 10: Quote → "API ที่ดีคือ API ที่ใช้งานง่ายและเข้าใจได้" - API Designer
Block 11: Paragraph → "สรุปแล้วการออกแบบ RESTful API ที่ดีต้อง..."

---

## **5. บทความเกี่ยวกับ CSS Grid**

### **Block Structure:**
```
Block 1: Heading 1 → "CSS Grid: เครื่องมือจัดเลย์เอาต์ที่ทรงพลัง"
Block 2: Paragraph → "CSS Grid เป็นระบบจัดเลย์เอาต์แบบ 2D..."
Block 3: Heading 2 → "Grid Container"
Block 4: Code Block (CSS) →
  ```css
  .grid-container {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: auto 1fr auto;
    gap: 20px;
    height: 100vh;
  }
  
  .header { grid-column: 1 / -1; }
  .sidebar { grid-row: 2; }
  .main { grid-column: 2; }
  .footer { grid-column: 1 / -1; }
  ```
Block 5: Paragraph → "Grid Container เป็น parent element ที่กำหนดโครงสร้าง..."
Block 6: Heading 2 → "Grid Items"
Block 7: Code Block (CSS) →
  ```css
  .grid-item {
    grid-column-start: 1;
    grid-column-end: 3;
    grid-row-start: 2;
    grid-row-end: 4;
  }
  
  /* หรือใช้ shorthand */
  .grid-item {
    grid-area: 2 / 1 / 4 / 3;
  }
  ```
Block 8: List (Numbered) →
  1. grid-column-start - เริ่มคอลัมน์
  2. grid-column-end - จบคอลัมน์
  3. grid-row-start - เริ่มแถว
  4. grid-row-end - จบแถว
  5. grid-area - shorthand สำหรับทั้ง 4 ค่า
Block 9: Quote → "CSS Grid ทำให้การจัดเลย์เอาต์ซับซ้อนกลายเป็นเรื่องง่าย" - CSS Expert
Block 10: Image → รูปตัวอย่าง grid layout
Block 11: Paragraph → "สรุปแล้ว CSS Grid เป็นเครื่องมือที่ทรงพลังสำหรับ..."

---

## **📋 วิธีใช้งานตัวอย่าง:**

### **🎯 ขั้นตอนการทดสอบ:**
```
1. ไปที่ http://localhost:3001/admin/blog/create
2. กรอก Title: "Next.js 15: สิ่งใหม่ที่น่าตื่นเต้น"
3. กรอก Excerpt: "Next.js 15 มาพร้อมกับฟีเจอร์ใหม่ที่น่าตื่นเต้นมากมาย..."
4. ใน Block Editor:
   - Block 1: เลือก "Heading 1" → กรอก "Next.js 15: สิ่งใหม่ที่น่าตื่นเต้น"
   - Block 2: เลือก "Paragraph" → กรอกเนื้อหาย่อหน้าแรก
   - Block 3: เลือก "Heading 2" → กรอก "ฟีเจอร์ใหม่ที่น่าสนใจ"
   - Block 4: เลือก "List" → เลือก "Bullet List" → กรอกรายการ
   - Block 5: เลือก "Code Block" → เลือก "JavaScript" → กรอกโค้ด
   - Block 6: เลือก "Quote" → กรอกคำพูด + author
   - Block 7: เลือก "Image" → อัปโหลดรูปหรือใส่ URL
5. ดู Preview ว่าสามารถแสดงผลได้ถูกต้อง
6. คลิก "Create Post"
```

### **🎨 Tips การใช้งาน:**
- ✅ **ใช้ Heading 1** สำหรับหัวข้อหลัก
- ✅ **ใช้ Heading 2/3** สำหรับหัวข้อย่อย
- ✅ **ใช้ Paragraph** สำหรับเนื้อหาปกติ
- ✅ **ใช้ Code Block** สำหรับโค้ดตัวอย่าง
- ✅ **ใช้ List** สำหรับรายการข้อมูล
- ✅ **ใช้ Quote** สำหรับคำพูดสำคัญ
- ✅ **ใช้ Image** สำหรับรูปประกอบ

**ลองใช้ตัวอย่างเหล่านี้ทดสอบ Block Editor ดูครับ!** 🎉
