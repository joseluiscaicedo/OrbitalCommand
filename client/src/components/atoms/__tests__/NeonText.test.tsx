import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import NeonText from '../NeonText'

describe('NeonText', () => {
  it('renders children text', () => {
    render(<NeonText>Test Text</NeonText>)
    expect(screen.getByText('Test Text')).toBeInTheDocument()
  })

  it('applies cyan color by default', () => {
    render(<NeonText>Cyan Text</NeonText>)
    const element = screen.getByText('Cyan Text')
    expect(element).toHaveClass('text-cyan-400')
  })

  it('applies red color when specified', () => {
    render(<NeonText color="red">Red Text</NeonText>)
    const element = screen.getByText('Red Text')
    expect(element).toHaveClass('text-red-500')
  })

  it('applies custom className', () => {
    render(<NeonText className="custom-class">Custom</NeonText>)
    const element = screen.getByText('Custom')
    expect(element).toHaveClass('custom-class')
  })

  it('applies custom size', () => {
    render(<NeonText size="text-2xl">Large Text</NeonText>)
    const element = screen.getByText('Large Text')
    expect(element).toHaveClass('text-2xl')
  })

  it('applies Orbitron font and tracking', () => {
    render(<NeonText>Styled Text</NeonText>)
    const element = screen.getByText('Styled Text')
    expect(element).toHaveClass('font-orbitron')
    expect(element).toHaveClass('tracking-wider')
  })
})
