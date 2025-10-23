import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { Shipment, ShipmentStatus, UserRole } from './types';
import { getStatusColor, getStatusText, getStatusIcon, getAvailableStatuses } from './utils';

interface ShipmentCardProps {
  shipment: Shipment;
  currentRole: UserRole;
  onStatusChange: (shipmentId: string, newStatus: ShipmentStatus) => void;
  onAcceptShipment: (shipmentId: string) => void;
  onViewDetails: (shipment: Shipment) => void;
}

export function ShipmentCard({ shipment, currentRole, onStatusChange, onAcceptShipment, onViewDetails }: ShipmentCardProps) {
  const availableStatuses = getAvailableStatuses(shipment.status, currentRole);

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-all hover:border-[#0066CC]/30">
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
              onClick={() => onAcceptShipment(shipment.id)}
            >
              <Icon name="Check" size={14} className="mr-2" />
              Принять
            </Button>
          )}
          {availableStatuses.length > 0 && (
            <Select onValueChange={(value) => onStatusChange(shipment.id, value as ShipmentStatus)}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="Изменить статус" />
              </SelectTrigger>
              <SelectContent>
                {availableStatuses.map(status => (
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

      <div className="mt-4 pt-4 border-t flex justify-end">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => onViewDetails(shipment)}
          className="hover:bg-[#0066CC] hover:text-white transition-colors"
        >
          <Icon name="FileText" size={14} className="mr-2" />
          Подробнее
        </Button>
      </div>
    </div>
  );
}