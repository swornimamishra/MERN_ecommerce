import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct"; // Assuming this is your related product component

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // To manage loading state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1000/api/product/${id}`
        );
        setProduct(response.data.product); // Assuming the product data is inside response.data.product
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchProduct();
  }, [id]);

  // Show loading message if data is still being fetched
  if (loading) {
    return <div>Loading product details...</div>;
  }

  // If product is null (e.g., error occurred), show an error message
  if (!product) {
    return <div>Error loading product details</div>;
  }

  return (
    <>
      <div
        className="container text-center my-5"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div className="left">
          {product.imgSrc ? (
            <img
              src={product.imgSrc}
              alt="Product Image"
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "10px",
                border: "2px solid yellow",
              }}
            />
          ) : (
            <p>No image available</p>
          )}
        </div>

        <div className="right">
          <h1>{product.title || "No title available"}</h1>
          <p>{product.description || "No description available"}</p>
          <h1>{product.price ? `${product.price} ₹` : "No price available"}</h1>
          {/* <h3>{product.category || "No category available"}</h3> */}
          

          <div className="my-5">
            <button
              className="btn btn-danger mx-3"
              style={{ fontWeight: "bold" }}
            >
              Buy Now
            </button>
            <button className="btn btn-warning" style={{ fontWeight: "bold" }}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      {/* Render RelatedProduct component if product.category exists */}
      {product.category && <RelatedProduct category={product.category} />}
    </>
  );
};

export default ProductDetail;
