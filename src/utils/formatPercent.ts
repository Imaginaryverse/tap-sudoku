function formatPercent(value: number): string {
  return Intl.NumberFormat('en-GB', {
    style: 'percent',
    maximumFractionDigits: 2,
  }).format(value / 100);
}

export default formatPercent;
