import React from "react";
import PropTypes from 'prop-types'

const fetchData = async () => {
  const response = await fetch('http://localhost:3001/api/hatesymbols')
  if (!response.ok) {
    const errorMessage = `ERROR! ${response.status}` 
    throw new Error(errorMessage)
  } else {
    const data = await response.json()
    return data
  }
}

export default fetchData

