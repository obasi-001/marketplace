import { useContext, useState } from 'react'
import { CartContext } from '../context/CartContext'



function Checkout() {
    const cart = useContext(CartContext)
    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [orderNote, setOrderNote] = useState('')

    const handleContinue = () => {
  if (!fullName.trim()) {
    alert('Please enter your full name.')
    return
  }

  if (!email.trim()) {
    alert('Please enter your email address.')
    return
  }

  if (!phone.trim()) {
    alert('Please enter your phone number.')
    return
  }

  if (!address.trim()) {
    alert('Please enter your delivery address.')
    return
  }

  if (!city.trim()) {
    alert('Please enter your city.')
    return
  }

  if (!state.trim()) {
    alert('Please enter your state.')
    return
  }

  console.log({
    fullName: fullName.trim(),
    email: email.trim(),
    phone: phone.trim(),
    address: address.trim(),
    city: city.trim(),
    state: state.trim(),
    orderNote: orderNote.trim(),
  })
}

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
                                        value={fullName}
                                        onChange={(event) => setFullName(event.target.value)}
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
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
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
                                        value={phone}
                                        onChange={(event) => setPhone(event.target.value)}
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
                                        value={address}
                                        onChange={(event) => setAddress(event.target.value)}
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
                                        value={city}
                                        onChange={(event) => setCity(event.target.value)}
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
                                        value={state}
                                        onChange={(event) => setState(event.target.value)}
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
                                        value={orderNote}
                                        onChange={(event) => setOrderNote(event.target.value)}
                                    ></textarea>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={handleContinue}
                                >
                                    Continue
                                </button>



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