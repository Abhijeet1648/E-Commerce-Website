import React from 'react'
import { Container, Nav, Row, Col } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
  return (
    <Row>
      <Col>
        <Nav style={{ display: 'flex', justifyContent: 'center' }}>
          <Nav.Item>
            {step1 ? (
              <LinkContainer to='/login' style={{ color: '#3498db' }}>
                <Nav.Link>Sign in</Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link disabled>Sign in</Nav.Link>
            )}
          </Nav.Item>
          <br />

          <Nav.Item>
            {step2 ? (
              <LinkContainer to='/shipping' style={{ color: '#3498db' }}>
                <Nav.Link>Shipping</Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link disabled>Shipping</Nav.Link>
            )}
          </Nav.Item>

          <Nav.Item>
            {step3 ? (
              <LinkContainer to='/payment' style={{ color: '#3498db' }}>
                <Nav.Link>Payment</Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link disabled>Payment</Nav.Link>
            )}
          </Nav.Item>

          <Nav.Item>
            {step4 ? (
              <LinkContainer to='/placeorder' style={{ color: '#3498db' }}>
                <Nav.Link>Place Order</Nav.Link>
              </LinkContainer>
            ) : (
              <Nav.Link disabled>Place Order</Nav.Link>
            )}
          </Nav.Item>
        </Nav>
      </Col>
    </Row>
  )
}

export default CheckoutSteps
