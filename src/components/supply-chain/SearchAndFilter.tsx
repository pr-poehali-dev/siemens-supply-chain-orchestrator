import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import Icon from '@/components/ui/icon';
import { ShipmentStatus } from './types';
import { Badge } from '@/components/ui/badge';

interface SearchAndFilterProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedStatuses: ShipmentStatus[];
  onStatusToggle: (status: ShipmentStatus) => void;
  onClearFilters: () => void;
}

const statusOptions: { value: ShipmentStatus; label: string; color: string }[] = [
  { value: 'pending', label: 'Ожидает', color: 'bg-gray-100 text-gray-700' },
  { value: 'ready', label: 'Готов к отправке', color: 'bg-blue-100 text-blue-700' },
  { value: 'in_transit', label: 'В пути', color: 'bg-purple-100 text-purple-700' },
  { value: 'delayed', label: 'Задержан', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'delivered', label: 'Доставлен', color: 'bg-green-100 text-green-700' }
];

export function SearchAndFilter({
  searchQuery,
  onSearchChange,
  selectedStatuses,
  onStatusToggle,
  onClearFilters
}: SearchAndFilterProps) {
  const activeFiltersCount = selectedStatuses.length;

  return (
    <div className="flex gap-2 items-center">
      <div className="relative flex-1 max-w-md">
        <Icon name="Search" size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Поиск по ID, компоненту, поставщику..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
        {searchQuery && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => onSearchChange('')}
          >
            <Icon name="X" size={14} />
          </Button>
        )}
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="gap-2 relative">
            <Icon name="Filter" size={16} />
            Фильтры
            {activeFiltersCount > 0 && (
              <Badge variant="secondary" className="ml-1 px-1.5 py-0 h-5 min-w-[20px]">
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-64" align="end">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="font-semibold">Фильтры</div>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={onClearFilters} className="h-auto p-1 text-xs">
                  Сбросить
                </Button>
              )}
            </div>

            <div className="space-y-3">
              <Label className="text-sm font-medium">Статус отгрузки</Label>
              {statusOptions.map((option) => (
                <div key={option.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.value}
                    checked={selectedStatuses.includes(option.value)}
                    onCheckedChange={() => onStatusToggle(option.value)}
                  />
                  <label
                    htmlFor={option.value}
                    className="text-sm flex-1 cursor-pointer flex items-center gap-2"
                  >
                    <span className={`px-2 py-0.5 rounded text-xs ${option.color}`}>
                      {option.label}
                    </span>
                  </label>
                </div>
              ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <Button variant="outline" size="icon" title="Экспорт данных">
        <Icon name="Download" size={16} />
      </Button>
    </div>
  );
}
