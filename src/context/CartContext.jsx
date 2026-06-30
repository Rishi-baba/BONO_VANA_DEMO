import React, { createContext, useContext, useState, useEffect } from 'react';
import { createCart, addCartLines, updateCartLines, removeCartLines, getCart } from '../services/shopify';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const [cartId, setCartId] = useState(() => localStorage.getItem('bv_cart_id'));
  const [cart, setCart] = useState(null);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      if (cartId) {
        setIsLoading(true);
        const liveCart = await getCart(cartId);
        if (liveCart) {
          setCart(liveCart);
        } else {
          // If cart is expired or invalid
          localStorage.removeItem('bv_cart_id');
          setCartId(null);
          setCart(null);
        }
        setIsLoading(false);
      } else {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, [cartId]);

  const mapToCartItems = (cartObj) => {
    if (!cartObj || !cartObj.lines) return [];
    return cartObj.lines.edges.map(({ node }) => ({
      lineId: node.id,
      quantity: node.quantity,
      variant: {
        id: node.merchandise.id,
        title: node.merchandise.title,
        price: node.merchandise.price,
        selectedOptions: node.merchandise.title !== 'Default Title' 
          ? node.merchandise.title.split(' / ').map((val, idx) => ({ name: idx === 0 ? 'Color' : 'Size', value: val })) 
          : []
      },
      product: {
        id: node.merchandise.product.id,
        title: node.merchandise.product.title,
        handle: node.merchandise.product.handle,
        featuredImage: node.merchandise.image || node.merchandise.product.featuredImage || { url: "/images/hero_resort_wear.jpg", altText: "" }
      }
    }));
  };

  const addItem = async (product, variant, quantity = 1) => {
    setIsLoading(true);
    setCartOpen(true);
    try {
      if (!cartId) {
        const newCart = await createCart(variant.id, quantity);
        if (newCart) {
          localStorage.setItem('bv_cart_id', newCart.id);
          setCartId(newCart.id);
          setCart(newCart);
        }
      } else {
        const updatedCart = await addCartLines(cartId, [{ merchandiseId: variant.id, quantity }]);
        setCart(updatedCart);
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to connect to cart. If you are seeing mock products, ensure your real products are published to the Headless sales channel in Shopify!");
    }
    setIsLoading(false);
  };

  const updateQuantity = async (variantId, quantity) => {
    if (!cart) return;
    
    // Find the lineId for this variant
    const lineItem = cart.lines.edges.find(({ node }) => node.merchandise.id === variantId);
    if (!lineItem) return;
    
    if (quantity <= 0) {
      await removeItem(variantId);
      return;
    }

    setIsLoading(true);
    try {
      const updatedCart = await updateCartLines(cartId, [{ id: lineItem.node.id, quantity }]);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
    setIsLoading(false);
  };

  const removeItem = async (variantId) => {
    if (!cart) return;
    const lineItem = cart.lines.edges.find(({ node }) => node.merchandise.id === variantId);
    if (!lineItem) return;

    setIsLoading(true);
    try {
      const updatedCart = await removeCartLines(cartId, [lineItem.node.id]);
      setCart(updatedCart);
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
    setIsLoading(false);
  };

  const clearCart = () => {
    localStorage.removeItem('bv_cart_id');
    setCartId(null);
    setCart(null);
  };

  const cartItems = mapToCartItems(cart);
  const cartCount = cart?.totalQuantity || 0;
  const cartSubtotal = cart?.cost?.subtotalAmount?.amount ? parseFloat(cart.cost.subtotalAmount.amount) : 0;
  const checkoutUrl = cart?.checkoutUrl || null;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setCartOpen,
        isLoading,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        cartCount,
        cartSubtotal,
        checkoutUrl
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
