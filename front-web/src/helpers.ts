import { SalesByPaymentMethod, SalesByStore } from './types';

export const buildSalesByStoreChart = (sales: SalesByStore[]) => {
  const labels = sales.map((sales) => sales.storeName);
  const series = sales.map((sales) => sales.sum);

  return {
    labels,
    series
  };
};

export const buildSalesByPaymentMethodChart = (sales: SalesByPaymentMethod[]) => {
  const labels = sales.map((sales) => sales.description);
  const series = sales.map((sales) => sales.sum);

  return {
    labels,
    series
  };
};
