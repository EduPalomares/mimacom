import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'
import { addProducts } from 'store/products'
import { setVisibleBasket } from 'store/ui'

import basketImg from 'assets/basket.svg'

import Product from './product'

const Products = () => {
  const dispatch = useDispatch()

  const [products, setProducts] = useState([])
  const [productsList, setProductsList] = useState<any>([])
  const [page, setPage] = useState(1)
  const basket: any = useSelector((state: RootState) => state.basket)
  const [basketTotal, setBasketTotal] = useState(0)

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_API}/grocery?_page=${page}&_limit=12`
      )
      const json = await res.json()
      setProducts(json)
      dispatch(addProducts(json))
    } catch (error) {}
  }, [dispatch, page])

  const previousPage = () => {
    setPage(page - 1)
  }

  const nextPage = () => {
    setPage(page + 1)
  }

  useEffect(() => {
    setProductsList(products.map((o, i) => <Product key={i} {...o} />))
  }, [products])

  useEffect(() => {
    fetchProducts()
  }, [page, fetchProducts])

  useEffect(() => {
    setBasketTotal(
      Object.entries(basket).reduce((acc, [k, v]: any) => {
        return acc + v.stock
      }, 0)
    )
  }, [basket])

  return (
    <>
      <div className="products">
        <div className="products__header">
          <h1>Product List</h1>

          <div className="products__actions">
            <div className="products__action products__action__basket">
              <button onClick={() => dispatch(setVisibleBasket(true))}>
                <img src={basketImg} alt="" />
              </button>
              <div
                className="products__actions__basket__amount"
                hidden={basketTotal === 0}
              >
                {basketTotal}
              </div>
            </div>
          </div>
        </div>

        <OverlayScrollbarsComponent className="products__list__wrapper">
          <div className="products__list">{productsList}</div>
        </OverlayScrollbarsComponent>

        <div className="products__list__actions">
          <button
            className="products__list__actions__previous"
            onClick={previousPage}
            disabled={page === 1}
          >
            Previous
          </button>
          <button className="products__list__actions__next" onClick={nextPage}>
            Next
          </button>
        </div>
      </div>
    </>
  )
}

export default Products
