import { useSelector, useDispatch } from 'react-redux'
import { RootState } from 'store/rootReducer'
import { IProduct } from 'models/Product'
import { addToBasket } from 'store/basket'

const Product = (props: IProduct) => {
  const {
    id,
    image_url,
    productName,
    price,
    productDescription,
    favorite
  } = props

  const dispatch = useDispatch()
  const storedProducts: any = useSelector((state: RootState) => state.products)
  const stock = storedProducts[id]?.stock || 0

  return (
    <>
      <div className="product">
        <div className={`product__favorite ${favorite ? 'active' : ''}`}></div>
        <div
          className="product__img"
          style={{ backgroundImage: 'url(' + encodeURI(image_url) + ')' }}
        />
        <div className="product__info">
          <div className="product__name">{productName}</div>
          <div className="product__price">{price}</div>
          <div className="product__description">{productDescription}</div>
        </div>
        <div className="product__actions">
          <div className="product__stock">{stock} left</div>
          <button
            disabled={stock === 0}
            onClick={() => dispatch(addToBasket(id))}
          >
            + Add
          </button>
        </div>
      </div>
    </>
  )
}

export default Product
