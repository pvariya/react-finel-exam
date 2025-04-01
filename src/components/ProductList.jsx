import  { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { getProducts } from '../redux/productSllice';

const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Product List</h2>
      {loading && <p>Loading...</p>}

      <div className="row">
        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="col-md-4 mb-4 d-flex align-items-stretch">
              <div className="card h-100 shadow-sm">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: '200px', objectFit: 'cover' }} 
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text flex-grow-1">{product.description}</p>
                  <button
                    className="btn btn-primary mt-auto"
                    onClick={() => navigate(`/products/${product.id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;
