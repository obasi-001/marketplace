import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { signOutUser } from '../services/auth'

function Account() {
    const auth = useContext(AuthContext)

    return (
        <section className="py-5">
            <div className="container">
                <h1 className="mb-4">My Account</h1>

                <p>
                    Welcome, {auth?.user?.displayName || auth?.user?.email}
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