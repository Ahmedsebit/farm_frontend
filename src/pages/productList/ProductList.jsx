import { Grid } from '@mui/material';
import React, { useEffect, useState } from "react"
import ProductRow from '../../components/productRow/ProductRow';


export default function ProductList() {
    const [products, setProducts] = useState([])
    const fetchData = () => {
        fetch("https://firstbodifarmbackend.herokuapp.com/api/farm_backend/v1/products",)
          .then(response => {
            return response.json()
          })
          .then(data => {
            setProducts(data)
          })
      }

      useEffect(() => {
        fetchData()
      }, [])
  return (
    <Grid container spacing={2}>
      {products.map((product) => (
          <Grid item md={3}>
            <ProductRow 
            key={product.id} 
            id={product.id}
            image={product.image_url}
            name={product.name} 
            description={product.description} 
            price={product.price} />
        </Grid>
      ))}
    </Grid>
  );
}
