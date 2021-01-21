import Products from './Products/products'
import Basket from './Basket/basket'

const Layout = () => {
  return (
    <>
      <main className="mimacom">
        <Products />
        <Basket />
      </main>
    </>
  )
}

export default Layout
