import {
  createAsyncThunk,
  createSlice,
  configureStore,
} from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk("product/getProducts", async () => {
  try {
    const response = await axios.get("http://localhost:3000/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
});
export const fetchProductDetails = createAsyncThunk(
  "product/fetchProductDetails",
  async (id) => {
    const response = await axios.get(`http://localhost:3000/products/${id}`);
    return response.data;
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, updatedData }) => {
    const response = await axios.put(
      `http://localhost:3000/products/${id}`,
      updatedData
    );
    return response.data;
  }
);

export const addProduct = createAsyncThunk(
  "product/addProduct",
  async (productData, { rejectWithValue }) => {
    try {
      const respons = await axios.post(
        `http://localhost:3000/products`,
        productData
      );
      return respons.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (id) => {
    await axios.delete(`http://localhost:3000/products/${id}`);
    return id;
  }
);
const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductDetails.fulfilled, (state, action) => {
        console.log("Fetched product details:", action.payload);
        state.loading = false;
        state.selectedProduct = action.payload;
      })
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateProduct.pending, (state) => {
        state.error = null;
        state.loading = true;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        const updatedProducts = state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        );
        state.products = updatedProducts;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products.push(action.payload);
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
        state.loading = false;
      });
  },
});

const store = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
});

export default store;
