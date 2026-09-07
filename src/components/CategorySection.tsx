import { Link } from "react-router-dom"

type Category = {
    id: string
    name: string
    imageUrl: string
}

const categories: Category[] = [
    {
        id: '1',
        name: 'Category 1',
        imageUrl: 'https://placehold.co/400x300',
    },
    {
        id: '2',
        name: 'Category 2',
        imageUrl: 'https://placehold.co/400x300',
    },
    {
        id: '3',
        name: 'Category 3',
        imageUrl: 'https://placehold.co/400x300',
    },
    {
        id: '4',
        name: 'Category 4',
        imageUrl: 'https://placehold.co/400x300',
    },
]

function CategorySection() {
    return (
        <section className="py-5">
            <div className="container">
                <h2 className="mb-4">Featured Categories</h2>

                <div className="row g-4">
                    {categories.map((category) => (
                        <div key={category.id} className="col-6 col-lg-3">
                            <Link
                                to={`/products?category=${category.id}`}
                                className="text-decoration-none text-body"
                            >
                                <div className="bg-body-secondary rounded p-4 text-center">
                                    <img
                                        src={category.imageUrl}
                                        alt={category.name}
                                        className="img-fluid rounded mb-3"
                                    />

                                    <h3 className="h5 mb-0">{category.name}</h3>
                                </div>
                            </Link>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CategorySection