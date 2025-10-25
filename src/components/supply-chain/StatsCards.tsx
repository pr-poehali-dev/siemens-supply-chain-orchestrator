import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface StatsCardsProps {
  stats: {
    active: number;
    inTransit: number;
    delayed: number;
    delivered: number;
  };
}

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
      <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer border-l-4 border-l-[#0066CC]">
        <CardHeader className="pb-2 md:pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Активных отгрузок</CardTitle>
            <div className="w-10 h-10 rounded-full bg-[#0066CC]/10 flex items-center justify-center">
              <Icon name="Package" className="text-[#0066CC]" size={20} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl md:text-3xl font-bold font-roboto">{stats.active}</div>
          <p className="text-xs text-muted-foreground mt-1">Требуют обработки</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer border-l-4 border-l-[#FFB420]">
        <CardHeader className="pb-2 md:pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">В пути</CardTitle>
            <div className="w-10 h-10 rounded-full bg-[#FFB420]/10 flex items-center justify-center">
              <Icon name="Truck" className="text-[#FFB420]" size={20} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl md:text-3xl font-bold font-roboto">{stats.inTransit}</div>
          <p className="text-xs text-muted-foreground mt-1">На маршруте</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer border-l-4 border-l-[#FF4444]">
        <CardHeader className="pb-2 md:pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Задержаны</CardTitle>
            <div className="w-10 h-10 rounded-full bg-[#FF4444]/10 flex items-center justify-center">
              <Icon name="AlertTriangle" className="text-[#FF4444]" size={20} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl md:text-3xl font-bold font-roboto">{stats.delayed}</div>
          <p className="text-xs text-muted-foreground mt-1">Требует внимания</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer border-l-4 border-l-[#00AA55]">
        <CardHeader className="pb-2 md:pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xs md:text-sm font-medium text-muted-foreground">Доставлено</CardTitle>
            <div className="w-10 h-10 rounded-full bg-[#00AA55]/10 flex items-center justify-center">
              <Icon name="CheckCircle2" className="text-[#00AA55]" size={20} />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl md:text-3xl font-bold font-roboto">{stats.delivered}</div>
          <p className="text-xs text-muted-foreground mt-1">Всего завершено</p>
        </CardContent>
      </Card>
    </div>
  );
}