import * as React from 'react';

interface ICurrencyFormatterProps {
  prefix: string | null;
  total: number;
}

export const CurrencyFormatter = (props: ICurrencyFormatterProps): JSX.Element =>
  <React.Fragment>{`${props.prefix} ${NumberFormat(props.total)} USD`}</React.Fragment>

export function NumberFormat(total: number): string {
  return new Intl.NumberFormat().format(total);
}
