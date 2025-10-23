import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { UserRole } from './types';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

export function Header({ currentRole, onRoleChange }: HeaderProps) {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#0066CC] rounded-lg flex items-center justify-center">
              <Icon name="Package" className="text-white" size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-[#0066CC] font-inter">Siemens Supply Chain</h1>
              <p className="text-xs text-muted-foreground">Orchestrator Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Select value={currentRole} onValueChange={(value) => onRoleChange(value as UserRole)}>
              <SelectTrigger className="w-[220px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">
                  <div className="flex items-center gap-2">
                    <Icon name="Building2" size={16} />
                    <span>Заказчик (Siemens)</span>
                  </div>
                </SelectItem>
                <SelectItem value="supplier">
                  <div className="flex items-center gap-2">
                    <Icon name="Factory" size={16} />
                    <span>Поставщик</span>
                  </div>
                </SelectItem>
                <SelectItem value="carrier">
                  <div className="flex items-center gap-2">
                    <Icon name="Truck" size={16} />
                    <span>Грузчик</span>
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>

            <Button variant="ghost" size="icon">
              <Icon name="Bell" size={20} />
            </Button>
            <Button variant="ghost" size="icon" className="bg-red-500 text-white hover:bg-red-600 hover:text-white">
              <Icon name="User" size={20} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
