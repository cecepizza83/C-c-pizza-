import { useState } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  :root {
    --fire: #FF4500; --ember: #FF6B35; --gold: #FFB400;
    --yellow: #FFE000; --cream: #FFF8EE; --dark: #1A0A00;
    --smoke: #2C1A10; --ash: #8A6A5A; --green: #1A3A1A;
  }
  body { background: var(--dark); font-family: 'DM Sans', sans-serif; color: var(--cream); min-height: 100vh; }
  .app { max-width: 430px; margin: 0 auto; min-height: 100vh; background: var(--dark); position: relative; }

  /* Header */
  .header {
    background: linear-gradient(160deg, #0D2A0D 0%, var(--dark) 100%);
    padding: 20px 20px 0;
    border-bottom: 2px solid var(--yellow);
  }
  .header-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; }
  .logo { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 900; color: var(--yellow); line-height: 1; }
  .logo span { color: var(--fire); }
  .logo small { display: block; font-size: 10px; font-family: 'DM Sans', sans-serif; font-weight: 300; letter-spacing: 3px; color: var(--ash); text-transform: uppercase; margin-top: 3px; }
  .cart-btn { background: var(--fire); border: none; border-radius: 50%; width: 48px; height: 48px; cursor: pointer; font-size: 20px; position: relative; transition: transform 0.2s; display: flex; align-items: center; justify-content: center; }
  .cart-btn:hover { transform: scale(1.08); background: var(--ember); }
  .cart-badge { position: absolute; top: -4px; right: -4px; background: var(--yellow); color: var(--dark); font-size: 11px; font-weight: 700; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; }
  .nav-tabs { display: flex; gap: 2px; }
  .nav-tab { flex: 1; padding: 10px 4px; background: none; border: none; border-bottom: 3px solid transparent; color: var(--ash); font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; cursor: pointer; text-align: center; transition: all 0.2s; }
  .nav-tab.active { color: var(--yellow); border-bottom-color: var(--yellow); }
  .nav-tab:hover:not(.active) { color: var(--cream); }

  /* Content */
  .content { padding: 16px; }
  .section-title { font-family: 'Playfair Display', serif; font-size: 24px; font-weight: 700; color: var(--cream); margin-bottom: 3px; }
  .section-subtitle { font-size: 12px; color: var(--ash); margin-bottom: 16px; }

  /* Category header */
  .cat-header {
    background: var(--yellow);
    border-radius: 10px;
    padding: 10px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    margin-top: 18px;
  }
  .cat-header-name { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: var(--dark); }
  .cat-header-prices { font-size: 12px; font-weight: 700; color: var(--dark); text-align: right; line-height: 1.5; }
  .cat-header.red { background: #C0392B; }
  .cat-header.red .cat-header-name, .cat-header.red .cat-header-prices { color: var(--yellow); }
  .cat-header.dark-yellow { background: #D4A000; }

  /* Pizza card */
  .pizza-card { background: var(--smoke); border-radius: 14px; padding: 14px; margin-bottom: 8px; border: 1px solid rgba(255,224,0,0.1); transition: border-color 0.2s; }
  .pizza-card:hover { border-color: rgba(255,224,0,0.3); }
  .pizza-top { display: flex; justify-content: space-between; align-items: flex-start; gap: 8px; margin-bottom: 6px; }
  .pizza-name { font-weight: 700; font-size: 15px; color: var(--cream); flex: 1; }
  .pizza-badge { font-size: 14px; margin-left: 4px; }
  .pizza-desc { font-size: 12px; color: var(--ash); line-height: 1.5; margin-bottom: 10px; }
  .pizza-footer { display: flex; align-items: center; justify-content: space-between; }
  .pizza-prices { display: flex; gap: 10px; align-items: center; }
  .price-tag { background: rgba(255,224,0,0.12); border: 1px solid rgba(255,224,0,0.3); border-radius: 8px; padding: 4px 10px; text-align: center; }
  .price-size { font-size: 10px; color: var(--ash); }
  .price-val { font-size: 15px; font-weight: 700; color: var(--yellow); }
  .add-btn { background: var(--fire); border: none; border-radius: 10px; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; font-size: 20px; color: white; cursor: pointer; transition: all 0.2s; }
  .add-btn:hover { background: var(--ember); transform: scale(1.1); }
  .qty-controls { display: flex; align-items: center; gap: 8px; }
  .qty-btn { background: var(--dark); border: 1.5px solid var(--yellow); border-radius: 8px; width: 28px; height: 28px; color: var(--yellow); font-size: 16px; cursor: pointer; display: flex; align-items: center; justify-content: center; font-weight: 700; transition: all 0.2s; }
  .qty-btn:hover { background: var(--yellow); color: var(--dark); }
  .qty-num { font-size: 16px; font-weight: 700; color: var(--cream); min-width: 20px; text-align: center; }
  /* Size selector */
  .size-selector { display: flex; gap: 6px; margin-bottom: 10px; }
  .size-btn { flex: 1; padding: 6px; border-radius: 8px; border: 1.5px solid rgba(255,224,0,0.25); background: none; color: var(--ash); font-size: 12px; font-weight: 600; cursor: pointer; transition: all 0.2s; text-align: center; }
  .size-btn.active { background: rgba(255,224,0,0.15); border-color: var(--yellow); color: var(--yellow); }

  /* Drinks */
  .drink-card { background: var(--smoke); border-radius: 14px; padding: 14px 16px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: center; border: 1px solid rgba(255,224,0,0.1); }
  .drink-name { font-weight: 600; font-size: 15px; color: var(--cream); }
  .drink-price { font-size: 17px; font-weight: 700; color: var(--yellow); }
  .promo-banner { background: var(--yellow); border-radius: 12px; padding: 14px 16px; margin: 16px 0; }
  .promo-banner p { font-size: 13px; color: var(--dark); font-weight: 600; line-height: 1.5; text-align: center; }

  /* Extras */
  .extras-section { margin-top: 12px; margin-bottom: 20px; }
  .extra-item { display: flex; justify-content: space-between; align-items: center; background: var(--smoke); border-radius: 10px; padding: 10px 14px; margin-bottom: 6px; border: 1px solid rgba(255,224,0,0.08); }
  .extra-name { font-size: 13px; color: var(--cream); }
  .extra-price { font-size: 13px; font-weight: 700; color: var(--yellow); }

  /* Cart */
  .cart-empty { text-align: center; padding: 60px 20px; }
  .cart-empty-icon { font-size: 64px; margin-bottom: 16px; }
  .cart-empty p { color: var(--ash); font-size: 15px; }
  .cart-items { display: flex; flex-direction: column; gap: 10px; margin-bottom: 20px; }
  .cart-item { background: var(--smoke); border-radius: 12px; padding: 12px 14px; display: flex; align-items: center; gap: 12px; border: 1px solid rgba(255,224,0,0.1); }
  .cart-item-info { flex: 1; }
  .cart-item-name { font-weight: 600; font-size: 14px; color: var(--cream); margin-bottom: 2px; }
  .cart-item-sub { font-size: 12px; color: var(--ash); }
  .cart-item-price { font-size: 15px; font-weight: 700; color: var(--yellow); }
  .cart-summary { background: var(--smoke); border-radius: 16px; padding: 18px; margin-bottom: 14px; border: 1px solid rgba(255,224,0,0.15); }
  .summary-row { display: flex; justify-content: space-between; margin-bottom: 8px; font-size: 14px; color: var(--ash); }
  .summary-row.total { margin-top: 12px; padding-top: 12px; border-top: 1px solid rgba(255,224,0,0.2); font-size: 18px; font-weight: 700; color: var(--cream); }
  .summary-row.total .total-price { color: var(--yellow); }
  .promo-note { font-size: 12px; color: #4CAF50; background: rgba(76,175,80,0.1); border-radius: 8px; padding: 8px 12px; margin-bottom: 12px; text-align: center; }
  .order-btn { width: 100%; background: linear-gradient(135deg, var(--fire), var(--ember)); border: none; border-radius: 14px; padding: 18px; font-family: 'DM Sans', sans-serif; font-size: 16px; font-weight: 700; color: white; cursor: pointer; transition: all 0.2s; }
  .order-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(255,69,0,0.4); }

  /* Orders */
  .order-card { background: var(--smoke); border-radius: 14px; padding: 14px; margin-bottom: 12px; border: 1px solid rgba(255,224,0,0.12); }
  .order-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; }
  .order-num { font-family: 'Playfair Display', serif; font-size: 15px; font-weight: 700; color: var(--cream); }
  .order-time { font-size: 12px; color: var(--ash); margin-top: 2px; }
  .status-badge { padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
  .status-waiting { background: rgba(255,224,0,0.15); color: var(--yellow); }
  .status-cooking { background: rgba(255,69,0,0.15); color: var(--ember); }
  .status-ready { background: rgba(76,175,80,0.15); color: #4CAF50; }
  .status-done { background: rgba(100,100,100,0.2); color: var(--ash); }
  .status-cancelled { background: rgba(200,30,30,0.15); color: #e55; }
  .order-items-list { font-size: 13px; color: var(--ash); margin-bottom: 10px; line-height: 1.8; }
  .order-footer { display: flex; justify-content: space-between; align-items: center; }
  .order-total { font-size: 16px; font-weight: 700; color: var(--yellow); }
  .status-select { background: var(--dark); border: 1.5px solid var(--yellow); border-radius: 8px; color: var(--cream); font-family: 'DM Sans', sans-serif; font-size: 12px; padding: 6px 10px; cursor: pointer; outline: none; }
  .no-orders { text-align: center; padding: 40px 20px; color: var(--ash); font-size: 14px; }

  /* Stats */
  .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 18px; }
  .stat-card { background: var(--smoke); border-radius: 14px; padding: 16px; text-align: center; border: 1px solid rgba(255,224,0,0.12); }
  .stat-num { font-family: 'Playfair Display', serif; font-size: 28px; font-weight: 900; color: var(--yellow); display: block; }
  .stat-label { font-size: 12px; color: var(--ash); margin-top: 4px; }

  /* Toast */
  .toast { position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%) translateY(80px); background: var(--ember); color: white; padding: 12px 24px; border-radius: 12px; font-weight: 600; font-size: 14px; transition: transform 0.3s ease; z-index: 999; white-space: nowrap; box-shadow: 0 4px 20px rgba(255,69,0,0.5); }
  .toast.show { transform: translateX(-50%) translateY(0); }

  /* Modal */
  .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.85); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 20px; }
  .modal { background: var(--smoke); border-radius: 22px; padding: 28px; width: 100%; max-width: 360px; border: 1px solid var(--yellow); text-align: center; }
  .modal-icon { font-size: 52px; margin-bottom: 14px; }
  .modal h3 { font-family: 'Playfair Display', serif; font-size: 21px; margin-bottom: 8px; color: var(--cream); }
  .modal p { font-size: 14px; color: var(--ash); margin-bottom: 22px; line-height: 1.5; }
  .modal-btns { display: flex; gap: 10px; }
  .modal-btn { flex: 1; padding: 14px; border-radius: 12px; border: none; font-family: 'DM Sans', sans-serif; font-size: 15px; font-weight: 600; cursor: pointer; transition: all 0.2s; }
  .modal-btn.cancel { background: var(--dark); color: var(--ash); border: 1.5px solid var(--ash); }
  .modal-btn.confirm { background: linear-gradient(135deg, var(--fire), var(--ember)); color: white; }
  .modal-btn:hover { transform: scale(1.02); }

  .filter-tabs { display: flex; gap: 6px; overflow-x: auto; padding-bottom: 4px; margin-bottom: 14px; scrollbar-width: none; }
  .filter-tabs::-webkit-scrollbar { display: none; }
  .filter-tab { white-space: nowrap; padding: 7px 14px; border-radius: 20px; border: 1.5px solid rgba(255,224,0,0.25); background: none; color: var(--ash); font-family: 'DM Sans', sans-serif; font-size: 12px; font-weight: 500; cursor: pointer; transition: all 0.2s; }
  .filter-tab.active { background: rgba(255,224,0,0.15); border-color: var(--yellow); color: var(--yellow); }
`;

// ─── MENU DATA ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  {
    id: "basiques", name: "Nos Basiques", style: "yellow",
    price29: "7,90€", price33: "10€",
    items: [
      { id: 1, name: "Marinara Antica 2.0", desc: "Tomate, mozza fior di latte, ail, origan, filet d'huile d'olive", p29: 7.90, p33: 10, badge: "" },
      { id: 2, name: "Napoli", desc: "Tomate, mozza fior di latte, anchois, câpres, origan, ail, basilic", p29: 7.90, p33: 10, badge: "" },
      { id: 3, name: "Margherita 2.0", desc: "Tomate, fiandino, basilic frais (selon saison), mozza fior di latte, pesto maison, filet d'huile d'olive", p29: 7.90, p33: 10, badge: "" },
    ]
  },
  {
    id: "traditions", name: "Nos Traditions", style: "yellow",
    price29: "10,50€", price33: "13,90€",
    items: [
      { id: 4, name: "Regina", desc: "Tomate, mozza fior di latte, émincé de champignons frais, chiffonnade de jambon blanc italien", p29: 10.50, p33: 13.90, badge: "" },
      { id: 5, name: "Végétarienne", desc: "Tomate, mozza fior di latte, ail, origan, émincé de champignons frais, légumes frais du marché", p29: 10.50, p33: 13.90, badge: "" },
      { id: 6, name: "Carbonara", desc: "Crème, mozza fior di latte, lardons, jaune d'œuf", p29: 10.50, p33: 13.90, badge: "" },
      { id: 7, name: "Bolognaise 🇮🇹", desc: "Tomate, oignons confits maison, mozza fior di latte, viande pur bœuf", p29: 10.50, p33: 13.90, badge: "" },
    ]
  },
  {
    id: "specialites", name: "Nos Spécialités", style: "yellow",
    price29: "10,50€", price33: "13,90€",
    items: [
      { id: 8, name: "Lady Gina \"Ma Bella !!!\"", desc: "Mozza fior di latte, lardons, chèvre (direct producteur), miel & noix — selon arrivage", p29: 10.50, p33: 13.90, badge: "🧡" },
      { id: 9, name: "No Diet Club", desc: "Mozza fior di latte, pomme de terre, chiffonnade de jambon blanc italien, émincé de champignons frais, origan, jaune d'œuf", p29: 10.50, p33: 13.90, badge: "" },
      { id: 10, name: "Quattro Formaggi", desc: "Tomate, mozza fior di latte, gorgonzola (AOP), chèvre (direct producteur selon arrivage), fiandino", p29: 10.50, p33: 13.90, badge: "" },
      { id: 11, name: "Chèvre Miel / Pignons ou Noix", desc: "Crème, mozza fior di latte, chèvre (direct producteur selon arrivage), miel, pignons ou noix — à préciser", p29: 10.50, p33: 13.90, badge: "" },
      { id: 12, name: "Corse 🎩", desc: "Tomate, mozza fior di latte, émincé de champignons frais, figatellu, chiffonnade de jambon italien", p29: 10.50, p33: 13.90, badge: "" },
      { id: 13, name: "Asco 🎩", desc: "Crème, mozza fior di latte, chèvre (direct producteur selon arrivage), figatellu, miel, noix", p29: 10.50, p33: 13.90, badge: "" },
      { id: 14, name: "San Francisco 🇺🇸", desc: "Tomate, mozza fior di latte, oignons confits maison, viande pur bœuf — accompagné d'une vicieuse sauce barbecue", p29: 10.50, p33: 13.90, badge: "🔥" },
    ]
  },
  {
    id: "decouvertes", name: "Nos Découvertes", style: "yellow",
    price29: "12€", price33: "14,90€",
    items: [
      { id: 15, name: "Diamant Noir 🔥 GROS KIFF !!", desc: "Crème de cèpes, mozza fior di latte, sortie de four : émincé de champignons frais, jambon cru, poudre de truffe noire", p29: 12, p33: 14.90, badge: "⭐" },
      { id: 16, name: "Savoyarde 🇨🇭", desc: "Pomme de terre, oignons confits maison, Tallegio, mozza fior di latte, lardons", p29: 12, p33: 14.90, badge: "" },
      { id: 17, name: "Parme 🇮🇹", desc: "Tomate, mozza fior di latte, sortie de four : roquette, chiffonnade de jambon cru, vinaigre balsamique — rajoute-toi un supplément burrata !", p29: 12, p33: 14.90, badge: "" },
      { id: 18, name: "Los Angeles 🇺🇸", desc: "Tomate, cheddar, oignons confits maison, viande pur bœuf, lardons, sauce burger — (Johnny la kiffait)", p29: 12, p33: 14.90, badge: "" },
      { id: 19, name: "New Delhi 🇮🇳", desc: "Crème curry, oignons confits maison, mozza fior di latte, poulet", p29: 12, p33: 14.90, badge: "" },
      { id: 20, name: "Vésuvio 🌶️", desc: "Tomate, oignons confits maison, mozza fior di latte, saucisson piquant italien, burrata crémeuse", p29: 12, p33: 14.90, badge: "" },
    ]
  },
  {
    id: "folie", name: "À la folie...", style: "yellow",
    price29: null, price33: "15€",
    items: [
      { id: 21, name: "Tuna Montana 🐟", desc: "Tomate, câpre, mozza fior di latte, thon italien, origan, émincé oignons rouges, burrata crémeuse", p29: null, p33: 15, badge: "" },
      { id: 22, name: "Summer Sexy Lady 🌸", desc: "Crème de truffe noire, mozza fior di latte, sortie de four : roquette, chiffonnade de jambon blanc, burrata crémeuse", p29: null, p33: 15, badge: "" },
      { id: 23, name: "Florence 🇮🇹", desc: "Tomate, mozza fior di latte, sortie de four : fiandino, jambon cru, pesto maison, burrata crémeuse", p29: null, p33: 15, badge: "" },
    ]
  },
  {
    id: "excellence", name: "L'Excellence", style: "red",
    price29: null, price33: "27€",
    items: [
      { id: 24, name: "Truffe 1", desc: "Crème de truffe noire, mozza fior di latte, sortie de four : chiffonnade de jambon blanc, burrata crémeuse, copeaux de truffe fraîche", p29: null, p33: 27, badge: "👑" },
      { id: 25, name: "Truffe 2", desc: "Crème, mozza fior di latte, sortie de four : chiffonnade de jambon blanc, poudre de truffe noire, roquette, jaune d'œuf, copeaux de truffe fraîche", p29: null, p33: 27, badge: "👑" },
    ]
  },
  {
    id: "dessert", name: "Pizza Dessert", style: "yellow",
    price29: "9,90€", price33: null,
    items: [
      { id: 26, name: "Les Balls ou La Pizza", desc: "Nutella & Smarties", p29: 9.90, p33: null, badge: "🍫" },
    ]
  },
];

const DRINKS = [
  { id: "d1", name: "Soda canette / Bière", price: 2.50 },
  { id: "d2", name: "Soda bouteille", price: 3.90 },
  { id: "d3", name: "Bouteille de vin 75cl (Rouge/Rosé)", price: 9 },
];

const EXTRAS = [
  { name: "Truffe fraîche", price: 12 },
  { name: "Mozza fior di latte", price: 2 },
  { name: "Viande ou poisson", price: 2.50 },
  { name: "Jaune d'œuf", price: 0.50 },
  { name: "Burrata", price: 3.50 },
];

const ALL_FILTER_CATS = ["Toutes", ...CATEGORIES.map(c => c.name), "Boissons"];

let orderCounter = 1;

export default function App() {
  const [tab, setTab] = useState("menu");
  const [cart, setCart] = useState({}); // { itemKey: { item, qty, size, price } }
  const [orders, setOrders] = useState([]);
  const [filterCat, setFilterCat] = useState("Toutes");
  const [sizes, setSizes] = useState({}); // { itemId: "29" | "33" }
  const [toast, setToast] = useState({ msg: "", show: false });
  const [confirm, setConfirm] = useState(false);

  const showToast = (msg) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2000);
  };

  const getSize = (item) => sizes[item.id] || (item.p29 ? "29" : "33");
  const getPrice = (item, size) => size === "29" ? item.p29 : item.p33;

  const cartKey = (item, size) => `${item.id}-${size}`;

  const addToCart = (item) => {
    const size = getSize(item);
    const price = getPrice(item, size);
    if (!price) return;
    const key = cartKey(item, size);
    setCart(c => ({
      ...c,
      [key]: c[key]
        ? { ...c[key], qty: c[key].qty + 1 }
        : { item, qty: 1, size, price }
    }));
    showToast(`${item.name} ajoutée ! 🍕`);
  };

  const addDrink = (drink) => {
    const key = drink.id;
    setCart(c => ({
      ...c,
      [key]: c[key]
        ? { ...c[key], qty: c[key].qty + 1 }
        : { item: { id: drink.id, name: drink.name }, qty: 1, size: null, price: drink.price }
    }));
    showToast(`${drink.name} ajouté ! 🥤`);
  };

  const updateQty = (key, delta) => {
    setCart(c => {
      const n = (c[key]?.qty || 0) + delta;
      if (n <= 0) { const nc = { ...c }; delete nc[nc[key] ? key : key]; delete nc[key]; return nc; }
      return { ...c, [key]: { ...c[key], qty: n } };
    });
  };

  const cartEntries = Object.entries(cart);
  const cartCount = cartEntries.reduce((a, [, v]) => a + v.qty, 0);
  const subtotal = cartEntries.reduce((s, [, v]) => s + v.price * v.qty, 0);

  // Promo : 3 grandes pizzas (33cm) achetées → 1 soda offert
  const big33count = cartEntries.filter(([k, v]) => v.size === "33").reduce((s, [, v]) => s + v.qty, 0);
  const promoActive = big33count >= 3;

  const total = subtotal; // soda offert = cadeau, pas de déduction directe sur total affiché

  const placeOrder = () => {
    const now = new Date();
    const timeStr = now.getHours().toString().padStart(2, "0") + "h" + now.getMinutes().toString().padStart(2, "0");
    const newOrder = {
      id: orderCounter++,
      entries: cartEntries.map(([, v]) => v),
      total,
      promoActive,
      time: timeStr,
      status: "waiting",
    };
    setOrders(o => [newOrder, ...o]);
    setCart({});
    setConfirm(false);
    setTab("orders");
    showToast("Commande passée ! 🔥");
  };

  const updateStatus = (id, status) => setOrders(o => o.map(ord => ord.id === id ? { ...ord, status } : ord));

  const statusLabel = { waiting: "En attente", cooking: "En cuisson 🔥", ready: "Prête ! ✅", done: "Servie", cancelled: "Annulée ❌" };
  const statusClass = { waiting: "status-waiting", cooking: "status-cooking", ready: "status-ready", done: "status-done", cancelled: "status-cancelled" };

  const todayRevenue = orders.reduce((s, o) => s + o.total, 0);

  const filteredCats = filterCat === "Toutes" ? CATEGORIES :
    filterCat === "Boissons" ? [] :
    CATEGORIES.filter(c => c.name === filterCat);

  return (
    <>
      <style>{style}</style>
      <div className="app">
        {/* HEADER */}
        <div className="header">
          <div className="header-top">
            <div className="logo">
              🍕 Cece Pizza
              <small>Camion à pizza · Feu de bois</small>
            </div>
            {tab !== "orders" && (
              <button className="cart-btn" onClick={() => setTab("cart")}>
                🛒
                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
              </button>
            )}
          </div>
          <div className="nav-tabs">
            <button className={`nav-tab ${tab === "menu" ? "active" : ""}`} onClick={() => setTab("menu")}>🍕 Menu</button>
            <button className={`nav-tab ${tab === "cart" ? "active" : ""}`} onClick={() => setTab("cart")}>🛒 {cartCount > 0 ? `(${cartCount})` : "Panier"}</button>
            <button className={`nav-tab ${tab === "orders" ? "active" : ""}`} onClick={() => setTab("orders")}>📋 Commandes</button>
            <button className={`nav-tab ${tab === "stats" ? "active" : ""}`} onClick={() => setTab("stats")}>📊 Stats</button>
          </div>
        </div>

        <div className="content">

          {/* ── MENU ── */}
          {tab === "menu" && (
            <>
              <div className="section-title">La Carte</div>
              <div className="section-subtitle">Pâte maison</div>

              <div className="filter-tabs">
                {ALL_FILTER_CATS.map(c => (
                  <button key={c} className={`filter-tab ${filterCat === c ? "active" : ""}`} onClick={() => setFilterCat(c)}>{c}</button>
                ))}
              </div>

              {/* Pizza categories */}
              {filteredCats.map(cat => (
                <div key={cat.id}>
                  <div className={`cat-header ${cat.style === "red" ? "red" : ""}`}>
                    <span className="cat-header-name">{cat.name}</span>
                    <span className="cat-header-prices">
                      {cat.price29 && `🍕29cm ${cat.price29}`}
                      {cat.price29 && cat.price33 && <br />}
                      {cat.price33 && `🍕33cm ${cat.price33}`}
                    </span>
                  </div>
                  {cat.items.map(item => {
                    const curSize = getSize(item);
                    const itemKeys = ["29", "33"].map(s => cartKey(item, s));
                    const cartQty29 = cart[cartKey(item, "29")]?.qty || 0;
                    const cartQty33 = cart[cartKey(item, "33")]?.qty || 0;
                    const curKey = cartKey(item, curSize);
                    const curQty = cart[curKey]?.qty || 0;
                    return (
                      <div className="pizza-card" key={item.id}>
                        <div className="pizza-top">
                          <span className="pizza-name">{item.badge && <span className="pizza-badge">{item.badge}</span>} {item.name}</span>
                        </div>
                        <div className="pizza-desc">{item.desc}</div>

                        {/* Size selector */}
                        {item.p29 && item.p33 && (
                          <div className="size-selector">
                            <button className={`size-btn ${curSize === "29" ? "active" : ""}`} onClick={() => setSizes(s => ({ ...s, [item.id]: "29" }))}>
                              29cm — {item.p29}€
                            </button>
                            <button className={`size-btn ${curSize === "33" ? "active" : ""}`} onClick={() => setSizes(s => ({ ...s, [item.id]: "33" }))}>
                              33cm — {item.p33}€
                            </button>
                          </div>
                        )}
                        {!item.p29 && item.p33 && (
                          <div style={{ fontSize: 12, color: "var(--ash)", marginBottom: 8 }}>Disponible uniquement en 33cm</div>
                        )}

                        <div className="pizza-footer">
                          <div className="pizza-prices">
                            {item.p29 && <div className="price-tag"><div className="price-size">29cm</div><div className="price-val">{item.p29}€</div></div>}
                            {item.p33 && <div className="price-tag"><div className="price-size">33cm</div><div className="price-val">{item.p33}€</div></div>}
                          </div>
                          {curQty > 0 ? (
                            <div className="qty-controls">
                              <button className="qty-btn" onClick={() => updateQty(curKey, -1)}>−</button>
                              <span className="qty-num">{curQty}</span>
                              <button className="qty-btn" onClick={() => updateQty(curKey, +1)}>+</button>
                            </div>
                          ) : (
                            <button className="add-btn" onClick={() => addToCart(item)}>+</button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}

              {/* Supplements */}
              {(filterCat === "Toutes" || filterCat === "Boissons") && (
                <>
                  <div style={{ marginTop: 18, marginBottom: 10 }}>
                    <div style={{ background: "#C0392B", borderRadius: 10, padding: "10px 16px", display: "flex", justifyContent: "space-between" }}>
                      <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "var(--yellow)" }}>Les Suppléments</span>
                    </div>
                  </div>
                  <div className="extras-section">
                    {EXTRAS.map((e, i) => (
                      <div className="extra-item" key={i}>
                        <span className="extra-name">{e.name}</span>
                        <span className="extra-price">+{e.price}€</span>
                      </div>
                    ))}
                  </div>

                  <div style={{ background: "var(--yellow)", borderRadius: 10, padding: "10px 16px", marginBottom: 10 }}>
                    <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 700, color: "var(--dark)" }}>Nos Boissons</span>
                  </div>
                  {DRINKS.map(drink => {
                    const qty = cart[drink.id]?.qty || 0;
                    return (
                      <div className="drink-card" key={drink.id}>
                        <div>
                          <div className="drink-name">🥤 {drink.name}</div>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <span className="drink-price">{drink.price}€</span>
                          {qty > 0 ? (
                            <div className="qty-controls">
                              <button className="qty-btn" onClick={() => updateQty(drink.id, -1)}>−</button>
                              <span className="qty-num">{qty}</span>
                              <button className="qty-btn" onClick={() => updateQty(drink.id, +1)}>+</button>
                            </div>
                          ) : (
                            <button className="add-btn" onClick={() => addDrink(drink)}>+</button>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  <div className="promo-banner">
                    <p>🎁 <strong>Une bouteille soda offerte</strong> pour 3 grandes pizzas (33cm) achetées simultanément !</p>
                  </div>
                </>
              )}
            </>
          )}

          {/* ── PANIER ── */}
          {tab === "cart" && (
            <>
              <div className="section-title">Mon Panier</div>
              <div className="section-subtitle">{cartCount > 0 ? `${cartCount} article${cartCount > 1 ? "s" : ""}` : "Vide"}</div>
              {cartCount === 0 ? (
                <div className="cart-empty">
                  <div className="cart-empty-icon">🍕</div>
                  <p>Votre panier est vide.<br />Ajoutez des pizzas depuis le menu !</p>
                </div>
              ) : (
                <>
                  <div className="cart-items">
                    {cartEntries.map(([key, v]) => (
                      <div className="cart-item" key={key}>
                        <div className="cart-item-info">
                          <div className="cart-item-name">{v.item.name}</div>
                          <div className="cart-item-sub">{v.size ? `${v.size}cm` : ""} — {v.price}€ / unité</div>
                        </div>
                        <div className="qty-controls">
                          <button className="qty-btn" onClick={() => updateQty(key, -1)}>−</button>
                          <span className="qty-num">{v.qty}</span>
                          <button className="qty-btn" onClick={() => updateQty(key, +1)}>+</button>
                        </div>
                        <span className="cart-item-price">{(v.price * v.qty).toFixed(2)}€</span>
                      </div>
                    ))}
                  </div>

                  {promoActive && (
                    <div className="promo-note">🎁 Vous bénéficiez d'une bouteille soda offerte !</div>
                  )}

                  <div className="cart-summary">
                    <div className="summary-row"><span>Sous-total</span><span>{subtotal.toFixed(2)}€</span></div>
                    <div className="summary-row"><span>Paiement</span><span>Chèque ou espèces</span></div>
                    <div className="summary-row total"><span>Total</span><span className="total-price">{total.toFixed(2)}€</span></div>
                  </div>

                  <button className="order-btn" onClick={() => setConfirm(true)}>
                    Envoyer en cuisine — {total.toFixed(2)}€ 🔥
                  </button>
                </>
              )}
            </>
          )}

          {/* ── COMMANDES ── */}
          {tab === "orders" && (
            <>
              <div className="section-title">Commandes</div>
              <div className="section-subtitle">{orders.length} commande{orders.length !== 1 ? "s" : ""} aujourd'hui</div>
              {orders.length === 0 ? (
                <div className="no-orders" style={{ textAlign: "center", padding: "40px 20px" }}>
                  <span style={{ fontSize: 48, display: "block", marginBottom: 12 }}>📋</span>
                  Aucune commande pour l'instant.
                </div>
              ) : (
                orders.map(order => (
                  <div className="order-card" key={order.id}>
                    <div className="order-header">
                      <div>
                        <div className="order-num">Commande #{order.id}</div>
                        <div className="order-time">⏱ {order.time}</div>
                      </div>
                      <span className={`status-badge ${statusClass[order.status]}`}>{statusLabel[order.status]}</span>
                    </div>
                    <div className="order-items-list">
                      {order.entries.map((e, i) => `${e.qty}× ${e.item.name}${e.size ? ` (${e.size}cm)` : ""}`).join("  •  ")}
                      {order.promoActive && "  •  🎁 Soda offert"}
                    </div>
                    <div className="order-footer">
                      <span className="order-total">{order.total.toFixed(2)}€</span>
                      <select className="status-select" value={order.status} onChange={e => updateStatus(order.id, e.target.value)}>
                        <option value="waiting">En attente</option>
                        <option value="cooking">En cuisson</option>
                        <option value="ready">Prête !</option>
                        <option value="done">Servie</option>
                        <option value="cancelled">Annulée</option>
                      </select>
                    </div>
                  </div>
                ))
              )}
            </>
          )}

          {/* ── STATS ── */}
          {tab === "stats" && (
            <>
              <div className="section-title">Tableau de bord</div>
              <div className="section-subtitle">Vue d'ensemble du service</div>
              <div className="stats-grid">
                <div className="stat-card"><span className="stat-num">{orders.length}</span><div className="stat-label">Commandes</div></div>
                <div className="stat-card"><span className="stat-num">{todayRevenue.toFixed(0)}€</span><div className="stat-label">CA du jour</div></div>
                <div className="stat-card"><span className="stat-num">{orders.filter(o => o.status === "cooking").length}</span><div className="stat-label">En cuisson 🔥</div></div>
                <div className="stat-card"><span className="stat-num">{orders.filter(o => o.status === "ready").length}</span><div className="stat-label">Prêtes ✅</div></div>
              </div>
              <div style={{ background: "var(--smoke)", borderRadius: 14, padding: 16, border: "1px solid rgba(255,224,0,0.15)" }}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, marginBottom: 10, color: "var(--cream)" }}>Infos pratiques</div>
                <div style={{ fontSize: 13, color: "var(--ash)", lineHeight: 2 }}>
                  💳 Chèque + Espèces uniquement<br />
                  🎁 Soda offert pour 3 grandes pizzas (33cm)<br />
                  📱 cece_pizza · cecepizzalagarde<br />
                  📞 06.51.40.35.78
                </div>
              </div>
            </>
          )}

        </div>

        {/* Toast */}
        <div className={`toast ${toast.show ? "show" : ""}`}>{toast.msg}</div>

        {/* Confirm Modal */}
        {confirm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-icon">🍕</div>
              <h3>Confirmer la commande</h3>
              <p>
                {cartCount} article{cartCount > 1 ? "s" : ""} pour un total de{" "}
                <strong style={{ color: "var(--yellow)" }}>{total.toFixed(2)}€</strong>.
                {promoActive && " 🎁 Soda offert inclus !"}
              </p>
              <div className="modal-btns">
                <button className="modal-btn cancel" onClick={() => setConfirm(false)}>Annuler</button>
                <button className="modal-btn confirm" onClick={placeOrder}>Envoyer 🔥</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
