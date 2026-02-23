import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/95e4d448-a635-4774-8f58-60be2f40a2da/files/6721e4cf-34b7-454d-92ee-a438298aaa84.jpg";
const HOTEL_IMAGE = "https://cdn.poehali.dev/projects/95e4d448-a635-4774-8f58-60be2f40a2da/files/ac9b7a28-47af-4b13-89cc-f3085732deb7.jpg";
const PARIS_IMAGE = "https://cdn.poehali.dev/projects/95e4d448-a635-4774-8f58-60be2f40a2da/files/d8e9420a-15d7-4156-9e1a-6824c1cb0288.jpg";

type Page = "home" | "results" | "booking" | "profile" | "saved" | "reviews";

const hotels = [
  { id: 1, name: "Grand Palace Hotel", city: "Дубай", stars: 5, rating: 4.9, reviews: 2841, price: 18500, oldPrice: 24000, image: HOTEL_IMAGE, tags: ["Бассейн", "SPA", "Завтрак"] },
  { id: 2, name: "Eiffel Luxe Residence", city: "Париж", stars: 5, rating: 4.7, reviews: 1523, price: 22300, oldPrice: null, image: PARIS_IMAGE, tags: ["Вид на башню", "Ресторан", "Трансфер"] },
  { id: 3, name: "Azure Beach Resort", city: "Бали", stars: 4, rating: 4.8, reviews: 3201, price: 12900, oldPrice: 16000, image: HERO_IMAGE, tags: ["Пляж", "Бассейн", "Дайвинг"] },
  { id: 4, name: "Tokyo Sky Tower Suite", city: "Токио", stars: 5, rating: 4.6, reviews: 987, price: 31000, oldPrice: null, image: HOTEL_IMAGE, tags: ["Панорама", "Онсэн", "Сейф"] },
];

const tickets = [
  { id: 1, from: "Москва", fromCode: "SVO", to: "Дубай", toCode: "DXB", date: "15 мар", airline: "Emirates", duration: "5ч 20м", price: 28900, cls: "Бизнес" },
  { id: 2, from: "Москва", fromCode: "SVO", to: "Париж", toCode: "CDG", date: "20 мар", airline: "Air France", duration: "3ч 45м", price: 14500, cls: "Эконом" },
  { id: 3, from: "Москва", fromCode: "SVO", to: "Бали", toCode: "DPS", date: "1 апр", airline: "Garuda", duration: "12ч 30м", price: 42000, cls: "Эконом" },
];

const bookings = [
  { id: 1, type: "Отель", name: "Grand Palace Hotel", city: "Дубай", dates: "15–22 марта", status: "Подтверждено", price: 129500, image: HOTEL_IMAGE },
  { id: 2, type: "Билет", name: "Москва → Дубай", city: "Emirates", dates: "15 марта, 10:30", status: "Подтверждено", price: 28900, image: HOTEL_IMAGE },
  { id: 3, type: "Экскурсия", name: "Пустынное сафари", city: "Дубай", dates: "18 марта", status: "Ожидание", price: 8500, image: HERO_IMAGE },
];

const reviewsList = [
  { id: 1, author: "Анна М.", hotel: "Grand Palace Hotel", rating: 5, date: "12 фев", text: "Невероятный отель! Сервис на высшем уровне, завтрак великолепный.", avatar: "👩‍💼" },
  { id: 2, author: "Дмитрий К.", hotel: "Azure Beach Resort", rating: 5, date: "3 фев", text: "Лучший отдых в жизни! Пляж прямо у номера, персонал внимательный.", avatar: "👨‍💻" },
  { id: 3, author: "Елена С.", hotel: "Eiffel Luxe Residence", rating: 4, date: "28 янв", text: "Отличное расположение, вид на Эйфелеву башню. Немного шумно по вечерам.", avatar: "👩‍🎨" },
];

const destinations = [
  { city: "Дубай", country: "ОАЭ", emoji: "🏙️", bg: "from-amber-400 to-orange-500", price: "28 900 ₽" },
  { city: "Бали", country: "Индонезия", emoji: "🌴", bg: "from-emerald-400 to-teal-500", price: "42 000 ₽" },
  { city: "Париж", country: "Франция", emoji: "🗼", bg: "from-blue-400 to-indigo-600", price: "14 500 ₽" },
  { city: "Токио", country: "Япония", emoji: "🗾", bg: "from-pink-400 to-rose-500", price: "58 000 ₽" },
];

export default function Index() {
  const [page, setPage] = useState<Page>("home");
  const [searchTab, setSearchTab] = useState<"hotels" | "flights">("hotels");
  const [savedItems, setSavedItems] = useState<number[]>([1, 3]);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedHotel, setSelectedHotel] = useState<typeof hotels[0] | null>(null);
  const [sortBy, setSortBy] = useState("rating");
  const [showFilters, setShowFilters] = useState(false);

  const toggleSave = (id: number) =>
    setSavedItems(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id]);

  const filteredHotels = hotels
    .filter(h => h.price <= priceRange[1])
    .sort((a, b) => sortBy === "rating" ? b.rating - a.rating : a.price - b.price);

  const savedHotels = hotels.filter(h => savedItems.includes(h.id));

  const navItems = [
    { id: "home", icon: "Home", label: "Главная" },
    { id: "results", icon: "Search", label: "Поиск" },
    { id: "saved", icon: "Heart", label: "Избранное" },
    { id: "reviews", icon: "Star", label: "Отзывы" },
    { id: "profile", icon: "User", label: "Профиль" },
  ];

  return (
    <div className="min-h-screen bg-[#F5F5F7] font-inter max-w-md mx-auto relative overflow-x-hidden">

      {/* ── BOTTOM NAV ── */}
      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 bg-white/90 backdrop-blur-xl border-t border-gray-100">
        <div className="flex items-center justify-around px-2 pb-safe pt-2 pb-4">
          {navItems.map(item => {
            const active = page === item.id || (item.id === "results" && page === "booking");
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id as Page)}
                className="flex flex-col items-center gap-0.5 px-3 py-1 relative"
              >
                {active && (
                  <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-6 h-1 gradient-brand rounded-full" />
                )}
                <Icon
                  name={item.icon}
                  fallback="CircleAlert"
                  size={22}
                  className={active ? "text-brand-purple" : "text-gray-400"}
                />
                <span className={`text-[10px] font-medium ${active ? "text-brand-purple" : "text-gray-400"}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* ════════════ HOME ════════════ */}
      {page === "home" && (
        <div className="pb-24">
          {/* Hero card */}
          <div className="relative h-72 overflow-hidden rounded-b-[2.5rem]">
            <img src={HERO_IMAGE} alt="hero" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/70" />
            <div className="relative z-10 p-6 pt-14 h-full flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/70 text-sm">Привет, Александр 👋</p>
                  <h1 className="font-montserrat text-2xl font-black text-white leading-tight">
                    Куда летим<br />сегодня?
                  </h1>
                </div>
                <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                  <Icon name="Bell" size={18} className="text-white" />
                </button>
              </div>
              {/* Search pill */}
              <button
                onClick={() => setPage("results")}
                className="bg-white rounded-2xl px-4 py-3.5 flex items-center gap-3 shadow-lg"
              >
                <div className="w-8 h-8 gradient-brand rounded-xl flex items-center justify-center shrink-0">
                  <Icon name="Search" size={14} className="text-white" />
                </div>
                <span className="text-gray-400 text-sm flex-1 text-left">Отель, билет, тур...</span>
                <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center">
                  <Icon name="SlidersHorizontal" size={14} className="text-gray-500" />
                </div>
              </button>
            </div>
          </div>

          {/* Category pills */}
          <div className="px-4 pt-5">
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {[
                { icon: "Building2", label: "Отели", active: true },
                { icon: "Plane", label: "Билеты", active: false },
                { icon: "Map", label: "Туры", active: false },
                { icon: "Car", label: "Трансфер", active: false },
              ].map(c => (
                <button
                  key={c.label}
                  onClick={() => setPage("results")}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all shrink-0 ${
                    c.active
                      ? "gradient-brand text-white shadow-md shadow-purple-200"
                      : "bg-white text-gray-600 border border-gray-100"
                  }`}
                >
                  <Icon name={c.icon} fallback="CircleAlert" size={15} />
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Destinations horizontal scroll */}
          <div className="pt-6 px-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-montserrat font-bold text-gray-900 text-lg">Направления</h2>
              <button onClick={() => setPage("results")} className="text-brand-purple text-sm font-semibold">Все</button>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4">
              {destinations.map(d => (
                <button
                  key={d.city}
                  onClick={() => setPage("results")}
                  className={`shrink-0 w-36 h-44 rounded-3xl bg-gradient-to-br ${d.bg} relative overflow-hidden active:scale-95 transition-transform`}
                >
                  <div className="absolute inset-0 flex flex-col justify-between p-4">
                    <span className="text-4xl">{d.emoji}</span>
                    <div className="text-left">
                      <div className="font-montserrat font-black text-white text-lg leading-tight">{d.city}</div>
                      <div className="text-white/70 text-xs">{d.country}</div>
                      <div className="text-white font-bold text-sm mt-1">от {d.price}</div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Top hotels */}
          <div className="pt-6 px-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-montserrat font-bold text-gray-900 text-lg">Топ отели</h2>
              <button onClick={() => setPage("results")} className="text-brand-purple text-sm font-semibold">Все</button>
            </div>
            <div className="flex flex-col gap-3">
              {hotels.slice(0, 3).map(hotel => (
                <button
                  key={hotel.id}
                  onClick={() => { setSelectedHotel(hotel); setPage("booking"); }}
                  className="bg-white rounded-3xl overflow-hidden flex gap-0 shadow-sm active:scale-[0.98] transition-transform text-left"
                >
                  <div className="relative w-28 shrink-0">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                    {hotel.oldPrice && (
                      <div className="absolute top-2 left-2 bg-brand-orange text-white text-[10px] font-bold px-1.5 py-0.5 rounded-lg">
                        -{Math.round((1 - hotel.price / hotel.oldPrice) * 100)}%
                      </div>
                    )}
                  </div>
                  <div className="flex-1 p-3.5">
                    <div className="flex items-start justify-between gap-1">
                      <div>
                        <div className="font-montserrat font-bold text-gray-900 text-sm leading-tight line-clamp-1">{hotel.name}</div>
                        <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                          <Icon name="MapPin" size={10} />{hotel.city}
                        </div>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleSave(hotel.id); }}
                        className="shrink-0 w-7 h-7 flex items-center justify-center"
                      >
                        <Icon name="Heart" size={16} className={savedItems.includes(hotel.id) ? "text-red-500 fill-red-500" : "text-gray-300"} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {hotel.tags.slice(0, 2).map(t => (
                        <span key={t} className="text-[10px] bg-purple-50 text-brand-purple px-2 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div>
                        <span className="font-montserrat font-black text-gray-900 text-base">{hotel.price.toLocaleString()}</span>
                        <span className="text-gray-400 text-xs"> ₽/н</span>
                      </div>
                      <div className="flex items-center gap-1 bg-green-50 px-2 py-0.5 rounded-full">
                        <span className="text-green-600 font-bold text-xs">{hotel.rating}</span>
                        <Icon name="Star" size={10} className="text-green-500 fill-green-500" />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Promo banner */}
          <div className="mx-4 mt-6 gradient-brand rounded-3xl p-5 flex items-center gap-4">
            <div className="text-4xl">🔒</div>
            <div>
              <div className="font-montserrat font-bold text-white text-base">Безопасная оплата</div>
              <div className="text-white/70 text-xs mt-0.5">Карта, СБП, Apple Pay. Возврат 24ч</div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════ RESULTS ════════════ */}
      {page === "results" && (
        <div className="pb-24">
          {/* Header */}
          <div className="gradient-hero px-4 pt-14 pb-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 bg-white/10 backdrop-blur-md rounded-2xl flex items-center gap-2 px-4 py-3">
                <Icon name="Search" size={16} className="text-white/60" />
                <input placeholder="Куда едем?" className="bg-transparent outline-none text-white placeholder:text-white/40 text-sm w-full" />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`w-11 h-11 rounded-2xl flex items-center justify-center transition-all ${showFilters ? "bg-white text-brand-purple" : "bg-white/10 text-white"}`}
              >
                <Icon name="SlidersHorizontal" size={18} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2">
              {[
                { val: "hotels" as const, label: "Отели", icon: "Building2" },
                { val: "flights" as const, label: "Билеты", icon: "Plane" },
              ].map(t => (
                <button
                  key={t.val}
                  onClick={() => setSearchTab(t.val)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    searchTab === t.val ? "bg-white text-brand-purple" : "text-white/60"
                  }`}
                >
                  <Icon name={t.icon} fallback="CircleAlert" size={14} />
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Filters panel */}
          {showFilters && (
            <div className="bg-white mx-4 mt-3 rounded-3xl p-5 shadow-sm animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-montserrat font-bold text-gray-900">Фильтры</h3>
                <button onClick={() => setShowFilters(false)}>
                  <Icon name="X" size={18} className="text-gray-400" />
                </button>
              </div>
              <div className="mb-4">
                <div className="text-sm font-semibold text-gray-700 mb-2">
                  Макс. цена: {priceRange[1].toLocaleString()} ₽
                </div>
                <Slider min={5000} max={50000} step={1000} value={priceRange} onValueChange={setPriceRange} />
              </div>
              <div>
                <div className="text-sm font-semibold text-gray-700 mb-2">Сортировать</div>
                <div className="flex gap-2">
                  {[{ v: "rating", l: "По рейтингу" }, { v: "price", l: "По цене" }].map(s => (
                    <button
                      key={s.v}
                      onClick={() => setSortBy(s.v)}
                      className={`flex-1 py-2 rounded-xl text-sm font-medium transition-all ${
                        sortBy === s.v ? "gradient-brand text-white" : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {s.l}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Results count */}
          <div className="px-4 pt-4 pb-1 flex items-center justify-between">
            <span className="text-sm text-gray-500 font-medium">{filteredHotels.length} вариантов</span>
          </div>

          {/* Hotels */}
          {searchTab === "hotels" && (
            <div className="px-4 flex flex-col gap-3 pt-2">
              {filteredHotels.map(hotel => (
                <button
                  key={hotel.id}
                  onClick={() => { setSelectedHotel(hotel); setPage("booking"); }}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm active:scale-[0.98] transition-transform text-left w-full"
                >
                  <div className="relative">
                    <img src={hotel.image} alt={hotel.name} className="w-full h-52 object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <button
                      onClick={e => { e.stopPropagation(); toggleSave(hotel.id); }}
                      className="absolute top-3 right-3 w-9 h-9 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center"
                    >
                      <Icon name="Heart" size={16} className={savedItems.includes(hotel.id) ? "text-red-400 fill-red-400" : "text-white"} />
                    </button>
                    {hotel.oldPrice && (
                      <Badge className="absolute top-3 left-3 bg-brand-orange text-white border-0 text-xs">
                        -{Math.round((1 - hotel.price / hotel.oldPrice) * 100)}%
                      </Badge>
                    )}
                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="font-montserrat font-black text-white text-lg leading-tight">{hotel.name}</div>
                          <div className="flex items-center gap-1 text-white/70 text-xs mt-0.5">
                            <Icon name="MapPin" size={11} />{hotel.city}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-montserrat font-black text-white text-xl">{hotel.price.toLocaleString()} ₽</div>
                          <div className="text-white/60 text-xs">за ночь</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {hotel.tags.map(t => (
                        <span key={t} className="text-xs bg-purple-50 text-brand-purple px-2.5 py-1 rounded-full">{t}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-1 bg-green-50 px-2.5 py-1 rounded-full shrink-0">
                      <span className="text-green-600 font-bold text-sm">{hotel.rating}</span>
                      <Icon name="Star" size={11} className="text-green-500 fill-green-500" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Flights */}
          {searchTab === "flights" && (
            <div className="px-4 flex flex-col gap-3 pt-2">
              {tickets.map(t => (
                <button
                  key={t.id}
                  onClick={() => setPage("booking")}
                  className="bg-white rounded-3xl p-5 shadow-sm active:scale-[0.98] transition-transform text-left w-full"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-brand-purple bg-purple-50 px-2.5 py-1 rounded-full">{t.airline}</span>
                    <span className="text-xs text-gray-400">{t.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-center">
                      <div className="font-montserrat font-black text-2xl text-gray-900">{t.fromCode}</div>
                      <div className="text-gray-400 text-xs">{t.from}</div>
                    </div>
                    <div className="flex-1 flex flex-col items-center gap-1">
                      <span className="text-xs text-gray-400">{t.duration}</span>
                      <div className="w-full flex items-center gap-1">
                        <div className="flex-1 h-px bg-gray-200" />
                        <Icon name="Plane" size={14} className="text-brand-purple" />
                        <div className="flex-1 h-px bg-gray-200" />
                      </div>
                      <span className="text-xs text-gray-400">{t.cls}</span>
                    </div>
                    <div className="text-center">
                      <div className="font-montserrat font-black text-2xl text-gray-900">{t.toCode}</div>
                      <div className="text-gray-400 text-xs">{t.to}</div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="font-montserrat font-black text-2xl text-gray-900">{t.price.toLocaleString()} ₽</span>
                    <span className="gradient-brand text-white text-sm font-semibold px-5 py-2.5 rounded-2xl">Купить</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ════════════ BOOKING ════════════ */}
      {page === "booking" && (
        <div className="pb-24">
          {/* Back + image */}
          <div className="relative h-64">
            <img src={selectedHotel?.image || HOTEL_IMAGE} alt="hotel" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
            <button
              onClick={() => setPage("results")}
              className="absolute top-14 left-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center"
            >
              <Icon name="ArrowLeft" size={18} className="text-white" />
            </button>
            <div className="absolute bottom-4 left-4 right-4">
              <h1 className="font-montserrat font-black text-white text-xl leading-tight">
                {selectedHotel?.name || "Grand Palace Hotel"}
              </h1>
              <div className="flex items-center gap-2 mt-1">
                <Icon name="MapPin" size={12} className="text-white/70" />
                <span className="text-white/70 text-sm">{selectedHotel?.city || "Дубай"}</span>
                {selectedHotel && (
                  <div className="flex items-center gap-1 bg-green-500/30 px-2 py-0.5 rounded-full ml-auto">
                    <span className="text-white font-bold text-xs">{selectedHotel.rating}</span>
                    <Icon name="Star" size={10} className="text-yellow-300 fill-yellow-300" />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-4 pt-5 flex flex-col gap-4">
            {/* Dates */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <h3 className="font-montserrat font-bold text-gray-900 mb-4">Даты и гости</h3>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="bg-gray-50 rounded-2xl px-4 py-3">
                  <div className="text-xs text-gray-400 mb-1">Заезд</div>
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={15} className="text-brand-purple" />
                    <span className="text-sm font-semibold text-gray-900">15 мар 2026</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl px-4 py-3">
                  <div className="text-xs text-gray-400 mb-1">Выезд</div>
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" size={15} className="text-brand-purple" />
                    <span className="text-sm font-semibold text-gray-900">22 мар 2026</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 rounded-2xl px-4 py-3">
                <div className="text-xs text-gray-400 mb-1">Гости</div>
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={15} className="text-brand-purple" />
                  <span className="text-sm font-semibold text-gray-900">2 взрослых</span>
                </div>
              </div>
            </div>

            {/* Guest info */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <h3 className="font-montserrat font-bold text-gray-900 mb-4">Данные гостя</h3>
              <div className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Имя" className="rounded-2xl bg-gray-50 border-0 h-12" />
                  <Input placeholder="Фамилия" className="rounded-2xl bg-gray-50 border-0 h-12" />
                </div>
                <Input type="email" placeholder="Email" className="rounded-2xl bg-gray-50 border-0 h-12" />
                <Input type="tel" placeholder="+7 (999) 000-00-00" className="rounded-2xl bg-gray-50 border-0 h-12" />
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              <h3 className="font-montserrat font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Icon name="CreditCard" size={18} className="text-brand-purple" /> Оплата
              </h3>
              <div className="flex gap-2 mb-4">
                {["💳 Карта", "🏦 СБП", "📱 Pay"].map((m, i) => (
                  <button
                    key={m}
                    className={`flex-1 py-2.5 rounded-2xl text-xs font-semibold border-2 transition-all ${
                      i === 0 ? "border-brand-purple bg-purple-50 text-brand-purple" : "border-gray-100 text-gray-500"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <Input placeholder="0000 0000 0000 0000" className="rounded-2xl bg-gray-50 border-0 h-12 font-mono mb-3" />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="MM/YY" className="rounded-2xl bg-gray-50 border-0 h-12" />
                <Input placeholder="CVV •••" type="password" className="rounded-2xl bg-gray-50 border-0 h-12" />
              </div>
            </div>

            {/* Total */}
            <div className="bg-white rounded-3xl p-5 shadow-sm">
              {[
                { l: "Стоимость (7 ночей)", v: selectedHotel ? `${(selectedHotel.price * 7).toLocaleString()} ₽` : "129 500 ₽" },
                { l: "Сервисный сбор", v: "2 590 ₽" },
                { l: "Налоги", v: "1 300 ₽" },
              ].map(r => (
                <div key={r.l} className="flex justify-between py-2.5 border-b border-gray-50 text-sm">
                  <span className="text-gray-500">{r.l}</span>
                  <span className="font-semibold text-gray-900">{r.v}</span>
                </div>
              ))}
              <div className="flex justify-between pt-3 mt-1">
                <span className="font-montserrat font-bold text-gray-900">Итого</span>
                <span className="font-montserrat font-black text-xl text-brand-purple">
                  {selectedHotel ? `${(selectedHotel.price * 7 + 3890).toLocaleString()} ₽` : "133 390 ₽"}
                </span>
              </div>
            </div>

            <button className="w-full gradient-brand text-white py-4 rounded-2xl font-montserrat font-bold text-base flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-lg shadow-purple-200">
              <Icon name="Lock" size={18} /> Оплатить безопасно
            </button>
            <p className="text-center text-gray-400 text-xs -mt-1">🔒 SSL · Возврат в течение 24 часов</p>
          </div>
        </div>
      )}

      {/* ════════════ SAVED ════════════ */}
      {page === "saved" && (
        <div className="pb-24">
          <div className="gradient-hero px-4 pt-14 pb-6">
            <h1 className="font-montserrat text-2xl font-black text-white">Избранное</h1>
            <p className="text-white/60 text-sm mt-0.5">{savedHotels.length} сохранённых</p>
          </div>

          <div className="px-4 pt-4">
            {savedHotels.length === 0 ? (
              <div className="text-center pt-20">
                <div className="text-6xl mb-4">🤍</div>
                <div className="font-montserrat font-bold text-gray-900 text-xl mb-2">Пока пусто</div>
                <p className="text-gray-400 text-sm mb-6">Сохраняйте отели, нажимая ♥</p>
                <button onClick={() => setPage("results")} className="gradient-brand text-white px-6 py-3 rounded-2xl font-semibold">
                  Найти отели
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {savedHotels.map(hotel => (
                  <button
                    key={hotel.id}
                    onClick={() => { setSelectedHotel(hotel); setPage("booking"); }}
                    className="bg-white rounded-3xl overflow-hidden shadow-sm active:scale-[0.98] transition-transform text-left w-full flex gap-0"
                  >
                    <div className="relative w-28 shrink-0 h-28">
                      <img src={hotel.image} alt={hotel.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-montserrat font-bold text-gray-900 text-sm line-clamp-1">{hotel.name}</div>
                          <div className="flex items-center gap-1 text-gray-400 text-xs mt-0.5">
                            <Icon name="MapPin" size={10} />{hotel.city}
                          </div>
                        </div>
                        <button onClick={e => { e.stopPropagation(); toggleSave(hotel.id); }} className="ml-1">
                          <Icon name="Heart" size={18} className="text-red-500 fill-red-500" />
                        </button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div>
                          <span className="font-montserrat font-black text-gray-900">{hotel.price.toLocaleString()} ₽</span>
                          <span className="text-gray-400 text-xs">/ночь</span>
                        </div>
                        <span className="gradient-brand text-white text-xs font-semibold px-3 py-1.5 rounded-xl">Бронировать</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════════════ REVIEWS ════════════ */}
      {page === "reviews" && (
        <div className="pb-24">
          <div className="gradient-hero px-4 pt-14 pb-6">
            <h1 className="font-montserrat text-2xl font-black text-white">Отзывы</h1>
            <p className="text-white/60 text-sm mt-0.5">От реальных путешественников</p>
          </div>

          <div className="px-4 pt-4">
            {/* Rating summary */}
            <div className="bg-white rounded-3xl p-5 shadow-sm mb-4">
              <div className="flex items-center gap-5">
                <div className="text-center">
                  <div className="font-montserrat font-black text-5xl text-brand-purple">4.8</div>
                  <div className="flex gap-0.5 justify-center mt-1">
                    {"★★★★★".split("").map((_, i) => (
                      <span key={i} className="text-yellow-400 text-base">★</span>
                    ))}
                  </div>
                  <div className="text-gray-400 text-xs mt-1">7 547 отзывов</div>
                </div>
                <div className="flex-1 space-y-2">
                  {[{ l: "5★", p: 78 }, { l: "4★", p: 15 }, { l: "3★", p: 5 }, { l: "≤2★", p: 2 }].map(r => (
                    <div key={r.l} className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 w-8">{r.l}</span>
                      <div className="flex-1 bg-gray-100 rounded-full h-1.5">
                        <div className="gradient-brand h-1.5 rounded-full transition-all" style={{ width: `${r.p}%` }} />
                      </div>
                      <span className="text-xs font-semibold text-gray-600 w-7 text-right">{r.p}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {reviewsList.map(r => (
                <div key={r.id} className="bg-white rounded-3xl p-5 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-11 h-11 bg-purple-50 rounded-2xl flex items-center justify-center text-xl">{r.avatar}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm">{r.author}</div>
                      <div className="text-gray-400 text-xs">{r.hotel}</div>
                    </div>
                    <div className="text-right">
                      <div className="flex gap-0.5 justify-end">
                        {"★".repeat(r.rating).split("").map((_, i) => (
                          <span key={i} className="text-yellow-400 text-sm">★</span>
                        ))}
                      </div>
                      <div className="text-gray-400 text-xs">{r.date}</div>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">{r.text}</p>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-4 border-2 border-dashed border-gray-200 rounded-2xl text-brand-purple font-semibold text-sm flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
              <Icon name="Plus" size={16} /> Написать отзыв
            </button>
          </div>
        </div>
      )}

      {/* ════════════ PROFILE ════════════ */}
      {page === "profile" && (
        <div className="pb-24">
          {/* Header */}
          <div className="gradient-hero px-4 pt-14 pb-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 gradient-brand rounded-3xl flex items-center justify-center text-2xl shadow-lg shadow-purple-300">
                👤
              </div>
              <div>
                <h1 className="font-montserrat text-xl font-black text-white">Александр Петров</h1>
                <div className="text-white/60 text-sm">alex.petrov@email.com</div>
                <Badge className="mt-1 bg-brand-orange/90 text-white border-0 text-xs">✈️ Premium</Badge>
              </div>
            </div>
          </div>

          <div className="px-4 pt-4 flex flex-col gap-4">
            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { v: "12", l: "Поездок", i: "Globe" },
                { v: "8", l: "Стран", i: "Map" },
                { v: "48K", l: "Миль", i: "Plane" },
              ].map(s => (
                <div key={s.l} className="bg-white rounded-2xl p-3.5 text-center shadow-sm">
                  <Icon name={s.i} fallback="CircleAlert" size={20} className="text-brand-purple mx-auto mb-1" />
                  <div className="font-montserrat font-black text-xl text-gray-900">{s.v}</div>
                  <div className="text-gray-400 text-xs">{s.l}</div>
                </div>
              ))}
            </div>

            {/* History */}
            <div>
              <h2 className="font-montserrat font-bold text-gray-900 mb-3">История бронирований</h2>
              <div className="flex flex-col gap-2.5">
                {bookings.map(b => (
                  <div key={b.id} className="bg-white rounded-3xl p-4 shadow-sm flex gap-3 items-center">
                    <img src={b.image} alt={b.name} className="w-14 h-14 rounded-2xl object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                        <span className="text-xs font-semibold bg-purple-50 text-brand-purple px-2 py-0.5 rounded-full">{b.type}</span>
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${b.status === "Подтверждено" ? "bg-green-50 text-green-600" : "bg-yellow-50 text-yellow-600"}`}>
                          {b.status}
                        </span>
                      </div>
                      <div className="font-montserrat font-bold text-gray-900 text-sm truncate">{b.name}</div>
                      <div className="text-gray-400 text-xs">{b.dates}</div>
                    </div>
                    <div className="font-montserrat font-black text-gray-900 text-sm shrink-0">{b.price.toLocaleString()} ₽</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div>
              <h2 className="font-montserrat font-bold text-gray-900 mb-3">Настройки</h2>
              <div className="bg-white rounded-3xl shadow-sm overflow-hidden">
                {[
                  { i: "User", l: "Личные данные", h: "Изменить профиль" },
                  { i: "Bell", l: "Уведомления", h: "Скидки и акции" },
                  { i: "CreditCard", l: "Способы оплаты", h: "Добавить карту" },
                  { i: "Shield", l: "Безопасность", h: "Пароль и 2FA" },
                ].map((item, idx, arr) => (
                  <button
                    key={item.i}
                    className={`w-full flex items-center gap-4 p-4 active:bg-gray-50 text-left ${idx < arr.length - 1 ? "border-b border-gray-50" : ""}`}
                  >
                    <div className="w-9 h-9 bg-purple-50 rounded-xl flex items-center justify-center shrink-0">
                      <Icon name={item.i} fallback="CircleAlert" size={16} className="text-brand-purple" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900 text-sm">{item.l}</div>
                      <div className="text-gray-400 text-xs">{item.h}</div>
                    </div>
                    <Icon name="ChevronRight" size={16} className="text-gray-300" />
                  </button>
                ))}
              </div>
            </div>

            <button className="w-full py-3.5 rounded-2xl border-2 border-red-100 text-red-400 font-semibold text-sm flex items-center justify-center gap-2">
              <Icon name="LogOut" size={16} /> Выйти из аккаунта
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
