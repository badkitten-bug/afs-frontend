import { useEffect, useState } from 'react';
import { ventasAPI } from './services/api';
import Filters from './components/Filters';
import StatsCards from './components/StatsCards';
import Charts from './components/Charts';
import VentasTable from './components/VentasTable';
import { Store, Loader2 } from 'lucide-react';
import './App.css';

interface DashboardStatsDto {
  ventasPorSucursal: Array<{
    sucursal: string;
    total: number;
    porcentaje: number;
  }>;
  ventasRecientes: Array<{
    sucursal: string;
    docCliente: string;
    cliente: string;
    codReferencia: string;
    formaPago: string;
    fechaHora: Date;
    montos: number;
  }>;
  totalVentas: number;
  totalMes: number;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<DashboardStatsDto | null>(null);
  const [sucursales, setSucursales] = useState<string[]>([]);
  const [formasPago, setFormasPago] = useState<string[]>([]);
  const [years, setYears] = useState<string[]>([]);
  const [filtros, setFiltros] = useState<any>({});

  useEffect(() => {
    loadInitialData();
  }, []);

  useEffect(() => {
    if (sucursales.length > 0) {
      loadDashboardData(filtros);
    }
  }, [filtros, sucursales.length]);

  const loadInitialData = async () => {
    try {
      setLoading(true);
      const [sucursalesRes, formasPagoRes, yearsRes, dashboardRes] = await Promise.all([
        ventasAPI.getSucursales(),
        ventasAPI.getFormasPago(),
        ventasAPI.getYears(),
        ventasAPI.getDashboard(),
      ]);

      setSucursales(sucursalesRes.data);
      setFormasPago(formasPagoRes.data);
      setYears(yearsRes.data);
      setDashboardData(dashboardRes.data);
      setError(null);
    } catch (err: any) {
      console.error('Error loading data:', err);
      setError(err.response?.data?.message || 'Error al cargar los datos. Verifica que el backend esté corriendo.');
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardData = async (newFiltros: any) => {
    try {
      const dashboardRes = await ventasAPI.getDashboard(newFiltros);
      setDashboardData(dashboardRes.data);
      setError(null);
    } catch (err: any) {
      console.error('Error loading dashboard:', err);
      setError(err.response?.data?.message || 'Error al aplicar filtros');
    }
  };

  const handleFilterChange = (newFiltros: any) => {
    setFiltros(newFiltros);
  };

  // Solo mostrar spinner en primera carga
  if (loading && !dashboardData) {
    return (
      <div className="loading-container">
        <Loader2 className="spinner" size={48} />
        <p>Cargando dashboard...</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="container">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-icon">
                <Store size={32} />
              </div>
              <div>
                <h1 className="logo-title">
                  <span className="gradient-text">Asian Fan Store</span>
                </h1>
                <p className="logo-subtitle">Dashboard de Ventas AFS</p>
              </div>
            </div>
            <div className="header-actions">
              <span className="connection-status">
                <span className="status-dot"></span>
                Conectado
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="container">
          {/* Banner de error no bloqueante */}
          {error && (
            <div style={{
              background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8787 100%)',
              color: 'white',
              padding: '1rem 1.5rem',
              borderRadius: '12px',
              marginBottom: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              boxShadow: '0 4px 12px rgba(255, 107, 107, 0.2)'
            }}>
              <div>
                <strong>⚠️ Error de conexión</strong>
                <p style={{ margin: '0.25rem 0 0 0', opacity: 0.9, fontSize: '0.9rem' }}>
                  {error}
                </p>
              </div>
              <button 
                onClick={loadInitialData}
                style={{
                  background: 'white',
                  color: '#ff6b6b',
                  border: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Reintentar
              </button>
            </div>
          )}

          <Filters 
            sucursales={sucursales}
            formasPago={formasPago}
            years={years}
            onFilterChange={handleFilterChange}
          />

          {/* Mostrar datos o placeholders */}
          <StatsCards 
            totalVentas={dashboardData?.totalVentas || 0}
            totalMes={dashboardData?.totalMes || 0}
            numeroVentas={dashboardData?.ventasRecientes.length || 0}
          />

          <Charts data={dashboardData?.ventasPorSucursal || []} />

          <VentasTable ventas={dashboardData?.ventasRecientes || []} />
        </div>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>&copy; 2025 Asian Fan Store. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
