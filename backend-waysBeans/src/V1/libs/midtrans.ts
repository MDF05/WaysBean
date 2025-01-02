const midtransClient = require("midtrans-client");
import dotenv = require("dotenv");
import { paymentDTO } from "../DTO/payment-DTO";
dotenv.config();

class Midtrans {
  async paymentToken({ userDetail, totalPrice, products }: paymentDTO) {
    let snap = new midtransClient.Snap({
      // Set to true if you want Production Environment (accept real transaction).
      isProduction: false,
      serverKey: process.env.MIDTRANS_SERVER_KEY,
    });

    let parameter = {
      transaction_details: {
        order_id: `${userDetail.id}-${new Date().getTime()}`,
        gross_amount: totalPrice,
      },
      credit_card: {
        secure: true,
      },
      customer_details: {
        first_name: userDetail.name,
        last_name: "",
        email: userDetail.email,
        phone: userDetail.phone,
        billing_address: {
          first_name: userDetail.name,
          last_name: "",
          phone: userDetail.phone,
          address: userDetail.address,
          city: "",
          postal_code: "",
          country_code: "IDN",
        },
      },
      item_details: products.map((product) => {
        return {
          id: product.id,
          price: product.price,
          quantity: product.countItem,
          name: product.name,
          brand: "waysbeens",
          merchant_name: "waysbeens",
          tenor: "1",
          url: "https://waysbeens.id/",
        };
      }),
    };

    return (await snap.createTransaction(parameter)).token;
  }
}

export default new Midtrans();
