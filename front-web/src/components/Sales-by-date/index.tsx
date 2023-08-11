import './styles.css';
import { buildChartSeries, chartOptions, sumSalesByDate } from './herlpers';
import ReactApexChart from 'react-apexcharts';
import { useEffect, useMemo, useState } from 'react';
import { buildFilterParams, makeRequest } from '../../util/requests';
import { ChartSeriesData, FilterData, SalesByDate } from '../../types';
import { formatDate, formatPrice } from '../../util/formatters';

type Props = {
  filterData?: FilterData;
};

const SalesDyDate = ({ filterData }: Props) => {
  const [chartSeries, setchartSeries] = useState<ChartSeriesData[]>([]);
  const [totalSum, setTotalSum] = useState(0);

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest.get<SalesByDate[]>('/sales/by-date', { params }).then((response) => {
      const newChartSeries = buildChartSeries(response.data);
      setchartSeries(newChartSeries);
      const newTotalSum = sumSalesByDate(response.data);
      setTotalSum(newTotalSum);
    });
  }, [params]);

  return (
    <div className="sales-by-date-container base-card">
      <div>
        <h4 className="sales-by-date-title">Evolução de vendas</h4>
        {filterData?.dates && (
          <span className="sales-by-date-period">
            {formatDate(filterData?.dates?.[0])} até {formatDate(filterData?.dates?.[1])}
          </span>
        )}
      </div>
      <div className="sales-by-date-data">
        <div className="sales-by-date-quantity-container">
          <h2 className="sales-by-date-quantity">{formatPrice(totalSum)}</h2>
          <span className="sales-by-date-quantity-label">Vendas por periodo</span>
          <span className="sales-by-date-quantity-description">
            O grafico mostra as vendas em todas as lojas
          </span>
        </div>
        <div className="sales-by-date-chart">
          <ReactApexChart
            options={chartOptions}
            series={[{ name: 'Vendas', data: chartSeries }]}
            type="bar"
            height={240}
            width="100%"
          />
        </div>
      </div>
    </div>
  );
};

export default SalesDyDate;
