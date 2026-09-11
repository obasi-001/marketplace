import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { AuthContext } from '../context/AuthContext'

function NavActions() {
    const cart = useContext(CartContext)
    const auth = useContext(AuthContext)
    const location = useLocation()


    return (
        <>
            <Link to="/wishlist" className="nav-link">
                <i className="bi bi-heart"></i> Wishlist
            </Link>

            <Link to="/cart" className="nav-link">
                <i className="bi bi-cart"></i> Cart ({cart?.cartCount ?? 0})
            </Link>

            <Link
                to={
                    auth?.user
                        ? '/account'
                        : '/login'
                }
                state={
                    auth?.user
                        ? undefined
                        : { from: location.pathname }
                }
                className="nav-link"
            >
                <i className="bi bi-person"></i> Account
            </Link>
        </>
    )
}

export default NavActions