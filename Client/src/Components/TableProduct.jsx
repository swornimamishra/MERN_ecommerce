import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../context/AppContext';



export const TableProduct = ({cart}) => {
      const {  decreaseQty, addToCart, removeFromCart, clearCart } =
        useContext(AppContext); // Add addToCart here
      const [qty, setQty] = useState(0);
      const [price, setPrice] = useState(0);
       useEffect(() => {
         let qty = 0;
         let price = 0;
         if (cart?.items) {
           for (let i = 0; i < cart.items?.length; i++) {
             qty += cart.items[i].qty;
             price += cart.items[i].price * cart.items[i].qty; // Multiply price by quantity
           }
         }
         setPrice(price);
         setQty(qty);
       }, [cart]);

      
  return (
    <>
      <table className=" table table-bordered border-primary bg-dark  text-center">
        <thead>
          <tr>
            <th scope="col" className="bg-dark text-light">
              Product Img
            </th>
            <th scope="col" className="bg-dark text-light">
              Title
            </th>
            <th scope="col" className="bg-dark text-light">
              price
            </th>
            <th scope="col" className="bg-dark text-light">
              qty
            </th>
            <th scope="col" className="bg-dark text-light">
              QTY++
            </th>
            <th scope="col" className="bg-dark text-light">
              QTY--
            </th>
            <th scope="col" className="bg-dark text-light">
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {cart?.items?.map((product) => (
            <tr key={product._id}>
              <th scope="row" className="bg-dark text-light">
                <img
                  src={product.imgSrc}
                  style={{ width: "50px", height: "50px" }}
                />
              </th>
              <td className="bg-dark text-light">{product.title}</td>
              <td className="bg-dark text-light">{product.price}</td>
              <td className="bg-dark text-light">{product.qty}</td>
              <td className="bg-dark text-light">
                <span
                  className="material-symbols-outlined"
                  onClick={() =>
                    addToCart(
                      product?.productId,
                      product.title,
                      product.price / product.qty, // Adjust price for single item
                      1, // Increment by
                      product.imgSrc
                    )
                  }
                >
                  (++)
                </span>
              </td>
              <td className="bg-dark text-light">
                <span
                  className="material-symbols-outlined"
                  onClick={() => decreaseQty(product?.productId, 1)}
                >
                  (--)
                </span>
              </td>
              <td className="bg-dark text-light">
                <span
                  className="material-symbols-outlined"
                  onClick={() => {
                    if (confirm("are you super,want remove from cart")) {
                      removeFromCart(product?.productId);
                    }
                  }}
                >
                  (R)
                </span>
              </td>
            </tr>
          ))}

          <tr>
            <th scope="row" className="bg-dark text-light"></th>
            <td className="bg-dark text-light">
              <button
                className="btn btn-primary"
                style={{ fontWeight: "bold" }}
              >
                Total
              </button>
            </td>
            <td className="bg-dark text-light">
              <button
                className="btn btn-warning"
                style={{ fontWeight: "bold" }}
              >
                {price}
              </button>
            </td>
            <td className="bg-dark text-light">
              <button className="btn btn-info" style={{ fontWeight: "bold" }}>
                {qty}
              </button>
            </td>
            <td className="bg-dark text-light"></td>
            <td className="bg-dark text-light"></td>
            <td className="bg-dark text-light"></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}
