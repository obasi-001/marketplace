import { useContext, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { signOutUser } from '../services/auth'
import {
    getUserProfile,
    saveUserProfile,
} from '../services/userProfile'

function Account() {
    const auth = useContext(AuthContext)

    const [loadingProfile, setLoadingProfile] = useState(true)

    // Phone
    const [phone, setPhone] = useState('')
    const [savedPhone, setSavedPhone] = useState('')
    const [editingPhone, setEditingPhone] = useState(false)
    const [phoneError, setPhoneError] = useState('')

    // Address
    const [address, setAddress] = useState('')
    const [savedAddress, setSavedAddress] = useState('')
    const [editingAddress, setEditingAddress] = useState(false)
    const [addressError, setAddressError] = useState('')

    // City
    const [city, setCity] = useState('')
    const [savedCity, setSavedCity] = useState('')
    const [editingCity, setEditingCity] = useState(false)
    const [cityError, setCityError] = useState('')

    // State
    const [state, setState] = useState('')
    const [savedState, setSavedState] = useState('')
    const [editingState, setEditingState] = useState(false)
    const [stateError, setStateError] = useState('')

    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false)
    const [saveSuccess, setSaveSuccess] = useState('')
    const [saveError, setSaveError] = useState('')

    // Input references
    const phoneInputRef = useRef<HTMLInputElement>(null)
    const addressInputRef = useRef<HTMLInputElement>(null)
    const cityInputRef = useRef<HTMLInputElement>(null)
    const stateInputRef = useRef<HTMLInputElement>(null)

    // Focus phone input when editing starts
    useEffect(() => {
        if (editingPhone) {
            phoneInputRef.current?.focus()
        }
    }, [editingPhone])

    // Focus address input when editing starts
    useEffect(() => {
        if (editingAddress) {
            addressInputRef.current?.focus()
        }
    }, [editingAddress])

    // Focus city input when editing starts
    useEffect(() => {
        if (editingCity) {
            cityInputRef.current?.focus()
        }
    }, [editingCity])

    // Focus state input when editing starts
    useEffect(() => {
        if (editingState) {
            stateInputRef.current?.focus()
        }
    }, [editingState])

    // Check whether current values differ from saved values
    useEffect(() => {
        const hasChanges =
            phone !== savedPhone ||
            address !== savedAddress ||
            city !== savedCity ||
            state !== savedState

        setHasUnsavedChanges(hasChanges)
    }, [
        phone,
        savedPhone,
        address,
        savedAddress,
        city,
        savedCity,
        state,
        savedState,
    ])

    // Load profile from Firestore
    useEffect(() => {
        if (!auth || !auth.user) {
            setLoadingProfile(false)
            return
        }

        const uid = auth.user.uid

        async function loadProfile() {
            try {
                const userProfile = await getUserProfile(uid)

                if (userProfile) {
                    setPhone(userProfile.phone)
                    setSavedPhone(userProfile.phone)

                    setAddress(userProfile.address)
                    setSavedAddress(userProfile.address)

                    setCity(userProfile.city)
                    setSavedCity(userProfile.city)

                    setState(userProfile.state)
                    setSavedState(userProfile.state)
                }
            } catch (error) {
                console.error('Failed to load profile:', error)
            } finally {
                setLoadingProfile(false)
            }
        }

        loadProfile()
    }, [auth])

    const handleSaveProfile = async () => {
        const user = auth?.user

        if (!user) {
            return
        }

        // Clear previous messages
        setPhoneError('')
        setAddressError('')
        setCityError('')
        setStateError('')
        setSaveError('')
        setSaveSuccess('')

        // Phone validation
        if (phone.length !== 11) {
            setPhoneError('Phone number must be exactly 11 digits.')
            setEditingPhone(true)
            return
        }

        // Address validation
        if (!address.trim()) {
            setAddressError('Address is required.')
            setEditingAddress(true)
            return
        }

        // City validation
        if (!city.trim()) {
            setCityError('City is required.')
            setEditingCity(true)
            return
        }

        if (!/^[A-Za-z\s]+$/.test(city)) {
            setCityError('City can contain letters and spaces only.')
            setEditingCity(true)
            return
        }

        // State validation
        if (!state.trim()) {
            setStateError('State is required.')
            setEditingState(true)
            return
        }

        if (!/^[A-Za-z\s]+$/.test(state)) {
            setStateError('State can contain letters and spaces only.')
            setEditingState(true)
            return
        }

        try {
            await saveUserProfile(user.uid, {
                phone,
                address,
                city,
                state,
            })

            // Update saved values
            setSavedPhone(phone)
            setSavedAddress(address)
            setSavedCity(city)
            setSavedState(state)

            setSaveSuccess('Profile saved successfully.')

            // Return fields to display mode
            setEditingPhone(false)
            setEditingAddress(false)
            setEditingCity(false)
            setEditingState(false)
        } catch (error) {
            console.error('Failed to save profile:', error)
            setSaveError('Failed to save profile. Please try again.')
        }
    }

    if (!auth?.user) {
        return (
            <section className="py-5">
                <div className="container">
                    <h1 className="mb-4">My Account</h1>

                    <p>
                        You need to log in to access your account.
                    </p>

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

    if (loadingProfile) {
        return (
            <section className="py-5">
                <div className="container">
                    <h1 className="mb-4">My Account</h1>
                    <p>Loading your profile...</p>
                </div>
            </section>
        )
    }

    return (
        <section className="py-5">
            <div className="container">
                <h1 className="mb-4">My Account</h1>

                {hasUnsavedChanges && (
                    <div
                        className="alert alert-warning"
                        role="alert"
                    >
                        <i className="bi bi-exclamation-triangle me-2"></i>
                        You have unsaved changes. Click{' '}
                        <strong>Save Profile</strong> to save your
                        changes.
                    </div>
                )}

                {saveSuccess && (
                    <div
                        className="alert alert-success"
                        role="alert"
                    >
                        <i className="bi bi-check-circle me-2"></i>
                        {saveSuccess}
                    </div>
                )}

                {saveError && (
                    <div
                        className="alert alert-danger"
                        role="alert"
                    >
                        <i className="bi bi-exclamation-circle me-2"></i>
                        {saveError}
                    </div>
                )}

                {/* Name */}
                <div className="mb-3">
                    <label className="form-label">
                        Name
                    </label>

                    <input
                        type="text"
                        className="form-control"
                        value={auth.user.displayName || ''}
                        readOnly
                    />
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label className="form-label">
                        Email
                    </label>

                    <input
                        type="email"
                        className="form-control"
                        value={auth.user.email || ''}
                        readOnly
                    />
                </div>

                {/* Phone */}
                <div className="mb-3">
                    <label className="form-label">
                        Phone
                    </label>

                    <div className="input-group">
                        {editingPhone ? (
                            <input
                                ref={phoneInputRef}
                                type="tel"
                                className="form-control"
                                value={phone}
                                maxLength={11}
                                onChange={(e) => {
                                    const newPhone =
                                        e.target.value.replace(
                                            /\D/g,
                                            '',
                                        )

                                    setPhone(newPhone)
                                    setPhoneError('')
                                    setSaveSuccess('')
                                }}
                            />
                        ) : (
                            <div className="form-control">
                                {phone ||
                                    'No phone number added'}
                            </div>
                        )}

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => {
                                setEditingPhone(
                                    !editingPhone,
                                )
                                setPhoneError('')
                            }}
                            aria-label={
                                editingPhone
                                    ? 'Save phone edit'
                                    : 'Edit phone number'
                            }
                        >
                            <i
                                className={`bi ${
                                    editingPhone
                                        ? 'bi-save'
                                        : 'bi-pencil'
                                }`}
                            ></i>{' '}
                            {editingPhone
                                ? 'Save Edit'
                                : 'Edit'}
                        </button>
                    </div>

                    {phoneError && (
                        <div className="text-danger small mt-1">
                            <i className="bi bi-exclamation-circle me-1"></i>
                            {phoneError}
                        </div>
                    )}
                </div>

                {/* Address */}
                <div className="mb-3">
                    <label className="form-label">
                        Address
                    </label>

                    <div className="input-group">
                        {editingAddress ? (
                            <input
                                ref={addressInputRef}
                                type="text"
                                className="form-control"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value)
                                    setAddressError('')
                                    setSaveSuccess('')
                                }}
                            />
                        ) : (
                            <div className="form-control">
                                {address ||
                                    'No address added'}
                            </div>
                        )}

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => {
                                setEditingAddress(
                                    !editingAddress,
                                )
                                setAddressError('')
                            }}
                            aria-label={
                                editingAddress
                                    ? 'Save address edit'
                                    : 'Edit address'
                            }
                        >
                            <i
                                className={`bi ${
                                    editingAddress
                                        ? 'bi-save'
                                        : 'bi-pencil'
                                }`}
                            ></i>{' '}
                            {editingAddress
                                ? 'Save Edit'
                                : 'Edit'}
                        </button>
                    </div>

                    {addressError && (
                        <div className="text-danger small mt-1">
                            <i className="bi bi-exclamation-circle me-1"></i>
                            {addressError}
                        </div>
                    )}
                </div>

                {/* City */}
                <div className="mb-3">
                    <label className="form-label">
                        City
                    </label>

                    <div className="input-group">
                        {editingCity ? (
                            <input
                                ref={cityInputRef}
                                type="text"
                                className="form-control"
                                value={city}
                                onChange={(e) => {
                                    const newCity =
                                        e.target.value.replace(
                                            /[^A-Za-z\s]/g,
                                            '',
                                        )

                                    setCity(newCity)
                                    setCityError('')
                                    setSaveSuccess('')
                                }}
                            />
                        ) : (
                            <div className="form-control">
                                {city || 'No city added'}
                            </div>
                        )}

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => {
                                setEditingCity(!editingCity)
                                setCityError('')
                            }}
                            aria-label={
                                editingCity
                                    ? 'Save city edit'
                                    : 'Edit city'
                            }
                        >
                            <i
                                className={`bi ${
                                    editingCity
                                        ? 'bi-save'
                                        : 'bi-pencil'
                                }`}
                            ></i>{' '}
                            {editingCity
                                ? 'Save Edit'
                                : 'Edit'}
                        </button>
                    </div>

                    {cityError && (
                        <div className="text-danger small mt-1">
                            <i className="bi bi-exclamation-circle me-1"></i>
                            {cityError}
                        </div>
                    )}
                </div>

                {/* State */}
                <div className="mb-3">
                    <label className="form-label">
                        State
                    </label>

                    <div className="input-group">
                        {editingState ? (
                            <input
                                ref={stateInputRef}
                                type="text"
                                className="form-control"
                                value={state}
                                onChange={(e) => {
                                    const newState =
                                        e.target.value.replace(
                                            /[^A-Za-z\s]/g,
                                            '',
                                        )

                                    setState(newState)
                                    setStateError('')
                                    setSaveSuccess('')
                                }}
                            />
                        ) : (
                            <div className="form-control">
                                {state || 'No state added'}
                            </div>
                        )}

                        <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => {
                                setEditingState(
                                    !editingState,
                                )
                                setStateError('')
                            }}
                            aria-label={
                                editingState
                                    ? 'Save state edit'
                                    : 'Edit state'
                            }
                        >
                            <i
                                className={`bi ${
                                    editingState
                                        ? 'bi-save'
                                        : 'bi-pencil'
                                }`}
                            ></i>{' '}
                            {editingState
                                ? 'Save Edit'
                                : 'Edit'}
                        </button>
                    </div>

                    {stateError && (
                        <div className="text-danger small mt-1">
                            <i className="bi bi-exclamation-circle me-1"></i>
                            {stateError}
                        </div>
                    )}
                </div>

                {/* Save Profile */}
                <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleSaveProfile}
                >
                    <i className="bi bi-save me-1"></i>
                    Save Profile
                </button>

                {/* Logout */}
                <button
                    type="button"
                    className="btn btn-outline-danger ms-2"
                    onClick={signOutUser}
                >
                    Logout
                </button>
            </div>
        </section>
    )
}

export default Account