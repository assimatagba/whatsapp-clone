import { Button } from '@material-ui/core'
import React from 'react'
import { auth, provider } from '../../firebase'
import './Login.css'
import { actionTypes } from '../../Reducer';
import { useStateValue } from '../../StateProvider';


function Login() {
    // eslint-disable-next-line
    const [{}, dispatch] = useStateValue();
    const signIn = () => {
        auth.signInWithPopup(provider).then((result) => {dispatch({type: actionTypes.SET_USER,user: result.user,});}).catch((error) => alert(error.message))
    }
    return (
        <div className="login">
            <div className="login-container">
                <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                    alt=""
                />
                <div className="login-text">
                    <h1>Sign in to WhatsApp</h1>
                </div>

                <Button onClick={signIn}>
                    Sign in with Google
                </Button>
            </div>
        </div>
    )
}

export default Login
