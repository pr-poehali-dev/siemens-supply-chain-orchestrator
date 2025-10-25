import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Доставка завершена',
    message: 'Отгрузка SH-001 успешно доставлена в пункт назначения',
    time: '5 мин назад',
    read: false
  },
  {
    id: '2',
    type: 'warning',
    title: 'Возможна задержка',
    message: 'Отгрузка SH-003 может задержаться из-за погодных условий',
    time: '1 час назад',
    read: false
  },
  {
    id: '3',
    type: 'info',
    title: 'Новая отгрузка',
    message: 'Создана новая отгрузка SH-005',
    time: '2 часа назад',
    read: true
  },
  {
    id: '4',
    type: 'success',
    title: 'Рейс принят',
    message: 'Перевозчик принял рейс SH-004',
    time: '3 часа назад',
    read: true
  },
  {
    id: '5',
    type: 'info',
    title: 'Обновление статуса',
    message: 'Отгрузка SH-002 находится в пути',
    time: 'Вчера',
    read: true
  }
];

export function NotificationsPopover() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'CheckCircle2';
      case 'warning': return 'AlertTriangle';
      case 'error': return 'XCircle';
      default: return 'Info';
    }
  };

  const getColor = (type: Notification['type']) => {
    switch (type) {
      case 'success': return 'text-green-500';
      case 'warning': return 'text-yellow-500';
      case 'error': return 'text-red-500';
      default: return 'text-blue-500';
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Icon name="Bell" size={20} />
          {unreadCount > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="font-semibold">Уведомления</div>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto p-1 text-xs">
              Прочитать все
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          <div className="divide-y">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-muted-foreground">
                <Icon name="Bell" size={48} className="mb-2 opacity-20" />
                <div className="text-sm">Нет уведомлений</div>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-muted/50 cursor-pointer transition-colors ${
                    !notification.read ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex gap-3">
                    <Icon 
                      name={getIcon(notification.type) as any} 
                      size={20} 
                      className={`mt-0.5 flex-shrink-0 ${getColor(notification.type)}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-medium text-sm">{notification.title}</div>
                        {!notification.read && (
                          <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 mt-1.5" />
                        )}
                      </div>
                      <div className="text-sm text-muted-foreground mt-0.5 line-clamp-2">
                        {notification.message}
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
        <div className="px-4 py-2 border-t">
          <Button variant="ghost" className="w-full text-sm">
            Посмотреть все уведомления
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
