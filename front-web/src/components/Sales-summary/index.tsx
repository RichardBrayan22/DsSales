import { ReactComponent as AvatarIcon } from '../../assets/images/avatar-icon.svg';
import { ReactComponent as BarChartIcon } from '../../assets/images/bar-chart-icon.svg';
import { ReactComponent as DoneIcon } from '../../assets/images/done-icon.svg';
import { ReactComponent as SyncIcon } from '../../assets/images/sync-icon.svg';
import SalesSumaryCard from './sales-summary-card';

import { useEffect, useMemo, useState } from 'react';
import { FilterData, SalesSummaryData } from '../../types';
import { buildFilterParams, makeRequest } from '../../util/requests';
import './styles.css';

type Props = {
  filterData?: FilterData;
};

const initialSumarry = {
  avg: 0,
  count: 0,
  max: 0,
  min: 0
};

const SalesSummary = ({ filterData }: Props) => {
  const [summary, setSummary] = useState<SalesSummaryData>(initialSumarry);

  const params = useMemo(() => buildFilterParams(filterData), [filterData]);

  useEffect(() => {
    makeRequest.get<SalesSummaryData>('/sales/summary', { params }).then((response) => {
      setSummary(response.data);
    });
  }, [params]);
  return (
    <div className="sales-summary-container">
      <SalesSumaryCard icon={<DoneIcon />} value={summary?.avg?.toFixed(2)} label="Média" />
      <SalesSumaryCard icon={<BarChartIcon />} value={summary?.count} label="Quantidade" />
      <SalesSumaryCard icon={<SyncIcon />} value={summary?.min} label="Minima" />
      <SalesSumaryCard icon={<AvatarIcon />} value={summary.max} label="Maxima" />
    </div>
  );
};

export default SalesSummary;
