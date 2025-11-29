import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import GlassPanel from '../GlassPanel'

describe('GlassPanel', () => {
  it('renders children content', () => {
    render(<GlassPanel>Panel Content</GlassPanel>)
    expect(screen.getByText('Panel Content')).toBeInTheDocument()
  })

  it('applies active styles when active prop is true', () => {
    const { container } = render(<GlassPanel active>Active Panel</GlassPanel>)
    const panel = container.firstChild as HTMLElement
    expect(panel).toHaveClass('bg-blue-900/40')
    expect(panel).toHaveClass('border-cyan-400/50')
  })

  it('applies inactive styles by default', () => {
    const { container } = render(<GlassPanel>Inactive Panel</GlassPanel>)
    const panel = container.firstChild as HTMLElement
    expect(panel).toHaveClass('bg-slate-900/60')
    expect(panel).toHaveClass('border-blue-500/20')
  })

  it('applies custom className', () => {
    const { container } = render(<GlassPanel className="custom-panel">Custom</GlassPanel>)
    const panel = container.firstChild as HTMLElement
    expect(panel).toHaveClass('custom-panel')
  })

  it('has backdrop blur effect', () => {
    const { container } = render(<GlassPanel>Blurred</GlassPanel>)
    const panel = container.firstChild as HTMLElement
    expect(panel).toHaveClass('backdrop-blur-md')
  })

  it('has rounded corners', () => {
    const { container } = render(<GlassPanel>Rounded</GlassPanel>)
    const panel = container.firstChild as HTMLElement
    expect(panel).toHaveClass('rounded-xl')
  })
})
