import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { register } from '../actions/userActions'

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [ConfirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const userRegister = useSelector((state) => state.userRegister)

  const { loading, error, userInfo } = userRegister

  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== ConfirmPassword) {
      setMessage('passwords do not match')
    } else {
      dispatch(register(name, email, password))
    }
  }

  return (
    <>
      <Helmet>
        <title>Register User</title>
        <meta name='description' content='we sell best products'></meta>
        <meta name='keywords' content='electronics, buy-electronics'></meta>
      </Helmet>

      <FormContainer>
        <h1>Sign Up</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name' style={{ marginBottom: '10px' }}>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='email' style={{ marginBottom: '10px' }}>
            <Form.Label>Email Address:</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password' style={{ marginBottom: '10px' }}>
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group
            controlId='confirmPassword'
            style={{ marginBottom: '20px' }}
          >
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={ConfirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button
            type='submit'
            variant='primary'
            style={{
              background: '#F79F1F',
              color: 'black',
              letterSpacing: '1px',
            }}
          >
            Register
          </Button>
        </Form>

        <Row className='py-3'>
          <Col>
            Already have an account ?
            <Link
              to={redirect ? `login?/redirect=${redirect}` : `/login`}
              style={{ color: 'blue' }}
            >
              {' Login'}
            </Link>
          </Col>
        </Row>
      </FormContainer>
    </>
  )
}

export default RegisterScreen
