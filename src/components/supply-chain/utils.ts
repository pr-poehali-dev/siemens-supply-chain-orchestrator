import { ShipmentStatus, UserRole } from './types';

export const getStatusColor = (status: ShipmentStatus): string => {
  const colors: Record<ShipmentStatus, string> = {
    pending: 'bg-gray-100 text-gray-700 border-gray-300',
    ready: 'bg-blue-50 text-blue-700 border-blue-300',
    in_transit: 'bg-orange-50 text-orange-700 border-orange-300',
    delayed: 'bg-red-50 text-red-700 border-red-300',
    delivered: 'bg-green-50 text-green-700 border-green-300'
  };
  return colors[status];
};

export const getStatusText = (status: ShipmentStatus): string => {
  const texts: Record<ShipmentStatus, string> = {
    pending: 'Ожидает',
    ready: 'Готов к отправке',
    in_transit: 'В пути',
    delayed: 'Задержан',
    delivered: 'Доставлен'
  };
  return texts[status];
};

export const getStatusIcon = (status: ShipmentStatus): string => {
  const icons: Record<ShipmentStatus, string> = {
    pending: 'Clock',
    ready: 'Package',
    in_transit: 'Truck',
    delayed: 'AlertTriangle',
    delivered: 'CheckCircle2'
  };
  return icons[status];
};

export const getAvailableStatuses = (currentStatus: ShipmentStatus, role: UserRole): ShipmentStatus[] => {
  if (role === 'supplier') {
    if (currentStatus === 'pending') return ['ready'];
    return [];
  }
  if (role === 'carrier') {
    if (currentStatus === 'ready') return ['in_transit'];
    if (currentStatus === 'in_transit') return ['delayed', 'delivered'];
    if (currentStatus === 'delayed') return ['in_transit', 'delivered'];
    return [];
  }
  return [];
};
