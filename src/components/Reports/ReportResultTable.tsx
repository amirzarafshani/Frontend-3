import * as React from 'react';
import { IGroupedReportsResponse, IGroupedReportItemProps } from './reports.interface';
import { CurrencyFormatter } from './CurrencyFormatter';

import style from './Reports.scss';

interface IReportResultTableProps {
  item: IGroupedReportsResponse;
  expanded: string | null;
  showGateway?: boolean;
  visible?: boolean;
}

export const ReportResultTable = (props: IReportResultTableProps): JSX.Element => (
  <table
    className={style.reportTable}
    style={{ display: props.expanded === props.item.id || props.visible ? '' : 'none' }}
  >
    <thead>
      <tr>
        <th>Date</th>
        {props.showGateway && <th>Gateway</th>}
        <th>Transaction ID</th>
        <th>Amount</th>
      </tr>
    </thead>
    <tbody>
      {props.item.items.map((subItem: IGroupedReportItemProps, j: number) => (
        <tr key={`${props.item.id}-${j}`}>
          <td>{subItem.created}</td>
          {props.showGateway && <td>{subItem.gateway}</td>}
          <td>{subItem.paymentId}</td>
          <td>
            <CurrencyFormatter prefix="" total={subItem.amount} />
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
