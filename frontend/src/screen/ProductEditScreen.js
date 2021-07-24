// import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  // const [numReviews, setNumReviews] = useState(0)
  const [description, setDescription] = useState('')
  // const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector((state) => state.productDetails)
  const { loading, error, product } = productDetails

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        // setNumReviews(product.numReviews)
        setDescription(product.description)
      }
    }
  }, [dispatch, history, productId, product, successUpdate])

  // const uploadFileHandler = async (e) => {
  //   const file = e.target.files[0]
  //   const formData = new FormData()
  //   formData.append('image', file)
  //   setUploading(true)

  //   try {
  //     const config = {
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //       },
  //     }
  //     const { data } = await axios.post('/api/upload', formData, config)
  //     setImage(data)
  //     setUploading(false)
  //   } catch (error) {
  //     console.error(error)
  //     setUploading(false)
  //   }
  // }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        category,
        description,
        // numReviews,
        countInStock,
      })
    )
  }

  return (
    <>
      <Helmet>
        <title>Product Edit</title>
        <meta name='description' content='we sell best products'></meta>
        <meta name='keywords' content='electronics, buy-electronics'></meta>
      </Helmet>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'> {errorUpdate} </Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'> {error} </Message>
        ) : (
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

            <Form.Group controlId='price' style={{ marginBottom: '10px' }}>
              <Form.Label>Price :</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' style={{ marginBottom: '10px' }}>
              <Form.Label>Image :</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
              {/* <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}
              ></Form.File>
              {uploading && <Loader />} */}
            </Form.Group>

            <Form.Group controlId='brand' style={{ marginBottom: '10px' }}>
              <Form.Label>Brand :</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group
              controlId='countInstock'
              style={{ marginBottom: '10px' }}
            >
              <Form.Label>count In Stock :</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter CountInStock'
                value={countInStock}
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='category' style={{ marginBottom: '10px' }}>
              <Form.Label>Category :</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* <Form.Group controlId='numReviews' style={{ marginBottom: '10px' }}>
              <Form.Label>Reviews :</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter Reviews'
                value={numReviews}
                onChange={(e) => setNumReviews(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

            <Form.Group
              controlId='description'
              style={{ marginBottom: '10px' }}
            >
              <Form.Label>Description :</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}

export default ProductEditScreen
