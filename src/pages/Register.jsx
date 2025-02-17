import React, { useState ,useEffect} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import {useFirebase} from '../context/firebase';
function Register() {
    const firebase=useFirebase();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate=useNavigate();

        useEffect(()=>
        {
            if(firebase.isLoggedin)
            {
                navigate('/');
            }
        },[firebase,navigate])

    const handleOnsubmit=async (e)=>
    {
        e.preventDefault();
        console.log("Signing Up");
        const result=await firebase.signUpUserWithEmailPassword(email,password)
        setEmail("");
        setPassword("");
    }
    return ( 
        <div className='container'>
            <Form className='ms-3' onSubmit={handleOnsubmit}>
                <Form.Group className="mb-3 mt-5" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password"  onChange={(e)=>setPassword(e.target.value)} value={password}/>
                </Form.Group>
               
                <Button variant="primary" type="submit">
                    Create Account
                </Button>
                </Form>
        </div>
     );
}

export default Register;