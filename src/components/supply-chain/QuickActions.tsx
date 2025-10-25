import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { UserRole } from './types';

interface QuickActionsProps {
  currentRole: UserRole;
  onCreateOrder: () => void;
}

export function QuickActions({ currentRole, onCreateOrder }: QuickActionsProps) {
  const actions = {
    customer: [
      { icon: 'Plus', label: 'Новая отгрузка', action: onCreateOrder, variant: 'default' as const },
      { icon: 'BarChart3', label: 'Аналитика', action: () => {}, variant: 'outline' as const },
      { icon: 'FileText', label: 'Отчеты', action: () => {}, variant: 'outline' as const },
      { icon: 'Settings', label: 'Настройки', action: () => {}, variant: 'outline' as const }
    ],
    supplier: [
      { icon: 'Plus', label: 'Создать заказ', action: onCreateOrder, variant: 'default' as const },
      { icon: 'Package', label: 'Инвентарь', action: () => {}, variant: 'outline' as const },
      { icon: 'Truck', label: 'Логистика', action: () => {}, variant: 'outline' as const },
      { icon: 'FileText', label: 'Документы', action: () => {}, variant: 'outline' as const }
    ],
    carrier: [
      { icon: 'Search', label: 'Найти рейсы', action: () => {}, variant: 'default' as const },
      { icon: 'MapPin', label: 'Маршруты', action: () => {}, variant: 'outline' as const },
      { icon: 'Clock', label: 'График', action: () => {}, variant: 'outline' as const },
      { icon: 'FileText', label: 'Документы', action: () => {}, variant: 'outline' as const }
    ]
  };

  return (
    <Card className="mb-4 md:mb-6">
      <CardContent className="pt-4 md:pt-6">
        <div className="flex gap-2 md:gap-3 overflow-x-auto pb-1 scrollbar-hide">
          {actions[currentRole].map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              className="flex-shrink-0 gap-1 md:gap-2 text-xs md:text-sm h-8 md:h-10 px-3 md:px-4"
              onClick={action.action}
            >
              <Icon name={action.icon as any} size={14} />
              <span className="whitespace-nowrap">{action.label}</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}