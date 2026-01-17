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
      const [sucursalesRes, formasPagoRes, dashboardRes] = await Promise.all([
        ventasAPI.getSucursales(),
        ventasAPI.getFormasPago(),
        ventasAPI.getDashboard(),
      ]);

      setSucursales(sucursalesRes.data);
      setFormasPago(formasPagoRes.data);
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

  if (loading) {
    return (
      <div className="loading-container">
        <Loader2 className="spinner" size={48} />
        <p>Cargando dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div className="error-card">
          <h2>⚠️ Error de Conexión</h2>
          <p>{error}</p>
          <button className="btn btn-primary" onClick={loadInitialData}>
            Reintentar
          </button>
        </div>
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
          <Filters 
            sucursales={sucursales}
            formasPago={formasPago}
            onFilterChange={handleFilterChange}
          />

          {dashboardData && (
            <>
              <StatsCards 
                totalVentas={dashboardData.totalVentas}
                totalMes={dashboardData.totalMes}
                numeroVentas={dashboardData.ventasRecientes.length}
              />

              <Charts data={dashboardData.ventasPorSucursal} />

              <VentasTable ventas={dashboardData.ventasRecientes} />
            </>
          )}
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
