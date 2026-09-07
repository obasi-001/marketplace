import { Link } from 'react-router-dom'
import NavActions from './NavActions'

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg border-bottom">
            <div className="container">
                <Link to="/" className="navbar-brand">
                    E-Commerce
                </Link>

                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#mainNavbar"
                    aria-controls="mainNavbar"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mainNavbar">

                    <form className="d-flex mx-lg-4 my-2 my-lg-0">
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search products..."
                            aria-label="Search products"
                        />
                    </form>

                    <div className="navbar-nav ms-auto">
                        <Link to="/" className="nav-link">
                            Home
                        </Link>

                        <Link to="/products" className="nav-link">
                            Products
                        </Link>

                        <NavActions />
                        
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Navbar