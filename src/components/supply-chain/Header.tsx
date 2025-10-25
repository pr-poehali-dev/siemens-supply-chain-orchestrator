import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { UserRole } from './types';
import { NotificationsPopover } from './NotificationsPopover';

interface HeaderProps {
  currentRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onProfileClick: () => void;
}

export function Header({ currentRole, onRoleChange, onProfileClick }: HeaderProps) {
  return (
    <header className="border-b bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 md:gap-3 min-w-0">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-[#0066CC] rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Package" className="text-white" size={20} />
            </div>
            <div className="min-w-0">
              <h1 className="text-base md:text-xl font-bold text-[#0066CC] font-inter truncate">Siemens Supply Chain</h1>
              <p className="text-[10px] md:text-xs text-muted-foreground hidden sm:block">Orchestrator Platform</p>
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <Select value={currentRole} onValueChange={(value) => onRoleChange(value as UserRole)}>
              <SelectTrigger className="w-[140px] md:w-[220px] text-xs md:text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="customer">
                  <div className="flex items-center gap-2">
                    <Icon name="Building2" size={16} />
                    <span className="hidden md:inline">Заказчик (Siemens)</span>
                    <span className="md:hidden">Заказчик</span>
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

            <NotificationsPopover />
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-[#0066CC] text-white hover:bg-[#0052A3] hover:text-white h-9 w-9 md:h-10 md:w-10"
              onClick={onProfileClick}
            >
              <Icon name="User" size={18} />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}