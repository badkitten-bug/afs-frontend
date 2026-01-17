import { useState } from 'react';
import { Filter } from 'lucide-react';
import './Filters.css';

interface FiltersProps {
  sucursales: string[];
  formasPago: string[];
  onFilterChange: (filters: any) => void;
}

const Filters = ({ sucursales, formasPago, onFilterChange }: FiltersProps) => {
  const [selectedSucursal, setSelectedSucursal] = useState('');
  const [selectedFormaPago, setSelectedFormaPago] = useState('');
  const [selectedPeriodo, setSelectedPeriodo] = useState('');
  const [selectedMes, setSelectedMes] = useState('');

  const handleChange = (type: string, value: string) => {
    let newFilters: any = {};
    
    switch (type) {
      case 'sucursal':
        setSelectedSucursal(value);
        newFilters = { sucursal: value, formaPago: selectedFormaPago, periodo: selectedPeriodo, mes: selectedMes };
        break;
      case 'formaPago':
        setSelectedFormaPago(value);
        newFilters = { sucursal: selectedSucursal, formaPago: value, periodo: selectedPeriodo, mes: selectedMes };
        break;
      case 'periodo':
        setSelectedPeriodo(value);
        newFilters = { sucursal: selectedSucursal, formaPago: selectedFormaPago, periodo: value, mes: selectedMes };
        break;
      case 'mes':
        setSelectedMes(value);
        newFilters = { sucursal: selectedSucursal, formaPago: selectedFormaPago, periodo: selectedPeriodo, mes: value };
        break;
    }
    
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
            <option value="2025">2025</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
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
      </div>
    </div>
  );
};

export default Filters;
