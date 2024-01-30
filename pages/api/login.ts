import type { NextApiRequest, NextApiResponse } from "next";
import {Cart} from '@/type/type';
type Data = {
  username: string;
  phoneNumber:string;
  token: string;
  cart: {
    cartList: Cart[]
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({
    username: "ck",
    phoneNumber: "123456789",
    token: "1234567890",
    cart:{
      cartList:[{
        productId: "M21769",
        image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=720&q=80",
        count: 3,
        name: "COUSSIN",
        price: 95,
        color: "red",
        isUpload: true,
      }]
    }
  })
}
