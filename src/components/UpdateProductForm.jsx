import  { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router";
import { updateProduct } from "../redux/productSllice";


const UpdateProductForm = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const location = useLocation();
  const product = location.state?.product;
const navigator =useNavigate()
  // Initialize state with existing product values
  const [title, setTitle] = useState(product?.title || "");
  const [price, setPrice] = useState(product?.price || "");
  const [image, setImage] = useState(product?.image || "");
  const [description, setDescription] = useState(product?.description || "");

  const handleUpdate = () => {
    dispatch(updateProduct({ id, updatedData: { title: title, price,image,description } }));
    alert("Updated")
    navigator("/")
  };

  return (
      <div className="container mt-5">
      <h2 className="text-center mb-4">Add a New Product</h2>
      <form className="row g-3">
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
        <button onClick={handleUpdate}>Update</button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProductForm;
