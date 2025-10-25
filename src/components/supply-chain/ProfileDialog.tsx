import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';
import { UserRole } from './types';
import { roleConfig } from './data';

interface ProfileDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  currentRole: UserRole;
}

export function ProfileDialog({ isOpen, onOpenChange, currentRole }: ProfileDialogProps) {
  const role = roleConfig[currentRole];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon name="User" size={24} />
            Профиль и настройки
          </DialogTitle>
          <DialogDescription>
            Управление вашим аккаунтом и настройками приложения
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="profile">Профиль</TabsTrigger>
            <TabsTrigger value="notifications">Уведомления</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Информация о пользователе</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 rounded-full ${role.color} bg-opacity-20 flex items-center justify-center`}>
                    <Icon name={role.icon as any} size={32} className={role.color} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg">{role.name}</div>
                    <div className="text-sm text-muted-foreground">{role.title}</div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <Label htmlFor="fullname">Полное имя</Label>
                    <Input id="fullname" defaultValue="Иван Петров" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="ivan.petrov@example.com" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input id="phone" defaultValue="+7 (999) 123-45-67" />
                  </div>
                  <div>
                    <Label htmlFor="company">Компания</Label>
                    <Input id="company" defaultValue={role.name} />
                  </div>
                </div>

                <Button className="w-full">
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить изменения
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Статистика активности</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">47</div>
                    <div className="text-sm text-muted-foreground">Отгрузок</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">98%</div>
                    <div className="text-sm text-muted-foreground">В срок</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">12</div>
                    <div className="text-sm text-muted-foreground">В процессе</div>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="text-2xl font-bold">4.9</div>
                    <div className="text-sm text-muted-foreground">Рейтинг</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Уведомления о статусах</CardTitle>
                <CardDescription>Настройте, какие уведомления вы хотите получать</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Новая отгрузка</Label>
                    <div className="text-sm text-muted-foreground">Уведомление при создании новой отгрузки</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Изменение статуса</Label>
                    <div className="text-sm text-muted-foreground">Уведомление при изменении статуса доставки</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Задержка доставки</Label>
                    <div className="text-sm text-muted-foreground">Уведомление о задержках в доставке</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Успешная доставка</Label>
                    <div className="text-sm text-muted-foreground">Уведомление о завершении доставки</div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Email рассылки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Еженедельный отчет</Label>
                    <div className="text-sm text-muted-foreground">Сводка по отгрузкам за неделю</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Аналитика производительности</Label>
                    <div className="text-sm text-muted-foreground">Месячные показатели эффективности</div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Основные настройки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="language">Язык интерфейса</Label>
                  <select id="language" className="w-full mt-1 px-3 py-2 border rounded-md">
                    <option>Русский</option>
                    <option>English</option>
                    <option>Deutsch</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="timezone">Часовой пояс</Label>
                  <select id="timezone" className="w-full mt-1 px-3 py-2 border rounded-md">
                    <option>UTC+3 (Москва)</option>
                    <option>UTC+0 (GMT)</option>
                    <option>UTC+1 (Берлин)</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Темная тема</Label>
                    <div className="text-sm text-muted-foreground">Использовать темное оформление</div>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Безопасность</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Двухфакторная аутентификация</Label>
                    <div className="text-sm text-muted-foreground">Дополнительный уровень защиты</div>
                  </div>
                  <Switch />
                </div>
                <Button variant="outline" className="w-full">
                  <Icon name="Key" size={16} className="mr-2" />
                  Изменить пароль
                </Button>
                <Button variant="outline" className="w-full">
                  <Icon name="Download" size={16} className="mr-2" />
                  Экспорт данных
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
