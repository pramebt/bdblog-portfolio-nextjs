'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Upload, Link as LinkIcon } from 'lucide-react'
import CloudinaryUpload from '@/components/admin/media/CloudinaryUpload'
import { BLOCK_TYPES } from './block-editor'

const ContentBlock = ({ block, onUpdate }) => {
  const [showImageUpload, setShowImageUpload] = useState(false)

  // Handle content change
  const handleContentChange = (content) => {
    onUpdate({ content })
  }

  // Handle image upload
  const handleImageUpload = (url, imageData) => {
    onUpdate({ 
      content: url,
      imageData: {
        url,
        width: imageData.width,
        height: imageData.height,
        alt: imageData.originalName || 'Image'
      }
    })
    setShowImageUpload(false)
  }

  // Render based on block type
  const renderBlockContent = () => {
    switch (block.type) {
      case 'paragraph':
        return (
          <div className="space-y-2">
            <Label>Paragraph Text</Label>
            <textarea
              value={block.content || ''}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Enter paragraph text..."
              rows={3}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-vertical"
            />
          </div>
        )

      case 'heading1':
      case 'heading2':
      case 'heading3':
        return (
          <div className="space-y-2">
            <Label>Heading Text</Label>
            <Input
              value={block.content || ''}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder={`Enter ${block.type} text...`}
            />
          </div>
        )

      case 'code':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Code Block</Label>
              <Select
                value={block.language || 'javascript'}
                onValueChange={(language) => onUpdate({ language })}
              >
                <SelectTrigger className="w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="javascript">JavaScript</SelectItem>
                  <SelectItem value="typescript">TypeScript</SelectItem>
                  <SelectItem value="html">HTML</SelectItem>
                  <SelectItem value="css">CSS</SelectItem>
                  <SelectItem value="python">Python</SelectItem>
                  <SelectItem value="bash">Bash</SelectItem>
                  <SelectItem value="json">JSON</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <textarea
              value={block.content || ''}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Enter your code here..."
              rows={6}
              className="w-full px-3 py-2 border border-input rounded-md bg-muted/50 text-sm font-mono ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-vertical"
            />
          </div>
        )

      case 'list':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>List Items</Label>
              <Select
                value={block.listType || 'bullet'}
                onValueChange={(listType) => onUpdate({ listType })}
              >
                <SelectTrigger className="w-32 h-8">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bullet">Bullet List</SelectItem>
                  <SelectItem value="numbered">Numbered List</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <textarea
              value={block.content || ''}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder={`Enter list items (one per line):\n${block.listType === 'numbered' ? '1. Item 1\n2. Item 2' : '- Item 1\n- Item 2'}`}
              rows={4}
              className="w-full px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-vertical"
            />
          </div>
        )

      case 'quote':
        return (
          <div className="space-y-2">
            <Label>Quote Text</Label>
            <textarea
              value={block.content || ''}
              onChange={(e) => handleContentChange(e.target.value)}
              placeholder="Enter quote text..."
              rows={3}
              className="w-full px-3 py-2 border border-input rounded-md bg-muted/30 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-vertical"
            />
            <div className="space-y-2">
              <Label>Quote Author (Optional)</Label>
              <Input
                value={block.author || ''}
                onChange={(e) => onUpdate({ author: e.target.value })}
                placeholder="Author name..."
              />
            </div>
          </div>
        )

      case 'image':
        return (
          <div className="space-y-4">
            {/* Image Upload */}
            {!block.content && (
              <div className="space-y-2">
                <Label>Upload Image</Label>
                {!showImageUpload ? (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowImageUpload(true)}
                    className="w-full"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Choose Image
                  </Button>
                ) : (
                  <div className="border rounded-lg p-4">
                    <CloudinaryUpload
                      onUpload={handleImageUpload}
                      type="blog"
                      maxFiles={1}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowImageUpload(false)}
                      className="mt-2"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            )}

            {/* Image URL Input */}
            <div className="space-y-2">
              <Label>Or Enter Image URL</Label>
              <Input
                value={block.content || ''}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="https://example.com/image.jpg"
                type="url"
              />
            </div>

            {/* Image Preview */}
            {block.content && (
              <div className="space-y-2">
                <Label>Preview</Label>
                <img
                  src={block.content}
                  alt={block.imageData?.alt || 'Image'}
                  className="w-full max-w-md h-auto rounded-lg border"
                  onError={() => onUpdate({ content: '' })}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => onUpdate({ content: '', imageData: null })}
                >
                  Remove Image
                </Button>
              </div>
            )}

            {/* Image Settings */}
            {block.content && (
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <Label>Alt Text</Label>
                  <Input
                    value={block.imageData?.alt || ''}
                    onChange={(e) => onUpdate({ 
                      imageData: { ...block.imageData, alt: e.target.value } 
                    })}
                    placeholder="Image description..."
                    className="text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <Label>Caption (Optional)</Label>
                  <Input
                    value={block.caption || ''}
                    onChange={(e) => onUpdate({ caption: e.target.value })}
                    placeholder="Image caption..."
                    className="text-xs"
                  />
                </div>
              </div>
            )}
          </div>
        )

      default:
        return (
          <div className="text-muted-foreground text-sm">
            Unknown block type: {block.type}
          </div>
        )
    }
  }

  return (
    <div className="space-y-2">
      {/* Block Type Badge */}
      <div className="flex items-center gap-2">
        <Badge variant="outline" className="text-xs">
          {BLOCK_TYPES[block.type]?.label || block.type}
        </Badge>
      </div>

      {/* Block Content */}
      {renderBlockContent()}
    </div>
  )
}

export default ContentBlock
