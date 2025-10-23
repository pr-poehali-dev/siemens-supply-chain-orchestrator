import { Shipment, RoleConfig } from './types';

export const initialShipments: Shipment[] = [
  {
    id: 'SH-001',
    component: 'Дисплеи AMOLED',
    quantity: 5000,
    supplier: 'DisplayCo',
    carrier: 'LogiTrans',
    status: 'in_transit',
    origin: 'Шэньчжэнь, Китай',
    destination: 'Завод Siemens, Мюнхен',
    estimatedDelivery: '2025-10-25',
    progress: 65
  },
  {
    id: 'SH-002',
    component: 'Аккумуляторы Li-Ion',
    quantity: 3000,
    supplier: 'BatteryLtd',
    carrier: 'FastCarrier',
    status: 'in_transit',
    origin: 'Сеул, Корея',
    destination: 'Завод Siemens, Мюнхен',
    estimatedDelivery: '2025-10-24',
    progress: 80
  },
  {
    id: 'SH-003',
    component: 'Процессоры ARM',
    quantity: 2500,
    supplier: 'DisplayCo',
    carrier: 'LogiTrans',
    status: 'delayed',
    origin: 'Тайбэй, Тайвань',
    destination: 'Завод Siemens, Мюнхен',
    estimatedDelivery: '2025-10-27',
    progress: 45
  },
  {
    id: 'SH-004',
    component: 'Камеры 48MP',
    quantity: 4000,
    supplier: 'BatteryLtd',
    carrier: 'FastCarrier',
    status: 'ready',
    origin: 'Токио, Япония',
    destination: 'Завод Siemens, Мюнхен',
    estimatedDelivery: '2025-10-26',
    progress: 10
  },
  {
    id: 'SH-005',
    component: 'Корпуса алюминиевые',
    quantity: 6000,
    supplier: 'DisplayCo',
    carrier: 'LogiTrans',
    status: 'delivered',
    origin: 'Гуанчжоу, Китай',
    destination: 'Завод Siemens, Мюнхен',
    estimatedDelivery: '2025-10-22',
    progress: 100
  }
];

export const roleConfig: Record<string, RoleConfig> = {
  supplier: {
    title: 'Панель поставщика',
    icon: 'Factory',
    color: 'text-blue-600'
  },
  carrier: {
    title: 'Панель грузчика',
    icon: 'Truck',
    color: 'text-orange-600'
  },
  customer: {
    title: 'Панель заказчика',
    icon: 'Building2',
    color: 'text-green-600'
  }
};
