'use client'

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { CircleNotch, UploadSimple, X, Image as ImageIcon } from '@phosphor-icons/react/dist/ssr'

export default function CloudinaryUpload({ onUpload, type = 'blog', maxFiles = 1 }) {
  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef(null)

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files)
    setError('')
    
    // Validate file count
    if (files.length + selectedFiles.length > maxFiles) {
      setError(`Maximum ${maxFiles} file(s) allowed`)
      return
    }

    // Validate file types and sizes
    const validFiles = selectedFiles.filter(file => {
      const isValidType = file.type.startsWith('image/')
      const isValidSize = file.size <= 10 * 1024 * 1024 // 10MB
      
      if (!isValidType) {
        setError('Only image files are allowed')
        return false
      }
      if (!isValidSize) {
        setError('File size must be less than 10MB')
        return false
      }
      return true
    })

    if (validFiles.length === 0) return

    // Add to files state
    const newFiles = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      uploading: false,
      uploaded: false,
      url: null,
      error: null
    }))

    setFiles(prev => [...prev, ...newFiles])
    
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const uploadFile = async (fileItem) => {
    const formData = new FormData()
    formData.append('file', fileItem.file)
    formData.append('type', type)

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const result = await response.json()

      if (result.success) {
        // Update file item
        setFiles(prev => prev.map(item => 
          item.id === fileItem.id 
            ? { ...item, uploaded: true, url: result.data.url, uploading: false }
            : item
        ))

        // Call onUpload callback
        if (onUpload) {
          onUpload(result.data.url, result.data)
        }
      } else {
        throw new Error(result.error)
      }
    } catch (error) {
      setFiles(prev => prev.map(item => 
        item.id === fileItem.id 
          ? { ...item, error: error.message, uploading: false }
          : item
      ))
    }
  }

  const handleUpload = async () => {
    setUploading(true)
    setError('')

    const filesToUpload = files.filter(item => !item.uploaded && !item.uploading)
    
    if (filesToUpload.length === 0) {
      setUploading(false)
      return
    }

    // Upload files sequentially
    for (const fileItem of filesToUpload) {
      setFiles(prev => prev.map(item => 
        item.id === fileItem.id 
          ? { ...item, uploading: true }
          : item
      ))

      await uploadFile(fileItem)
    }

    setUploading(false)
  }

  const removeFile = (fileId) => {
    setFiles(prev => {
      const fileToRemove = prev.find(item => item.id === fileId)
      if (fileToRemove?.preview) {
        URL.revokeObjectURL(fileToRemove.preview)
      }
      return prev.filter(item => item.id !== fileId)
    })
  }

  const clearAll = () => {
    files.forEach(file => {
      if (file.preview) {
        URL.revokeObjectURL(file.preview)
      }
    })
    setFiles([])
    setError('')
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon size={20} weight="light" />
          Upload Images
        </CardTitle>
        <CardDescription>
          Upload images to Cloudinary. Maximum {maxFiles} file(s), 10MB each.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* File Input */}
        <div className="space-y-2">
          <Label htmlFor="file-upload">Select Images</Label>
          <Input
            id="file-upload"
            type="file"
            accept="image/*"
            multiple={maxFiles > 1}
            onChange={handleFileSelect}
            ref={fileInputRef}
            disabled={uploading}
          />
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Selected Files ({files.length})</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={clearAll}
                disabled={uploading}
              >
                Clear All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {files.map((fileItem) => (
                <div key={fileItem.id} className="border rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    {/* Preview */}
                    <div className="flex-shrink-0">
                      <img
                        src={fileItem.preview}
                        alt="Preview"
                        className="w-16 h-16 object-cover rounded"
                      />
                    </div>
                    
                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {fileItem.file.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(fileItem.file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                      
                      {/* Status */}
                      {fileItem.uploading && (
                        <div className="flex items-center gap-1 text-xs text-blue-600">
                          <CircleNotch size={12} weight="bold" className="animate-spin" />
                          Uploading...
                        </div>
                      )}
                      
                      {fileItem.uploaded && (
                        <div className="flex items-center gap-1 text-xs text-green-600">
                          <ImageIcon size={12} weight="light" />
                          Uploaded
                        </div>
                      )}
                      
                      {fileItem.error && (
                        <p className="text-xs text-red-600">{fileItem.error}</p>
                      )}
                    </div>
                    
                    {/* Remove Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(fileItem.id)}
                      disabled={uploading}
                    >
                      <X size={16} weight="bold" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Button */}
        {files.length > 0 && (
          <Button
            onClick={handleUpload}
            disabled={uploading || files.every(f => f.uploaded)}
            className="w-full"
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Upload to Cloudinary
              </>
            )}
          </Button>
        )}

        {/* Uploaded URLs */}
        {files.some(f => f.uploaded) && (
          <div className="space-y-2">
            <Label>Uploaded URLs</Label>
            <div className="space-y-1">
              {files
                .filter(f => f.uploaded)
                .map((fileItem) => (
                  <div key={fileItem.id} className="flex items-center gap-2">
                    <Input
                      value={fileItem.url}
                      readOnly
                      className="text-xs"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigator.clipboard.writeText(fileItem.url)}
                    >
                      Copy
                    </Button>
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
