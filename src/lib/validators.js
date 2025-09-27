import { z } from 'zod'

const OptionalUrlOrEmpty = z.union([z.string().url(), z.literal(''), z.undefined()])


export const blogPostSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
    content: z.string().min(1, 'Content is required'),
    excerpt: z.string().optional(),
    coverImage: OptionalUrlOrEmpty,
    published: z.boolean().optional(),
    tags: z.array(z.string()).optional(),
})

export const projectSchema = z.object({
    title: z.string().min(1, 'Title is required').max(200, 'Title too long'),
    description: z.string().min(1, 'Description is required'),
    coverImage: OptionalUrlOrEmpty,
    images: z.array(z.string()).optional(),
    githubUrl: OptionalUrlOrEmpty,
    liveUrl: OptionalUrlOrEmpty,
    published: z.boolean().optional(),
})

export function parsePositiveInt(value,fallback,min=1,max=100) {
    const n = Number.parseInt(value ?? '')
    if (Number.isNaN(n)) return fallback
    return Math.min(Math.max(n,min),max)
}

export function parseBool(value) {
    if (value === null) return undefined
    if (['true', '1'].includes(value.toLowerCase())) return true
    if (['false', '0'].includes(value.toLowerCase())) return false
    return undefined
}

export function createSlugFromTitle(title) {
    return title
      .toLowerCase()
      .normalize('NFKD')                // รองรับอักษร accent
      .replace(/[\u0300-\u036f]/g, '')  // ตัดเครื่องหมายกำกับเสียง
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
}