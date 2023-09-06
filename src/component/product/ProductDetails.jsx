import { Fragment, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

// components
import { Fade, Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";
import ReactStars from "react-rating-stars-component";
import { useAlert } from "react-alert";

// files
import { getProductsDetails } from "../../action/productAction";
import ReviewCard from "./ReviewCard.jsx";
import Loader from "../layout/loader/Loader";

// css
import "./productDetail.css";

export default function ProductDetails({ match }) {
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const alert = useAlert();

  const params = useParams();

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProductsDetails(params.id));
  }, [dispatch, params.id, alert, error]);

  const options = {
    edit: false,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    size: window.innerWidth < 600 ? 20 : 25,
    value: product.rating,
    isHalf: true
  };

  return (
    <Fragment>
      {loading ? (
        Loader
      ) : (
        <Fragment>
          <div className="ProductDetails">
            <div className="slide-container">
              <div className="slide">
                {product.images && (
                  <Slide>
                    {product.images.map((ele, ind) => (
                      <img
                        className="CarouselImage"
                        key={ind}
                        src={ele.url}
                        alt={`${ind} Slide`}
                      />
                    ))}
                  </Slide>
                )}
              </div>
            </div>

            <div className="details">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button>-</button>
                    <input readOnly type="number" value="1" />
                    <button>+</button>
                  </div>
                  <button disabled={product.Stock < 1 ? true : false}>
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
}
