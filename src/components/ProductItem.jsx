import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { fetchProductDetails } from '../redux/productSllice';

const ProductItem = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedProduct, loading, error } = useSelector((state) => state.products);


  useEffect(() => {
    dispatch(fetchProductDetails(id));
  }, [dispatch, id]);

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;
  return (
    <div className="container mt-5">
      {selectedProduct ? (
        <div className="row">
          <div className="col-md-6">
            <img
              src={selectedProduct.image}
              alt={selectedProduct.title}
              className="img-fluid"
            />
          </div>
          <div className="col-md-6">
            <h3>{selectedProduct.title}</h3>
            <p>{selectedProduct.description}</p>
            <p><strong>Price: </strong>${selectedProduct.price}</p>
            <button className="btn btn-secondary">Add to Cart</button>
          </div>
        </div>
      ) : (
        <p>Product not found</p>
      )}
    </div>
  )
}

export default ProductItem