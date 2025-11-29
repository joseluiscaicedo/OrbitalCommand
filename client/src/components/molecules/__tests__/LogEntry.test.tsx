import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import LogEntry from '../LogEntry'

describe('LogEntry', () => {
  it('renders timestamp and message', () => {
    render(<LogEntry timestamp="12:34:56" message="System initialized" type="INFO" />)
    expect(screen.getByText(/12:34:56/)).toBeInTheDocument()
    expect(screen.getByText('System initialized')).toBeInTheDocument()
  })

  it('applies ALERT styling for alert type', () => {
    const { container } = render(<LogEntry timestamp="12:00:00" message="Critical alert" type="ALERT" />)
    const logElement = container.firstChild as HTMLElement
    expect(logElement).toHaveClass('text-red-400')
    expect(logElement).toHaveClass('border-red-500')
  })

  it('applies SUCCESS styling for success type', () => {
    const { container } = render(<LogEntry timestamp="12:00:00" message="Operation successful" type="SUCCESS" />)
    const logElement = container.firstChild as HTMLElement
    expect(logElement).toHaveClass('text-green-400')
    expect(logElement).toHaveClass('border-green-500')
  })

  it('applies INFO styling by default', () => {
    const { container } = render(<LogEntry timestamp="12:00:00" message="Info message" type="INFO" />)
    const logElement = container.firstChild as HTMLElement
    expect(logElement).toHaveClass('text-cyan-200/70')
    expect(logElement).toHaveClass('border-cyan-900/50')
  })

  it('has monospace font', () => {
    const { container } = render(<LogEntry timestamp="12:00:00" message="Test" type="INFO" />)
    const logElement = container.firstChild as HTMLElement
    expect(logElement).toHaveClass('font-mono')
  })

  it('formats timestamp with brackets', () => {
    render(<LogEntry timestamp="12:34:56" message="Test" type="INFO" />)
    expect(screen.getByText('[12:34:56]')).toBeInTheDocument()
  })
})
