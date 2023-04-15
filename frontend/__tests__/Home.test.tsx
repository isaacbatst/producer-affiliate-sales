import Home from '@/pages'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

describe('Home', () => {
  it('renders initial transactions', async () => {
    render(<Home />)

    const heading = screen.getByRole('heading', {
      name: 'Criadores e Afiliados',
    })

    expect(heading).toBeInTheDocument();
    const transaction = await screen.findByRole('listitem', { name: /transação de seller 1/i })
    expect(transaction).toBeInTheDocument()
  })

  it('submits sales file successfully', async () => {
    const user = userEvent.setup();
    render(
      <Home />
    )

    const input = screen.getByLabelText(/vendas/i);
    const button = screen.getByRole('button', { name: /enviar/i })
    await user.upload(input, new File(['sales'], 'sales.txt', { type: 'text/plain' }))
    await user.click(button)
    const success = await screen.findByRole('alert', { name: /sucesso/i })
    expect(success).toBeInTheDocument()
    const transaction = await screen.findByRole('listitem', { name: /transação de seller 1/i })
    expect(transaction).toBeInTheDocument()
  })
})