import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface PortfolioChartProps {
  data: { type: string; amount: number }[];
}

const PortfolioChart = ({ data }: PortfolioChartProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-4">Portfolio by Loan Type</h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data || []}>
          <XAxis dataKey="type" />
          <YAxis />
          <Tooltip formatter={(value) => `${value}`} />
          <Bar dataKey="amount" fill="#2563eb" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PortfolioChart;
