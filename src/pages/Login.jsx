import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import {useFirebase} from '../context/firebase';
function Login() {
    const firebase=useFirebase();
    const navigate=useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(()=>
    {
        if(firebase.isLoggedin)
        {
            navigate('/');
        }
    },[firebase.isLoggedin,navigate])
    const handleOnsubmit = async (e) => {
        e.preventDefault();
        console.log("Logging In");
    
        try {
            const result = await firebase.signIn(email, password);
            console.log("Successful", result);
            setEmail("");
            setPassword("");
            navigate('/');  // Navigate after successful login
        } catch (error) {
            console.error("Login failed:", error.message);
        }
    };
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
                    Login
                </Button>
                </Form>
                <Button className='mt-3 ms-3' onClick={firebase.WithGoogle}>
                    <img src="" alt="" />
                    <span>Sign In with Google</span>
                </Button>
        </div>
     );
}

export default Login;