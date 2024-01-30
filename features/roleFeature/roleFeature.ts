import { createSlice, PayloadAction, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import { Cart, SimpleProduct } from "@/type/type";
// Define a type for the slice state
interface UserInfo {
  role: number;
  name: string;
  phone: string;
  isLogIn: boolean;
}

interface RoleState {
  userInfo: UserInfo;
  cart: { products: Cart[]; stale: boolean };
  wishlist: {
    products: SimpleProduct[];
  };
}
// const roleAdapter = createEntityAdapter()
// Define the initial state using that type
const initialState: RoleState = {
  userInfo: {
    role: 0,
    name: "",
    phone: "",
    isLogIn: false,
  },

  cart: {
    products: [],
    stale: false,
  },

  wishlist: {
    products: [],
  },
};

export const login = createAsyncThunk('role/login', async (userInfo: { phonenumber: string, password: string }) => {
  const { phonenumber, password } = userInfo
  const res = await fetch("/api/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phoneNumber: phonenumber,
      password: password,
    }),
  });
  const data = await res.json()
  window.localStorage.setItem("token", data.token);
  window.localStorage.setItem("username", data.username)
  return {
    username: data.username,
    phoneNumber: data.phoneNumber,
    cart: data.cart
  }
})


export const RoleSlice = createSlice({
  name: "role",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
    },
    setIsLogIn: (state, action: PayloadAction<boolean>) => {
      state.userInfo.isLogIn = action.payload;
    },
    addProduct: (state, action: PayloadAction<Cart>) => {
      let exist = false;
      state.cart.products.forEach((item, index) => {
        if (item.productId === action.payload.productId) {
          state.cart.products[index].count += 1;
          state.cart.products[index].isUpload = action.payload.isUpload;
          exist = true;
        }
      });

      if (!exist) {
        state.cart.products.push(action.payload);
      }
    },
    removeProduct: (state, action: PayloadAction<Cart>) => {
      state.cart.products = state.cart.products.filter(
        (item) => item.productId !== action.payload.productId
      );
    },
    setCartStale: (state, action: PayloadAction<boolean>) => {
      state.cart.stale = action.payload;
    },
    setProduct: (state, action: PayloadAction<Cart>) => {
      state.cart.products = state.cart.products.map((item) => {
        if (item.productId === action.payload.productId) {
          return { ...item, count: action.payload.count };
        }
        return item;
      });
    },
    setProducts: (state, action: PayloadAction<Cart[]>) => {
      state.cart.products = action.payload;
    },
    clearCart: (state) => {
      state.cart.products = [];
    },
    addWishlist: (state, action: PayloadAction<SimpleProduct>) => {
      let flag = true;
      state.wishlist.products.forEach((item) => {
        if (item.name === action.payload.name) {
          flag = false;
        }
      });

      if (flag) {
        state.wishlist.products.push(action.payload);
      }
    },
    clearAll: (state) => {
      state.userInfo = { role: 0, name: "", phone: "", isLogIn: false };
      state.cart.products = [];
      state.wishlist.products = [];
      window.localStorage.setItem("token", "");
      window.localStorage.setItem("username", "");
    },
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      const { username, phoneNumber, cart } = action.payload
      state.userInfo = {
        role: 0,
        name: username,
        phone: phoneNumber,
        isLogIn: true
      }

      state.cart.products = [...state.cart.products, ...cart.cartList]
    })
  }
});

export const {
  setInfo,
  setIsLogIn,
  addProduct,
  removeProduct,
  setProduct,
  addWishlist,
  clearCart,
  clearAll,
  setCartStale,
  setProducts,
} = RoleSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectUserInfo = (state: RootState) => state.role.userInfo;
export const selectWishList = (state: RootState) => state.role.wishlist;
export const selectCart = (state: RootState) => state.role.cart;
export default RoleSlice.reducer;
