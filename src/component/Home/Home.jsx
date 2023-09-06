import { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import Loader from "../layout/loader/Loader";

import { clearError, getProducts } from "../../action/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

export default function Home() {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products, productCount } = useSelector(
    (s) => s.product
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log("line 1 ", error);
    if (error) {
      console.log("useEffect", error);
      alert.error(error);
      dispatch(clearError());
      console.log("after clear error", error);
    }
    // dispatch(getProducts());
  }, [
    alert,
    error
    // dispatch
  ]);

  return (
    <Fragment>
      <MetaData title={"Ecommerce"} />
      <div className="banner">
        <p>Welcome to ecommerce</p>
        <h1>Find Amazing products below</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>

      <h2 className="homeHeading">Featured Products</h2>

      <div className="container" id="container">
        {loading ? (
          <Loader />
        ) : (
          products && products.map((e) => <ProductCard product={e} />)
        )}
      </div>
    </Fragment>
  );
}
