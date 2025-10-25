import { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);

  const helpTopics = [
    {
      icon: 'HelpCircle',
      title: 'Как создать отгрузку?',
      description: 'Нажмите кнопку "Создать отгрузку" и заполните необходимые поля'
    },
    {
      icon: 'RefreshCw',
      title: 'Изменение статуса',
      description: 'Используйте выпадающее меню статуса для обновления состояния отгрузки'
    },
    {
      icon: 'Filter',
      title: 'Фильтрация данных',
      description: 'Используйте поиск и фильтры для быстрого поиска нужных отгрузок'
    },
    {
      icon: 'FileText',
      title: 'Экспорт отчетов',
      description: 'Нажмите кнопку экспорта для скачивания данных в CSV/Excel'
    }
  ];

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-[#0066CC] text-white hover:bg-[#0052A3] hover:text-white border-0 z-40"
        >
          <Icon name="HelpCircle" size={24} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-6 mb-2" align="end" side="top">
        <Card className="border-0 shadow-none">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Icon name="Lightbulb" size={20} className="text-yellow-500" />
              Помощь
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {helpTopics.map((topic, index) => (
              <div key={index}>
                <div className="flex gap-3 items-start">
                  <Icon name={topic.icon as any} size={18} className="text-[#0066CC] mt-0.5 flex-shrink-0" />
                  <div>
                    <div className="font-medium text-sm">{topic.title}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{topic.description}</div>
                  </div>
                </div>
                {index < helpTopics.length - 1 && <Separator className="mt-3" />}
              </div>
            ))}
            
            <Separator />
            
            <div className="flex gap-2 pt-2">
              <Button variant="outline" size="sm" className="flex-1 gap-1">
                <Icon name="BookOpen" size={14} />
                Документация
              </Button>
              <Button variant="outline" size="sm" className="flex-1 gap-1">
                <Icon name="MessageCircle" size={14} />
                Поддержка
              </Button>
            </div>
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
