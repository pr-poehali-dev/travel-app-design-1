import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/95e4d448-a635-4774-8f58-60be2f40a2da/files/6721e4cf-34b7-454d-92ee-a438298aaa84.jpg";
const HOTEL_IMAGE = "https://cdn.poehali.dev/projects/95e4d448-a635-4774-8f58-60be2f40a2da/files/ac9b7a28-47af-4b13-89cc-f3085732deb7.jpg";
const PARIS_IMAGE = "https://cdn.poehali.dev/projects/95e4d448-a635-4774-8f58-60be2f40a2da/files/d8e9420a-15d7-4156-9e1a-6824c1cb0288.jpg";

type Page = "home" | "results" | "booking" | "profile" | "saved" | "reviews";

const hotels = [
  {
    id: 1,
    name: "Grand Palace Hotel",
    city: "Дубай",
    stars: 5,
    rating: 4.9,
    reviews: 2841,
    price: 18500,
    oldPrice: 24000,
    image: HOTEL_IMAGE,
    tags: ["Бассейн", "SPA", "Завтрак"],
    saved: true,
  },
  {
    id: 2,
    name: "Eiffel Luxe Residence",
    city: "Париж",
    stars: 5,
    rating: 4.7,
    reviews: 1523,
    price: 22300,
    oldPrice: null,
    image: PARIS_IMAGE,
    tags: ["Вид на башню", "Ресторан", "Трансфер"],
    saved: false,
  },
  {
    id: 3,
    name: "Azure Beach Resort",
    city: "Бали",
    stars: 4,
    rating: 4.8,
    reviews: 3201,
    price: 12900,
    oldPrice: 16000,
    image: HERO_IMAGE,
    tags: ["Пляж", "Бассейн", "Дайвинг"],
    saved: true,
  },
  {
    id: 4,
    name: "Tokyo Sky Tower Suite",
    city: "Токио",
    stars: 5,
    rating: 4.6,
    reviews: 987,
    price: 31000,
    oldPrice: null,
    image: HOTEL_IMAGE,
    tags: ["Панорама", "Онсэн", "Сейф"],
    saved: false,
  },
];

const tickets = [
  { id: 1, from: "Москва", to: "Дубай", date: "15 марта", airline: "Emirates", duration: "5ч 20м", price: 28900, class: "Бизнес" },
  { id: 2, from: "Москва", to: "Париж", date: "20 марта", airline: "Air France", duration: "3ч 45м", price: 14500, class: "Эконом" },
  { id: 3, from: "Москва", to: "Бали", date: "1 апреля", airline: "Garuda", duration: "12ч 30м", price: 42000, class: "Эконом" },
];

const bookings = [
  { id: 1, type: "Отель", name: "Grand Palace Hotel", city: "Дубай", dates: "15–22 марта", status: "Подтверждено", price: 129500, image: HOTEL_IMAGE },
  { id: 2, type: "Билет", name: "Москва → Дубай", city: "Emirates", dates: "15 марта, 10:30", status: "Подтверждено", price: 28900, image: HOTEL_IMAGE },
  { id: 3, type: "Экскурсия", name: "Пустынное сафари", city: "Дубай", dates: "18 марта", status: "Ожидание", price: 8500, image: HERO_IMAGE },
];

const reviewsList = [
  { id: 1, author: "Анна М.", hotel: "Grand Palace Hotel", rating: 5, date: "12 фев 2026", text: "Невероятный отель! Сервис на высшем уровне, завтрак великолепный. Обязательно вернёмся.", avatar: "👩‍💼" },
  { id: 2, author: "Дмитрий К.", hotel: "Azure Beach Resort", rating: 5, date: "3 фев 2026", text: "Лучший отдых в жизни! Пляж прямо у номера, персонал внимательный. Рекомендую всем!", avatar: "👨‍💻" },
  { id: 3, author: "Елена С.", hotel: "Eiffel Luxe Residence", rating: 4, date: "28 янв 2026", text: "Отличное расположение, вид на Эйфелеву башню. Немного шумно по вечерам, но это Париж!", avatar: "👩‍🎨" },
];

const destinations = [
  { city: "Дубай", country: "ОАЭ", from: "от 28 900 ₽", emoji: "🏙️", bg: "from-amber-400 to-orange-500" },
  { city: "Бали", country: "Индонезия", from: "от 42 000 ₽", emoji: "🌴", bg: "from-green-400 to-teal-500" },
  { city: "Париж", country: "Франция", from: "от 14 500 ₽", emoji: "🗼", bg: "from-blue-400 to-indigo-500" },
  { city: "Токио", country: "Япония", from: "от 58 000 ₽", emoji: "🗾", bg: "from-pink-400 to-rose-500" },
];

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [searchTab, setSearchTab] = useState("hotels");
  const [savedItems, setSavedItems] = useState<number[]>([1, 3]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedHotel, setSelectedHotel] = useState<typeof hotels[0] | null>(null);
  const [sortBy, setSortBy] = useState("rating");
  const [filterStars, setFilterStars] = useState<number | null>(null);

  const toggleSave = (id: number) => {
    setSavedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const filteredHotels = hotels
    .filter(h => !filterStars || h.stars === filterStars)
    .filter(h => h.price >= priceRange[0] && h.price <= priceRange[1])
    .sort((a, b) => sortBy === "rating" ? b.rating - a.rating : a.price - b.price);

  const savedHotels = hotels.filter(h => savedItems.includes(h.id));

  return (
    <div className="min-h-screen bg-gray-50 font-inter">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-dark">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <button onClick={() => setPage("home")} className="flex items-center gap-2">
            <div className="w-8 h-8 gradient-brand rounded-lg flex items-center justify-center">
              <Icon name="Globe" size={16} className="text-white" />
            </div>
            <span className="font-montserrat font-800 text-white text-xl font-extrabold tracking-tight">TravelGo</span>
          </button>

          <div className="flex items-center gap-1">
            {[
              { id: "home", icon: "Search", label: "Поиск" },
              { id: "saved", icon: "Heart", label: "Избранное" },
              { id: "reviews", icon: "Star", label: "Отзывы" },
              { id: "profile", icon: "User", label: "Кабинет" },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setPage(item.id as Page)}
                className={`flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl transition-all ${
                  page === item.id ? "bg-white/20 text-white" : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
              >
                <Icon name={item.icon} fallback="CircleAlert" size={18} />
                <span className="text-xs hidden sm:block">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* HOME */}
      {page === "home" && (
        <div>
          {/* HERO */}
          <div className="relative h-screen min-h-[600px] gradient-hero overflow-hidden">
            <img src={HERO_IMAGE} alt="hero" className="absolute inset-0 w-full h-full object-cover opacity-30" />
            <div className="absolute inset-0 gradient-hero opacity-70" />

            {/* Floating badges */}
            <div className="absolute top-28 left-8 glass rounded-2xl px-4 py-3 animate-fade-in hidden lg:flex items-center gap-3">
              <div className="w-10 h-10 gradient-brand rounded-xl flex items-center justify-center text-lg">🏆</div>
              <div>
                <div className="text-white font-semibold text-sm">Лучшая цена</div>
                <div className="text-white/60 text-xs">Гарантировано</div>
              </div>
            </div>
            <div className="absolute top-36 right-8 glass rounded-2xl px-4 py-3 animate-fade-in hidden lg:flex items-center gap-3" style={{animationDelay: '0.2s'}}>
              <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center text-lg">✅</div>
              <div>
                <div className="text-white font-semibold text-sm">Безопасная оплата</div>
                <div className="text-white/60 text-xs">SSL шифрование</div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 pt-16">
              <Badge className="mb-6 bg-white/10 text-white border-white/20 px-4 py-1.5 text-sm font-medium animate-fade-in">
                ✈️ Более 50 000 направлений
              </Badge>
              <h1 className="font-montserrat text-5xl md:text-7xl font-black text-white text-center leading-tight mb-4 animate-fade-in" style={{animationDelay:'0.1s'}}>
                Весь мир —<br />
                <span className="text-gradient">в одном месте</span>
              </h1>
              <p className="text-white/70 text-lg md:text-xl text-center max-w-lg mb-10 animate-fade-in" style={{animationDelay:'0.2s'}}>
                Отели, авиабилеты и экскурсии по лучшим ценам. Безопасная оплата и мгновенное подтверждение.
              </p>

              {/* Search box */}
              <div className="w-full max-w-3xl glass rounded-3xl p-2 animate-fade-in" style={{animationDelay:'0.3s'}}>
                <Tabs value={searchTab} onValueChange={setSearchTab} className="w-full">
                  <TabsList className="bg-white/10 border-0 rounded-2xl mb-3 w-full">
                    <TabsTrigger value="hotels" className="flex-1 text-white data-[state=active]:bg-white data-[state=active]:text-brand-purple rounded-xl gap-2">
                      <Icon name="Building2" size={15} /> Отели
                    </TabsTrigger>
                    <TabsTrigger value="flights" className="flex-1 text-white data-[state=active]:bg-white data-[state=active]:text-brand-purple rounded-xl gap-2">
                      <Icon name="Plane" size={15} /> Билеты
                    </TabsTrigger>
                    <TabsTrigger value="tours" className="flex-1 text-white data-[state=active]:bg-white data-[state=active]:text-brand-purple rounded-xl gap-2">
                      <Icon name="Map" size={15} /> Туры
                    </TabsTrigger>
                  </TabsList>

                  <div className="flex flex-col sm:flex-row gap-2 p-2">
                    <div className="flex-1 bg-white rounded-2xl flex items-center gap-3 px-4 py-3">
                      <Icon name="MapPin" size={18} className="text-brand-purple shrink-0" />
                      <input placeholder={searchTab === "hotels" ? "Куда едем?" : searchTab === "flights" ? "Откуда летим?" : "Направление"}
                        className="bg-transparent outline-none text-gray-800 w-full font-medium placeholder:text-gray-400" />
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-white rounded-2xl flex items-center gap-2 px-4 py-3">
                        <Icon name="Calendar" size={16} className="text-brand-purple" />
                        <input placeholder="Дата" className="bg-transparent outline-none text-gray-800 w-24 font-medium placeholder:text-gray-400" />
                      </div>
                      <button
                        onClick={() => setPage("results")}
                        className="gradient-brand text-white px-6 py-3 rounded-2xl font-semibold hover:opacity-90 transition-opacity flex items-center gap-2 whitespace-nowrap"
                      >
                        <Icon name="Search" size={16} />
                        Найти
                      </button>
                    </div>
                  </div>
                </Tabs>
              </div>

              {/* Stats */}
              <div className="flex gap-8 mt-10 animate-fade-in" style={{animationDelay:'0.4s'}}>
                {[
                  { val: "50K+", label: "Отелей" },
                  { val: "200+", label: "Стран" },
                  { val: "2M+", label: "Клиентов" },
                ].map(s => (
                  <div key={s.val} className="text-center">
                    <div className="font-montserrat text-2xl font-black text-white">{s.val}</div>
                    <div className="text-white/50 text-sm">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-pulse-soft">
              <Icon name="ChevronDown" size={28} className="text-white/40" />
            </div>
          </div>

          {/* DESTINATIONS */}
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-montserrat text-3xl font-bold text-gray-900">Популярные направления</h2>
                <p className="text-gray-500 mt-1">Самые востребованные маршруты этого сезона</p>
              </div>
              <Button variant="outline" onClick={() => setPage("results")} className="hidden sm:flex gap-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white">
                Все направления <Icon name="ArrowRight" size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              {destinations.map((d, i) => (
                <button
                  key={d.city}
                  onClick={() => setPage("results")}
                  className={`relative overflow-hidden rounded-3xl p-6 bg-gradient-to-br ${d.bg} card-hover text-left`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="text-4xl mb-3">{d.emoji}</div>
                  <div className="font-montserrat font-bold text-white text-xl">{d.city}</div>
                  <div className="text-white/70 text-sm mb-2">{d.country}</div>
                  <div className="text-white font-semibold text-sm">{d.from}</div>
                  <div className="absolute top-3 right-3 bg-white/20 rounded-full p-1.5">
                    <Icon name="ArrowUpRight" size={14} className="text-white" />
                  </div>
                </button>
              ))}
            </div>

            {/* TOP HOTELS */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-montserrat text-3xl font-bold text-gray-900">Топ отели</h2>
                <p className="text-gray-500 mt-1">По отзывам наших путешественников</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {hotels.map((hotel, i) => (
                <div
                  key={hotel.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm card-hover cursor-pointer"
                  style={{ animationDelay: `${i * 0.1}s` }}
                  onClick={() => { setSelectedHotel(hotel); setPage("booking"); }}
                >
                  <div className="relative">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
                    <button
                      className="absolute top-3 right-3 bg-white/90 rounded-full p-2 hover:bg-white transition-colors"
                      onClick={(e) => { e.stopPropagation(); toggleSave(hotel.id); }}
                    >
                      <Icon name="Heart" size={16} className={savedItems.includes(hotel.id) ? "text-red-500 fill-red-500" : "text-gray-400"} />
                    </button>
                    {hotel.oldPrice && (
                      <Badge className="absolute top-3 left-3 bg-brand-orange text-white border-0">
                        -{Math.round((1 - hotel.price / hotel.oldPrice) * 100)}%
                      </Badge>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-center gap-1 mb-1">
                      {"★".repeat(hotel.stars).split("").map((_, i) => (
                        <span key={i} className="text-yellow-400 text-xs">★</span>
                      ))}
                    </div>
                    <h3 className="font-montserrat font-bold text-gray-900 text-sm mb-1 line-clamp-1">{hotel.name}</h3>
                    <div className="flex items-center gap-1 text-gray-500 text-xs mb-3">
                      <Icon name="MapPin" size={12} />
                      {hotel.city}
                    </div>
                    <div className="flex flex-wrap gap-1 mb-3">
                      {hotel.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs bg-purple-50 text-brand-purple px-2 py-0.5 rounded-full">{tag}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-montserrat font-black text-gray-900">{hotel.price.toLocaleString()} ₽</span>
                        <span className="text-gray-400 text-xs">/ночь</span>
                        {hotel.oldPrice && <div className="text-gray-400 text-xs line-through">{hotel.oldPrice.toLocaleString()} ₽</div>}
                      </div>
                      <div className="flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
                        <span className="text-green-600 font-bold text-sm">{hotel.rating}</span>
                        <Icon name="Star" size={12} className="text-green-500 fill-green-500" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 gradient-brand rounded-3xl p-10 text-center">
              <h2 className="font-montserrat text-3xl font-black text-white mb-3">Безопасная оплата</h2>
              <p className="text-white/80 mb-6 max-w-md mx-auto">Поддерживаем все популярные способы оплаты. Возврат средств при отмене за 24 часа.</p>
              <div className="flex justify-center gap-4 flex-wrap">
                {["💳 Банковская карта", "🏦 СБП", "📱 Apple Pay", "🔒 Защита покупки"].map(m => (
                  <span key={m} className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-medium">{m}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RESULTS */}
      {page === "results" && (
        <div className="pt-16">
          <div className="gradient-hero px-4 py-12">
            <div className="max-w-7xl mx-auto">
              <h1 className="font-montserrat text-3xl font-bold text-white mb-2">Результаты поиска</h1>
              <p className="text-white/60">Найдено {filteredHotels.length} вариантов</p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 py-8 flex gap-6">
            {/* Filters */}
            <div className="w-64 shrink-0 hidden lg:block">
              <div className="bg-white rounded-3xl p-6 shadow-sm sticky top-24">
                <h3 className="font-montserrat font-bold text-gray-900 mb-5">Фильтры</h3>

                <div className="mb-6">
                  <div className="text-sm font-semibold text-gray-700 mb-3">Звёздность</div>
                  <div className="flex gap-2 flex-wrap">
                    {[null, 4, 5].map(s => (
                      <button
                        key={s}
                        onClick={() => setFilterStars(s)}
                        className={`px-3 py-1.5 rounded-xl text-sm font-medium transition-all ${
                          filterStars === s ? "gradient-brand text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                      >
                        {s === null ? "Все" : `${s}★`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-6">
                  <div className="text-sm font-semibold text-gray-700 mb-3">
                    Цена за ночь: до {priceRange[1].toLocaleString()} ₽
                  </div>
                  <Slider
                    min={0} max={50000} step={1000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="w-full"
                  />
                </div>

                <div className="mb-6">
                  <div className="text-sm font-semibold text-gray-700 mb-3">Сортировать по</div>
                  {[
                    { val: "rating", label: "Рейтингу" },
                    { val: "price", label: "Цене" },
                  ].map(s => (
                    <button
                      key={s.val}
                      onClick={() => setSortBy(s.val)}
                      className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium mb-1.5 transition-all ${
                        sortBy === s.val ? "bg-purple-50 text-brand-purple" : "hover:bg-gray-50 text-gray-600"
                      }`}
                    >
                      {sortBy === s.val && <span className="mr-2">✓</span>}{s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Hotel grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-5">
                <Tabs value={searchTab} onValueChange={setSearchTab}>
                  <TabsList>
                    <TabsTrigger value="hotels" className="gap-1.5"><Icon name="Building2" size={14} />Отели</TabsTrigger>
                    <TabsTrigger value="flights" className="gap-1.5"><Icon name="Plane" size={14} />Билеты</TabsTrigger>
                    <TabsTrigger value="tours" className="gap-1.5"><Icon name="Map" size={14} />Туры</TabsTrigger>
                  </TabsList>
                </Tabs>
                <span className="text-sm text-gray-500">{filteredHotels.length} вариантов</span>
              </div>

              {searchTab === "hotels" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {filteredHotels.map(hotel => (
                    <div
                      key={hotel.id}
                      className="bg-white rounded-3xl overflow-hidden shadow-sm card-hover cursor-pointer"
                      onClick={() => { setSelectedHotel(hotel); setPage("booking"); }}
                    >
                      <div className="relative">
                        <img src={hotel.image} alt={hotel.name} className="w-full h-52 object-cover" />
                        <button
                          className="absolute top-3 right-3 bg-white/90 rounded-full p-2"
                          onClick={(e) => { e.stopPropagation(); toggleSave(hotel.id); }}
                        >
                          <Icon name="Heart" size={16} className={savedItems.includes(hotel.id) ? "text-red-500 fill-red-500" : "text-gray-400"} />
                        </button>
                        {hotel.oldPrice && (
                          <Badge className="absolute top-3 left-3 bg-brand-orange text-white border-0">
                            -{Math.round((1 - hotel.price / hotel.oldPrice) * 100)}%
                          </Badge>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="flex gap-0.5 mb-1">
                              {"★".repeat(hotel.stars).split("").map((_, i) => (
                                <span key={i} className="text-yellow-400 text-sm">★</span>
                              ))}
                            </div>
                            <h3 className="font-montserrat font-bold text-gray-900">{hotel.name}</h3>
                            <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                              <Icon name="MapPin" size={13} />{hotel.city}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-montserrat font-black text-gray-900 text-lg">{hotel.price.toLocaleString()} ₽</div>
                            <div className="text-gray-400 text-xs">/ночь</div>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {hotel.tags.map(tag => (
                            <span key={tag} className="text-xs bg-purple-50 text-brand-purple px-2.5 py-1 rounded-full">{tag}</span>
                          ))}
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center gap-1.5">
                            <div className="flex items-center gap-1 bg-green-50 px-2.5 py-1 rounded-full">
                              <span className="text-green-600 font-bold text-sm">{hotel.rating}</span>
                              <Icon name="Star" size={12} className="text-green-500 fill-green-500" />
                            </div>
                            <span className="text-gray-400 text-xs">{hotel.reviews.toLocaleString()} отзывов</span>
                          </div>
                          <button className="gradient-brand text-white text-sm px-4 py-2 rounded-xl font-semibold hover:opacity-90">
                            Забронировать
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {searchTab === "flights" && (
                <div className="flex flex-col gap-4">
                  {tickets.map(t => (
                    <div key={t.id} className="bg-white rounded-3xl p-6 shadow-sm card-hover cursor-pointer" onClick={() => setPage("booking")}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <div className="text-center">
                            <div className="font-montserrat font-black text-2xl text-gray-900">{t.from}</div>
                            <div className="text-gray-400 text-sm">{t.date}</div>
                          </div>
                          <div className="flex flex-col items-center gap-1">
                            <div className="text-xs text-gray-400">{t.duration}</div>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 rounded-full bg-brand-purple" />
                              <div className="w-20 h-px bg-gray-300" />
                              <Icon name="Plane" size={16} className="text-brand-purple" />
                              <div className="w-20 h-px bg-gray-300" />
                              <div className="w-2 h-2 rounded-full bg-brand-purple" />
                            </div>
                            <div className="text-xs text-gray-400">{t.airline}</div>
                          </div>
                          <div className="text-center">
                            <div className="font-montserrat font-black text-2xl text-gray-900">{t.to}</div>
                            <Badge variant="outline" className="text-xs border-brand-purple text-brand-purple mt-1">{t.class}</Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-montserrat font-black text-2xl text-gray-900">{t.price.toLocaleString()} ₽</div>
                          <button className="gradient-brand text-white text-sm px-5 py-2.5 rounded-xl font-semibold hover:opacity-90 mt-2 block">
                            Купить
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {searchTab === "tours" && (
                <div className="flex items-center justify-center h-64 bg-white rounded-3xl">
                  <div className="text-center">
                    <div className="text-5xl mb-4">🗺️</div>
                    <div className="font-montserrat font-bold text-gray-900">Туры скоро появятся</div>
                    <div className="text-gray-400 text-sm mt-1">Мы работаем над лучшими предложениями</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* BOOKING */}
      {page === "booking" && (
        <div className="pt-16">
          <div className="gradient-hero px-4 py-12">
            <div className="max-w-3xl mx-auto">
              <button onClick={() => setPage("results")} className="flex items-center gap-2 text-white/60 hover:text-white mb-4 transition-colors">
                <Icon name="ArrowLeft" size={16} /> Назад
              </button>
              <h1 className="font-montserrat text-3xl font-bold text-white">Оформление бронирования</h1>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-4 py-8">
            {selectedHotel && (
              <div className="bg-white rounded-3xl p-5 mb-6 shadow-sm flex gap-4">
                <img src={selectedHotel.image} alt={selectedHotel.name} className="w-24 h-24 rounded-2xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-montserrat font-bold text-gray-900">{selectedHotel.name}</h3>
                  <div className="flex items-center gap-1 text-gray-500 text-sm mt-1">
                    <Icon name="MapPin" size={13} />{selectedHotel.city}
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className="bg-green-50 text-green-600 border-0">{selectedHotel.rating} ★</Badge>
                    <span className="font-montserrat font-black text-gray-900">{selectedHotel.price.toLocaleString()} ₽/ночь</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
              <h3 className="font-montserrat font-bold text-gray-900 mb-5">Даты и гости</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Заезд</label>
                  <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-2">
                    <Icon name="Calendar" size={16} className="text-brand-purple" />
                    <input defaultValue="15 марта 2026" className="outline-none text-gray-800 w-full text-sm" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Выезд</label>
                  <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-2">
                    <Icon name="Calendar" size={16} className="text-brand-purple" />
                    <input defaultValue="22 марта 2026" className="outline-none text-gray-800 w-full text-sm" />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Количество гостей</label>
                <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-2">
                  <Icon name="Users" size={16} className="text-brand-purple" />
                  <select className="outline-none text-gray-800 w-full text-sm bg-transparent">
                    <option>1 взрослый</option>
                    <option>2 взрослых</option>
                    <option>2 взрослых, 1 ребёнок</option>
                    <option>2 взрослых, 2 детей</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
              <h3 className="font-montserrat font-bold text-gray-900 mb-5">Данные гостя</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Имя</label>
                  <Input placeholder="Александр" className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Фамилия</label>
                  <Input placeholder="Петров" className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                  <Input type="email" placeholder="email@example.com" className="rounded-xl" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Телефон</label>
                  <Input type="tel" placeholder="+7 (999) 000-00-00" className="rounded-xl" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
              <h3 className="font-montserrat font-bold text-gray-900 mb-5 flex items-center gap-2">
                <Icon name="CreditCard" size={20} className="text-brand-purple" /> Оплата
              </h3>
              <div className="flex gap-3 mb-5">
                {["💳 Карта", "🏦 СБП", "📱 Apple Pay"].map((m, i) => (
                  <button key={m} className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all border-2 ${
                    i === 0 ? "border-brand-purple bg-purple-50 text-brand-purple" : "border-gray-200 text-gray-600 hover:border-brand-purple"
                  }`}>{m}</button>
                ))}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Номер карты</label>
                  <Input placeholder="0000 0000 0000 0000" className="rounded-xl font-mono" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Срок действия</label>
                    <Input placeholder="MM/YY" className="rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">CVV</label>
                    <Input placeholder="•••" type="password" className="rounded-xl" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 shadow-sm mb-6">
              <h3 className="font-montserrat font-bold text-gray-900 mb-4">Итого</h3>
              {[
                { label: "Стоимость (7 ночей)", val: selectedHotel ? `${(selectedHotel.price * 7).toLocaleString()} ₽` : "129 500 ₽" },
                { label: "Сервисный сбор", val: "2 590 ₽" },
                { label: "Налоги и сборы", val: "1 300 ₽" },
              ].map(row => (
                <div key={row.label} className="flex justify-between py-2.5 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600 text-sm">{row.label}</span>
                  <span className="font-semibold text-gray-900">{row.val}</span>
                </div>
              ))}
              <div className="flex justify-between pt-4 mt-2">
                <span className="font-montserrat font-bold text-gray-900">К оплате</span>
                <span className="font-montserrat font-black text-2xl text-brand-purple">{selectedHotel ? `${(selectedHotel.price * 7 + 3890).toLocaleString()} ₽` : "133 390 ₽"}</span>
              </div>
            </div>

            <button className="w-full gradient-brand text-white py-4 rounded-2xl font-montserrat font-bold text-lg hover:opacity-90 transition-opacity flex items-center justify-center gap-3">
              <Icon name="Lock" size={20} /> Оплатить безопасно
            </button>
            <p className="text-center text-gray-400 text-xs mt-3">🔒 Защищено SSL шифрованием. Возврат в течение 24 часов.</p>
          </div>
        </div>
      )}

      {/* PROFILE */}
      {page === "profile" && (
        <div className="pt-16">
          <div className="gradient-hero px-4 py-12">
            <div className="max-w-3xl mx-auto flex items-center gap-5">
              <div className="w-20 h-20 gradient-brand rounded-3xl flex items-center justify-center text-3xl">👤</div>
              <div>
                <h1 className="font-montserrat text-2xl font-bold text-white">Александр Петров</h1>
                <div className="text-white/60">alex.petrov@email.com</div>
                <Badge className="mt-2 bg-brand-orange text-white border-0">✈️ Premium путешественник</Badge>
              </div>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { val: "12", label: "Поездок", icon: "Globe" },
                { val: "3", label: "Стран", icon: "Map" },
                { val: "48K", label: "Миль", icon: "Plane" },
              ].map(s => (
                <div key={s.label} className="bg-white rounded-3xl p-5 shadow-sm text-center card-hover">
                  <Icon name={s.icon} fallback="CircleAlert" size={24} className="text-brand-purple mx-auto mb-2" />
                  <div className="font-montserrat font-black text-2xl text-gray-900">{s.val}</div>
                  <div className="text-gray-400 text-sm">{s.label}</div>
                </div>
              ))}
            </div>

            <h2 className="font-montserrat font-bold text-gray-900 text-xl mb-4">История бронирований</h2>
            <div className="flex flex-col gap-4 mb-8">
              {bookings.map(b => (
                <div key={b.id} className="bg-white rounded-3xl p-5 shadow-sm flex gap-4 items-center card-hover">
                  <img src={b.image} alt={b.name} className="w-16 h-16 rounded-2xl object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="outline" className="text-xs border-brand-purple text-brand-purple">{b.type}</Badge>
                      <Badge className={`text-xs border-0 ${b.status === "Подтверждено" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>
                        {b.status}
                      </Badge>
                    </div>
                    <div className="font-montserrat font-bold text-gray-900 text-sm">{b.name}</div>
                    <div className="text-gray-400 text-xs">{b.dates}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-montserrat font-black text-gray-900">{b.price.toLocaleString()} ₽</div>
                  </div>
                </div>
              ))}
            </div>

            <h2 className="font-montserrat font-bold text-gray-900 text-xl mb-4">Настройки</h2>
            <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
              {[
                { icon: "User", label: "Личные данные", hint: "Изменить профиль" },
                { icon: "Bell", label: "Уведомления", hint: "Скидки и акции" },
                { icon: "CreditCard", label: "Способы оплаты", hint: "Добавить карту" },
                { icon: "Shield", label: "Безопасность", hint: "Пароль и 2FA" },
              ].map((item, i, arr) => (
                <button key={item.icon} className={`w-full flex items-center gap-4 p-5 hover:bg-gray-50 transition-colors text-left ${i < arr.length - 1 ? "border-b border-gray-100" : ""}`}>
                  <div className="w-10 h-10 bg-purple-50 rounded-xl flex items-center justify-center">
                    <Icon name={item.icon} fallback="CircleAlert" size={18} className="text-brand-purple" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">{item.label}</div>
                    <div className="text-gray-400 text-sm">{item.hint}</div>
                  </div>
                  <Icon name="ChevronRight" size={18} className="text-gray-300" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SAVED */}
      {page === "saved" && (
        <div className="pt-16">
          <div className="gradient-hero px-4 py-12">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-montserrat text-3xl font-bold text-white">Избранное</h1>
              <p className="text-white/60 mt-1">{savedHotels.length} сохранённых объектов</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-4 py-8">
            {savedHotels.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🤍</div>
                <div className="font-montserrat font-bold text-gray-900 text-xl">Пока ничего нет</div>
                <div className="text-gray-400 mt-2 mb-6">Сохраняйте понравившиеся отели, нажимая ♥</div>
                <Button onClick={() => setPage("results")} className="gradient-brand text-white border-0">
                  Найти отели
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {savedHotels.map(hotel => (
                  <div key={hotel.id} className="bg-white rounded-3xl overflow-hidden shadow-sm card-hover cursor-pointer"
                    onClick={() => { setSelectedHotel(hotel); setPage("booking"); }}>
                    <div className="relative">
                      <img src={hotel.image} alt={hotel.name} className="w-full h-48 object-cover" />
                      <button
                        className="absolute top-3 right-3 bg-white/90 rounded-full p-2"
                        onClick={(e) => { e.stopPropagation(); toggleSave(hotel.id); }}
                      >
                        <Icon name="Heart" size={16} className="text-red-500 fill-red-500" />
                      </button>
                    </div>
                    <div className="p-5">
                      <h3 className="font-montserrat font-bold text-gray-900">{hotel.name}</h3>
                      <div className="flex items-center gap-1 text-gray-500 text-sm mt-1 mb-3">
                        <Icon name="MapPin" size={13} />{hotel.city}
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-montserrat font-black text-gray-900 text-lg">{hotel.price.toLocaleString()} ₽</span>
                          <span className="text-gray-400 text-xs">/ночь</span>
                        </div>
                        <button className="gradient-brand text-white text-sm px-4 py-2 rounded-xl font-semibold">
                          Забронировать
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* REVIEWS */}
      {page === "reviews" && (
        <div className="pt-16">
          <div className="gradient-hero px-4 py-12">
            <div className="max-w-3xl mx-auto">
              <h1 className="font-montserrat text-3xl font-bold text-white">Отзывы</h1>
              <p className="text-white/60 mt-1">Реальные отзывы от путешественников</p>
            </div>
          </div>

          <div className="max-w-3xl mx-auto px-4 py-8">
            <div className="bg-white rounded-3xl p-6 shadow-sm mb-8">
              <div className="text-center">
                <div className="font-montserrat font-black text-6xl text-brand-purple mb-2">4.8</div>
                <div className="flex justify-center gap-1 mb-2">
                  {"★★★★★".split("").map((s, i) => (
                    <span key={i} className="text-yellow-400 text-2xl">★</span>
                  ))}
                </div>
                <div className="text-gray-400">На основе 7 547 отзывов</div>
              </div>
              <div className="mt-6 space-y-3">
                {[
                  { label: "5 звёзд", pct: 78 },
                  { label: "4 звезды", pct: 15 },
                  { label: "3 звезды", pct: 5 },
                  { label: "2 звезды", pct: 1 },
                  { label: "1 звезда", pct: 1 },
                ].map(r => (
                  <div key={r.label} className="flex items-center gap-3">
                    <span className="text-sm text-gray-500 w-20 shrink-0">{r.label}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-2">
                      <div className="gradient-brand h-2 rounded-full" style={{ width: `${r.pct}%` }} />
                    </div>
                    <span className="text-sm font-semibold text-gray-700 w-8 shrink-0">{r.pct}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {reviewsList.map(r => (
                <div key={r.id} className="bg-white rounded-3xl p-6 shadow-sm card-hover">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-purple-50 rounded-2xl flex items-center justify-center text-2xl">{r.avatar}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{r.author}</div>
                      <div className="text-gray-400 text-sm">{r.hotel}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-0.5 justify-end">
                        {"★".repeat(r.rating).split("").map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">★</span>
                        ))}
                      </div>
                      <div className="text-gray-400 text-xs mt-0.5">{r.date}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-4 border-2 border-dashed border-gray-200 rounded-2xl text-brand-purple font-semibold hover:border-brand-purple transition-colors flex items-center justify-center gap-2">
              <Icon name="Plus" size={18} /> Написать отзыв
            </button>
          </div>
        </div>
      )}

    </div>
  );
}