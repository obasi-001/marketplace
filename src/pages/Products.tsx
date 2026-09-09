import { Link } from 'react-router-dom'
import { products } from '../data/products'

function Products() {
  return (
    <section className="py-5">
      <div className="container">
        <h1 className="mb-4">Supplements</h1>

        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-6 col-lg-3">
              <Link
                to={`/products/${product.slug}`}
                className="text-decoration-none text-body"
              >
                <div className="card h-100">
                  <img
                    src={
                      product.images.find((image) => image.isPrimary)?.url
                    }
                    alt={product.name}
                    className="card-img-top"
                  />

                  <div className="card-body">
                    <h2 className="h5">{product.name}</h2>

                    <p className="mb-0">
                      ₦{product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products