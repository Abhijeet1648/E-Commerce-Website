import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description'>{description}</meta>
      <meta name='keyword'>{keywords}</meta>
    </Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to proshop',
  description: 'We sell best products',
  keywords: 'electronics,buy electronics',
}

export default Meta
