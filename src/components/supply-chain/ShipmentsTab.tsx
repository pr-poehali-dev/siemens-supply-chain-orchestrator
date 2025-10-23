import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shipment, ShipmentStatus, UserRole, NewOrder } from './types';
import { ShipmentCard } from './ShipmentCard';
import { CreateOrderDialog } from './CreateOrderDialog';

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
  onViewDetails
}: ShipmentsTabProps) {
  return (
    <Card>
      <CardHeader>
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
      </CardHeader>
      <CardContent className="space-y-4">
        {shipments.map((shipment) => (
          <ShipmentCard
            key={shipment.id}
            shipment={shipment}
            currentRole={currentRole}
            onStatusChange={onStatusChange}
            onAcceptShipment={onAcceptShipment}
            onViewDetails={onViewDetails}
          />
        ))}
      </CardContent>
    </Card>
  );
}