import Icon from '@/components/ui/icon';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-white mt-auto">
      <div className="container mx-auto px-4 md:px-6 py-6 md:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-6 md:mb-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-3 md:mb-4">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-[#0066CC] rounded-lg flex items-center justify-center">
                <Icon name="Package" className="text-white" size={16} />
              </div>
              <span className="font-bold text-sm md:text-base text-[#0066CC]">Siemens Supply Chain</span>
            </div>
            <p className="text-xs md:text-sm text-muted-foreground">
              Платформа для управления цепочками поставок в режиме реального времени
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Продукт</h3>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Возможности</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Интеграции</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Цены</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Ресурсы</h3>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Документация</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Обучение</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Поддержка</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Статус системы</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2 md:mb-3 text-sm md:text-base">Компания</h3>
            <ul className="space-y-1.5 md:space-y-2 text-xs md:text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">О нас</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Карьера</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Новости</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Контакты</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-4 md:pt-6 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <div className="text-xs md:text-sm text-muted-foreground text-center md:text-left">
              © {currentYear} Siemens AG. Все права защищены.
            </div>
            <div className="flex gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Конфиденциальность</a>
              <a href="#" className="hover:text-foreground transition-colors">Условия</a>
              <a href="#" className="hover:text-foreground transition-colors">Cookies</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}