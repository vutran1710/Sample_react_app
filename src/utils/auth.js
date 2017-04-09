import { getFirebase } from 'react-redux-firebase'

const signedIn = (path, bol) => (ns, replace, callback) => {
  getFirebase().auth().onAuthStateChanged(user => {
    !!user === bol && replace(path)
    callback()
  })
}

const authErrorMessage = [
  { value: 'auth/invalid-email', label: 'Email is not recognized' },
  { value: 'auth/user-disabled', label: 'User has been removed' },
  { value: 'auth/user-not-found', label: 'Account is not found' },
  { value: 'auth/wrong-password', label: 'Wrong password' }
]

export { signedIn, authErrorMessage }
