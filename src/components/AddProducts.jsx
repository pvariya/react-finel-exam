import {  useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { addProduct } from '../redux/productSllice';


function AddProducts() {
const dispach = useDispatch()
const navigate = useNavigate()
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !price || !image || !description) {
      alert('Please fill out all fields.');
      return;
    }
    const newProduct = {
      title,
      price,
      image,
      description,
    };
    console.log('New Product:', newProduct);
    dispach(addProduct(newProduct))
    alert('Product added successfully!');
    navigate('/')
    setTitle('');
    setPrice('');
    setImage('');
    setDescription('');
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Add a New Product</h2>
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-6">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="col-md-6">
          <label htmlFor="price" className="form-label">Price</label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="image" className="form-label">Image URL</label>
          <input
            type="text"
            id="image"
            className="form-control"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>

        <div className="col-md-12">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary w-100">Add Product</button>
        </div>
      </form>
    </div>
  );
}

export default AddProducts;
