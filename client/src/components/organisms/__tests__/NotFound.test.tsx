import { describe, it, expect, afterEach, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import NotFound from '../NotFound'

describe('NotFound', () => {
  const originalLocation = window.location

  beforeEach(() => {
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: { ...originalLocation, href: '' },
      writable: true,
      configurable: true
    })
  })

  afterEach(() => {
    Object.defineProperty(window, 'location', {
      value: originalLocation,
      writable: true,
      configurable: true
    })
  })

  it('renders 404 error message', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    )
    expect(screen.getByText('404')).toBeInTheDocument()
    expect(screen.getByText('SIGNAL LOST')).toBeInTheDocument()
  })

  it('displays error description in Spanish', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    )
    expect(screen.getByText(/La estación espacial que buscas no se encuentra/i)).toBeInTheDocument()
  })

  it('has a return button', () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    )
    expect(screen.getByRole('button', { name: /regresar a la base/i })).toBeInTheDocument()
  })

  it('redirects to home when button is clicked', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    )
    
    await user.click(screen.getByRole('button', { name: /regresar a la base/i }))
    expect(window.location.href).toBe('/')
  })

  it('displays alert triangle icon', () => {
    const { container } = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    )
    expect(container.querySelector('.animate-pulse')).toBeInTheDocument()
  })
})


