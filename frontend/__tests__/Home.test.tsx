import Home from '@/pages'
import { render, screen } from '@testing-library/react'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: 'Criadores e Afiliados',
    })

    expect(heading).toBeInTheDocument()
  })
})