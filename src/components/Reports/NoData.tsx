import * as React from 'react';

import style from './Reports.scss';
const NoDataImage = require('@assets/noData.svg').default;

export const NoData = (): JSX.Element => (
  <div className={style.noData}>
    <div className={style.text1}>No reports</div>
    <p className={style.text2}>Currently you have no data for the reports to be generated.
      Once you start generating traffic through the Balance application
      the reports will be shown.</p>
    <img src={NoDataImage} className={style.noDataImg} />
  </div>
);