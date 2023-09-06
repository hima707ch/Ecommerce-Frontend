import axios from "axios";
import {
  ALL_PRODUCT_FAIL,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  CLEAR_ERRORS
} from "../constants/productConstant";

export const getProducts = (
  keyword = "",
  currentPage,
  price = [0, 25000],
  category = "",
  ratings = 0
) => async (dispatch) => {
  try {
    dispatch({ type: ALL_PRODUCT_REQUEST });

    let url = `http://localhost:8080/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&rating[gte]=${ratings}`;

    if (category && category !== "Remove all") {
      url += `&category=${category}`;
    }

    const { data } = await axios.get(url);
    console.log("from action", data);
    dispatch({ type: ALL_PRODUCT_SUCCESS, payload: data });
  } catch (err) {
    console.log(err);
    dispatch({ type: ALL_PRODUCT_FAIL, payload: err.response });
  }
};

export const getProductsDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(
      `http://localhost:8080/api/v1/product/${id}`
    );
    console.log(data);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data.product });
  } catch (err) {
    console.log(err);
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: err.response.data.message
    });
  }
};

export const clearError = () => async (dispatch) => {
  console.log("clear error called");
  dispatch({ type: CLEAR_ERRORS });
};
