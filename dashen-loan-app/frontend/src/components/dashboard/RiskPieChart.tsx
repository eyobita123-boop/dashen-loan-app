import { ResponsiveContainer, PieChart, Pie, Tooltip, Cell } from 'recharts';

interface RiskPieChartProps {
  data: { grade: string; count: number }[];
}

const COLORS = ['#22c55e', '#eab308', '#f97316', '#ef4444', '#3b82f6', '#8b5cf6'];

const RiskPieChart = ({ data }: RiskPieChartProps) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      <h3 className="text-lg font-semibold mb-4">Risk Distribution</h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie data={data || []} dataKey="count" nameKey="grade" cx="50%" cy="50%" outerRadius={100} label>
            {(data || []).map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RiskPieChart;
