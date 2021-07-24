import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Row,
  Col,
  Button,
  ListGroup,
  Card,
  Image,
  Form,
  ListGroupItem,
  FormGroup,
  FormLabel,
  FormControl,
} from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions'

import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const productReviewCreate = useSelector((state) => state.productReviewCreate)
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted !')
      setRating(0)
      setComment('')
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
    dispatch(listProductDetails(match.params.id))
  }, [dispatch, match, successProductReview])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      })
    )
  }

  return (
    <>
      <Link
        className='btn my-3'
        to='/'
        style={{
          background: '#F79F1F',
          color: 'black',
          font: 'bold',
          borderRadius: '10px',
        }}
      >
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Helmet>
            <title>{product.name}</title>
            <meta name='description' content='we sell best products'></meta>
            <meta name='keywords' content='electronics, buy-electronics'></meta>
          </Helmet>
          <Row>
            <Col md={6}>
              <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup>
                <ListGroup.Item>
                  <h3>{product.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product.rating}
                    text={`${product.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ₹ {product.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description:{product.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>

            <Col md={3}>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>₹ {product.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  <ListGroup.Item>
                    <Row>
                      <Col style={{ font: 'bold' }}>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>

                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Qty:</Col>

                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (x) => (
                                <option key={x + 1} value={x + 1}>
                                  {x + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}

                  <ListGroup.Item
                    style={{ display: 'flex', justifyContent: 'center' }}
                  >
                    <Button
                      onClick={addToCartHandler}
                      className='btn btn-block'
                      type='button'
                      disabled={product.countInStock === 0}
                      style={{
                        background: '#F79F1F',
                        font: 'bold',
                        color: 'black',
                        width: '80%',
                      }}
                    >
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row md={3} style={{ marginTop: '30px' }}>
            <Col>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && (
                <Message variant='success'> No Reviews </Message>
              )}

              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroupItem key={review._id}>
                    <strong> {review.name} </strong>
                    <Rating value={review.rating} />
                    <p> {review.createdAt.substring(0, 10)} </p>
                    <p> {review.comment} </p>
                  </ListGroupItem>
                ))}

                <ListGroupItem>
                  <h5>Write a customer review</h5>
                  {errorProductReview && (
                    <Message variant='danger'> {errorProductReview} </Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <FormGroup controlId='rating'>
                        <FormLabel>Rating</FormLabel>
                        <FormControl
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>select..</option>
                          <option value='1'>Poor</option>
                          <option value='2'>Fair</option>
                          <option value='3'>Good</option>
                          <option value='4'>Very Good</option>
                          <option value='5'>Excellent</option>
                        </FormControl>
                      </FormGroup>

                      <FormGroup controlId='comment'>
                        <FormLabel>Comment</FormLabel>
                        <FormControl
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></FormControl>
                      </FormGroup>

                      <Button
                        type='submit'
                        variant='primary'
                        style={{
                          background: '#F79F1F',
                          color: 'black',
                          marginTop: '20px',
                          letterSpacing: '2px',
                        }}
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please
                      <Link to='/login' style={{ color: 'blue' }}>
                        <strong> Sign-In </strong>
                      </Link>
                      to write a review
                    </Message>
                  )}
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  )
}

export default ProductScreen
