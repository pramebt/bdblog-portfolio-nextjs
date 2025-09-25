'use client'

const BlockPreview = ({ blocks }) => {
  // Render individual block preview
  const renderBlock = (block) => {
    switch (block.type) {
      case 'paragraph':
        return (
          <p className="text-base leading-relaxed whitespace-pre-wrap">
            {block.content || 'Empty paragraph'}
          </p>
        )

      case 'heading1':
        return (
          <h1 className="text-3xl font-bold tracking-tight">
            {block.content || 'Heading 1'}
          </h1>
        )

      case 'heading2':
        return (
          <h2 className="text-2xl font-semibold tracking-tight">
            {block.content || 'Heading 2'}
          </h2>
        )

      case 'heading3':
        return (
          <h3 className="text-xl font-semibold tracking-tight">
            {block.content || 'Heading 3'}
          </h3>
        )

      case 'code':
        return (
          <div className="space-y-2">
            {block.language && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono bg-muted px-2 py-1 rounded">
                  {block.language}
                </span>
              </div>
            )}
            <pre className="bg-muted/50 border rounded-lg p-4 overflow-x-auto">
              <code className="text-sm font-mono">
                {block.content || '// Your code here'}
              </code>
            </pre>
          </div>
        )

      case 'list':
        const listItems = (block.content || '').split('\n').filter(item => item.trim())
        const isNumbered = block.listType === 'numbered'
        
        if (listItems.length === 0) {
          return (
            <div className="text-muted-foreground italic">
              Empty list
            </div>
          )
        }

        return isNumbered ? (
          <ol className="list-decimal list-inside space-y-1">
            {listItems.map((item, index) => (
              <li key={index} className="text-base">
                {item.replace(/^[\d\.\-\s]+/, '').trim()}
              </li>
            ))}
          </ol>
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {listItems.map((item, index) => (
              <li key={index} className="text-base">
                {item.replace(/^[\-\*\s]+/, '').trim()}
              </li>
            ))}
          </ul>
        )

      case 'quote':
        return (
          <blockquote className="border-l-4 border-primary pl-4 py-2 bg-muted/30 rounded-r-lg">
            <p className="text-base italic leading-relaxed whitespace-pre-wrap">
              {block.content || 'Quote text'}
            </p>
            {block.author && (
              <footer className="text-sm text-muted-foreground mt-2">
                — {block.author}
              </footer>
            )}
          </blockquote>
        )

      case 'image':
        if (!block.content) {
          return (
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <div className="text-muted-foreground">
                <div className="text-4xl mb-2">🖼️</div>
                <div className="text-sm">No image selected</div>
              </div>
            </div>
          )
        }

        return (
          <figure className="space-y-2">
            <img
              src={block.content}
              alt={block.imageData?.alt || 'Image'}
              className="w-full max-w-2xl h-auto rounded-lg border shadow-sm"
            />
            {block.caption && (
              <figcaption className="text-sm text-muted-foreground text-center italic">
                {block.caption}
              </figcaption>
            )}
          </figure>
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
    <div className="space-y-4">
      {/* Preview */}
      {blocks && blocks.length > 0 ? (
        blocks.map((block, index) => (
          <div key={block.id || index}>
            {renderBlock(block)}
          </div>
        ))
      ) : (
        <div className="text-center text-muted-foreground py-8">
          No content blocks yet...
        </div>
      )}
    </div>
  )
}

export default BlockPreview
