'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Check, ChevronsUpDown, Plus, X, Hash } from 'lucide-react'

const TagSelector = ({ 
  selectedTags = [], 
  onTagsChange,
  disabled = false 
}) => {
  const [tags, setTags] = useState([])
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Fetch tags
  const fetchTags = async (search = '') => {
    try {
      setLoading(true)
      const response = await fetch(`/api/tags?search=${search}`)
      const data = await response.json()
      
      if (data.success) {
        setTags(data.data)
      }
    } catch (err) {
      console.error('Error fetching tags:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTags(searchTerm)
  }, [searchTerm])

  // Handle tag selection
  const handleTagToggle = (tagName) => {
    if (selectedTags.includes(tagName)) {
      onTagsChange(selectedTags.filter(tag => tag !== tagName))
    } else {
      onTagsChange([...selectedTags, tagName])
    }
  }

  // Handle adding new tag
  const handleAddNew = async (tagName) => {
    const normalizedName = tagName.toLowerCase().trim()
    
    if (normalizedName && !selectedTags.includes(normalizedName)) {
      onTagsChange([...selectedTags, normalizedName])
    }
  }

  // Handle input change for new tag
  const handleInputChange = (value) => {
    setSearchTerm(value)
  }

  // Remove tag
  const removeTag = (tagToRemove) => {
    onTagsChange(selectedTags.filter(tag => tag !== tagToRemove))
  }

  return (
    <div className="space-y-2">
      <Label>Tags</Label>
      
      {/* Selected Tags Display */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 p-2 border rounded-md bg-muted/30">
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="flex items-center gap-1">
              <Hash className="h-3 w-3" />
              {tag}
              <X 
                className="h-3 w-3 cursor-pointer hover:text-destructive" 
                onClick={() => removeTag(tag)}
              />
            </Badge>
          ))}
        </div>
      )}

      {/* Tag Selector */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={disabled}
          >
            {selectedTags.length > 0 
              ? `${selectedTags.length} tags selected`
              : "Select or add tags..."
            }
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command>
            <CommandInput 
              placeholder="Search tags or type to add new..." 
              value={searchTerm}
              onValueChange={handleInputChange}
            />
            <CommandList>
              <CommandEmpty>
                <div className="flex items-center justify-center py-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">
                      {searchTerm ? `No tags found for "${searchTerm}"` : 'No tags available'}
                    </p>
                    {searchTerm && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAddNew(searchTerm)}
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add "{searchTerm}"
                      </Button>
                    )}
                  </div>
                </div>
              </CommandEmpty>
              <CommandGroup>
                {tags.map((tag) => (
                  <CommandItem
                    key={tag.name}
                    value={tag.name}
                    onSelect={() => handleTagToggle(tag.name)}
                  >
                    <Check
                      className={`mr-2 h-4 w-4 ${
                        selectedTags.includes(tag.name) ? 'opacity-100' : 'opacity-0'
                      }`}
                    />
                    <div className="flex items-center gap-2 flex-1">
                      <Hash className="h-3 w-3 text-muted-foreground" />
                      <span className="flex-1">{tag.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {tag.count}
                      </Badge>
                    </div>
                  </CommandItem>
                ))}
                
                {/* Add new tag option */}
                {searchTerm && !tags.some(tag => tag.name === searchTerm.toLowerCase()) && (
                  <CommandItem onSelect={() => handleAddNew(searchTerm)}>
                    <Plus className="mr-2 h-4 w-4" />
                    <div className="flex items-center gap-2">
                      <Hash className="h-3 w-3 text-muted-foreground" />
                      Add "{searchTerm}"
                    </div>
                  </CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      
      <p className="text-xs text-muted-foreground">
        Type to search existing tags or create new ones. Tags help organize and categorize your posts.
      </p>
    </div>
  )
}

export default TagSelector
