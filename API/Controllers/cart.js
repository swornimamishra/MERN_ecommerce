import { Cart } from "../Models/Cart.js";

// add to cart
export const addToCart = async (req, res) => {
  const { productId, title, price, qty, imgSrc } = req.body;

  // Ensure productId exists
  if (!productId) {
    return res.status(400).json({ message: "Product ID is required" });
  }

  // Ensure qty and price are numbers
  const quantity = Number(qty);
  const itemPrice = Number(price);

  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    cart.items[itemIndex].qty += quantity; // Proper number addition
    cart.items[itemIndex].price += itemPrice * quantity; // Update price based on quantity
  } else {
    cart.items.push({
      productId,
      title,
      price: itemPrice,
      qty: quantity,
      imgSrc,
    });
  }

  await cart.save();
  res.json({ message: "Item Added To Cart", cart });
};

// /get User Cart
export const userCart = async(req,res)=>{
    const userId = req.user; 

    let cart = await Cart.findOne({userId});
    if(!cart) return res.json({message:"Cart not found"})

        res.json({message:"user cart",cart})
}

// remove product from cart
export const removeProductFromCart = async (req, res) => {
    const productId = req.params.productId;
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart) return res.json({ message: "Cart not found" });

  cart.items = cart.items.filter((item)=>item.productId.toString() !== productId)
  await cart.save();
  res.json({message:"product remove from cart"});

  
};

// crear cart
export const clearCart = async (req, res) => {
    
  
  const userId = req.user;

  let cart = await Cart.findOne({ userId });
  if (!cart){
    cart = new Cart ({items:[]})
  }else{
    cart.items =[];
  }

  await cart.save();

  res.json({ message: " cart cleard" });
};

// Decrease qty in cart
export const decreaseProductQty = async (req, res) => {
  const { productId, qty } = req.body;

  // Ensure qty is a number
  const quantity = Number(qty);

  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    return res.json({ message: "Cart not found" });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemIndex > -1) {
    const item = cart.items[itemIndex];

    // Check if quantity is valid for decrease
    if (item.qty > quantity) {
      const pricePerUnit = item.price / item.qty;

      item.qty -= quantity;
      item.price -= pricePerUnit * quantity;
    } else {
      // Remove the item from the cart if the quantity goes to zero or below
      cart.items.splice(itemIndex, 1);
    }

    await cart.save();
    res.json({ message: "Item quantity decreased", cart });
  } else {
    return res.json({ message: "Invalid product ID" });
  }
  console.log("User ID in userOrder:", req.user._id);
  console.log("Orders found:", orders);

};
