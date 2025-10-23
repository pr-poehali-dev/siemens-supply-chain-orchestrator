import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="TrendingUp" size={20} className="text-[#0066CC]" />
              Надежность поставщиков
            </CardTitle>
            <CardDescription>Процент своевременных доставок за последний квартал</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">DisplayCo</span>
                  <span className="text-sm font-bold text-[#00AA55]">94%</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div className="bg-[#00AA55] h-full rounded-full transition-all duration-500" style={{ width: '94%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">BatteryLtd</span>
                  <span className="text-sm font-bold text-[#FFB420]">87%</span>
                </div>
                <div className="bg-gray-100 rounded-full h-2">
                  <div className="bg-[#FFB420] h-full rounded-full transition-all duration-500" style={{ width: '87%' }} />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon name="Clock" size={20} className="text-[#0066CC]" />
              Среднее время доставки
            </CardTitle>
            <CardDescription>По типам компонентов (в днях)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg transition-all hover:shadow-md">
                <div className="flex items-center gap-2">
                  <Icon name="Monitor" size={16} className="text-[#0066CC]" />
                  <span className="text-sm font-medium">Дисплеи</span>
                </div>
                <span className="text-lg font-bold font-roboto">12 дней</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg transition-all hover:shadow-md">
                <div className="flex items-center gap-2">
                  <Icon name="Battery" size={16} className="text-[#FFB420]" />
                  <span className="text-sm font-medium">Аккумуляторы</span>
                </div>
                <span className="text-lg font-bold font-roboto">9 дней</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg transition-all hover:shadow-md">
                <div className="flex items-center gap-2">
                  <Icon name="Cpu" size={16} className="text-[#00AA55]" />
                  <span className="text-sm font-medium">Процессоры</span>
                </div>
                <span className="text-lg font-bold font-roboto">14 дней</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="AlertCircle" size={20} className="text-[#FF4444]" />
            Статистика задержек
          </CardTitle>
          <CardDescription>Анализ причин задержек за последний месяц</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <Icon name="CloudOff" size={24} className="text-muted-foreground" />
                <span className="text-2xl font-bold font-roboto text-[#FF4444]">23%</span>
              </div>
              <p className="text-sm font-medium">Погодные условия</p>
              <p className="text-xs text-muted-foreground mt-1">5 случаев</p>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <Icon name="FileX" size={24} className="text-muted-foreground" />
                <span className="text-2xl font-bold font-roboto text-[#FFB420]">31%</span>
              </div>
              <p className="text-sm font-medium">Таможня</p>
              <p className="text-xs text-muted-foreground mt-1">7 случаев</p>
            </div>
            <div className="p-4 border rounded-lg hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-2">
                <Icon name="Wrench" size={24} className="text-muted-foreground" />
                <span className="text-2xl font-bold font-roboto text-[#0066CC]">46%</span>
              </div>
              <p className="text-sm font-medium">Технические проблемы</p>
              <p className="text-xs text-muted-foreground mt-1">10 случаев</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
