import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { signOutUser } from '../services/auth'

function Account() {
    const auth = useContext(AuthContext)

    // Show this when the customer is not logged in
    if (!auth?.user) {
        return (
            <section className="py-5">
                <div className="container">
                    <h1 className="mb-4">My Account</h1>

                    <p>You need to log in to access your account.</p>

                    <Link
                        to="/login"
                        state={{ from: '/account' }}
                        className="btn btn-primary"
                    >
                        Login
                    </Link>

                    <Link
                        to="/register"
                        state={{ from: '/account' }}
                        className="btn btn-outline-secondary ms-2"
                    >
                        Create Account
                    </Link>
                </div>
            </section>
        )
    }

    // Show this when the customer is logged in
    return (
        <section className="py-5">
            <div className="container">
                <h1 className="mb-4">My Account</h1>

                <p>
                    Welcome, {auth.user.displayName || auth.user.email}
                </p>

                <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={signOutUser}
                >
                    Logout
                </button>
            </div>
        </section>
    )
}

export default Account