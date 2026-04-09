// Measure the actual pixel width of axis labels using the Canvas API,
// then add padding for the tick gap. Falls back to a rough estimate
// if canvas is unavailable (SSR).
let canvas: HTMLCanvasElement | null = null

function measureTextWidth(text: string, font: string): number {
  if (typeof document === 'undefined') return text.length * 7
  if (!canvas) canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) return text.length * 7
  ctx.font = font
  return ctx.measureText(text).width
}

export function estimateLeftMargin(labels: string[]): number {
  const font = '12px Overpass, sans-serif'
  const maxWidth = Math.max(...labels.map((l) => measureTextWidth(l, font)))
  return Math.min(320, Math.max(80, Math.ceil(maxWidth) + 16))
}
