import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// Replace these imports with your actual paths
import { Cart, CartData } from 'images/types/cart.type';
import { 
  getCartData, 
  AddProductToCart, 
  RemoveProductFromCart, 
  UpdateProductQuantity, 
  ClearCart 
} from 'images/CartAction/CartAction';

interface CartState {
  cart: Cart | null;
  loading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  loading: false,
  error: null,
};

// Helper function to validate and clean cart data
const validateCartData = (cart: Cart): Cart => {
  if (!cart) return cart;
  
  return {
    ...cart,
    totalCartPrice: isNaN(cart.totalCartPrice) || cart.totalCartPrice === null 
      ? 0 
      : Number(cart.totalCartPrice),
    products: cart.products?.map(product => ({
      ...product,
      price: isNaN(product.price) || product.price === null 
        ? 0 
        : Number(product.price),
      count: isNaN(product.count) || product.count === null 
        ? 1 
        : Math.max(1, Number(product.count))
    })) || []
  };
};

// Async thunks
export const fetchCart = createAsyncThunk<Cart, void, { rejectValue: string }>(
  'cart/fetchCart',
  async (_, { rejectWithValue }) => {
    try {
      const data: CartData = await getCartData();
      return validateCartData(data.data);
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(err.message || 'Failed to fetch cart');
    }
  }
);

export const addToCart = createAsyncThunk<Cart, string, { rejectValue: string }>(
  'cart/addToCart',
  async (productId, { rejectWithValue }) => {
    try {
      const data = await AddProductToCart(productId);
      if (data.status === 'success') {
        return validateCartData(data.data);
      }
      return rejectWithValue(data.message || 'Failed to add product to cart');
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(err.message || 'Failed to add product to cart');
    }
  }
);

export const removeFromCart = createAsyncThunk<Cart, string, { rejectValue: string }>(
  'cart/removeFromCart',
  async (productId, { rejectWithValue }) => {
    try {
      const data = await RemoveProductFromCart(productId);
      if (data.status === 'success') {
        return validateCartData(data.data);
      }
      return rejectWithValue(data.message || 'Failed to remove product from cart');
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(err.message || 'Failed to remove product from cart');
    }
  }
);

export const updateQuantity = createAsyncThunk<Cart, { productId: string; quantity: number }, { rejectValue: string }>(
  'cart/updateQuantity',
  async ({ productId, quantity }, { rejectWithValue }) => {
    try {
      const validQuantity = Math.max(1, Number(quantity));
      if (isNaN(validQuantity)) {
        return rejectWithValue('Invalid quantity');
      }
      
      const data = await UpdateProductQuantity(productId, validQuantity);
      if (data.status === 'success') {
        return validateCartData(data.data);
      }
      return rejectWithValue(data.message || 'Failed to update quantity');
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(err.message || 'Failed to update quantity');
    }
  }
);

export const clearCart = createAsyncThunk<Cart | null, void, { rejectValue: string }>(
  'cart/clearCart',
  async (_, { rejectWithValue }) => {
    try {
      const data = await ClearCart();
      if (data.message === 'success') {
        return null;
      }
      return rejectWithValue(data.message || 'Failed to clear cart');
    } catch (error) {
      const err = error as Error;
      return rejectWithValue(err.message || 'Failed to clear cart');
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    validateCart: (state) => {
      if (state.cart) {
        state.cart = validateCartData(state.cart);
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Update Quantity
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQuantity.fulfilled, (state, action: PayloadAction<Cart>) => {
        state.loading = false;
        state.cart = action.payload;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      
      // Clear Cart
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.loading = false;
        state.cart = null;
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, validateCart } = cartSlice.actions;
export default cartSlice.reducer;
