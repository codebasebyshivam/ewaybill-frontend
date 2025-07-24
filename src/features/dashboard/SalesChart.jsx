import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const data = [
  { name: 'Profit', value: 99.9, fill: '#00c49f' },
  { name: 'Insight', value: 99.9, fill: '#0088fe' },
  { name: 'Sale', value: 99.9, fill: '#8884d8' },
  { name: 'Target', value: 95.0, fill: '#a3bffa' },
];

export default function SalesChart() {
  return (
    <div className="rounded-2xl  p-4 border w-full max-w-md bg-white">
      <div className="text-sm text-gray-500 mb-2">Sales Report Area</div>
      <div className="text-xs text-gray-400 mb-4">+4.2% vs last year</div>

      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data}>
          <defs>
            <linearGradient id="gradient-0" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" stopOpacity={1} />
              <stop offset="100%" stopColor="#0d9488" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="gradient-1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" stopOpacity={1} />
              <stop offset="100%" stopColor="#0d9488" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="gradient-2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" stopOpacity={1} />
              <stop offset="100%" stopColor="#0d9488" stopOpacity={0.3} />
            </linearGradient>
            <linearGradient id="gradient-3" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0d9488" stopOpacity={1} />
              <stop offset="100%" stopColor="#0d9488" stopOpacity={0.3} />
            </linearGradient>
          </defs>

          <XAxis dataKey="name" axisLine={false} tickLine={false} />
          <YAxis hide domain={[0, 100]} />
          <Tooltip formatter={(value) => `${value}%`} />
          <Bar dataKey="value" radius={[10, 10, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={`url(#gradient-${index})`} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 text-right text-sm text-gray-600 font-medium">
        $2780 <span className="text-xs text-gray-400">Per unit sales</span>
      </div>
    </div>
  );
}
