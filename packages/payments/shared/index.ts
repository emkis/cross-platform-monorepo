export type Payment = {
  id: string;
  amount: {
    value: number;
    currency: string;
  };
};
