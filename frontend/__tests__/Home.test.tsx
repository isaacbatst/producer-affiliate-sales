import Home from '@/pages'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Home', () => {
  it('renders a heading', () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: 'Criadores e Afiliados',
    })

    expect(heading).toBeInTheDocument()
  })

  it('submits sales file successfully', async () => {
    const user = userEvent.setup();
    render(<Home />)

    const input = screen.getByLabelText('Arquivo de Vendas');
    const button = screen.getByRole('button')
    await user.upload(input, new File(['sales'], 'sales.txt', { type: 'text/plain' }))
    await user.click(button)
    const success = await screen.findByRole('alert', { name: /sucesso/i })
    expect(success).toBeInTheDocument()
  })
})