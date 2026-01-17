import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import './Charts.css';

interface VentaPorSucursal {
  sucursal: string;
  total: number;
  porcentaje: number;
  [key: string]: string | number; // Index signature para compatibilidad con Recharts
}


interface ChartsProps {
  data: VentaPorSucursal[];
}

const COLORS = [
  'hsl(210, 100%, 56%)',   // Blue
  'hsl(38, 92%, 50%)',     // Orange
  'hsl(280, 70%, 60%)',    // Purple
  'hsl(142, 71%, 45%)',    // Green
  'hsl(0, 72%, 51%)',      // Red
];

const Charts = ({ data }: ChartsProps) => {
  const formatCurrency = (value: number) => {
    return `S/ ${value.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="charts-container">
      <div className="chart-card">
        <h3 className="chart-title">Ventas por Sucursal</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={(entry: any) => `${entry.porcentaje.toFixed(1)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="total"
              >
                {data.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: any) => formatCurrency(value)}
                contentStyle={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius-sm)',
                  boxShadow: 'var(--shadow-md)',
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value: string) => {
                  const item = data.find(d => d.sucursal === value);
                  return `${value} - ${formatPercent(item?.porcentaje || 0)}`;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-card">
        <h3 className="chart-title">Ventas por Sucursal (Montos)</h3>
        <div className="chart-wrapper">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" />
              <XAxis 
                type="category" 
                dataKey="sucursal" 
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                angle={-15}
                textAnchor="end"
                height={80}
              />
              <YAxis 
                type="number"
                tick={{ fill: 'var(--text-secondary)', fontSize: 12 }}
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              />
              <Tooltip 
                formatter={(value: any) => formatCurrency(value)}
                contentStyle={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--border-radius-sm)',
                  boxShadow: 'var(--shadow-md)',
                }}
              />
              <Bar dataKey="total" fill="hsl(142, 71%, 45%)" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
