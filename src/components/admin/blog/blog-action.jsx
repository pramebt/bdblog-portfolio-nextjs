'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu'
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  MoreHorizontal,
  Trash2,
  Eye,
  EyeOff,
  Download,
  Copy,
  CheckSquare,
  Square
} from 'lucide-react'

const BlogActions = ({ 
  selectedCount, 
  onBulkAction, 
  onSelectAll, 
  allSelected,
  totalCount 
}) => {
  const [isProcessing, setIsProcessing] = useState(false)
  const [actionToConfirm, setActionToConfirm] = useState(null)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  // Handle bulk action with confirmation
  const handleBulkAction = async (action) => {
    if (action === 'delete') {
      setActionToConfirm(action)
      setShowConfirmDialog(true)
      return
    }

    // For non-destructive actions, execute immediately
    setIsProcessing(true)
    try {
      await onBulkAction(action)
    } finally {
      setIsProcessing(false)
    }
  }

  // Confirm and execute action
  const confirmAction = async () => {
    setIsProcessing(true)
    setShowConfirmDialog(false)
    
    try {
      await onBulkAction(actionToConfirm)
    } finally {
      setIsProcessing(false)
      setActionToConfirm(null)
    }
  }

  // Cancel action
  const cancelAction = () => {
    setShowConfirmDialog(false)
    setActionToConfirm(null)
  }

  // Handle select all toggle
  const handleSelectAll = () => {
    onSelectAll(!allSelected)
  }

  // Get action description for confirmation
  const getActionDescription = (action) => {
    switch (action) {
      case 'delete':
        return `Are you sure you want to delete ${selectedCount} post${selectedCount > 1 ? 's' : ''}? This action cannot be undone.`
      case 'publish':
        return `Are you sure you want to publish ${selectedCount} post${selectedCount > 1 ? 's' : ''}?`
      case 'unpublish':
        return `Are you sure you want to unpublish ${selectedCount} post${selectedCount > 1 ? 's' : ''}?`
      default:
        return `Are you sure you want to perform this action on ${selectedCount} post${selectedCount > 1 ? 's' : ''}?`
    }
  }

  // Get action title for confirmation
  const getActionTitle = (action) => {
    switch (action) {
      case 'delete':
        return 'Delete Posts'
      case 'publish':
        return 'Publish Posts'
      case 'unpublish':
        return 'Unpublish Posts'
      default:
        return 'Confirm Action'
    }
  }

  if (selectedCount === 0) return null

  return (
    <>
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            {/* Selection Info */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={handleSelectAll}
                  disabled={isProcessing}
                />
                <span className="text-sm font-medium">
                  {allSelected ? 'All' : selectedCount} selected
                </span>
              </div>
              
              <Badge variant="secondary" className="text-xs">
                {selectedCount} of {totalCount} posts
              </Badge>
            </div>

            {/* Bulk Actions */}
            <div className="flex items-center gap-2">
              {/* Quick Actions */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('publish')}
                disabled={isProcessing}
                className="text-green-600 hover:text-green-700"
              >
                <Eye className="h-4 w-4 mr-1" />
                Publish
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleBulkAction('unpublish')}
                disabled={isProcessing}
                className="text-orange-600 hover:text-orange-700"
              >
                <EyeOff className="h-4 w-4 mr-1" />
                Unpublish
              </Button>

              {/* More Actions Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={isProcessing}
                  >
                    <MoreHorizontal className="h-4 w-4 mr-1" />
                    More
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem 
                    onClick={() => handleBulkAction('delete')}
                    disabled={isProcessing}
                    className="text-destructive focus:text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Posts
                  </DropdownMenuItem>
                  
                  <DropdownMenuSeparator />
                  
                  <DropdownMenuItem 
                    onClick={() => handleBulkAction('export')}
                    disabled={isProcessing}
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Export Selected
                  </DropdownMenuItem>
                  
                  <DropdownMenuItem 
                    onClick={() => handleBulkAction('duplicate')}
                    disabled={isProcessing}
                  >
                    <Copy className="h-4 w-4 mr-2" />
                    Duplicate Posts
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Clear Selection */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelectAll(false)}
                disabled={isProcessing}
                className="text-muted-foreground hover:text-foreground"
              >
                Clear Selection
              </Button>
            </div>
          </div>

          {/* Processing Indicator */}
          {isProcessing && (
            <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
              Processing {selectedCount} post{selectedCount > 1 ? 's' : ''}...
            </div>
          )}
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{getActionTitle(actionToConfirm)}</AlertDialogTitle>
            <AlertDialogDescription>
              {getActionDescription(actionToConfirm)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelAction} disabled={isProcessing}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmAction} 
              disabled={isProcessing}
              className={actionToConfirm === 'delete' ? 'bg-destructive hover:bg-destructive/90' : ''}
            >
              {isProcessing ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent mr-2"></div>
                  Processing...
                </>
              ) : (
                'Confirm'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default BlogActions