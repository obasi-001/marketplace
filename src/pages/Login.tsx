import { Link } from 'react-router-dom'
import { signInWithGoogle } from '../services/auth'

function Login() {
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
                  <span className="text-body-secondary">
                    OR
                  </span>
                </div>

                <form>
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
                  <Link to="/register">
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