import { render, screen } from '@testing-library/react'
import App from './App'

test('renders App', () => {
  const { container } = render(<App />)
  expect(container.firstChild.classList.contains('mimacom')).toBe(true)
  expect(screen.getByText(/^product list/i)).toBeInTheDocument()
})
