import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface MapTabProps {
  stats: {
    inTransit: number;
    delayed: number;
    delivered: number;
  };
}

export function MapTab({ stats }: MapTabProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative w-full h-[600px] bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#0066CC] rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#FFB420] rounded-full blur-3xl" />
          </div>
          
          <div className="relative text-center space-y-4 z-10">
            <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto">
              <Icon name="Map" size={48} className="text-[#0066CC]" />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-2 font-inter">Интерактивная карта маршрутов</h3>
              <p className="text-muted-foreground max-w-md">
                Визуализация всех активных отгрузок в реальном времени с отслеживанием GPS координат
              </p>
            </div>
            <div className="flex items-center justify-center gap-4 pt-4">
              <Badge variant="outline" className="bg-white border-[#FFB420]/30">
                <div className="w-2 h-2 rounded-full bg-[#FFB420] mr-2" />
                В пути: {stats.inTransit}
              </Badge>
              <Badge variant="outline" className="bg-white border-[#FF4444]/30">
                <div className="w-2 h-2 rounded-full bg-[#FF4444] mr-2" />
                Задержаны: {stats.delayed}
              </Badge>
              <Badge variant="outline" className="bg-white border-[#00AA55]/30">
                <div className="w-2 h-2 rounded-full bg-[#00AA55] mr-2" />
                Доставлены: {stats.delivered}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
