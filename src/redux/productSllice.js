import { createAsyncThunk, createSlice, configureStore } from "@reduxjs/toolkit";
import { API } from "../config/Api";
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
            }).addCase(fetchProductDetails.pending, (state) => {
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
    },
});


const store = configureStore({
    reducer: {
        products: productSlice.reducer,
    },
});

export default store;
