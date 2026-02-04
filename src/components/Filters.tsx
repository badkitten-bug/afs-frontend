import { useState } from 'react';
import { Filter } from 'lucide-react';
import './Filters.css';

interface FiltersProps {
  sucursales: string[];
  formasPago: string[];
  years: string[];
  onFilterChange: (filters: any) => void;
}

const Filters = ({ sucursales, formasPago, years, onFilterChange }: FiltersProps) => {
  const [selectedSucursal, setSelectedSucursal] = useState('');
  const [selectedFormaPago, setSelectedFormaPago] = useState('');
  const [selectedPeriodo, setSelectedPeriodo] = useState('');
  const [selectedMes, setSelectedMes] = useState('');

  /* Generar días del 1 al 31 */
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const [selectedDia, setSelectedDia] = useState('');

  const handleChange = (type: string, value: string) => {
    let newFilters: any = {};
    const filtersState = {
        sucursal: type === 'sucursal' ? value : selectedSucursal,
        formaPago: type === 'formaPago' ? value : selectedFormaPago,
        periodo: type === 'periodo' ? value : selectedPeriodo,
        mes: type === 'mes' ? value : selectedMes,
        dia: type === 'dia' ? value : selectedDia,
    };
    
    switch (type) {
      case 'sucursal': setSelectedSucursal(value); break;
      case 'formaPago': setSelectedFormaPago(value); break;
      case 'periodo': setSelectedPeriodo(value); break;
      case 'mes': setSelectedMes(value); break;
      case 'dia': setSelectedDia(value); break;
    }
    
    newFilters = filtersState;
    console.log('Aplicando filtros:', newFilters);
    onFilterChange(newFilters);
  };

  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  return (
    <div className="filters-container">
      <div className="filters-header">
        <Filter size={20} />
        <h3>Filtros</h3>
      </div>
      
      <div className="filters-grid">
        <div className="filter-item">
          <label htmlFor="sucursal">SUCURSAL</label>
          <select 
            id="sucursal" 
            value={selectedSucursal} 
            onChange={(e) => handleChange('sucursal', e.target.value)}
          >
            <option value="">Todas</option>
            {sucursales.map((suc) => (
              <option key={suc} value={suc}>{suc}</option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="formaPago">FORMA DE PAGO</label>
          <select 
            id="formaPago" 
            value={selectedFormaPago} 
            onChange={(e) => handleChange('formaPago', e.target.value)}
          >
            <option value="">Todas</option>
            {formasPago.map((fp) => (
              <option key={fp} value={fp}>{fp}</option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="periodo">SELECCIONA UN PERIODO</label>
          <select 
            id="periodo" 
            value={selectedPeriodo} 
            onChange={(e) => handleChange('periodo', e.target.value)}
          >
            <option value="">Seleccionar</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="mes">MES</label>
          <select 
            id="mes" 
            value={selectedMes} 
            onChange={(e) => handleChange('mes', e.target.value)}
          >
            <option value="">Todos</option>
            {meses.map((mes, idx) => (
              <option key={mes} value={String(idx + 1).padStart(2, '0')}>{mes}</option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="dia">DÍA</label>
          <select 
            id="dia" 
            value={selectedDia} 
            onChange={(e) => handleChange('dia', e.target.value)}
          >
            <option value="">Todos</option>
            {days.map((d) => (
              <option key={d} value={String(d).padStart(2, '0')}>{d}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
