export type UserRole = 'supplier' | 'carrier' | 'customer';
export type ShipmentStatus = 'pending' | 'ready' | 'in_transit' | 'delayed' | 'delivered';

export interface Shipment {
  id: string;
  component: string;
  quantity: number;
  supplier: string;
  carrier: string;
  status: ShipmentStatus;
  origin: string;
  destination: string;
  estimatedDelivery: string;
  progress: number;
}

export interface NewOrder {
  component: string;
  quantity: string;
  supplier: string;
  origin: string;
  estimatedDelivery: string;
}

export interface RoleConfig {
  title: string;
  icon: string;
  color: string;
}
