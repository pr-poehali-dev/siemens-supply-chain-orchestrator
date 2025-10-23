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
    progress: 65,
    history: [
      { status: 'pending', timestamp: '2025-10-20T09:00:00', user: 'Заказчик', note: 'Заказ создан' },
      { status: 'ready', timestamp: '2025-10-21T14:30:00', user: 'DisplayCo', note: 'Отгрузка собрана и готова' },
      { status: 'in_transit', timestamp: '2025-10-22T08:15:00', user: 'LogiTrans', note: 'Начата транспортировка' }
    ]
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
    progress: 80,
    history: [
      { status: 'pending', timestamp: '2025-10-19T10:00:00', user: 'Заказчик', note: 'Заказ размещен' },
      { status: 'ready', timestamp: '2025-10-20T16:00:00', user: 'BatteryLtd', note: 'Готово к отправке' },
      { status: 'in_transit', timestamp: '2025-10-21T11:20:00', user: 'FastCarrier', note: 'Груз отправлен' }
    ]
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
    progress: 45,
    history: [
      { status: 'pending', timestamp: '2025-10-18T08:30:00', user: 'Заказчик' },
      { status: 'ready', timestamp: '2025-10-19T13:45:00', user: 'DisplayCo' },
      { status: 'in_transit', timestamp: '2025-10-20T07:00:00', user: 'LogiTrans' },
      { status: 'delayed', timestamp: '2025-10-22T15:30:00', user: 'LogiTrans', note: 'Задержка на таможне' }
    ]
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
    progress: 10,
    history: [
      { status: 'pending', timestamp: '2025-10-22T12:00:00', user: 'Заказчик' },
      { status: 'ready', timestamp: '2025-10-23T09:15:00', user: 'BatteryLtd', note: 'Упаковано и готово к отправке' }
    ]
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
    progress: 100,
    history: [
      { status: 'pending', timestamp: '2025-10-15T10:00:00', user: 'Заказчик' },
      { status: 'ready', timestamp: '2025-10-16T14:30:00', user: 'DisplayCo' },
      { status: 'in_transit', timestamp: '2025-10-17T08:00:00', user: 'LogiTrans' },
      { status: 'delivered', timestamp: '2025-10-22T16:45:00', user: 'LogiTrans', note: 'Доставлено и подписано' }
    ]
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