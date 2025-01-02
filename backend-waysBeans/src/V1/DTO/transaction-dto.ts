export interface TransactionDTO {
  transactionId: string;
  profileId: number;
  productId: number;
  countItem?: number;
  address: string;
  paymentType: string;
}
