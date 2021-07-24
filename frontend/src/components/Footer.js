import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

const Footer = () => {
  return (
    <footer>
      <Container style={{ marginTop: '10px' }} expand='lg'>
        <Row>
          <Col className='text-center '>Copyright &copy; Click-To-Cart</Col>
        </Row>
        <Row>
          <Col className='text-center py-2'>Created By : Abhijeet Athawale</Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
