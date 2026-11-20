const stripBullet = (line) => line.replace(/^\s*(?:[•\-*]|\d+[.)])\s*/, '').trim()

const renderBlock = (block) => {
  switch (block.type) {
    case 'heading1':
      return (
        <h2 className="mt-14 mb-4 text-2xl font-semibold tracking-tight text-foreground first:mt-0 md:text-3xl">
          {block.content}
        </h2>
      )
    case 'heading2':
      return (
        <h3 className="mt-10 mb-3 text-xl font-semibold tracking-tight text-foreground first:mt-0 md:text-2xl">
          {block.content}
        </h3>
      )
    case 'heading3':
      return (
        <h4 className="mt-8 mb-2 text-lg font-semibold tracking-tight text-foreground first:mt-0">
          {block.content}
        </h4>
      )
    case 'paragraph':
      return (
        <p className="mb-6 whitespace-pre-wrap text-[1.05rem] font-light leading-[1.85] text-foreground/80">
          {block.content}
        </p>
      )
    case 'list': {
      const items = (block.content || '').split('\n').filter((line) => line.trim())
      const ListTag = block.listType === 'numbered' ? 'ol' : 'ul'
      return (
        <ListTag
          className={`mb-6 space-y-2 pl-5 text-[1.05rem] font-light leading-relaxed text-foreground/80 marker:text-muted-foreground ${
            ListTag === 'ol' ? 'list-decimal' : 'list-disc'
          }`}
        >
          {items.map((item, index) => (
            <li key={index} className="pl-1">
              {stripBullet(item)}
            </li>
          ))}
        </ListTag>
      )
    }
    case 'quote':
      return (
        <blockquote className="my-8 border-l-2 border-foreground/20 pl-6">
          <p className="whitespace-pre-wrap text-lg font-light italic leading-relaxed text-foreground/80">
            {block.content}
          </p>
          {block.author && (
            <footer className="mt-3 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">
              — {block.author}
            </footer>
          )}
        </blockquote>
      )
    case 'code':
      return (
        <div className="my-8 overflow-hidden rounded-2xl border border-border/60 bg-muted/40">
          {block.language && (
            <div className="border-b border-border/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              {block.language}
            </div>
          )}
          <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
            <code className="font-mono">{block.content}</code>
          </pre>
        </div>
      )
    case 'image': {
      if (!block.content) return null
      const alt = block.imageData?.alt || block.alt || ''
      const caption = block.caption || block.alt
      return (
        <figure className="my-10">
          <img
            src={block.content}
            alt={alt}
            loading="lazy"
            className="w-full rounded-2xl border border-border/50"
          />
          {caption && (
            <figcaption className="mt-3 text-center font-mono text-xs text-muted-foreground">
              {caption}
            </figcaption>
          )}
        </figure>
      )
    }
    default:
      return block.content ? (
        <p className="mb-6 text-[1.05rem] font-light leading-[1.85] text-foreground/80">{block.content}</p>
      ) : null
  }
}

export const parseBlocks = (raw) => {
  try {
    const blocks = JSON.parse(raw)
    if (Array.isArray(blocks)) return blocks
  } catch {}
  return raw ? [{ id: '1', type: 'paragraph', content: raw }] : []
}

const ContentBlocks = ({ blocks }) => {
  if (!Array.isArray(blocks) || blocks.length === 0) return null

  return (
    <div>
      {blocks.map((block, index) => (
        <div key={block.id || index}>{renderBlock(block)}</div>
      ))}
    </div>
  )
}

export default ContentBlocks
