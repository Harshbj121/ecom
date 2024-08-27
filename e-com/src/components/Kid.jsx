// import React from 'react'

import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./Card";

const Kid = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // Fetch products by category
    axios.get(`http://localhost:5000/api/products/kid`)
      .then(response => {
        setProducts(response.data.products);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  });

  return (
    <>
      <h1 className="text-center">Kids Products</h1>
      <div className="home-body">
        {products.length > 0 ? (
          products.map(product => (
            <Card key={product._id} product={product} />
          ))
        ) : (
          <p className="text-center">No products found</p>
        )}
      </div>
    </>
  )
}

export default Kid