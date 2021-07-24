import React, { useState } from 'react'
import { Form, Button, FormControl, Container } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }
  return (
    <Form onSubmit={submitHandler} inline>
      <Container
        style={{
          display: 'flex',
          justify_content: 'space-between',
        }}
      >
        <FormControl
          type='text'
          name='q'
          onChange={(e) => setKeyword(e.target.value)}
          placeholder='Search Products'
          className='mr-sm-2 ml-sm-5'
          style={{
            color: 'black',
            width: '100%',
          }}
        ></FormControl>
        <Button
          type='submit'
          style={{
            marginLeft: '20px',
            background: '#F79F1F',
            color: 'black',
            outline: 'none',
            border: 'none',
            letterSpacing: '1px',
          }}
        >
          Search
        </Button>
      </Container>
    </Form>
  )
}

export default SearchBox
