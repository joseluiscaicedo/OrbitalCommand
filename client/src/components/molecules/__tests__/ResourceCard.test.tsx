import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ResourceCard from '../ResourceCard'
import type { ResourceState } from '../../../types'
import '@testing-library/jest-dom'

describe('ResourceCard', () => {
  const mockOnResupply = vi.fn()

  const mockResourceData: ResourceState = {
    value: 75,
    criticalThreshold: 20,
    isResupplying: false,
    depletionRate: 0.8,
  }

  afterEach(() => {
    vi.clearAllMocks()
  })

  it('renders resource type and value', () => {
    render(<ResourceCard type="OXYGEN" data={mockResourceData} onResupply={mockOnResupply} />)
    expect(screen.getByText('OXYGEN')).toBeInTheDocument()
    expect(screen.getByText('75%')).toBeInTheDocument()
  })

  it('displays critical state when value is below threshold', () => {
    const criticalData = { ...mockResourceData, value: 15 }
    render(<ResourceCard type="OXYGEN" data={criticalData} onResupply={mockOnResupply} />)
    
    const valueElement = screen.getByText('15%')
    expect(valueElement).toHaveClass('text-red-500')
  })

  it('calls onResupply when button is clicked', async () => {
    const user = userEvent.setup()
    render(<ResourceCard type="WATER" data={mockResourceData} onResupply={mockOnResupply} />)
    
    await user.click(screen.getByRole('button', { name: /initiate resupply/i }))
    expect(mockOnResupply).toHaveBeenCalledWith('WATER')
  })

  it('disables button when resupplying', () => {
    const resupplyingData = { ...mockResourceData, isResupplying: true }
    render(<ResourceCard type="FOOD" data={resupplyingData} onResupply={mockOnResupply} />)
    
    expect(screen.getByRole('button', { name: /docking/i })).toBeDisabled()
  })

  it('disables button when value is above 90%', () => {
    const highValueData = { ...mockResourceData, value: 95 }
    render(<ResourceCard type="PARTS" data={highValueData} onResupply={mockOnResupply} />)
    
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('renders correct icon for each resource type', () => {
    const { container: container1 } = render(<ResourceCard type="OXYGEN" data={mockResourceData} onResupply={mockOnResupply} />)
    expect(container1.querySelector('svg')).toBeInTheDocument()

    const { container: container2 } = render(<ResourceCard type="WATER" data={mockResourceData} onResupply={mockOnResupply} />)
    expect(container2.querySelector('svg')).toBeInTheDocument()

    const { container: container3 } = render(<ResourceCard type="FOOD" data={mockResourceData} onResupply={mockOnResupply} />)
    expect(container3.querySelector('svg')).toBeInTheDocument()

    const { container: container4 } = render(<ResourceCard type="PARTS" data={mockResourceData} onResupply={mockOnResupply} />)
    expect(container4.querySelector('svg')).toBeInTheDocument()
  })
})

