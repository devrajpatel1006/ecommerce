import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteItem } from "./actions/cartAction";

import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Cart = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.product);
  const noOfItems = useSelector((state) => state.numOfItems);
  const [isPromoCodeApplied, setIsPromoCodeApplied] = useState(false);

  useEffect(() => {
    document.getElementById("searchId").classList.add("d-none");
    document.getElementById("cartBtnId").classList.add("d-none");

    return () => {
      document.getElementById("searchId").classList.remove("d-none");
      document.getElementById("cartBtnId").classList.remove("d-none");
    };
  });
  const totalPrice = products.reduce(
    (acc, transaction) => acc + transaction.price * transaction.quantity,
    0
  );
  const handleLinkClick = () => {
    toast("Order Placed Successfully!",{position: "bottom-right"})
    setTimeout(()=>{
      window.location.href = "/";
    },100) // Replace with your desired URL
  }
  return (
    <section className="bg-light my-5 ">
      <div className="bg-primary">
        <div className="container py-4">
          <nav className="d-flex">
            <h6 className="mb-0">
              <a href="/" className="text-white-50">
                Home
              </a>
              <span className="text-white-50 mx-2"> &gt; </span>
              <Link to="/">
                <a className="text-white">
                  <u>Shopping cart</u>
                </a>
              </Link>
            </h6>
            <Link to="/">
              <a
                className=" productButtom me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"
                target="_blank"
              >
                {/* <i className="fas fa-user-alt m-1 me-md-2"></i> */}
                <p className="d-none d-md-block mb-0">Products</p>
              </a>
            </Link>
          </nav>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-9">
            <div className="card border shadow-0">
              <div className="m-4">
                <h4 className="card-title mb-4">Your shopping cart</h4>
                <div>
                  {products?.length > 0 &&
                    products?.map((product) => (
                      <div className="row gy-3 mb-4" key={product.id}>
                        <div className="col-lg-5">
                          <div className="me-lg-5">
                            <div className="d-flex">
                              <img
                                src={product.imageUrl}
                                className="border rounded me-3"
                                style={{ width: "96px", height: "96px" }}
                                alt={product.name}
                              />
                              <div>
                                <a className="nav-link">{product.name}</a>
                                <p className="text-muted">
                                  {product.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2 col-sm-6 col-6 d-flex flex-row flex-lg-column flex-xl-row text-nowrap">
                          <div>
                            <input
                              style={{ width: "100px" }}
                              className="form-select me-4"
                              readOnly
                              value={product.quantity ?? 1}
                            />
                          </div>
                          <div>
                            <p className="h6">
                              ${(product.price * product.quantity).toFixed(2)}
                            </p>
                            <p className="text-muted text-nowrap">
                              ${product.price.toFixed(2)} / per item
                            </p>
                          </div>
                        </div>
                        <div className="col-lg col-sm-6 d-flex justify-content-sm-center justify-content-md-start justify-content-lg-center justify-content-xl-end mb-2">
                          <div className="float-md-end">
                            <a
                              onClick={() => {
                                dispatch(deleteItem(product));
                              }}
                              className="btn btn-light border text-danger icon-hover-danger"
                            >
                              Remove
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="border-top pt-4 mx-4 mb-4">
                <p>
                  <i className="fas fa-truck text-muted fa-lg"></i> Free
                  Delivery within 1-2 weeks
                </p>
              </div>
            </div>
          </div>
          {noOfItems && (
            <div className="col-lg-3">
              <div className="card mb-3 border shadow-0">
                <div className="card-body">
                  <form>
                    <div className="form-group">
                      <label className="form-label">Have coupon?</label>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control border"
                          name=""
                          readOnly
                          value={"SALEDIWALI2023"}
                          placeholder="Coupon code"
                        />
                        <button
                          className="btn btn-light border"
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            setIsPromoCodeApplied(
                              (isPromoCodeApplied) => !isPromoCodeApplied
                            );
                          }}
                        >
                          {isPromoCodeApplied ? "Cancel" : "Apply"}
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className="card shadow-0 border">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Total price:</p>
                    <p className="mb-2">${totalPrice}</p>
                  </div>
                  {
                    <div className="d-flex justify-content-between">
                      <p className="mb-2">Discount:</p>
                      <p className="mb-2 text-success">
                        {isPromoCodeApplied ? (totalPrice / 10).toFixed(2) : 0}
                      </p>
                    </div>
                  }
                  <hr />
                  <div className="d-flex justify-content-between">
                    <p className="mb-2">Total price:</p>
                    <p className="mb-2 fw-bold">
                      $
                      {totalPrice -
                        (isPromoCodeApplied ? (totalPrice / 10).toFixed(2) : 0)}
                    </p>
                  </div>

                  <div className="mt-3">
                    <a className="btn btn-success w-100 shadow-0 mb-2" onClick={handleLinkClick}>
                      Make Purchase
                    </a>
                    <a className="btn btn-light w-100 border mt-2" href="/">
                      Back to shop
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Cart;
