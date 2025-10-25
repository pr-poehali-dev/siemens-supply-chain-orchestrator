import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shipment, ShipmentStatus, UserRole, NewOrder } from './types';
import { ShipmentCard } from './ShipmentCard';
import { CreateOrderDialog } from './CreateOrderDialog';
import { SearchAndFilter } from './SearchAndFilter';

interface ShipmentsTabProps {
  shipments: Shipment[];
  currentRole: UserRole;
  isDialogOpen: boolean;
  onDialogOpenChange: (open: boolean) => void;
  newOrder: NewOrder;
  onOrderChange: (order: NewOrder) => void;
  onCreateOrder: () => void;
  onStatusChange: (shipmentId: string, newStatus: ShipmentStatus) => void;
  onAcceptShipment: (shipmentId: string) => void;
  onViewDetails: (shipment: Shipment) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatuses: ShipmentStatus[];
  onStatusToggle: (status: ShipmentStatus) => void;
  onClearFilters: () => void;
}

export function ShipmentsTab({
  shipments,
  currentRole,
  isDialogOpen,
  onDialogOpenChange,
  newOrder,
  onOrderChange,
  onCreateOrder,
  onStatusChange,
  onAcceptShipment,
  onViewDetails,
  searchQuery,
  onSearchChange,
  selectedStatuses,
  onStatusToggle,
  onClearFilters
}: ShipmentsTabProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Текущие отгрузки</CardTitle>
              <CardDescription>Список всех активных и завершенных отгрузок</CardDescription>
            </div>
            {(currentRole === 'customer' || currentRole === 'supplier') && (
              <CreateOrderDialog
                currentRole={currentRole}
                isOpen={isDialogOpen}
                onOpenChange={onDialogOpenChange}
                newOrder={newOrder}
                onOrderChange={onOrderChange}
                onCreateOrder={onCreateOrder}
              />
            )}
          </div>
          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            selectedStatuses={selectedStatuses}
            onStatusToggle={onStatusToggle}
            onClearFilters={onClearFilters}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {shipments.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            <div className="text-lg font-medium mb-2">Отгрузки не найдены</div>
            <div className="text-sm">Попробуйте изменить параметры поиска или фильтры</div>
          </div>
        ) : (
          shipments.map((shipment) => (
            <ShipmentCard
              key={shipment.id}
              shipment={shipment}
              currentRole={currentRole}
              onStatusChange={onStatusChange}
              onAcceptShipment={onAcceptShipment}
              onViewDetails={onViewDetails}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}