import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import ProgressBar from '../ProgressBar'

describe('ProgressBar', () => {
  it('renders progress bar element', () => {
    const { container } = render(<ProgressBar value={50} />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toBeInTheDocument()
  })

  it('applies cyan color by default', () => {
    const { container } = render(<ProgressBar value={50} />)
    const progressBar = container.querySelector('.bg-cyan-400') as HTMLElement
    expect(progressBar).toBeInTheDocument()
  })

  it('applies red color when specified', () => {
    const { container } = render(<ProgressBar value={50} color="red" />)
    const progressBar = container.querySelector('.bg-red-500') as HTMLElement
    expect(progressBar).toBeInTheDocument()
  })

  it('has rounded appearance', () => {
    const { container } = render(<ProgressBar value={50} />)
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('rounded-full')
  })

  it('has transition effect', () => {
    const { container } = render(<ProgressBar value={50} />)
    const progressBar = container.querySelector('.transition-all') as HTMLElement
    expect(progressBar).toBeInTheDocument()
  })
})
