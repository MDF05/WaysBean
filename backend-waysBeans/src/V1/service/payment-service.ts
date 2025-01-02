import midtrans from "../libs/midtrans";
import { paymentDTO } from "./../DTO/payment-DTO";

class paymentService {
  async pay(paymentDTO: paymentDTO) {
    const tokenPayment: string = await midtrans.paymentToken(paymentDTO);
    return tokenPayment;
  }
}

export default new paymentService();
