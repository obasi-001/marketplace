import { signInWithGoogle, registerWithEmail } from '../services/auth'
import { useState } from 'react'

function Register() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        await registerWithEmail(email, password)
    }

    return (
        <section className="py-5">
            <div className="container">
                <h1 className="mb-4">Create your account</h1>

                <button
                    type="button"
                    className="btn btn-light border w-100 d-flex align-items-center justify-content-center gap-2"
                    onClick={signInWithGoogle}
                >
                    <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt=""
                        width="20"
                        height="20"
                    />

                    <span>Continue with Google</span>
                </button>
                <div className="text-center my-3">
                    <span className="text-body-secondary">OR</span>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email Address
                        </label>

                        <input
                            type="email"
                            id="email"
                            className="form-control"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>

                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            placeholder="Create a password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary w-100"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </section>
    )
}

export default Register