export function getAuthErrorMessage(error: unknown): string {
  if (
    error instanceof Error &&
    error.message.includes('auth/email-already-in-use')
  ) {
    return 'An account with this email already exists. Please log in.'
  }

  if (
    error instanceof Error &&
    error.message.includes('auth/weak-password')
  ) {
    return 'Password must be at least 6 characters.'
  }

  if (
    error instanceof Error &&
    error.message.includes('auth/invalid-email')
  ) {
    return 'Please enter a valid email address.'
  }

  if (
    error instanceof Error &&
    error.message.includes('auth/invalid-credential')
  ) {
    return 'Invalid email or password.'
  }

  return 'Something went wrong. Please try again.'
}