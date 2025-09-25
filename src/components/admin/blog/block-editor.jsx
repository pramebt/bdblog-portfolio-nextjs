'use client'

import { useState, useCallback } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Plus,
  GripVertical,
  Trash2,
  Type,
  Heading1,
  Heading2,
  Heading3,
  Code,
  List,
  Quote,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown
} from 'lucide-react'
import ContentBlock from './content-block'

export const BLOCK_TYPES = {
  paragraph: {
    label: 'Paragraph',
    icon: Type,
    defaultContent: ''
  },
  heading1: {
    label: 'Heading 1',
    icon: Heading1,
    defaultContent: ''
  },
  heading2: {
    label: 'Heading 2',
    icon: Heading2,
    defaultContent: ''
  },
  heading3: {
    label: 'Heading 3',
    icon: Heading3,
    defaultContent: ''
  },
  code: {
    label: 'Code Block',
    icon: Code,
    defaultContent: ''
  },
  list: {
    label: 'List',
    icon: List,
    defaultContent: '- Item 1\n- Item 2\n- Item 3'
  },
  quote: {
    label: 'Quote',
    icon: Quote,
    defaultContent: ''
  },
  image: {
    label: 'Image',
    icon: ImageIcon,
    defaultContent: ''
  }
}

const BlockEditor = ({ content, onChange }) => {
  // Parse content from JSON or create default
  const [blocks, setBlocks] = useState(() => {
    try {
      if (content && typeof content === 'string') {
        const parsed = JSON.parse(content)
        return Array.isArray(parsed) ? parsed : [{ id: '1', type: 'paragraph', content: content }]
      }
      return [{ id: '1', type: 'paragraph', content: '' }]
    } catch {
      return [{ id: '1', type: 'paragraph', content: content || '' }]
    }
  })

  // Generate unique ID
  const generateId = () => Date.now().toString() + Math.random().toString(36).substr(2, 9)

  // Update parent component when blocks change
  const updateContent = useCallback((newBlocks) => {
    setBlocks(newBlocks)
    onChange(JSON.stringify(newBlocks))
  }, [onChange])

  // Add new block
  const addBlock = (type = 'paragraph', index = blocks.length) => {
    const newBlock = {
      id: generateId(),
      type,
      content: BLOCK_TYPES[type].defaultContent
    }
    
    const newBlocks = [...blocks]
    newBlocks.splice(index, 0, newBlock)
    updateContent(newBlocks)
  }

  // Update block content
  const updateBlock = (id, updates) => {
    const newBlocks = blocks.map(block =>
      block.id === id ? { ...block, ...updates } : block
    )
    updateContent(newBlocks)
  }

  // Delete block
  const deleteBlock = (id) => {
    if (blocks.length === 1) return // Keep at least one block
    
    const newBlocks = blocks.filter(block => block.id !== id)
    updateContent(newBlocks)
  }

  // Move block up
  const moveBlockUp = (id) => {
    const index = blocks.findIndex(block => block.id === id)
    if (index <= 0) return

    const newBlocks = [...blocks]
    const [block] = newBlocks.splice(index, 1)
    newBlocks.splice(index - 1, 0, block)
    updateContent(newBlocks)
  }

  // Move block down
  const moveBlockDown = (id) => {
    const index = blocks.findIndex(block => block.id === id)
    if (index >= blocks.length - 1) return

    const newBlocks = [...blocks]
    const [block] = newBlocks.splice(index, 1)
    newBlocks.splice(index + 1, 0, block)
    updateContent(newBlocks)
  }

  return (
    <div className="space-y-4">
      {/* Add Block Button */}
      <div className="flex items-center gap-2">
        <Select onValueChange={(type) => addBlock(type)}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Add block..." />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(BLOCK_TYPES).map(([type, config]) => {
              const Icon = config.icon
              return (
                <SelectItem key={type} value={type}>
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4" />
                    {config.label}
                  </div>
                </SelectItem>
              )
            })}
          </SelectContent>
        </Select>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => addBlock('paragraph')}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Paragraph
        </Button>
      </div>

      {/* Blocks */}
      <div className="space-y-3">
        {blocks.map((block, index) => (
          <Card key={block.id} className="group relative">
            <CardContent className="p-4">
              {/* Block Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  {/* Drag Handle */}
                  <div className="cursor-move text-muted-foreground hover:text-foreground">
                    <GripVertical className="h-4 w-4" />
                  </div>
                  
                  {/* Block Type Selector */}
                  <Select
                    value={block.type}
                    onValueChange={(type) => updateBlock(block.id, { type, content: BLOCK_TYPES[type].defaultContent })}
                  >
                    <SelectTrigger className="w-40 h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(BLOCK_TYPES).map(([type, config]) => {
                        const Icon = config.icon
                        return (
                          <SelectItem key={type} value={type}>
                            <div className="flex items-center gap-2">
                              <Icon className="h-4 w-4" />
                              {config.label}
                            </div>
                          </SelectItem>
                        )
                      })}
                    </SelectContent>
                  </Select>
                </div>

                {/* Block Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveBlockUp(block.id)}
                    disabled={index === 0}
                    className="h-8 w-8 p-0"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => moveBlockDown(block.id)}
                    disabled={index === blocks.length - 1}
                    className="h-8 w-8 p-0"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => addBlock('paragraph', index + 1)}
                    className="h-8 w-8 p-0"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteBlock(block.id)}
                    disabled={blocks.length === 1}
                    className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Block Content */}
              <ContentBlock
                block={block}
                onUpdate={(updates) => updateBlock(block.id, updates)}
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default BlockEditor
