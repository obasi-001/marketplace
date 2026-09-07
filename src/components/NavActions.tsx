import { Link } from 'react-router-dom'

function NavActions() {
    return (
        <>
            <Link to="/wishlist" className="nav-link">
                <i className="bi bi-heart"></i> Wishlist
            </Link>
            
            <Link to="/cart" className="nav-link">
                <i className="bi bi-cart"></i> Cart
            </Link>

            <Link to="/login" className="nav-link">
                <i className="bi bi-person"></i> Account
            </Link>
        </>
    )
}

export default NavActions