import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import CyberButton from '../CyberButton'
import { Activity } from 'lucide-react'

describe('CyberButton', () => {
  it('renders with label', () => {
    render(<CyberButton label="Test Button" />)
    expect(screen.getByRole('button', { name: /test button/i })).toBeInTheDocument()
  })

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<CyberButton label="Click Me" onClick={handleClick} />)
    
    await user.click(screen.getByRole('button', { name: /click me/i }))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('is disabled when disabled prop is true', () => {
    render(<CyberButton label="Disabled" disabled />)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('shows loading spinner when loading is true', () => {
    render(<CyberButton label="Loading" loading />)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button.querySelector('.animate-spin')).toBeInTheDocument()
  })

  it('renders custom icon when provided', () => {
    render(<CyberButton label="With Icon" icon={Activity} />)
    expect(screen.getByRole('button').querySelector('svg')).toBeInTheDocument()
  })

  it('does not call onClick when disabled', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(<CyberButton label="Disabled" onClick={handleClick} disabled />)
    
    await user.click(screen.getByRole('button'))
    expect(handleClick).not.toHaveBeenCalled()
  })
})
