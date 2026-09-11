import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  signInWithGoogle,
  loginWithEmail,
} from '../services/auth'
import { getAuthErrorMessage } from '../utils/authErrors'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const location = useLocation()
  const navigate = useNavigate()

  const from = location.state?.from || '/'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setError('')

    try {
      await loginWithEmail(email, password)

      navigate(from)
    } catch (error) {
      console.error(error)
      setError(getAuthErrorMessage(error))
    }
  }

  const handleGoogleLogin = async () => {
    setError('')

    try {
      await signInWithGoogle()

      navigate(from)
    } catch (error) {
      console.error(error)
      setError(getAuthErrorMessage(error))
    }
  }

  return (
    <section className="py-5">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-5">
            <div className="card">
              <div className="card-body p-4">
                <h1 className="h3 mb-4 text-center">
                  Login
                </h1>

                <button
                  type="button"
                  className="btn btn-light border w-100 d-flex align-items-center justify-content-center gap-2"
                  onClick={handleGoogleLogin}
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
                  <span className="text-body-secondary">
                    OR
                  </span>
                </div>

                {error && (
                  <div
                    className="alert alert-danger"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label
                      htmlFor="email"
                      className="form-label"
                    >
                      Email Address
                    </label>

                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="password"
                      className="form-label"
                    >
                      Password
                    </label>

                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    Login
                  </button>
                </form>

                <p className="text-center mt-4 mb-0">
                  Don't have an account?{' '}
                  <Link
                    to="/register"
                    state={{ from }}
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login