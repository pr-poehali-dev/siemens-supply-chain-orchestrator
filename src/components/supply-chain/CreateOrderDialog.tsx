import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { NewOrder, UserRole } from './types';

interface CreateOrderDialogProps {
  currentRole: UserRole;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newOrder: NewOrder;
  onOrderChange: (order: NewOrder) => void;
  onCreateOrder: () => void;
}

export function CreateOrderDialog({
  currentRole,
  isOpen,
  onOpenChange,
  newOrder,
  onOrderChange,
  onCreateOrder
}: CreateOrderDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
              onChange={(e) => onOrderChange({ ...newOrder, component: e.target.value })}
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
                onChange={(e) => onOrderChange({ ...newOrder, quantity: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="supplier">Поставщик</Label>
              <Select 
                value={newOrder.supplier} 
                onValueChange={(value) => onOrderChange({ ...newOrder, supplier: value })}
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
              onChange={(e) => onOrderChange({ ...newOrder, origin: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="delivery">Планируемая дата доставки</Label>
            <Input
              id="delivery"
              type="date"
              value={newOrder.estimatedDelivery}
              onChange={(e) => onOrderChange({ ...newOrder, estimatedDelivery: e.target.value })}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => onOpenChange(false)}
          >
            Отмена
          </Button>
          <Button
            className="flex-1 bg-[#0066CC] hover:bg-[#0052A3]"
            onClick={onCreateOrder}
          >
            Создать
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
