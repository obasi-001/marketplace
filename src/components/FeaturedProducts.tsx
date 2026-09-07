
type Product = {
  id: string
  name: string
  price: number
  imageUrl: string
}

const products: Product[] = [
  {
    id: '1',
    name: 'Product 1',
    price: 50000,
    imageUrl: 'https://placehold.co/400x300',
  },
  {
    id: '2',
    name: 'Product 2',
    price: 75000,
    imageUrl: 'https://placehold.co/400x300',
  },
  {
    id: '3',
    name: 'Product 3',
    price: 100000,
    imageUrl: 'https://placehold.co/400x300',
  },
  {
    id: '4',
    name: 'Product 4',
    price: 125000,
    imageUrl: 'https://placehold.co/400x300',
  },
]

function FeaturedProducts() {
  return (
    <section className="py-5">
      <div className="container">
        <h2 className="mb-4">Featured Products</h2>

        <div className="row g-4">
          {products.map((product) => (
            <div key={product.id} className="col-6 col-lg-3">
              <div className="card h-100">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="card-img-top"
                />

                <div className="card-body">
                  <h3 className="h5">{product.name}</h3>
                  <p className="mb-0">
                    ₦{product.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}


export default FeaturedProducts