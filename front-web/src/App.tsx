import { useEffect, useMemo, useState } from 'react';
import './App.css';
import Filter from './components/Filter';
import Header from './components/Header';
import PieChartCard from './components/Pie-chart-card';
import SalesDyDate from './components/Sales-by-date';
import SalesSummary from './components/Sales-summary';
import SalesTable from './components/Sales-table';
import { buildSalesByPaymentMethodChart, buildSalesByStoreChart } from './helpers';
import { FilterData, PieChartConfig, SalesByPaymentMethod, SalesByStore } from './types';
import { buildFilterParams, makeRequest } from './util/requests';

function App() {
  const [filterData, setFilterData] = useState<FilterData>();
  const [salesByStore, setSalesByStore] = useState<PieChartConfig>();
  const [salesByPaymentMethod, setSalesByPaymentMethod] = useState<PieChartConfig>();

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  const onFilterChange = (filter: FilterData) => {
    setFilterData(filter);
  };

  useEffect(() => {
    makeRequest.get<SalesByStore[]>('/sales/by-store', { params }).then((response) => {
      const newSalesByStore = buildSalesByStoreChart(response.data);
      setSalesByStore(newSalesByStore);
    });
  }, [params]);

  useEffect(() => {
    makeRequest
      .get<SalesByPaymentMethod[]>('/sales/by-payment-method', { params })
      .then((response) => {
        const newSalesByPaymentMethod = buildSalesByPaymentMethodChart(response.data);
        setSalesByPaymentMethod(newSalesByPaymentMethod);
      });
  }, [params]);

  return (
    <div className="App">
      <>
        <Header />
        <div className="app-container">
          <Filter onFilterChange={onFilterChange} />
          <SalesDyDate filterData={filterData} />
          <div className="sales-overview-container">
            <SalesSummary filterData={filterData} />
            <PieChartCard
              name="Lojas"
              labels={salesByStore?.labels}
              series={salesByStore?.series}
            />
            <PieChartCard
              name="Pagamento"
              labels={salesByPaymentMethod?.labels}
              series={salesByPaymentMethod?.series}
            />
          </div>
          <SalesTable filterData={filterData} />
        </div>
      </>
    </div>
  );
}

export default App;
