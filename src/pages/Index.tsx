import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';

type UserRole = 'supplier' | 'carrier' | 'customer';
type ShipmentStatus = 'pending' | 'ready' | 'in_transit' | 'delayed' | 'delivered';

interface Shipment {
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

const initialShipments: Shipment[] = [
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

const getStatusColor = (status: ShipmentStatus): string => {
  const colors: Record<ShipmentStatus, string> = {
    pending: 'bg-gray-100 text-gray-700 border-gray-300',
    ready: 'bg-blue-50 text-blue-700 border-blue-300',
    in_transit: 'bg-orange-50 text-orange-700 border-orange-300',
    delayed: 'bg-red-50 text-red-700 border-red-300',
    delivered: 'bg-green-50 text-green-700 border-green-300'
  };
  return colors[status];
};

const getStatusText = (status: ShipmentStatus): string => {
  const texts: Record<ShipmentStatus, string> = {
    pending: 'Ожидает',
    ready: 'Готов к отправке',
    in_transit: 'В пути',
    delayed: 'Задержан',
    delivered: 'Доставлен'
  };
  return texts[status];
};

const getStatusIcon = (status: ShipmentStatus): string => {
  const icons: Record<ShipmentStatus, string> = {
    pending: 'Clock',
    ready: 'Package',
    in_transit: 'Truck',
    delayed: 'AlertTriangle',
    delivered: 'CheckCircle2'
  };
  return icons[status];
};

export default function Index() {
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const { toast } = useToast();

  const [newOrder, setNewOrder] = useState({
    component: '',
    quantity: '',
    supplier: 'DisplayCo',
    origin: '',
    estimatedDelivery: ''
  });

  const roleConfig = {
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

  const handleCreateOrder = () => {
    if (!newOrder.component || !newOrder.quantity || !newOrder.origin) {
      toast({
        title: 'Ошибка',
        description: 'Заполните все обязательные поля',
        variant: 'destructive'
      });
      return;
    }

    const newShipment: Shipment = {
      id: `SH-${String(shipments.length + 1).padStart(3, '0')}`,
      component: newOrder.component,
      quantity: parseInt(newOrder.quantity),
      supplier: newOrder.supplier,
      carrier: 'Не назначен',
      status: 'pending',
      origin: newOrder.origin,
      destination: 'Завод Siemens, Мюнхен',
      estimatedDelivery: newOrder.estimatedDelivery || new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      progress: 0
    };

    setShipments([newShipment, ...shipments]);
    setIsDialogOpen(false);
    setNewOrder({
      component: '',
      quantity: '',
      supplier: 'DisplayCo',
      origin: '',
      estimatedDelivery: ''
    });

    toast({
      title: 'Заказ создан!',
      description: `Отгрузка ${newShipment.id} успешно создана`,
    });
  };

  const handleStatusChange = (shipmentId: string, newStatus: ShipmentStatus) => {
    setShipments(shipments.map(s => {
      if (s.id === shipmentId) {
        let newProgress = s.progress;
        if (newStatus === 'ready') newProgress = 10;
        if (newStatus === 'in_transit') newProgress = Math.max(30, s.progress);
        if (newStatus === 'delayed') newProgress = s.progress;
        if (newStatus === 'delivered') newProgress = 100;

        return { ...s, status: newStatus, progress: newProgress };
      }
      return s;
    }));

    toast({
      title: 'Статус обновлен',
      description: `Отгрузка ${shipmentId}: ${getStatusText(newStatus)}`,
    });
  };

  const handleAcceptShipment = (shipmentId: string) => {
    setShipments(shipments.map(s => {
      if (s.id === shipmentId && s.carrier === 'Не назначен') {
        return { ...s, carrier: 'LogiTrans', status: 'ready' as ShipmentStatus, progress: 10 };
      }
      return s;
    }));

    toast({
      title: 'Рейс принят',
      description: `Вы взяли в работу отгрузку ${shipmentId}`,
    });
  };

  const getAvailableStatuses = (currentStatus: ShipmentStatus, role: UserRole): ShipmentStatus[] => {
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

  const stats = {
    active: shipments.filter(s => ['pending', 'ready', 'in_transit', 'delayed'].includes(s.status)).length,
    inTransit: shipments.filter(s => s.status === 'in_transit').length,
    delayed: shipments.filter(s => s.status === 'delayed').length,
    delivered: shipments.filter(s => s.status === 'delivered').length
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0066CC] rounded-lg flex items-center justify-center">
                <Icon name="Package" className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-[#0066CC] font-inter">Siemens Supply Chain</h1>
                <p className="text-xs text-muted-foreground">Orchestrator Platform</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Select value={currentRole} onValueChange={(value) => setCurrentRole(value as UserRole)}>
                <SelectTrigger className="w-[220px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">
                    <div className="flex items-center gap-2">
                      <Icon name="Building2" size={16} />
                      <span>Заказчик (Siemens)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="supplier">
                    <div className="flex items-center gap-2">
                      <Icon name="Factory" size={16} />
                      <span>Поставщик</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="carrier">
                    <div className="flex items-center gap-2">
                      <Icon name="Truck" size={16} />
                      <span>Грузчик</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <Button variant="ghost" size="icon">
                <Icon name="Bell" size={20} />
              </Button>
              <Button variant="ghost" size="icon" className="bg-red-500 text-white hover:bg-red-600 hover:text-white">
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Icon name={roleConfig[currentRole].icon as any} className={roleConfig[currentRole].color} size={32} />
            <h2 className="text-3xl font-bold font-inter">{roleConfig[currentRole].title}</h2>
          </div>
          <p className="text-muted-foreground">Управление логистической цепочкой в реальном времени</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Активных отгрузок</CardTitle>
                <Icon name="Package" className="text-[#0066CC]" size={20} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-roboto">{stats.active}</div>
              <p className="text-xs text-muted-foreground mt-1">Требуют обработки</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">В пути</CardTitle>
                <Icon name="Truck" className="text-[#FFB420]" size={20} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-roboto">{stats.inTransit}</div>
              <p className="text-xs text-muted-foreground mt-1">На маршруте</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Задержаны</CardTitle>
                <Icon name="AlertTriangle" className="text-[#FF4444]" size={20} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-roboto">{stats.delayed}</div>
              <p className="text-xs text-muted-foreground mt-1">Требует внимания</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">Доставлено</CardTitle>
                <Icon name="CheckCircle2" className="text-[#00AA55]" size={20} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold font-roboto">{stats.delivered}</div>
              <p className="text-xs text-muted-foreground mt-1">Всего завершено</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="shipments" className="space-y-6">
          <TabsList className="bg-white border">
            <TabsTrigger value="shipments" className="gap-2">
              <Icon name="List" size={16} />
              Отгрузки
            </TabsTrigger>
            <TabsTrigger value="map" className="gap-2">
              <Icon name="Map" size={16} />
              Карта маршрутов
            </TabsTrigger>
            {currentRole === 'customer' && (
              <TabsTrigger value="analytics" className="gap-2">
                <Icon name="BarChart3" size={16} />
                Аналитика
              </TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="shipments" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Текущие отгрузки</CardTitle>
                    <CardDescription>Список всех активных и завершенных отгрузок</CardDescription>
                  </div>
                  {(currentRole === 'customer' || currentRole === 'supplier') && (
                    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                      <DialogTrigger asChild>
                        <Button className="bg-[#0066CC] hover:bg-[#0052A3]">
                          <Icon name="Plus" size={16} className="mr-2" />
                          {currentRole === 'supplier' ? 'Создать отгрузку' : 'Новый заказ'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle className="flex items-center gap-2">
                            <Icon name="PackagePlus" size={24} className="text-[#0066CC]" />
                            {currentRole === 'supplier' ? 'Создать отгрузку' : 'Создать заказ'}
                          </DialogTitle>
                          <DialogDescription>
                            Заполните данные для новой отгрузки компонентов
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="component">Компонент *</Label>
                            <Input
                              id="component"
                              placeholder="Например: Дисплеи AMOLED"
                              value={newOrder.component}
                              onChange={(e) => setNewOrder({ ...newOrder, component: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="quantity">Количество *</Label>
                              <Input
                                id="quantity"
                                type="number"
                                placeholder="5000"
                                value={newOrder.quantity}
                                onChange={(e) => setNewOrder({ ...newOrder, quantity: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="supplier">Поставщик</Label>
                              <Select 
                                value={newOrder.supplier} 
                                onValueChange={(value) => setNewOrder({ ...newOrder, supplier: value })}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="DisplayCo">DisplayCo</SelectItem>
                                  <SelectItem value="BatteryLtd">BatteryLtd</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="origin">Склад отправки *</Label>
                            <Input
                              id="origin"
                              placeholder="Шэньчжэнь, Китай"
                              value={newOrder.origin}
                              onChange={(e) => setNewOrder({ ...newOrder, origin: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="delivery">Планируемая дата доставки</Label>
                            <Input
                              id="delivery"
                              type="date"
                              value={newOrder.estimatedDelivery}
                              onChange={(e) => setNewOrder({ ...newOrder, estimatedDelivery: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            className="flex-1"
                            onClick={() => setIsDialogOpen(false)}
                          >
                            Отмена
                          </Button>
                          <Button
                            className="flex-1 bg-[#0066CC] hover:bg-[#0052A3]"
                            onClick={handleCreateOrder}
                          >
                            Создать
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {shipments.map((shipment) => (
                  <div
                    key={shipment.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-all hover:border-[#0066CC]/30"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-lg font-inter">{shipment.component}</h3>
                          <Badge variant="outline" className={getStatusColor(shipment.status)}>
                            <Icon name={getStatusIcon(shipment.status) as any} size={12} className="mr-1" />
                            {getStatusText(shipment.status)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Icon name="Package" size={14} />
                            <span>ID: {shipment.id}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Boxes" size={14} />
                            <span>Количество: {shipment.quantity.toLocaleString()} шт</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Factory" size={14} />
                            <span>Поставщик: {shipment.supplier}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Icon name="Truck" size={14} />
                            <span>Перевозчик: {shipment.carrier}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {currentRole === 'carrier' && shipment.carrier === 'Не назначен' && shipment.status === 'ready' && (
                          <Button 
                            size="sm" 
                            className="bg-[#0066CC] hover:bg-[#0052A3]"
                            onClick={() => handleAcceptShipment(shipment.id)}
                          >
                            <Icon name="Check" size={14} className="mr-2" />
                            Принять
                          </Button>
                        )}
                        {getAvailableStatuses(shipment.status, currentRole).length > 0 && (
                          <Select onValueChange={(value) => handleStatusChange(shipment.id, value as ShipmentStatus)}>
                            <SelectTrigger className="w-[160px]">
                              <SelectValue placeholder="Изменить статус" />
                            </SelectTrigger>
                            <SelectContent>
                              {getAvailableStatuses(shipment.status, currentRole).map(status => (
                                <SelectItem key={status} value={status}>
                                  <div className="flex items-center gap-2">
                                    <Icon name={getStatusIcon(status) as any} size={14} />
                                    {getStatusText(status)}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Icon name="MapPin" size={14} />
                          <span>{shipment.origin}</span>
                          <Icon name="ArrowRight" size={14} />
                          <span>{shipment.destination}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Icon name="Calendar" size={14} />
                          <span>ETA: {new Date(shipment.estimatedDelivery).toLocaleDateString('ru-RU')}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ${
                              shipment.status === 'delivered'
                                ? 'bg-[#00AA55]'
                                : shipment.status === 'delayed'
                                ? 'bg-[#FF4444]'
                                : 'bg-[#FFB420]'
                            }`}
                            style={{ width: `${shipment.progress}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium font-roboto w-12 text-right">{shipment.progress}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="map">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0066CC] rounded-full blur-3xl" />
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FFB420] rounded-full blur-3xl" />
                  </div>
                  
                  <div className="relative text-center space-y-4 z-10">
                    <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto">
                      <Icon name="Map" size={48} className="text-[#0066CC]" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2 font-inter">Интерактивная карта маршрутов</h3>
                      <p className="text-muted-foreground max-w-md">
                        Визуализация всех активных отгрузок в реальном времени с отслеживанием GPS координат
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-4 pt-4">
                      <Badge variant="outline" className="bg-white border-[#FFB420]/30">
                        <div className="w-2 h-2 rounded-full bg-[#FFB420] mr-2" />
                        В пути: {stats.inTransit}
                      </Badge>
                      <Badge variant="outline" className="bg-white border-[#FF4444]/30">
                        <div className="w-2 h-2 rounded-full bg-[#FF4444] mr-2" />
                        Задержаны: {stats.delayed}
                      </Badge>
                      <Badge variant="outline" className="bg-white border-[#00AA55]/30">
                        <div className="w-2 h-2 rounded-full bg-[#00AA55] mr-2" />
                        Доставлены: {stats.delivered}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {currentRole === 'customer' && (
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="TrendingUp" size={20} className="text-[#0066CC]" />
                      Надежность поставщиков
                    </CardTitle>
                    <CardDescription>Процент своевременных доставок за последний квартал</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">DisplayCo</span>
                          <span className="text-sm font-bold text-[#00AA55]">94%</span>
                        </div>
                        <div className="bg-gray-100 rounded-full h-2">
                          <div className="bg-[#00AA55] h-full rounded-full transition-all duration-500" style={{ width: '94%' }} />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">BatteryLtd</span>
                          <span className="text-sm font-bold text-[#FFB420]">87%</span>
                        </div>
                        <div className="bg-gray-100 rounded-full h-2">
                          <div className="bg-[#FFB420] h-full rounded-full transition-all duration-500" style={{ width: '87%' }} />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Icon name="Clock" size={20} className="text-[#0066CC]" />
                      Среднее время доставки
                    </CardTitle>
                    <CardDescription>По типам компонентов (в днях)</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg transition-all hover:shadow-md">
                        <div className="flex items-center gap-2">
                          <Icon name="Monitor" size={16} className="text-[#0066CC]" />
                          <span className="text-sm font-medium">Дисплеи</span>
                        </div>
                        <span className="text-lg font-bold font-roboto">12 дней</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg transition-all hover:shadow-md">
                        <div className="flex items-center gap-2">
                          <Icon name="Battery" size={16} className="text-[#FFB420]" />
                          <span className="text-sm font-medium">Аккумуляторы</span>
                        </div>
                        <span className="text-lg font-bold font-roboto">9 дней</span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg transition-all hover:shadow-md">
                        <div className="flex items-center gap-2">
                          <Icon name="Cpu" size={16} className="text-[#00AA55]" />
                          <span className="text-sm font-medium">Процессоры</span>
                        </div>
                        <span className="text-lg font-bold font-roboto">14 дней</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="AlertCircle" size={20} className="text-[#FF4444]" />
                    Статистика задержек
                  </CardTitle>
                  <CardDescription>Анализ причин задержек за последний месяц</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <Icon name="CloudOff" size={24} className="text-muted-foreground" />
                        <span className="text-2xl font-bold font-roboto text-[#FF4444]">23%</span>
                      </div>
                      <p className="text-sm font-medium">Погодные условия</p>
                      <p className="text-xs text-muted-foreground mt-1">5 случаев</p>
                    </div>
                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <Icon name="FileX" size={24} className="text-muted-foreground" />
                        <span className="text-2xl font-bold font-roboto text-[#FFB420]">31%</span>
                      </div>
                      <p className="text-sm font-medium">Таможня</p>
                      <p className="text-xs text-muted-foreground mt-1">7 случаев</p>
                    </div>
                    <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <Icon name="Wrench" size={24} className="text-muted-foreground" />
                        <span className="text-2xl font-bold font-roboto text-[#0066CC]">46%</span>
                      </div>
                      <p className="text-sm font-medium">Технические проблемы</p>
                      <p className="text-xs text-muted-foreground mt-1">10 случаев</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
}
