export const handlePaymentSuccess = (data: any) => {
  console.log("💰 Payment success event received:");
  console.log(`Transaction ID: ${data.transactionId}`);
  console.log(`Amount: ${data.amount}`);
};
