import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { Shipment } from './types';
import { getStatusColor, getStatusText, getStatusIcon } from './utils';

interface ShipmentDetailsDialogProps {
  shipment: Shipment | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ShipmentDetailsDialog({ shipment, isOpen, onOpenChange }: ShipmentDetailsDialogProps) {
  if (!shipment) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <div className="w-12 h-12 bg-[#0066CC] rounded-lg flex items-center justify-center">
              <Icon name="Package" className="text-white" size={24} />
            </div>
            <div>
              <div className="text-xl font-bold font-inter">{shipment.component}</div>
              <div className="text-sm text-muted-foreground font-normal">Отгрузка {shipment.id}</div>
            </div>
          </DialogTitle>
          <DialogDescription>
            Полная информация о статусе и истории отгрузки
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="flex items-center justify-center">
            <Badge variant="outline" className={`${getStatusColor(shipment.status)} px-4 py-2 text-base`}>
              <Icon name={getStatusIcon(shipment.status) as any} size={16} className="mr-2" />
              {getStatusText(shipment.status)}
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Компонент</div>
              <div className="font-medium">{shipment.component}</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Количество</div>
              <div className="font-medium">{shipment.quantity.toLocaleString()} шт</div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Поставщик</div>
              <div className="font-medium flex items-center gap-2">
                <Icon name="Factory" size={14} className="text-muted-foreground" />
                {shipment.supplier}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-xs text-muted-foreground uppercase tracking-wide">Перевозчик</div>
              <div className="font-medium flex items-center gap-2">
                <Icon name="Truck" size={14} className="text-muted-foreground" />
                {shipment.carrier}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <div className="text-sm font-medium">Маршрут доставки</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 p-3 bg-blue-50 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Откуда</div>
                <div className="font-medium flex items-center gap-2">
                  <Icon name="MapPin" size={14} className="text-[#0066CC]" />
                  {shipment.origin}
                </div>
              </div>
              <Icon name="ArrowRight" size={20} className="text-muted-foreground flex-shrink-0" />
              <div className="flex-1 p-3 bg-green-50 rounded-lg">
                <div className="text-xs text-muted-foreground mb-1">Куда</div>
                <div className="font-medium flex items-center gap-2">
                  <Icon name="MapPin" size={14} className="text-[#00AA55]" />
                  {shipment.destination}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Прогресс доставки</span>
              <span className="font-bold font-roboto">{shipment.progress}%</span>
            </div>
            <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
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
          </div>

          <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
            <Icon name="Calendar" size={16} className="text-muted-foreground" />
            <div className="text-sm">
              <span className="text-muted-foreground">Ожидаемая дата доставки: </span>
              <span className="font-medium">
                {new Date(shipment.estimatedDelivery).toLocaleDateString('ru-RU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Icon name="History" size={20} className="text-[#0066CC]" />
              <h3 className="font-semibold text-lg">История изменений</h3>
            </div>

            {shipment.history && shipment.history.length > 0 ? (
              <div className="relative pl-6 space-y-4">
                <div className="absolute left-2 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#0066CC] to-gray-200" />

                {shipment.history.map((entry, index) => (
                  <div key={index} className="relative">
                    <div
                      className={`absolute -left-6 w-4 h-4 rounded-full border-2 border-white ${
                        entry.status === 'delivered'
                          ? 'bg-[#00AA55]'
                          : entry.status === 'delayed'
                          ? 'bg-[#FF4444]'
                          : entry.status === 'in_transit'
                          ? 'bg-[#FFB420]'
                          : entry.status === 'ready'
                          ? 'bg-[#0066CC]'
                          : 'bg-gray-400'
                      }`}
                    />

                    <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getStatusColor(entry.status)}>
                            <Icon name={getStatusIcon(entry.status) as any} size={12} className="mr-1" />
                            {getStatusText(entry.status)}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(entry.timestamp).toLocaleDateString('ru-RU', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Icon name="User" size={12} />
                          {entry.user}
                        </div>
                      </div>
                      {entry.note && (
                        <div className="text-sm text-muted-foreground mt-2 pl-2 border-l-2 border-gray-200">
                          {entry.note}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="Info" size={32} className="mx-auto mb-2 opacity-50" />
                <p>История изменений пока недоступна</p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
