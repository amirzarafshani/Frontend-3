import { NumberFormat } from "./CurrencyFormatter"

test('formatting currency', async () => {
  const result = NumberFormat(10000.55);
  expect(result).toEqual('10,000.55');
});
