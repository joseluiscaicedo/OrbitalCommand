import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Header from '../Header'

describe('Header', () => {
  it('renders the application title', () => {
    render(<Header connectionStatus="CONNECTED" />)
    expect(screen.getByText(/Orbital/)).toBeInTheDocument()
    expect(screen.getByText(/Command/)).toBeInTheDocument()
  })

  it('displays connection status', () => {
    render(<Header connectionStatus="CONNECTED" />)
    expect(screen.getByText('CONNECTED')).toBeInTheDocument()
  })

  it('shows green indicator when connected', () => {
    render(<Header connectionStatus="CONNECTED" />)
    const statusText = screen.getByText('CONNECTED')
    expect(statusText).toHaveClass('text-green-400')
  })

  it('shows red indicator when disconnected', () => {
    render(<Header connectionStatus="DISCONNECTED" />)
    const statusText = screen.getByText('DISCONNECTED')
    expect(statusText).toHaveClass('text-red-400')
  })

  it('renders version subtitle', () => {
    render(<Header connectionStatus="CONNECTED" />)
    expect(screen.getByText(/Tactical Logistics Interface v4.2/i)).toBeInTheDocument()
  })

  it('displays spinning atom icon', () => {
    const { container } = render(<Header connectionStatus="CONNECTED" />)
    const atomIcon = container.querySelector('.animate-spin-slow')
    expect(atomIcon).toBeInTheDocument()
  })
})
