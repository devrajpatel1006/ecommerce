import { React, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../Cart/actions/cartAction";
import productData from "./Products.fixture";

const Products = () => {
  const searchItemState = useSelector((state) => state.search);

  const dispatch = useDispatch();

  const [product, setProduct] = useState(productData);

  useEffect(() => {
    if (searchItemState?.length > 0) {
      setProduct(
        productData.filter((item) => item?.name?.includes(searchItemState))
      );
     }
  }, [searchItemState, product]);

  return (
    <section>
      <div className="bg-primary">
        <div className="container py-4">
          <nav className="d-flex">
            <h6 className="mb-0">
              <a href="" className="text-white-50">
                Home
              </a>
              <span className="text-white-50 mx-2"> &gt; </span>
              <a href="/" className="text-white">
                <u>Products</u>
              </a>
            </h6>
          </nav>
        </div>
      </div>
      <div className="container my-5">
        <header className="mb-4">
          <h3>Items</h3>
        </header>
        <div className="row">
          {product?.map((product, index) => (
            <div
              className="col-lg-3 col-md-6 col-sm-6"
              key={product.id + index}
            >
              <div className="card px-4 border shadow-0 mb-4 mb-lg-0">
                <div className="mask px-2" style={{ height: "50px" }}>
                  <div className="d-flex justify-content-between">
                    {product.isNew && (
                      <h6>
                        <span className="badge bg-danger pt-1 mt-3 ms-2">
                          New
                        </span>
                      </h6>
                    )}
                  </div>
                </div>
                <a>
                  <img
                    src={product.imageUrl}
                    className="card-img-top rounded-2 width300"
                    alt={product.name}
                  />
                </a>
                <div className="card-body d-flex flex-column pt-3 border-top">
                  <a className="nav-link">{product.name}</a>
                  <div className="price-wrap mb-2">
                    <strong
                      className={`text-${
                        product.discountPrice ? "danger" : "primary"
                      }`}
                    >
                      ${product.price}
                    </strong>
                    {product.discountPrice && (
                      <del className="text-primary">
                        ${product.discountPrice}
                      </del>
                    )}
                  </div>
                  <div className="card-footer d-flex align-items-end pt-3 px-0 pb-0 mt-auto">
                    <a
                      onClick={() => {
                        dispatch(addItem(product));
                      }}
                      className="btn btn-outline-primary w-100"
                    >
                      Add to cart
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {product?.length === 0 && (
            <div
              className="col-lg-12 col-md-12 col-sm-12"
              style={{
                textAlign: "center",
                fontSize: "20px",
                fontWeight: "bold",
                marginTop: "20px",
              }}
            >
              No Product Found
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Products;
