import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
import { Link, useParams } from "react-router-dom";

const SearchProduct = () => {
  const { products } = useContext(AppContext);
  const [searchProduct, setSearchProduct] = useState([]);

  // Retrieve the search term from the URL parameters
  const { term } = useParams();

 

  useEffect(() => {
    // Filter products based on the search term
    if (term) {
      setSearchProduct(
        products.filter((data) =>
          data?.title?.toLowerCase().includes(term.toLowerCase())
        )
      );
    } else {
      setSearchProduct([]); // Reset search results if no term is provided
    }
  }, [term, products]);

  return (
    <>
      <div className="container text-center">
        
        <div className="container d-flex justify-content-center align-items-center">
          <div className="row container d-flex justify-content-center align-items-center my-5">
            {searchProduct.length > 0 ? (
              searchProduct.map((product) => (
                <div
                  key={product._id}
                  className="my-3 col-md-4 d-flex justify-content-center align-items-center"
                >
                  <div
                    className="card bg-dark text-light text-center"
                    style={{ width: "18rem" }}
                  >
                    <Link
                      to={`/product/${product._id}`}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <img
                        src={product.imgSrc}
                        className="card-img-top"
                        alt={product.title}
                        style={{
                          width: "200px",
                          height: "200px",
                          borderRadius: "10px",
                          border: "2px solid yellow",
                        }}
                      />
                    </Link>

                    <div className="card-body">
                      <h5 className="card-title">{product.title}</h5>
                      <div className="my-3">
                        <button className="btn btn-primary mx-3">
                          {product.price} ₹
                        </button>
                        <button className="btn btn-warning">Add To Cart</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div>No products found for "{term}"</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchProduct;
