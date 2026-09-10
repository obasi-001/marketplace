import { useContext } from 'react'
import { CartContext } from '../context/CartContext'



function Checkout() {
    const cart = useContext(CartContext)
    return (
        <section className="py-5">
            <div className="container">
                <h1 className="mb-4">Checkout</h1>

                <div className="row g-4">
                    <div className="col-lg-7">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="h4 mb-4">
                                    Customer Information
                                </h2>

                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        id="fullName"
                                        className="form-control"
                                        placeholder="Enter your full name"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">
                                        Email Address
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        className="form-control"
                                        placeholder="Enter your email address"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="phone" className="form-label">
                                        Phone Number
                                    </label>

                                    <input
                                        type="tel"
                                        id="phone"
                                        className="form-control"
                                        placeholder="08012345678"
                                        inputMode="numeric"
                                        pattern="[0-9]*"
                                    />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="address" className="form-label">
                                        Delivery Address
                                    </label>

                                    <textarea
                                        id="address"
                                        className="form-control"
                                        rows={3}
                                        placeholder="Enter your delivery address"
                                    ></textarea>
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label">
                                        City
                                    </label>

                                    <input
                                        type="text"
                                        id="city"
                                        className="form-control"
                                        placeholder="Enter your city"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="state" className="form-label">
                                        State
                                    </label>

                                    <input
                                        type="text"
                                        id="state"
                                        className="form-control"
                                        placeholder="Enter your state"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="orderNote" className="form-label">
                                        Order Note <span className="text-body-secondary">(Optional)</span>
                                    </label>

                                    <textarea
                                        id="orderNote"
                                        className="form-control"
                                        rows={3}
                                        placeholder="Example: Please call me before delivery, deliver after 4 PM, etc."
                                    ></textarea>
                                </div>



                            </div>
                        </div>
                    </div>

                    <div className="col-lg-5">
                        <div className="card">
                            <div className="card-body">
                                <h2 className="h4 mb-4">
                                    Order Summary
                                </h2>

                                {cart?.cartItems.map((item) => (
                                    <div
                                        key={item.product.id}
                                        className="d-flex justify-content-between mb-3"
                                    >
                                        <div>
                                            <p className="mb-1 fw-semibold">
                                                {item.product.name}
                                            </p>

                                            <p className="mb-0 text-body-secondary">
                                                {item.quantity} × ₦{item.product.price.toLocaleString()}
                                            </p>
                                        </div>

                                        <span className="fw-semibold">
                                            ₦{(
                                                item.product.price * item.quantity
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                ))}
                                <hr />

                                <div className="d-flex justify-content-between">
                                    <span className="fw-semibold">
                                        Subtotal
                                    </span>

                                    <span className="fw-bold">
                                        ₦{cart?.cartSubtotal.toLocaleString()}
                                    </span>
                                </div>

                                <div className="d-flex justify-content-between mt-2">
                                    <span>
                                        Shipping
                                    </span>

                                    <span>
                                        ₦2,000
                                    </span>
                                </div>
                                <hr />

                                <div className="d-flex justify-content-between">
                                    <span className="fs-5 fw-semibold">
                                        Total
                                    </span>

                                    <span className="fs-5 fw-bold">
                                        ₦{((cart?.cartSubtotal ?? 0) + 2000).toLocaleString()}
                                    </span>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default Checkout