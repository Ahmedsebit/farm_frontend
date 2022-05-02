import React from 'react'
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import "./ProductRow.css"

export default function ProductRow({ id, image, name, description, price }) {
    
  var image_name = `s3://lori-tms/client-generated-files-dev/${image}`
  return (
    <div className="row product">
        <div className="col-md-2">
          <img className="product-image" src={image_name} alt={name}/>
        </div>
        <div className="col-md-8 product-detail">
          <h2>{name}</h2>
          <div dangerouslySetInnerHTML={{__html: description}}></div>
        </div>
        <div className="col-md-2 product-price">
          {price}
        </div>
        <Link className="product-button" to={`/products/${id}`}  key={id}>
            <Button variant="contained" id="view">
                View
            </Button>
        </Link>
      </div>
  )
}
