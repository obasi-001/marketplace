import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'

function NavActions() {
    const cart = useContext(CartContext)
    return (
        <>
            <Link to="/wishlist" className="nav-link">
                <i className="bi bi-heart"></i> Wishlist
            </Link>

            <Link to="/cart" className="nav-link">
                <i className="bi bi-cart"></i> Cart ({cart?.cartCount ?? 0})
            </Link>

            <Link to="/login" className="nav-link">
                <i className="bi bi-person"></i> Account
            </Link>
        </>
    )
}

export default NavActions