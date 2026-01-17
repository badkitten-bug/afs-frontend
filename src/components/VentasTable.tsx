import { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import './VentasTable.css';

interface Venta {
  sucursal: string;
  docCliente: string;
  cliente: string;
  codReferencia: string;
  formaPago: string;
  fechaHora: Date;
  montos: number;
}

interface VentasTableProps {
  ventas: Venta[];
}

const VentasTable = ({ ventas }: VentasTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  
  const totalPages = Math.ceil(ventas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentVentas = ventas.slice(startIndex, endIndex);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('es-PE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const formatDate = (date: Date) => {
    try {
      return format(new Date(date), 'dd MMM yyyy, HH:mm', { locale: es });
    } catch {
      return 'N/A';
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h3>Ventas Recientes</h3>
        <span className="table-count">{ventas.length} registros</span>
      </div>
      
      <div className="table-wrapper">
        <table className="ventas-table">
          <thead>
            <tr>
              <th>#</th>
              <th>SUCURSAL</th>
              <th>DOC CLIENTE</th>
              <th>CLIENTE</th>
              <th>COD_REFERENCIA</th>
              <th>FORMA DE PAGO</th>
              <th>FECHA Y HORA</th>
              <th className="text-right">MONTOS</th>
            </tr>
          </thead>
          <tbody>
            {currentVentas.map((venta, index) => (
              <tr key={index} className="table-row">
                <td>{startIndex + index + 1}</td>
                <td>
                  <span className="badge badge-sucursal">{venta.sucursal}</span>
                </td>
                <td>{venta.docCliente}</td>
                <td className="font-medium">{venta.cliente}</td>
                <td className="text-mono">{venta.codReferencia}</td>
                <td>
                  <span className={`badge badge-${venta.formaPago.toLowerCase().replace(/\s+/g, '-')}`}>
                    {venta.formaPago}
                  </span>
                </td>
                <td className="text-secondary">{formatDate(venta.fechaHora)}</td>
                <td className="text-right font-semibold">
                  S/ {formatCurrency(venta.montos)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="table-pagination">
          <button 
            className="pagination-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft size={18} />
            Anterior
          </button>
          
          <span className="pagination-info">
            Página {currentPage} de {totalPages}
          </span>
          
          <button 
            className="pagination-btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Siguiente
            <ChevronRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default VentasTable;
