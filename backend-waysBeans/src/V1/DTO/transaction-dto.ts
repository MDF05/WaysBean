export interface TransactionDTO {
  profileId: number;
  productId: number;
  countItem?: number;
  fraud_status: string;
  gross_amount: string;
  order_id: string;
  payment_type: string;
  status_code: string;
  status_message: string;
  transaction_id: string;
  transaction_status: string;
  transaction_time: string;
  createdAt?: string;
  updatedAt?: string;
  address: string;
}
