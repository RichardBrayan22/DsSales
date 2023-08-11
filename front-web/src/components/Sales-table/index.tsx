import { useEffect, useMemo, useState } from 'react';
import './styles.css';
import { buildFilterParams, makeRequest } from '../../util/requests';
import { FilterData, Gender, Sales, SalesResponse } from '../../types';
import { formatDate, formatPrice } from '../../util/formatters';

type Props = {
  filterData?: FilterData;
};

const extraParams = {
  page: 0,
  size: 12,
  sort: 'date,desc'
};

const SalesTable = ({ filterData }: Props) => {
  const [sales, setSales] = useState<Sales[]>([]);

  const params = useMemo(() => buildFilterParams(filterData, extraParams), [filterData]);

  useEffect(() => {
    makeRequest.get<SalesResponse>('/sales', { params }).then((response) => {
      setSales(response.data.content);
    });
  }, [params]);

  const formatGender = (gender: Gender) => {
    const textByGender = {
      MALE: 'Masculino',
      FEMALE: 'Feminino',
      OTHER: 'Outros'
    };

    return textByGender[gender];
  };

  return (
    <div className="sales-table-container base-card ">
      <h3 className="sales-table-title">Vendas Recentes</h3>
      <table className="sales-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>Data</th>
            <th>Gênero</th>
            <th>Categoria</th>
            <th>Loja</th>
            <th>Forma de pagemnto</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale.id}>
              <td>#{sale.id}</td>
              <td>{formatDate(sale.date)}</td>
              <td>{formatGender(sale.gender)}</td>
              <td>{sale.categoryName}</td>
              <td>{sale.storeName}</td>
              <td>{sale.paymentMethod}</td>
              <td>{formatPrice(sale.total)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesTable;
