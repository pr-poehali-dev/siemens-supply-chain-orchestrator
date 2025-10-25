import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { Header } from '@/components/supply-chain/Header';
import { StatsCards } from '@/components/supply-chain/StatsCards';
import { ShipmentsTab } from '@/components/supply-chain/ShipmentsTab';
import { MapTab } from '@/components/supply-chain/MapTab';
import { AnalyticsTab } from '@/components/supply-chain/AnalyticsTab';
import { ShipmentDetailsDialog } from '@/components/supply-chain/ShipmentDetailsDialog';
import { ProfileDialog } from '@/components/supply-chain/ProfileDialog';
import { QuickActions } from '@/components/supply-chain/QuickActions';
import { Footer } from '@/components/supply-chain/Footer';
import { HelpButton } from '@/components/supply-chain/HelpButton';
import { UserRole, Shipment, ShipmentStatus, NewOrder } from '@/components/supply-chain/types';
import { initialShipments, roleConfig } from '@/components/supply-chain/data';
import { getStatusText } from '@/components/supply-chain/utils';

export default function Index() {
  const [currentRole, setCurrentRole] = useState<UserRole>('customer');
  const [shipments, setShipments] = useState<Shipment[]>(initialShipments);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<ShipmentStatus[]>([]);
  const { toast } = useToast();

  const [newOrder, setNewOrder] = useState<NewOrder>({
    component: '',
    quantity: '',
    supplier: 'DisplayCo',
    origin: '',
    estimatedDelivery: ''
  });

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
      progress: 0,
      history: [
        {
          status: 'pending',
          timestamp: new Date().toISOString(),
          user: currentRole === 'customer' ? 'Заказчик' : 'Поставщик',
          note: 'Заказ создан'
        }
      ]
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
    const roleNames: Record<UserRole, string> = {
      supplier: 'Поставщик',
      carrier: 'Грузчик',
      customer: 'Заказчик'
    };

    setShipments(shipments.map(s => {
      if (s.id === shipmentId) {
        let newProgress = s.progress;
        if (newStatus === 'ready') newProgress = 10;
        if (newStatus === 'in_transit') newProgress = Math.max(30, s.progress);
        if (newStatus === 'delayed') newProgress = s.progress;
        if (newStatus === 'delivered') newProgress = 100;

        const newHistoryEntry = {
          status: newStatus,
          timestamp: new Date().toISOString(),
          user: roleNames[currentRole]
        };

        return { 
          ...s, 
          status: newStatus, 
          progress: newProgress,
          history: [...(s.history || []), newHistoryEntry]
        };
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
        const newHistoryEntry = {
          status: 'ready' as ShipmentStatus,
          timestamp: new Date().toISOString(),
          user: 'Грузчик',
          note: 'Рейс принят в работу'
        };

        return { 
          ...s, 
          carrier: 'LogiTrans', 
          status: 'ready' as ShipmentStatus, 
          progress: 10,
          history: [...(s.history || []), newHistoryEntry]
        };
      }
      return s;
    }));

    toast({
      title: 'Рейс принят',
      description: `Вы взяли в работу отгрузку ${shipmentId}`,
    });
  };

  const handleViewDetails = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setIsDetailsOpen(true);
  };

  const handleStatusToggle = (status: ShipmentStatus) => {
    setSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    );
  };

  const handleClearFilters = () => {
    setSelectedStatuses([]);
    setSearchQuery('');
  };

  const filteredShipments = shipments.filter(shipment => {
    const matchesSearch = searchQuery === '' || 
      shipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.component.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.supplier.toLowerCase().includes(searchQuery.toLowerCase()) ||
      shipment.carrier.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(shipment.status);
    
    return matchesSearch && matchesStatus;
  });

  const stats = {
    active: shipments.filter(s => ['pending', 'ready', 'in_transit', 'delayed'].includes(s.status)).length,
    inTransit: shipments.filter(s => s.status === 'in_transit').length,
    delayed: shipments.filter(s => s.status === 'delayed').length,
    delivered: shipments.filter(s => s.status === 'delivered').length
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header 
        currentRole={currentRole} 
        onRoleChange={setCurrentRole}
        onProfileClick={() => setIsProfileOpen(true)}
      />

      <main className="container mx-auto px-4 md:px-6 py-6 md:py-8 flex-1">
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 md:gap-3 mb-2">
            <Icon name={roleConfig[currentRole].icon as any} className={roleConfig[currentRole].color} size={28} />
            <h2 className="text-2xl md:text-3xl font-bold font-inter">{roleConfig[currentRole].title}</h2>
          </div>
          <p className="text-sm md:text-base text-muted-foreground">Управление логистической цепочкой в реальном времени</p>
        </div>

        <StatsCards stats={stats} />

        <QuickActions currentRole={currentRole} onCreateOrder={() => setIsDialogOpen(true)} />

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
            <ShipmentsTab
              shipments={filteredShipments}
              currentRole={currentRole}
              isDialogOpen={isDialogOpen}
              onDialogOpenChange={setIsDialogOpen}
              newOrder={newOrder}
              onOrderChange={setNewOrder}
              onCreateOrder={handleCreateOrder}
              onStatusChange={handleStatusChange}
              onAcceptShipment={handleAcceptShipment}
              onViewDetails={handleViewDetails}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedStatuses={selectedStatuses}
              onStatusToggle={handleStatusToggle}
              onClearFilters={handleClearFilters}
            />
          </TabsContent>

          <TabsContent value="map">
            <MapTab stats={stats} />
          </TabsContent>

          {currentRole === 'customer' && (
            <TabsContent value="analytics">
              <AnalyticsTab />
            </TabsContent>
          )}
        </Tabs>
      </main>

      <Footer />

      <ShipmentDetailsDialog
        shipment={selectedShipment}
        isOpen={isDetailsOpen}
        onOpenChange={setIsDetailsOpen}
      />

      <ProfileDialog
        isOpen={isProfileOpen}
        onOpenChange={setIsProfileOpen}
        currentRole={currentRole}
      />

      <HelpButton />
    </div>
  );
}