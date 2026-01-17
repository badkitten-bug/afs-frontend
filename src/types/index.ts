export interface VentaDto {
  sucursal: string;
  docCliente: string;
  cliente: string;
  codReferencia: string;
  formaPago: string;
  fechaHora: Date;
  montos: number;
}

export interface VentaPorSucursalDto {
  sucursal: string;
  total: number;
  porcentaje: number;
}

export interface DashboardStatsDto {
  ventasPorSucursal: VentaPorSucursalDto[];
  ventasRecientes: VentaDto[];
  totalVentas: number;
  totalMes: number;
}

export interface FiltrosVenta {
  sucursal?: string;
  formaPago?: string;
  periodo?: string;
  mes?: string;
}
