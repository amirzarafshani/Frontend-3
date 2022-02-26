import * as React from 'react';

import style from './Reports.scss';

interface IReportResultRowProps {
    title: string;
    total: number;
    handleSetExpanded: () => void;
}

export const ReportResultRow = (props: IReportResultRowProps): JSX.Element => (
    <div className={style.reportItemTitle} onClick={props.handleSetExpanded}>
        <div>{props.title}</div>
        <div>{`TOTAL ${new Intl.NumberFormat().format(props.total)} USD`}</div>
    </div>
);
