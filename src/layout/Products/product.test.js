import { fireEvent, render, screen } from 'helpers/test-utils'
import Product from './Product'

let props = {
  id: '41fd4fd9-95c7-4809-96db-a147d352fdbb',
  image_url:
    'https://dummyimage.com/400x400/28200e/000&text=Unbranded Metal Chair',
  stock: 8,
  productName: 'Unbranded Metal Chair',
  price: 43,
  productDescription:
    'Porro tempore autem. Sunt molestias qui quod recusandae nemo quia optio. Nostrum aperiam officiis aut reprehenderit illo.',
  favorite: '1'
}

let initialState = { products: { [props.id]: props } }

beforeAll(() => render(<Product {...props} />))

test('render Product', () => {
  expect(screen.getByText(props.productName)).toBeInTheDocument()
  expect(screen.getByRole('button')).toBeInTheDocument()
})

test('click Add modifies store', async () => {
  render(<Product {...props} />, { initialState })
  expect(screen.getByText(props.stock + ' left')).toBeInTheDocument()

  //fireEvent.click(screen.getByRole('button'))
})
