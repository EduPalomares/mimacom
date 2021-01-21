import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react'

import { addToBasket, clearBasket, rmvFromBasket } from 'store/basket'
import { setVisibleBasket } from 'store/ui'

const Basket = () => {
  const dispatch = useDispatch()
  const basket: any = useSelector((state: RootState) => state.basket)
  const products: any = useSelector((state: RootState) => state.products)
  const visibleBasket: boolean = useSelector(
    (state: RootState) => state.ui.visibleBasket
  )
  const [total, setTotal] = useState(0)

  const items = Object.entries(basket).map(([k, o]: any) => {
    return (
      <div key={o.id} className="basket__item">
        <div
          className="basket__item__image"
          style={{ backgroundImage: 'url(' + encodeURI(o.image_url) + ')' }}
        />
        <div className="basket__item__middle">
          <div className="basket__item__name">{o.productName}</div>
          <div className="basket__item__amount">
            <button
              className="basket__item__subtract"
              onClick={() => dispatch(rmvFromBasket(o.id))}
            />
            {o.stock}
            <button
              className="basket__item__add"
              onClick={() => dispatch(addToBasket(o.id))}
            />
          </div>
        </div>
        <div className="basket__item__price">{o.price}</div>
      </div>
    )
  })

  const makePayment = () => {
    try {
      Object.entries(basket).forEach(async ([k, o]: any) => {
        await fetch(`http://localhost:3000/grocery/` + o.id, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            ...o,
            stock: products[o.id].stock - basket[o.id].stock
          })
        })
      })
    } catch (error) {}
    dispatch(clearBasket())
    alert('Purchase Completed!!!')
  }

  const toggleVisibleBasket = () => {
    dispatch(setVisibleBasket(!visibleBasket))
  }

  useEffect(() => {
    setTotal(
      Object.entries(basket).reduce((acc, [k, v]: any) => {
        return acc + v.stock * v.price
      }, 0)
    )
  }, [basket])

  return (
    <>
      <div className={`basket__wrapper ${visibleBasket ? 'visible' : ''}`}>
        <div className={`basket__bg`} onClick={toggleVisibleBasket} />
        <div className="basket">
          <div className="basket__header" onClick={toggleVisibleBasket}>
            <h1>Basket</h1>
            <button className="basket__back" />
          </div>

          <OverlayScrollbarsComponent className="basket__items__wrapper">
            <div className="basket__items">{items}</div>
          </OverlayScrollbarsComponent>

          <div className="basket__resume">
            <div className="basket__total">
              <div className="basket__total__text">Total Amount</div>
              <div className="basket__total__price">{total}</div>
            </div>
            <div className="basket__actions">
              <button disabled={total === 0} onClick={makePayment}>
                Make a payment
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Basket
