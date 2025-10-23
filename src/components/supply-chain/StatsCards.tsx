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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Активных отгрузок</CardTitle>
            <Icon name="Package" className="text-[#0066CC]" size={20} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold font-roboto">{stats.active}</div>
          <p className="text-xs text-muted-foreground mt-1">Требуют обработки</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">В пути</CardTitle>
            <Icon name="Truck" className="text-[#FFB420]" size={20} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold font-roboto">{stats.inTransit}</div>
          <p className="text-xs text-muted-foreground mt-1">На маршруте</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Задержаны</CardTitle>
            <Icon name="AlertTriangle" className="text-[#FF4444]" size={20} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold font-roboto">{stats.delayed}</div>
          <p className="text-xs text-muted-foreground mt-1">Требует внимания</p>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-muted-foreground">Доставлено</CardTitle>
            <Icon name="CheckCircle2" className="text-[#00AA55]" size={20} />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold font-roboto">{stats.delivered}</div>
          <p className="text-xs text-muted-foreground mt-1">Всего завершено</p>
        </CardContent>
      </Card>
    </div>
  );
}
