import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../context/CartContext'

function Cart() {
  const cart = useContext(CartContext)

  return (
    <section className="py-5">
      <div className="container">
        <h1 className="mb-4">
          Cart ({cart?.cartCount ?? 0})
        </h1>

        <Link
          to="/products"
          className="btn btn-outline-primary mb-4"
        >
          <i className="bi bi-arrow-left"></i> Continue Shopping
        </Link>

        {cart?.cartCount === 0 ? (
          <div className="text-center py-5">
            <i className="bi bi-cart-x display-1"></i>

            <h2 className="mt-3">
              Your cart is empty
            </h2>

            <p className="text-body-secondary">
              Browse our products and add something to your cart.
            </p>
          </div>
        ) : (
          cart?.cartItems.map((item) => (
            <div
              key={item.product.id}
              className="card mb-3"
            >
              <div className="card-body">
                <div className="row align-items-center g-3">

                  <div className="col-3 col-md-2">
                    <img
                      src={
                        item.product.images.find(
                          (image) => image.isPrimary,
                        )?.url
                      }
                      alt={item.product.name}
                      className="img-fluid rounded"
                    />
                  </div>

                  <div className="col">
                    <h2 className="h5">
                      {item.product.name}
                    </h2>

                    <p className="mb-1">
                      ₦{item.product.price.toLocaleString()}
                    </p>

                    <p className="small mb-2">
                      {item.product.stockStatus === 'in-stock' ? (
                        <span className="text-success fw-semibold">
                          In stock
                        </span>
                      ) : (
                        <span className="text-danger fw-semibold">
                          Out of stock
                        </span>
                      )}
                    </p>

                    <p className="mb-2 fw-semibold">
                      Item Total: ₦{(
                        item.product.price * item.quantity
                      ).toLocaleString()}
                    </p>
                    <div className="d-flex align-items-center gap-2">
                      <span>Quantity:</span>

                      <div className="btn-group" role="group" aria-label="Quantity controls">
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          disabled={item.quantity <= 1}
                          onClick={() =>
                            cart?.updateQuantity(
                              item.product.id,
                              item.quantity - 1,
                            )
                          }
                        >
                          −
                        </button>

                        <span className="btn btn-outline-secondary fw-bold">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          className="btn btn-outline-primary"
                          disabled={
                            item.quantity >= item.product.stockQuantity
                          }
                          onClick={() =>
                            cart?.updateQuantity(
                              item.product.id,
                              item.quantity + 1,
                            )
                          }
                        >
                          +
                        </button>
                      </div>

                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          cart?.removeFromCart(item.product.id)
                        }
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          ))
        )}

        {cart && cart.cartCount !== 0 && (
          <div className="mt-4 text-end">
            <h2 className="h4">
              Subtotal: ₦{cart.cartSubtotal.toLocaleString()}
            </h2>

            <Link
              to="/checkout"
              className="btn btn-primary mt-3"
            >
              Proceed to Checkout
              <i className="bi bi-arrow-right ms-2"></i>
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default Cart