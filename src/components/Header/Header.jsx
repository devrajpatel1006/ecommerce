import { React } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchItem } from "../Cart/actions/cartAction";

const Header = () => {
  const state = useSelector((state) => state);
  const searchItemState = useSelector((state) => state.search);
  const dispatch = useDispatch();

  return (
    <header>
      <div className="p-3 text-center bg-white border-bottom">
        <div className="container">
          <div className="row gy-3">
            <div className="col-lg-2 col-sm-4 col-4">
              <Link to="/">
                <a className="float-start">
                  <img
                    src="https://www.logolynx.com/images/logolynx/d3/d391ba330dfab3610928b6a9295d77de.jpeg"
                    height="40"
                    alt=" Logo"
                  />
                </a>
              </Link>
            </div>
            <div
              id="cartBtnId"
              className="order-lg-last col-lg-5 col-sm-8 col-8"
            >
              <div className="d-flex float-end">
                <Link to="/cart">
                  <a
                    className="border rounded py-1 px-3 nav-link d-flex align-items-center"
                    target="_blank"
                  >
                    <i className="fas fa-shopping-cart m-1 me-md-2"></i>
                    <p className="d-none d-md-block mb-0">
                      My cart{" "}
                      {state.numOfItems > 0 ? "(" + state.numOfItems + ")" : ""}
                    </p>
                  </a>
                </Link>
              </div>
            </div>
            <div className="col-lg-5 col-md-12 col-12">
              <div id="searchId" className="input-group float-center">
                <div className="form-outline">
                  <input
                    type="search"
                    id="form1"
                    className="form-control"
                    value={searchItemState}
                    onChange={(e) => {
                      dispatch(searchItem(e?.target?.value));
                    }}
                  />
                  <label className="form-label" htmlFor="form1">
                    Search
                  </label>
                </div>
                <button type="button" className="btn btn-primary shadow-0">
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
