
import React, { useRef, useState } from 'react'
import { Form, Button, Card, Container, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
const Signup = () => {

  const emailRef = useRef<any>()
  const passwordRef = useRef<any>()
  const nameRef = useRef<any>()
  const navigate = useNavigate();
  
  const [error, setError] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault();

    

    const data = {
        username: emailRef.current.value,
        password: passwordRef.current.value,
        name: nameRef.current.value
    };

    fetch('http://localhost:3001/api/auth/register', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
        return response.json();
        } else {
        throw new Error('Request failed');
        }
    })
    .then(data => {
        navigate('/login')
    })
    .catch(error => {
        setError("User Already Exists")
    });
  }

  return (
    <>
        <Container className="d-flex align-items-center justify-content-center" style={{height: '100vh'}}>
            <div className="w-100" style={{maxWidth: "400px"}}>
                <Card>
                    <Card.Body>
                        <h2 className='text-center mb-4'>Sign Up</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={handleSubmit}>
                            <Form.Group id="name">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" ref={nameRef} required />
                            </Form.Group>
                            <Form.Group id="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef} required />
                            </Form.Group>
                            <Form.Group id="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef} required />
                            </Form.Group>
                            <Button className='w-100 mt-4' type='submit'>Sign Up</Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className='w-100 text-center mt-2'>
                    Need an account? <Link to="/login">Login</Link>
                </div>
            </div>
        </Container>
    </>
  )
}

export default Signup