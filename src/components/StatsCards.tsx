import { Store, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import './StatsCards.css';

interface StatsCardsProps {
  totalVentas: number;
  totalMes: number;
  numeroVentas: number;
}

const StatsCards = ({ totalVentas, totalMes, numeroVentas }: StatsCardsProps) => {
  const formatCurrency = (value: number) => {
    return `S/ ${value.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const stats = [
    {
      icon: <DollarSign size={24} />,
      title: 'Ventas Totales',
      value: formatCurrency(totalVentas),
      color: 'primary',
      trend: '+12.5%'
    },
    {
      icon: <Calendar size={24} />,
      title: 'Ventas del Mes',
      value: formatCurrency(totalMes),
      color: 'success',
      trend: '+8.3%'
    },
    {
      icon: <TrendingUp size={24} />,
      title: 'N° Transacciones',
      value: numeroVentas.toLocaleString('es-PE'),
      color: 'warning',
      trend: '+15.2%'
    },
    {
      icon: <Store size={24} />,
      title: 'Sucursales Activas',
      value: '5',
      color: 'secondary',
      trend: '100%'
    }
  ];

  return (
    <div className="stats-grid">
      {stats.map((stat, index) => (
        <div key={index} className={`stat-card stat-${stat.color}`}>
          <div className="stat-icon">
            {stat.icon}
          </div>
          <div className="stat-content">
            <p className="stat-title">{stat.title}</p>
            <h3 className="stat-value">{stat.value}</h3>
            <span className="stat-trend">{stat.trend} vs mes anterior</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
