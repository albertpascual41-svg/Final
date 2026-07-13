import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  Bike,
  Boxes,
  Check,
  ClipboardList,
  Droplets,
  Eye,
  EyeOff,
  FileBarChart,
  KeyRound,
  LogOut,
  Mail,
  Minus,
  PackagePlus,
  Pencil,
  Plus,
  Printer,
  Search,
  Settings,
  Shield,
  ShoppingCart,
  Trash2,
  UserCog,
  UserRound,
} from "lucide-react";

const APP_NAME = "Gohan Water Refilling Station";
const APP_SUBTITLE = "Water Refilling and Delivery Management System";
const VAT_RATE = 0.12;
const MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SALES_START_MONTH = 5;
const ORDER_TYPES = [
  { value: "walk-in", label: "Walk-in" },
  { value: "delivery", label: "Delivery" },
];

const DEFAULT_ACCOUNTS = {
  admin: { pass: "admin123", role: "admin", name: "Administrator", email: "admin@gohanstation.com" },
  cashier: { pass: "cash123", role: "cashier", name: "Albert", email: "cashier@gohanstation.com" },
  rider: { pass: "ride123", role: "rider", name: "Andrei", email: "rider@gohanstation.com" },
};

const ACCOUNT_RECOVERY = {
  admin: { username: "admin", contact: "System Administrator" },
  cashier: { username: "cashier", contact: "Store Manager" },
  rider: { username: "rider", contact: "Dispatch Admin" },
};

const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:15550/api";
const SESSION_KEY = "gohan-pos-session";
const ACCOUNTS_KEY = "gohan-pos-accounts";

const INITIAL_PRODUCTS = [
  { id: "p1", name: "Mineral Water Bottle", type: "bottle", size: "500ml", price: 8.93, stock: 200, minStock: 20 },
  { id: "p2", name: "Purified Water Bottle", type: "bottle", size: "1L", price: 13.39, stock: 150, minStock: 20 },
  { id: "p3", name: "Spring Water Gallon", type: "gallon", size: "1 gal", price: 35.71, stock: 80, minStock: 15 },
  { id: "p4", name: "Purified 5-Gal Jug", type: "gallon", size: "5 gal", price: 53.57, stock: 45, minStock: 10 },
  { id: "p5", name: "Water Station Tank", type: "tank", size: "25L", price: 89.29, stock: 20, minStock: 5 },
  { id: "p6", name: "Large Storage Tank", type: "tank", size: "50L", price: 160.71, stock: 8, minStock: 3 },
  { id: "p7", name: "Alkaline Water Bottle", type: "bottle", size: "750ml", price: 17.86, stock: 12, minStock: 20 },
  { id: "p8", name: "Flavored Water Bottle", type: "bottle", size: "500ml", price: 22.32, stock: 90, minStock: 15 },
];

const INITIAL_ORDERS = [
  { id: "ORD-001", date: "2024-06-10 09:15", customer: "Jose Reyes", address: "123 Rizal St, Brgy. 1", items: [{ productId: "p3", name: "Spring Water Gallon", size: "1 gal", qty: 4, unitPrice: 35.71 }], rider: "Andrei", status: "delivered", cashier: "Albert" },
  { id: "ORD-002", date: "2024-06-11 10:30", customer: "Ana Gonzalez", address: "456 Mabini Ave", items: [{ productId: "p4", name: "Purified 5-Gal Jug", size: "5 gal", qty: 2, unitPrice: 53.57 }, { productId: "p1", name: "Mineral Water Bottle", size: "500ml", qty: 6, unitPrice: 8.93 }], rider: "Andrei", status: "delivered", cashier: "Albert" },
  { id: "ORD-003", date: "2024-06-12 11:00", customer: "Mark Torres", address: "789 Luna Blvd", items: [{ productId: "p5", name: "Water Station Tank", size: "25L", qty: 1, unitPrice: 89.29 }], rider: "Andrei", status: "out-for-delivery", cashier: "Albert" },
  { id: "ORD-004", date: "2024-06-13 08:45", customer: "Liza Ramos", address: "321 Bonifacio St", items: [{ productId: "p3", name: "Spring Water Gallon", size: "1 gal", qty: 3, unitPrice: 35.71 }], rider: "", status: "pending", cashier: "Albert" },
  { id: "ORD-005", date: "2024-06-14 14:20", customer: "Carlo Dela Rosa", address: "654 Aguinaldo Rd", items: [{ productId: "p2", name: "Purified Water Bottle", size: "1L", qty: 12, unitPrice: 13.39 }], rider: "Andrei", status: "pending", cashier: "Albert" },
];

const INITIAL_RIDERS = [{ id: "r1", name: "Andrei", area: "All Zones", phone: "09171234567" }];

const DROPLETS = [
  { left: "4%", size: 8, duration: "9s", delay: "-1s" },
  { left: "9%", size: 18, duration: "14s", delay: "-7s" },
  { left: "15%", size: 11, duration: "11s", delay: "-4s" },
  { left: "21%", size: 23, duration: "16s", delay: "-11s" },
  { left: "28%", size: 7, duration: "10s", delay: "-2s" },
  { left: "33%", size: 15, duration: "13s", delay: "-8s" },
  { left: "39%", size: 21, duration: "17s", delay: "-5s" },
  { left: "45%", size: 9, duration: "12s", delay: "-10s" },
  { left: "50%", size: 24, duration: "18s", delay: "-14s" },
  { left: "56%", size: 13, duration: "11s", delay: "-6s" },
  { left: "62%", size: 19, duration: "15s", delay: "-3s" },
  { left: "68%", size: 6, duration: "9s", delay: "-5s" },
  { left: "73%", size: 22, duration: "16s", delay: "-9s" },
  { left: "79%", size: 10, duration: "12s", delay: "-1s" },
  { left: "84%", size: 17, duration: "14s", delay: "-12s" },
  { left: "89%", size: 12, duration: "10s", delay: "-6s" },
  { left: "94%", size: 20, duration: "17s", delay: "-15s" },
  { left: "98%", size: 7, duration: "13s", delay: "-4s" },
];

const NAV_ITEMS = {
  admin: [
    { id: "dashboard", icon: BarChart3, label: "Dashboard" },
    { id: "orders", icon: ClipboardList, label: "Orders" },
    { id: "products", icon: Boxes, label: "Products" },
    { id: "inventory", icon: PackagePlus, label: "Inventory" },
    { id: "riders", icon: Bike, label: "Riders" },
    { id: "analytics", icon: FileBarChart, label: "Analytics" },
  ],
  cashier: [
    { id: "pos", icon: ShoppingCart, label: "Point of Sale" },
    { id: "orders", icon: ClipboardList, label: "My Orders" },
    { id: "products", icon: Boxes, label: "Products" },
    { id: "inventory", icon: PackagePlus, label: "Inventory" },
  ],
  rider: [
    { id: "my-deliveries", icon: Bike, label: "My Deliveries" },
    { id: "orders", icon: ClipboardList, label: "All Orders" },
  ],
};

function money(value) {
  return `PHP ${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
}

function orderSubtotal(order) {
  return order.items.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
}

function orderVat(order) {
  return orderSubtotal(order) * VAT_RATE;
}

function orderTotal(order) {
  return orderSubtotal(order) + orderVat(order);
}

function monthlySalesFromJune(orders) {
  const labels = Array.from({ length: 12 }, (_, index) => MONTH_LABELS[(SALES_START_MONTH + index) % 12]);
  const values = labels.map(() => 0);

  orders.forEach((order) => {
    const match = String(order.date || "").match(/^\d{4}-(\d{2})-/);
    const month = match ? Number(match[1]) - 1 : new Date(order.date).getMonth();
    if (Number.isNaN(month) || month < 0) return;
    values[(month - SALES_START_MONTH + 12) % 12] += orderTotal(order);
  });

  return { labels, values };
}

function monthlyReportByCalendarYear(orders) {
  const labels = MONTH_LABELS;
  const rows = labels.map((label, index) => ({
    label,
    month: index,
    orders: 0,
    subtotal: 0,
    vat: 0,
    total: 0,
  }));

  orders.forEach((order) => {
    const match = String(order.date || "").match(/^\d{4}-(\d{2})-/);
    const month = match ? Number(match[1]) - 1 : new Date(order.date).getMonth();
    if (Number.isNaN(month) || month < 0) return;

    const row = rows[month];
    row.orders += 1;
    row.subtotal += orderSubtotal(order);
    row.vat += orderVat(order);
    row.total += orderTotal(order);
  });

  return rows;
}

function juneWeeklySales(orders) {
  const ranges = [
    { label: "Jun 1-7", start: 1, end: 7 },
    { label: "Jun 8-14", start: 8, end: 14 },
    { label: "Jun 15-21", start: 15, end: 21 },
    { label: "Jun 22-28", start: 22, end: 28 },
    { label: "Jun 29-30", start: 29, end: 30 },
  ];

  return ranges.map((range) => ({
    ...range,
    total: orders.reduce((sum, order) => {
      const date = new Date(order.date);
      if (Number.isNaN(date.getTime()) || date.getMonth() !== SALES_START_MONTH) return sum;
      const day = date.getDate();
      return day >= range.start && day <= range.end ? sum + orderTotal(order) : sum;
    }, 0),
  }));
}

function now() {
  return new Date().toLocaleString("en-PH", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

function statusClass(status) {
  return {
    pending: "badge-warning",
    "out-for-delivery": "badge-info",
    delivered: "badge-success",
    cancelled: "badge-danger",
  }[status] || "badge-info";
}

function typeLabel(type) {
  return { bottle: "Bottle", gallon: "Gallon", tank: "Tank" }[type] || "Water";
}

function typeIcon(type) {
  return { bottle: Droplets, gallon: Boxes, tank: PackagePlus }[type] || Droplets;
}

function orderTypeLabel(type) {
  return ORDER_TYPES.find((item) => item.value === type)?.label || "Delivery";
}

function defaultPanelForRole(role) {
  return NAV_ITEMS[role]?.[0]?.id || "dashboard";
}

function canUsePanel(role, panel) {
  return NAV_ITEMS[role]?.some((item) => item.id === panel);
}

function loadAccounts() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(ACCOUNTS_KEY) || "{}");
    return Object.fromEntries(Object.entries(DEFAULT_ACCOUNTS).map(([username, account]) => [
      username,
      { ...account, ...(saved[username] || {}) },
    ]));
  } catch {
    return DEFAULT_ACCOUNTS;
  }
}

function makeVerificationCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

function readStoredSession() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(SESSION_KEY) || "{}");
    const user = saved.currentUser;
    const accounts = loadAccounts();
    const account = user?.username ? accounts[user.username] : null;
    if (!account || account.role !== user.role) return { currentUser: null, activePanel: "dashboard" };
    const defaultPanel = defaultPanelForRole(account.role);
    return {
      currentUser: { username: user.username, role: account.role, name: account.name },
      activePanel: canUsePanel(account.role, saved.activePanel) ? saved.activePanel : defaultPanel,
    };
  } catch {
    return { currentUser: null, activePanel: "dashboard" };
  }
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.message || "API request failed.");
  return data;
}

export default function App() {
  const [storedSession] = useState(readStoredSession);
  const [accounts, setAccounts] = useState(loadAccounts);
  const [authScreen, setAuthScreen] = useState("home");
  const [selectedRole, setSelectedRole] = useState("admin");
  const [loginUser, setLoginUser] = useState("admin");
  const [loginPass, setLoginPass] = useState("");
  const [currentUser, setCurrentUser] = useState(storedSession.currentUser);
  const [activePanel, setActivePanel] = useState(storedSession.activePanel);
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [riders, setRiders] = useState(INITIAL_RIDERS);
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const [receiptOrder, setReceiptOrder] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [restockProduct, setRestockProduct] = useState(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [settingsMenuOpen, setSettingsMenuOpen] = useState(false);
  const [accountSettingsOpen, setAccountSettingsOpen] = useState(false);
  const [riderModalOpen, setRiderModalOpen] = useState(false);

  function applyServerState(state) {
    if (!state) return;
    setProducts(state.products || []);
    setOrders(state.orders || []);
    setRiders(state.riders || []);
  }

  useEffect(() => {
    apiRequest("/bootstrap")
      .then(applyServerState)
      .catch((error) => notify(`MongoDB API unavailable: ${error.message}`, "error"));
  }, []);

  useEffect(() => {
    if (!currentUser) {
      window.localStorage.removeItem(SESSION_KEY);
      return;
    }
    window.localStorage.setItem(SESSION_KEY, JSON.stringify({ currentUser, activePanel }));
  }, [currentUser, activePanel]);

  function notify(message, type = "info") {
    setToast({ message, type });
    window.setTimeout(() => setToast(null), 2600);
  }

  function selectRole(role) {
    setSelectedRole(role);
    setLoginUser(role);
    setLoginPass("");
  }

  function openLogin(role = selectedRole) {
    selectRole(role);
    setAuthScreen("login");
  }

  function login(event) {
    event.preventDefault();
    const account = accounts[loginUser.trim()];
    if (!account || account.pass !== loginPass) {
      notify("Invalid username or password.", "error");
      return;
    }
    if (account.role !== selectedRole) {
      notify(`This account is a ${account.role}, not ${selectedRole}.`, "error");
      return;
    }
    setCurrentUser({ username: loginUser.trim(), role: account.role, name: account.name });
    setActivePanel(defaultPanelForRole(account.role));
  }

  function updateAccount(username, patch) {
    const updated = {
      ...accounts,
      [username]: { ...accounts[username], ...patch },
    };
    setAccounts(updated);
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(updated));
    notify("Account settings updated.", "success");
  }

  function logout() {
    setSettingsMenuOpen(false);
    setLogoutModalOpen(true);
  }

  function openAccountSettings() {
    setSettingsMenuOpen(false);
    setAccountSettingsOpen(true);
  }

  function confirmLogout() {
    window.localStorage.removeItem(SESSION_KEY);
    setLogoutModalOpen(false);
    setCurrentUser(null);
    setCart([]);
    setLastOrder(null);
    setReceiptOrder(null);
  }

  async function updateOrder(id, patch) {
    try {
      const data = await apiRequest(`/orders/${id}`, {
        method: "PATCH",
        body: JSON.stringify(patch),
      });
      applyServerState(data.state);
    } catch (error) {
      notify(error.message, "error");
    }
  }

  async function addProduct(product) {
    const data = await apiRequest("/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
    applyServerState(data.state);
  }

  async function updateProduct(id, product) {
    const data = await apiRequest(`/products/${id}`, {
      method: "PATCH",
      body: JSON.stringify(product),
    });
    applyServerState(data.state);
  }

  async function deleteProduct(product) {
    const data = await apiRequest(`/products/${product.id}`, {
      method: "DELETE",
    });
    applyServerState(data.state);
  }

  async function restockProductQty(product, qty) {
    const data = await apiRequest(`/products/${product.id}/restock`, {
      method: "PATCH",
      body: JSON.stringify({ qty }),
    });
    applyServerState(data.state);
  }

  async function addRider(rider) {
    const data = await apiRequest("/riders", {
      method: "POST",
      body: JSON.stringify(rider),
    });
    applyServerState(data.state);
  }

  async function createOrder(order) {
    const data = await apiRequest("/orders", {
      method: "POST",
      body: JSON.stringify(order),
    });
    applyServerState(data.state);
    return data.order;
  }

  if (!currentUser) {
    if (authScreen === "home") {
      return (
        <HomeScreen
          selectRole={selectRole}
          openLogin={openLogin}
          selectedRole={selectedRole}
          products={products}
          orders={orders}
          riders={riders}
          toast={toast}
        />
      );
    }

    return (
      <LoginScreen
        selectedRole={selectedRole}
        loginUser={loginUser}
        loginPass={loginPass}
        setLoginUser={setLoginUser}
        setLoginPass={setLoginPass}
        selectRole={selectRole}
        accounts={accounts}
        updateAccount={updateAccount}
        login={login}
        backHome={() => setAuthScreen("home")}
        toast={toast}
      />
    );
  }

  const nav = NAV_ITEMS[currentUser.role];

  return (
    <div className="app-shell">
      <BackgroundEffects />
      <header className="topbar">
        <div className="topbar-brand">
          <Droplets size={22} />
          <strong>{APP_NAME}</strong>
        </div>
        <div className="topbar-user">
          <div className="user-badge">
            <UserRound size={16} />
            <span>{currentUser.name}</span>
            <span className={`role-tag role-${currentUser.role}`}>{currentUser.role}</span>
          </div>
          <div className="settings-menu">
            <button
              className="btn-settings"
              type="button"
              onClick={() => setSettingsMenuOpen((open) => !open)}
              aria-haspopup="menu"
              aria-expanded={settingsMenuOpen}
            >
              <Settings size={16} />
              Settings
            </button>
            {settingsMenuOpen && (
              <div className="settings-dropdown" role="menu">
                <button type="button" role="menuitem" onClick={openAccountSettings}>
                  <UserCog size={16} />
                  Account Settings
                </button>
                <button type="button" role="menuitem" className="danger-menu-item" onClick={logout}>
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="app-body">
        <nav className="sidebar">
          <div className="nav-section-label">Navigation</div>
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${activePanel === item.id ? "active" : ""}`}
                onClick={() => setActivePanel(item.id)}
              >
                <Icon className="nav-icon" size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <main className="content-area">
          {activePanel === "dashboard" && <Dashboard products={products} orders={orders} riders={riders} />}
          {activePanel === "pos" && (
            <POSPanel
              currentUser={currentUser}
              products={products}
              riders={riders}
              orders={orders}
              createOrder={createOrder}
              cart={cart}
              setCart={setCart}
              lastOrder={lastOrder}
              setLastOrder={setLastOrder}
              setReceiptOrder={setReceiptOrder}
              notify={notify}
            />
          )}
          {activePanel === "products" && (
            <ProductsPanel
              currentUser={currentUser}
              products={products}
              openAdd={() => setProductModalOpen(true)}
              openEdit={setEditingProduct}
              onDelete={async (product) => {
                if (!window.confirm(`Delete ${product.name}? This cannot be undone.`)) return;
                try {
                  await deleteProduct(product);
                  notify(`${product.name} deleted.`, "success");
                } catch (error) {
                  notify(error.message, "error");
                }
              }}
            />
          )}
          {activePanel === "inventory" && (
            <InventoryPanel
              currentUser={currentUser}
              products={products}
              openRestock={setRestockProduct}
            />
          )}
          {activePanel === "orders" && (
            <Orders orders={orders} currentUser={currentUser} updateOrder={updateOrder} />
          )}
          {activePanel === "riders" && (
            <Riders riders={riders} orders={orders} updateOrder={updateOrder} openAdd={() => setRiderModalOpen(true)} />
          )}
          {activePanel === "analytics" && <Analytics products={products} orders={orders} />}
          {activePanel === "my-deliveries" && (
            <MyDeliveries currentUser={currentUser} orders={orders} updateOrder={updateOrder} />
          )}
        </main>
      </div>

      {receiptOrder && <ReceiptModal order={receiptOrder} cashier={currentUser.name} onClose={() => setReceiptOrder(null)} />}
      {accountSettingsOpen && (
        <AccountSettingsModal
          user={currentUser}
          account={accounts[currentUser.username]}
          onSave={(patch) => updateAccount(currentUser.username, patch)}
          onClose={() => setAccountSettingsOpen(false)}
        />
      )}
      {logoutModalOpen && (
        <LogoutConfirmModal
          user={currentUser}
          onClose={() => setLogoutModalOpen(false)}
          onConfirm={confirmLogout}
        />
      )}
      {productModalOpen && (
        <ProductModal
          onClose={() => setProductModalOpen(false)}
          onSave={async (product) => {
            try {
              await addProduct(product);
              setProductModalOpen(false);
              notify("Product added successfully.", "success");
            } catch (error) {
              notify(error.message, "error");
            }
          }}
        />
      )}
      {editingProduct && (
        <ProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={async (product) => {
            try {
              await updateProduct(editingProduct.id, product);
              setEditingProduct(null);
              notify("Product updated successfully.", "success");
            } catch (error) {
              notify(error.message, "error");
            }
          }}
        />
      )}
      {restockProduct && (
        <RestockModal
          product={restockProduct}
          onClose={() => setRestockProduct(null)}
          onSave={async (qty) => {
            try {
              await restockProductQty(restockProduct, qty);
              setRestockProduct(null);
              notify(`Restocked ${restockProduct.name} by ${qty} units.`, "success");
            } catch (error) {
              notify(error.message, "error");
            }
          }}
        />
      )}
      {riderModalOpen && (
        <RiderModal
          onClose={() => setRiderModalOpen(false)}
          onSave={async (rider) => {
            try {
              await addRider(rider);
              setRiderModalOpen(false);
              notify("Rider added successfully.", "success");
            } catch (error) {
              notify(error.message, "error");
            }
          }}
        />
      )}
      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
    </div>
  );
}

function HomeScreen({ selectRole, openLogin, selectedRole, products, orders, riders, toast }) {
  const [publicTab, setPublicTab] = useState("home");
  const pending = orders.filter((order) => order.status === "pending").length;
  const lowStock = products.filter((product) => product.stock <= product.minStock).length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const tabContent = {
    home: {
      kicker: APP_SUBTITLE,
      title: "Built for water station operations",
      text: "Use role-based access for daily selling, stock monitoring, dispatching, and receipt printing.",
      tags: ["Live stock", "Sales records", "Receipts"],
      details: [
        ["Products", "Refilled gallons, bottled water, and station tanks."],
        ["Sales", "Customer orders, VAT totals, receipts, and checkout records."],
        ["Delivery", "Dispatch monitoring, assigned riders, and order status updates."],
      ],
    },
    about: {
      kicker: "About the Station",
      title: APP_NAME,
      text: "A water refilling station management system for organizing products, customer purchases, inventory, delivery assignments, and official receipts in one clean workspace.",
      tags: ["Clean records", "Daily operations", "Water service"],
      details: [
        ["Purpose", "Keep refilling station operations simple, traceable, and organized."],
        ["Services", "Water refills, bottled products, delivery orders, and station supplies."],
        ["System", "Designed for sales, stock monitoring, dispatch tracking, and reports."],
      ],
    },
    contact: {
      kicker: "Contact Us",
      title: "Reach Gohan Water Refilling Station",
      text: "For orders, delivery updates, product availability, or station concerns, contact us through email or phone.",
      tags: ["Orders", "Delivery", "Support"],
      details: [
        ["Email", "Gohanstation@gmail.com"],
        ["Phone", "09054488200"],
        ["Phone", "09062034622"],
      ],
    },
  }[publicTab];

  return (
    <div className="home-screen">
      <BackgroundEffects />
      <header className="home-header">
        <div className="topbar-brand">
          <Droplets size={24} />
          <strong>{APP_NAME}</strong>
        </div>
        <nav className="home-nav" aria-label="Home navigation">
          <button className={`home-nav-link ${publicTab === "home" ? "active" : ""}`} type="button" onClick={() => setPublicTab("home")}>Home</button>
          <button className={`home-nav-link ${publicTab === "about" ? "active" : ""}`} type="button" onClick={() => setPublicTab("about")}>About</button>
          <button className={`home-nav-link ${publicTab === "contact" ? "active" : ""}`} type="button" onClick={() => setPublicTab("contact")}>Contact Us</button>
          <button className="home-nav-link filled" type="button" onClick={() => openLogin(selectedRole)}>Sign In</button>
        </nav>
      </header>

      <main className="home-main">
        <section className="home-hero">
          <div className="home-visual-panel">
            <div className="home-visual-overlay">
              <div className="station-lockup">
                <span className="station-icon"><Droplets size={28} /></span>
                <div>
                  <span>{APP_SUBTITLE}</span>
                  <strong>{APP_NAME}</strong>
                </div>
              </div>
              <h1>Manage water refills, orders, and deliveries in one trusted station system.</h1>
              <p>Staff can process sales, monitor product stock, assign riders, and track customer orders from checkout to delivery.</p>
              <div className="home-feature-list">
                <div><Check size={18} /><span>Clean product records for bottled water, gallons, and tanks.</span></div>
                <div><Check size={18} /><span>Fast checkout with VAT totals and printable receipts.</span></div>
                <div><Check size={18} /><span>Clear delivery status from pending order to completed drop-off.</span></div>
              </div>
            </div>
          </div>

          <div className="home-info-card glass-strong">
            <div className="home-kicker">{tabContent.kicker}</div>
            <h2>{tabContent.title}</h2>
            <p>{tabContent.text}</p>
            <div className="home-info-tags">
              {tabContent.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
            <div className="station-detail-list">
              {tabContent.details.map(([label, text], index) => (
                <div key={`${label}-${index}`}><strong>{label}</strong><span>{text}</span></div>
              ))}
            </div>
          </div>
        </section>

        <section className="home-status-strip" aria-label="System status">
          <div><Droplets size={17} /><span>Orders</span><strong>{orders.length}</strong></div>
          <div><ClipboardList size={17} /><span>Pending</span><strong>{pending}</strong></div>
          <div><Boxes size={17} /><span>Stock Units</span><strong>{totalStock}</strong></div>
          <div><Bike size={17} /><span>Riders</span><strong>{riders.length}</strong></div>
          <div><Shield size={17} /><span>Low Stock</span><strong>{lowStock}</strong></div>
        </section>
      </main>
      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
    </div>
  );
}

function LoginScreen({ selectedRole, loginUser, loginPass, setLoginUser, setLoginPass, selectRole, accounts, updateAccount, login, backHome, toast }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [recoveryEmail, setRecoveryEmail] = useState("");
  const [recoveryCode, setRecoveryCode] = useState("");
  const [sentRecoveryCode, setSentRecoveryCode] = useState("");
  const [newRecoveryPass, setNewRecoveryPass] = useState("");
  const [confirmRecoveryPass, setConfirmRecoveryPass] = useState("");
  const [recoveryMessage, setRecoveryMessage] = useState("");
  const recovery = ACCOUNT_RECOVERY[selectedRole];
  const selectedAccount = accounts[selectedRole];
  const roles = [
    { id: "admin", icon: Shield, label: "Admin" },
    { id: "cashier", icon: ShoppingCart, label: "Cashier" },
    { id: "rider", icon: Bike, label: "Rider" },
  ];

  function resetRecoveryForm(role) {
    setRecoveryEmail(accounts[role]?.email || "");
    setRecoveryCode("");
    setSentRecoveryCode("");
    setNewRecoveryPass("");
    setConfirmRecoveryPass("");
    setRecoveryMessage("");
  }

  function sendRecoveryCode() {
    const email = recoveryEmail.trim().toLowerCase();
    if (!email || email !== String(selectedAccount.email || "").toLowerCase()) {
      setRecoveryMessage("Enter the email linked to this account.");
      return;
    }
    const code = makeVerificationCode();
    setSentRecoveryCode(code);
    setRecoveryMessage(`Verification code sent to ${selectedAccount.email}. Demo code: ${code}`);
  }

  function resetPassword(event) {
    event.preventDefault();
    if (!sentRecoveryCode || recoveryCode.trim() !== sentRecoveryCode) {
      setRecoveryMessage("Enter the correct verification code.");
      return;
    }
    if (newRecoveryPass.length < 6) {
      setRecoveryMessage("New password must be at least 6 characters.");
      return;
    }
    if (newRecoveryPass !== confirmRecoveryPass) {
      setRecoveryMessage("New password and confirmation do not match.");
      return;
    }
    updateAccount(selectedRole, { pass: newRecoveryPass });
    setLoginUser(recovery.username);
    setLoginPass(newRecoveryPass);
    setShowRecovery(false);
    resetRecoveryForm(selectedRole);
  }

  return (
    <div className="login-screen">
      <BackgroundEffects />
      <div className="login-logo">
        <Droplets className="drop-icon" size={58} />
        <h1>{APP_NAME}</h1>
        <p>{APP_SUBTITLE}</p>
      </div>
      <form className="glass-strong login-card" onSubmit={login}>
        <button className="btn-back-home" type="button" onClick={backHome}>Back to Home</button>
        <h2>Select Role and Sign In</h2>
        <div className="role-selector">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <button type="button" key={role.id} className={`role-btn ${selectedRole === role.id ? "active" : ""}`} onClick={() => {
                selectRole(role.id);
                setShowRecovery(false);
                resetRecoveryForm(role.id);
              }}>
                <Icon size={22} />
                {role.label}
              </button>
            );
          })}
        </div>
        <label className="form-group">
          <span>Username</span>
          <input value={loginUser} onChange={(event) => setLoginUser(event.target.value)} />
        </label>
        <label className="form-group">
          <span>Password</span>
          <div className="password-field">
            <input type={showPassword ? "text" : "password"} value={loginPass} onChange={(event) => setLoginPass(event.target.value)} />
            <button
              type="button"
              className="password-toggle"
              onClick={() => setShowPassword((visible) => !visible)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </label>
        <button className="forgot-password-link" type="button" onClick={() => {
          resetRecoveryForm(selectedRole);
          setShowRecovery((visible) => !visible);
        }}>
          <KeyRound size={15} />
          Forgot password?
        </button>
        {showRecovery && (
          <form className="recovery-panel" onSubmit={resetPassword}>
            <div>
              <span>{selectedRole} account</span>
              <strong>{recovery.contact}</strong>
            </div>
            <p>Username: <b>{recovery.username}</b></p>
            <label className="form-group compact-field">
              <span>Account Email</span>
              <input type="email" value={recoveryEmail} onChange={(event) => setRecoveryEmail(event.target.value)} placeholder={selectedAccount.email} />
            </label>
            <button className="btn-recovery-fill" type="button" onClick={sendRecoveryCode}><Mail size={15} /> Send Verification Code</button>
            <label className="form-group compact-field">
              <span>Verification Code</span>
              <input value={recoveryCode} onChange={(event) => setRecoveryCode(event.target.value)} inputMode="numeric" />
            </label>
            <label className="form-group compact-field">
              <span>New Password</span>
              <input type="password" value={newRecoveryPass} onChange={(event) => setNewRecoveryPass(event.target.value)} />
            </label>
            <label className="form-group compact-field">
              <span>Confirm Password</span>
              <input type="password" value={confirmRecoveryPass} onChange={(event) => setConfirmRecoveryPass(event.target.value)} />
            </label>
            {recoveryMessage && <p className="recovery-message">{recoveryMessage}</p>}
            <button className="btn-recovery-fill" type="submit">Reset Password</button>
          </form>
        )}
        <button className="btn-primary" type="submit">Sign In</button>
      </form>
      {toast && <div className={`toast ${toast.type}`}>{toast.message}</div>}
    </div>
  );
}

function BackgroundEffects() {
  return (
    <div className="water-background" aria-hidden="true">
      <div className="gradient-field" />
      <div className="droplet-field">
        {DROPLETS.map((droplet, index) => (
          <span
            className="water-droplet"
            key={`${droplet.left}-${index}`}
            style={{
              "--drop-left": droplet.left,
              "--drop-size": `${droplet.size}px`,
              "--drop-duration": droplet.duration,
              "--drop-delay": droplet.delay,
            }}
          />
        ))}
      </div>
      <div className="wave-field">
        <span className="wave wave-one" />
        <span className="wave wave-two" />
        <span className="wave wave-three" />
      </div>
    </div>
  );
}

function AboutPanel() {
  return (
    <>
      <PanelTitle title="About" accent={APP_NAME} />
      <section className="glass-strong about-panel">
        <div>
          <div className="home-kicker">Station Profile</div>
          <h3>{APP_NAME}</h3>
          <p>
            This system supports the daily work of a water refilling station: recording sales,
            tracking water product inventory, managing customer orders, assigning riders, and
            printing receipts with VAT details.
          </p>
        </div>
        <div className="about-facts">
          <div><strong>Service Type</strong><span>Water refilling, retail sales, and delivery</span></div>
          <div><strong>Users</strong><span>Admin, cashier, and rider accounts</span></div>
          <div><strong>Records</strong><span>Products, stock levels, orders, riders, and receipts</span></div>
        </div>
      </section>
      <div className="two-col">
        <section className="glass section-card">
          <h4>System Purpose</h4>
          <p className="section-copy">
            The system helps staff keep order processing consistent from checkout to delivery. Cashiers can
            create sales, admins can maintain inventory and dispatch work, and riders can update delivery
            status once orders are completed.
          </p>
        </section>
        <section className="glass section-card">
          <h4>Main Modules</h4>
          <div className="about-module-list">
            <span>Point of Sale</span>
            <span>Inventory Management</span>
            <span>Sales Orders</span>
            <span>Rider Tracking</span>
            <span>Analytics and Reports</span>
          </div>
        </section>
      </div>
    </>
  );
}

function Dashboard({ products, orders, riders }) {
  const [showJuneWeekly, setShowJuneWeekly] = useState(false);
  const totalRevenue = orders.reduce((sum, order) => sum + orderTotal(order), 0);
  const pending = orders.filter((order) => order.status === "pending").length;
  const delivered = orders.filter((order) => order.status === "delivered").length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const lowStock = products.filter((product) => product.stock <= product.minStock);
  const monthlySales = monthlySalesFromJune(orders);
  const juneWeeks = juneWeeklySales(orders);

  return (
    <>
      <PanelTitle title="Dashboard" accent="Overview" />
      <div className="stats-grid">
        <Stat icon={BarChart3} value={money(totalRevenue)} label="Total Revenue (incl. VAT)" delta="+12.4% vs last month" />
        <Stat icon={ClipboardList} value={orders.length} label="Total Orders" delta={`${delivered} delivered`} />
        <Stat icon={ShoppingCart} value={pending} label="Pending Orders" delta="Needs attention" danger={pending > 3} />
        <Stat icon={Bike} value={riders.length} label="Active Riders" delta="All routes covered" />
        <Stat icon={Boxes} value={totalStock} label="Total Stock Units" delta={`${products.length} products`} />
        <Stat icon={Droplets} value={money(orders.reduce((sum, order) => sum + orderVat(order), 0))} label="VAT Collected (12%)" />
      </div>
      <div className="two-col">
        <section className="glass section-card">
          <h4>Recent Orders</h4>
          <Table headers={["Order #", "Customer", "Items", "Total", "Status"]}>
            {orders.slice().reverse().slice(0, 5).map((order) => (
              <tr key={order.id}>
                <td className="linkish">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.items.map((item) => `${item.qty}x ${item.name.split(" ")[0]}`).join(", ")}</td>
                <td>{money(orderTotal(order))}</td>
                <td><Badge status={order.status} /></td>
              </tr>
            ))}
          </Table>
        </section>
        <section className="glass section-card">
          <h4>Monthly Sales</h4>
          <BarChart
            values={monthlySales.values}
            labels={monthlySales.labels}
            format={(value) => value.toLocaleString(undefined, { maximumFractionDigits: 0 })}
            actions={{ Jun: () => setShowJuneWeekly((visible) => !visible) }}
            activeLabel={showJuneWeekly ? "Jun" : ""}
          />
          {showJuneWeekly && (
            <div className="weekly-sales-detail">
              <h5>June Weekly Sales</h5>
              {juneWeeks.map((week) => (
                <div className="weekly-sales-row" key={week.label}>
                  <span>{week.label}</span>
                  <strong>{money(week.total)}</strong>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      <section className="glass section-card">
        <h4>Low Stock Alerts</h4>
        {lowStock.length ? lowStock.map((product) => (
          <div className="alert-row" key={product.id}>
            <span>{product.name} <small>({product.size})</small></span>
            <span className="badge badge-danger">Stock: {product.stock} / Min: {product.minStock}</span>
          </div>
        )) : <p className="success-text">All products are adequately stocked.</p>}
      </section>
    </>
  );
}

function POSPanel({ currentUser, products, riders, orders, createOrder, cart, setCart, lastOrder, setLastOrder, setReceiptOrder, notify }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  const [rider, setRider] = useState("");
  const [orderType, setOrderType] = useState("walk-in");

  const filtered = products.filter((product) => {
    if (category && product.type !== category) return false;
    return product.name.toLowerCase().includes(search.toLowerCase());
  });
  const subtotal = cart.reduce((sum, item) => sum + item.qty * item.unitPrice, 0);
  const isDelivery = orderType === "delivery";
  const canCheckout = cart.length > 0 && (!isDelivery || rider.trim());

  function addToCart(product) {
    if (!product.stock) return;
    setCart((current) => {
      const existing = current.find((item) => item.productId === product.id);
      if (existing) {
        if (existing.qty >= product.stock) {
          notify("Not enough stock.", "error");
          return current;
        }
        return current.map((item) => item.productId === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...current, { productId: product.id, name: product.name, size: product.size, type: product.type, qty: 1, unitPrice: product.price }];
    });
    notify(`Added ${product.name}.`, "success");
  }

  function changeQty(productId, delta) {
    setCart((current) => current
      .map((item) => item.productId === productId ? { ...item, qty: item.qty + delta } : item)
      .filter((item) => item.qty > 0));
  }

  async function checkout() {
    if (!customer.trim()) {
      notify("Please enter customer name.", "error");
      return;
    }
    if (!cart.length) {
      notify("Cart is empty.", "error");
      return;
    }
    if (isDelivery && !address.trim()) {
      notify("Please enter delivery address.", "error");
      return;
    }
    if (isDelivery && !rider.trim()) {
      notify("Please assign a rider before processing the sale.", "error");
      return;
    }
    const order = {
      date: now(),
      customer: customer.trim(),
      orderType,
      address: isDelivery ? address.trim() : orderTypeLabel(orderType),
      rider: isDelivery ? rider : "",
      status: isDelivery ? "pending" : "delivered",
      cashier: currentUser.name,
      items: cart.map((item) => ({ productId: item.productId, name: item.name, size: item.size, qty: item.qty, unitPrice: item.unitPrice })),
    };
    try {
      const savedOrder = await createOrder(order);
      setCart([]);
      setCustomer("");
      setAddress("");
      setRider("");
      setOrderType("walk-in");
      setLastOrder(savedOrder);
      notify(`Order ${savedOrder.id} processed.`, "success");
    } catch (error) {
      notify(error.message, "error");
    }
  }

  if (currentUser.role !== "cashier") {
    return <NoAccess title="Access Restricted" text="Only cashiers can process sales transactions." />;
  }

  return (
    <>
      <PanelTitle title="Point of" accent="Sale" />
      <div className="pos-layout">
        <section className="glass pos-product-panel">
          <div className="pos-product-header">
            <div>
              <h3>Products</h3>
              <p>Select water products to add them to the cart.</p>
            </div>
            <span>{filtered.length} shown</span>
          </div>
          <div className="filters pos-product-filters">
            <label className="search-field"><Search size={16} /><input placeholder="Search products..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
            <div className="category-tabs" role="tablist" aria-label="Product type">
              {[
                ["", "All"],
                ["bottle", "Bottles"],
                ["gallon", "Gallons"],
                ["tank", "Tanks"],
              ].map(([value, label]) => (
                <button
                  type="button"
                  key={label}
                  className={category === value ? "active" : ""}
                  onClick={() => setCategory(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="product-grid">
            {filtered.map((product) => {
              const Icon = typeIcon(product.type);
              const isLow = product.stock <= product.minStock;
              return (
                <button key={product.id} className={`product-card ${product.stock === 0 ? "out-of-stock" : ""}`} onClick={() => addToCart(product)} disabled={product.stock === 0}>
                  <span className="prod-icon-wrap"><Icon className="prod-icon" size={28} /></span>
                  <span className="prod-name">{product.name}</span>
                  <span className="prod-size">{product.size} / {typeLabel(product.type)}</span>
                  <span className="prod-price">{money(product.price * (1 + VAT_RATE))}</span>
                  <span className={`prod-stock ${isLow ? "low" : ""}`}>{product.stock ? `Stock: ${product.stock}` : "Out of stock"}</span>
                </button>
              );
            })}
            {!filtered.length && <div className="empty-cell product-empty">No products match your search.</div>}
          </div>
        </section>
        <aside className="glass cart-panel">
          <div className="cart-header"><h3>Cart</h3><span>{cart.length} item{cart.length === 1 ? "" : "s"}</span></div>
          <div className="cart-customer">
            <div className="order-type-tabs" role="tablist" aria-label="Order type">
              {ORDER_TYPES.map((type) => (
                <button
                  type="button"
                  key={type.value}
                  className={orderType === type.value ? "active" : ""}
                  onClick={() => {
                    setOrderType(type.value);
                    if (type.value !== "delivery") {
                      setAddress("");
                      setRider("");
                    }
                  }}
                >
                  {type.label}
                </button>
              ))}
            </div>
            <input placeholder="Customer Name *" value={customer} onChange={(event) => setCustomer(event.target.value)} />
            {isDelivery && (
              <>
                <input placeholder="Delivery Address *" value={address} onChange={(event) => setAddress(event.target.value)} />
                <select value={rider} onChange={(event) => setRider(event.target.value)} required>
                  <option value="">Assign Rider *</option>
                  {riders.map((item) => <option key={item.id} value={item.name}>{item.name} ({item.area})</option>)}
                </select>
              </>
            )}
          </div>
          <div className="cart-items">
            {cart.length ? cart.map((item) => (
              <div className="cart-item" key={item.productId}>
                <div className="cart-item-main"><div className="ci-name">{item.name}</div><div className="ci-size">{item.size}</div></div>
                <div className="qty-control">
                  <button className="qty-btn" onClick={() => changeQty(item.productId, -1)}><Minus size={13} /></button>
                  <span>{item.qty}</span>
                  <button className="qty-btn" onClick={() => changeQty(item.productId, 1)}><Plus size={13} /></button>
                </div>
                <strong>{money(item.qty * item.unitPrice * (1 + VAT_RATE))}</strong>
                <button className="btn-icon danger" onClick={() => setCart((current) => current.filter((cartItem) => cartItem.productId !== item.productId))}><Trash2 size={15} /></button>
              </div>
            )) : <EmptyCart />}
          </div>
          {cart.length > 0 && <Totals subtotal={subtotal} />}
          <div className="cart-actions">
            <button className="btn-checkout" onClick={checkout} disabled={!canCheckout}><Check size={16} /> Process Sale</button>
            <button className="btn-print-receipt" onClick={() => setReceiptOrder(lastOrder)} disabled={!lastOrder}><Printer size={16} /> Print Receipt</button>
            <button className="btn-clear" onClick={() => setCart([])}>Clear Cart</button>
          </div>
        </aside>
      </div>
    </>
  );
}

function ProductsPanel({ currentUser, products, openAdd, openEdit, onDelete }) {
  const [search, setSearch] = useState("");
  const filtered = products.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()));
  const canEdit = currentUser.role !== "rider";
  const isAdmin = currentUser.role === "admin";
  const lowStock = products.filter((product) => product.stock <= product.minStock).length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const outOfStock = products.filter((product) => product.stock === 0).length;

  return (
    <>
      <PanelTitle title="Product" accent="Panel" />
      <section className="product-summary-grid">
        <Stat icon={Boxes} value={products.length} label="Product Items" />
        <Stat icon={PackagePlus} value={totalStock} label="Available Stock Units" />
        <Stat icon={Droplets} value={lowStock} label="Low Stock Products" danger={lowStock > 0} />
        <Stat icon={ClipboardList} value={outOfStock} label="Out of Stock" danger={outOfStock > 0} />
      </section>
      <section className="glass product-management-panel">
        <div className="product-panel-header">
          <div>
            <h3>Water Products</h3>
            <p>{isAdmin ? "Manage product records, prices, and reorder thresholds." : "Review product prices and current stock levels."}</p>
          </div>
          {canEdit && <button className="btn-secondary" onClick={openAdd}><Plus size={16} /> Add Product</button>}
        </div>
        <div className="filters product-panel-filters">
          <label className="search-field"><Search size={16} /><input placeholder="Search products..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
        </div>
      </section>
      <Table headers={["Product", "Type", "Size", "Price (excl. VAT)", "Price (incl. VAT)", "Stock", "Status", "Actions"]}>
        {filtered.map((product) => {
          const isLow = product.stock <= product.minStock;
          const status = product.stock === 0 ? ["Out of Stock", "badge-danger"] : isLow ? ["Low Stock", "badge-warning"] : ["In Stock", "badge-success"];
          return (
            <tr key={product.id}>
              <td className="strong">{product.name}</td>
              <td><span className="badge badge-info">{typeLabel(product.type)}</span></td>
              <td>{product.size}</td>
              <td>{money(product.price)}</td>
              <td className="linkish">{money(product.price * (1 + VAT_RATE))}</td>
              <td className={isLow ? "warn-text" : ""}>{product.stock} <small>/ min {product.minStock}</small></td>
              <td><span className={`badge ${status[1]}`}>{status[0]}</span></td>
              <td>
                {isAdmin ? (
                  <div className="action-group">
                    <button className="assign-btn" onClick={() => openEdit(product)}><Pencil size={13} /> Edit</button>
                    <button className="assign-btn danger-action" onClick={() => onDelete(product)}><Trash2 size={13} /> Delete</button>
                  </div>
                ) : "-"}
              </td>
            </tr>
          );
        })}
      </Table>
    </>
  );
}

function InventoryPanel({ currentUser, products, openRestock }) {
  const [search, setSearch] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const canRestock = currentUser.role !== "rider";
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const lowStockProducts = products.filter((product) => product.stock <= product.minStock);
  const outOfStock = products.filter((product) => product.stock === 0);
  const stockedProducts = products.filter((product) => product.stock > product.minStock);
  const filtered = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const isLow = product.stock <= product.minStock;
    if (!matchesSearch) return false;
    if (stockFilter === "low") return isLow && product.stock > 0;
    if (stockFilter === "out") return product.stock === 0;
    if (stockFilter === "stocked") return product.stock > product.minStock;
    return true;
  });

  return (
    <>
      <PanelTitle title="Inventory" accent="Panel" />
      <section className="product-summary-grid">
        <Stat icon={PackagePlus} value={totalStock} label="Available Stock Units" />
        <Stat icon={Droplets} value={lowStockProducts.length} label="Needs Restocking" danger={lowStockProducts.length > 0} />
        <Stat icon={ClipboardList} value={outOfStock.length} label="Out of Stock" danger={outOfStock.length > 0} />
        <Stat icon={Boxes} value={stockedProducts.length} label="Healthy Stock Products" />
      </section>
      <section className="glass product-management-panel">
        <div className="product-panel-header">
          <div>
            <h3>Stock Restocking</h3>
            <p>Restock water products and review low-stock thresholds in one place.</p>
          </div>
        </div>
        <div className="filters product-panel-filters">
          <label className="search-field"><Search size={16} /><input placeholder="Search inventory..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
          <select value={stockFilter} onChange={(event) => setStockFilter(event.target.value)}>
            <option value="all">All Stock</option>
            <option value="low">Low Stock</option>
            <option value="out">Out of Stock</option>
            <option value="stocked">Healthy Stock</option>
          </select>
        </div>
      </section>
      <Table headers={["Product", "Type", "Size", "Current Stock", "Minimum Stock", "Status", "Action"]}>
        {filtered.map((product) => {
          const isLow = product.stock <= product.minStock;
          const status = product.stock === 0 ? ["Out of Stock", "badge-danger"] : isLow ? ["Needs Restock", "badge-warning"] : ["Healthy", "badge-success"];
          return (
            <tr key={product.id}>
              <td className="strong">{product.name}</td>
              <td><span className="badge badge-info">{typeLabel(product.type)}</span></td>
              <td>{product.size}</td>
              <td className={isLow ? "warn-text" : ""}>{product.stock}</td>
              <td>{product.minStock}</td>
              <td><span className={`badge ${status[1]}`}>{status[0]}</span></td>
              <td>{canRestock ? <button className="assign-btn" onClick={() => openRestock(product)}><PackagePlus size={13} /> Restock</button> : "-"}</td>
            </tr>
          );
        })}
        {!filtered.length && <tr><td colSpan="7" className="empty-cell">No inventory items match your filters.</td></tr>}
      </Table>
    </>
  );
}

function Orders({ orders, currentUser, updateOrder }) {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const filtered = orders.slice().reverse().filter((order) => {
    if (status && order.status !== status) return false;
    const q = search.toLowerCase();
    return !q || order.customer.toLowerCase().includes(q) || order.id.toLowerCase().includes(q);
  });

  return (
    <>
      <PanelTitle title="Sales" accent="Orders" />
      <div className="filters">
        <label className="search-field"><Search size={16} /><input placeholder="Search orders..." value={search} onChange={(event) => setSearch(event.target.value)} /></label>
        <select value={status} onChange={(event) => setStatus(event.target.value)}>
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="out-for-delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
      <Table headers={["Order #", "Date", "Type", "Customer", "Address", "Items", "Subtotal", "VAT", "Total", "Rider", "Status", "Action"]}>
        {filtered.map((order) => (
          <tr key={order.id}>
            <td className="linkish">{order.id}</td>
            <td className="muted">{order.date}</td>
            <td><span className="badge badge-info">{orderTypeLabel(order.orderType)}</span></td>
            <td>{order.customer}</td>
            <td className="muted">{order.address}</td>
            <td>{order.items.map((item) => `${item.qty}x ${item.name.split(" ")[0]}`).join(", ")}</td>
            <td>{money(orderSubtotal(order))}</td>
            <td className="warn-text">{money(orderVat(order))}</td>
            <td className="linkish">{money(orderTotal(order))}</td>
            <td>{order.rider || <span className="muted">Unassigned</span>}</td>
            <td><Badge status={order.status} /></td>
            <td><OrderAction order={order} role={currentUser.role} updateOrder={updateOrder} /></td>
          </tr>
        ))}
      </Table>
    </>
  );
}

function Riders({ riders, orders, updateOrder, openAdd }) {
  const activeOrders = orders.filter((order) => (order.orderType || "delivery") === "delivery" && order.status !== "delivered");
  return (
    <>
      <PanelTitle title="Rider" accent="Tracking" />
      <section className="glass product-management-panel">
        <div className="product-panel-header">
          <div>
            <h3>Delivery Riders</h3>
            <p>Add delivery staff and assign them to pending customer orders.</p>
          </div>
          <button className="btn-secondary" onClick={openAdd}><Plus size={16} /> Add Rider</button>
        </div>
      </section>
      <div className="rider-cards">
        {riders.map((rider) => {
          const assigned = orders.filter((order) => order.rider === rider.name);
          return (
            <div className="glass rider-card" key={rider.id}>
              <div className="rider-avatar"><Bike size={24} /></div>
              <div className="rider-name">{rider.name}</div>
              <div className="rider-area">{rider.area}</div>
              <div className="rider-stats">
                <div><strong>{assigned.filter((order) => order.status === "delivered").length}</strong><span>Delivered</span></div>
                <div><strong className="warn-text">{assigned.filter((order) => order.status === "out-for-delivery").length}</strong><span>In Transit</span></div>
              </div>
            </div>
          );
        })}
      </div>
      <PanelTitle title="Delivery" accent="Queue" compact />
      <Table headers={["Order #", "Customer", "Address", "Items", "Total", "Assigned Rider", "Status", "Action"]}>
        {activeOrders.map((order) => (
          <tr key={order.id}>
            <td className="linkish">{order.id}</td>
            <td>{order.customer}</td>
            <td className="muted">{order.address}</td>
            <td>{order.items.map((item) => `${item.qty}x ${item.name.split(" ")[0]}`).join(", ")}</td>
            <td>{money(orderTotal(order))}</td>
            <td>
              <select value={order.rider} onChange={(event) => updateOrder(order.id, { rider: event.target.value })}>
                <option value="">Assign</option>
                {riders.map((rider) => <option key={rider.id} value={rider.name}>{rider.name}</option>)}
              </select>
            </td>
            <td><Badge status={order.status} /></td>
            <td><OrderAction order={order} role="admin" updateOrder={updateOrder} /></td>
          </tr>
        ))}
      </Table>
    </>
  );
}

function Analytics({ products, orders }) {
  const [reportMonth, setReportMonth] = useState("0");
  const totals = useMemo(() => {
    const byType = { bottle: 0, gallon: 0, tank: 0 };
    orders.forEach((order) => order.items.forEach((item) => {
      const product = products.find((candidate) => candidate.id === item.productId);
      if (product) byType[product.type] += item.qty * item.unitPrice * (1 + VAT_RATE);
    }));
    return byType;
  }, [orders, products]);

  const revenue = orders.reduce((sum, order) => sum + orderTotal(order), 0);
  const subtotal = orders.reduce((sum, order) => sum + orderSubtotal(order), 0);
  const vat = orders.reduce((sum, order) => sum + orderVat(order), 0);
  const topCustomers = Object.entries(orders.reduce((map, order) => {
    map[order.customer] ??= { orders: 0, total: 0, last: order.date };
    map[order.customer].orders += 1;
    map[order.customer].total += orderTotal(order);
    map[order.customer].last = order.date > map[order.customer].last ? order.date : map[order.customer].last;
    return map;
  }, {})).sort((a, b) => b[1].total - a[1].total).slice(0, 5);
  const typeTotal = Object.values(totals).reduce((sum, value) => sum + value, 0) || 1;
  const monthlyReport = monthlyReportByCalendarYear(orders);
  const selectedMonth = Number(reportMonth);
  const selectedReport = monthlyReport.find((row) => row.month === selectedMonth) || monthlyReport[0];

  function printMonthlyReport() {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`<html><head><title>${APP_NAME} ${selectedReport.label} Report</title><style>body{font-family:Arial,sans-serif;margin:0;padding:28px;color:#111}.report-header{text-align:center;margin-bottom:24px}.brand{font-size:22px;font-weight:700}.muted{color:#666;font-size:12px}.summary{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:20px}.summary div{border:1px solid #ddd;padding:10px}.summary span{display:block;color:#666;font-size:11px;text-transform:uppercase}.summary strong{display:block;margin-top:4px;font-size:15px}table{width:100%;border-collapse:collapse;font-size:12px}th,td{border:1px solid #ddd;padding:8px;text-align:right}th:first-child,td:first-child{text-align:left}th{background:#f3f6f8}.footer{margin-top:22px;color:#666;font-size:11px}</style></head><body>${monthlyReportHtml(selectedReport)}</body></html>`);
    printWindow.document.close();
    printWindow.print();
  }

  return (
    <>
      <div className="panel-title-row">
        <PanelTitle title="Analytics and" accent="Reports" />
        <div className="report-actions">
          <select value={reportMonth} onChange={(event) => setReportMonth(event.target.value)} aria-label="Report month">
            {monthlyReport.map((row) => <option key={row.month} value={row.month}>{row.label}</option>)}
          </select>
          <button className="btn-secondary" type="button" onClick={printMonthlyReport}><Printer size={16} /> Print Report</button>
        </div>
      </div>
      <div className="stats-grid">
        <Stat icon={BarChart3} value={money(revenue)} label="Gross Revenue (incl. VAT)" />
        <Stat icon={FileBarChart} value={money(subtotal)} label="Net Revenue (excl. VAT)" />
        <Stat icon={Droplets} value={money(vat)} label="VAT Collected (12%)" />
        <Stat icon={ClipboardList} value={money(revenue / (orders.length || 1))} label="Average Order Value" />
      </div>
      <div className="two-col">
        <section className="glass section-card">
          <h4>Sales by Product Type</h4>
          {Object.entries(totals).map(([type, value]) => (
            <div className="progress-row" key={type}>
              <div><span>{typeLabel(type)}</span><span>{money(value)}</span></div>
              <div className="progress-track"><div style={{ width: `${(value / typeTotal) * 100}%` }} /></div>
            </div>
          ))}
        </section>
        <section className="glass section-card">
          <h4>Daily Revenue</h4>
          <BarChart values={[1820, 2450, 1980, 3200, 2700, 4100, 2900]} labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} format={(value) => value.toLocaleString()} />
        </section>
      </div>
      <section className="glass section-card">
        <h4>Top Customers</h4>
        <Table headers={["Customer", "Orders", "Total Spent", "Last Order"]}>
          {topCustomers.map(([name, data]) => (
            <tr key={name}><td>{name}</td><td>{data.orders}</td><td className="linkish">{money(data.total)}</td><td className="muted">{data.last}</td></tr>
          ))}
        </Table>
      </section>
    </>
  );
}

function MyDeliveries({ currentUser, orders, updateOrder }) {
  const myOrders = orders.filter((order) => order.rider === currentUser.name);
  return (
    <>
      <PanelTitle title="My" accent="Deliveries" />
      <Table headers={["Order #", "Customer", "Address", "Items", "Total", "Status", "Action"]}>
        {myOrders.length ? myOrders.slice().reverse().map((order) => (
          <tr key={order.id}>
            <td className="linkish">{order.id}</td>
            <td>{order.customer}</td>
            <td className="muted">{order.address}</td>
            <td>{order.items.map((item) => `${item.qty}x ${item.name}`).join(", ")}</td>
            <td className="linkish">{money(orderTotal(order))}</td>
            <td><Badge status={order.status} /></td>
            <td>{order.status === "out-for-delivery" ? <button className="assign-btn success" onClick={() => updateOrder(order.id, { status: "delivered" })}>Mark Delivered</button> : "-"}</td>
          </tr>
        )) : <tr><td colSpan="7" className="empty-cell">No deliveries assigned to you.</td></tr>}
      </Table>
    </>
  );
}

function ProductModal({ product, onClose, onSave }) {
  const [form, setForm] = useState({
    name: product?.name || "",
    type: product?.type || "bottle",
    size: product?.size || "",
    price: product?.price ?? "",
    stock: product?.stock ?? "",
    minStock: product?.minStock ?? "10",
  });
  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }
  function submit(event) {
    event.preventDefault();
    const price = Number(form.price);
    if (!form.name.trim() || !form.size.trim() || Number.isNaN(price)) return;
    onSave({ name: form.name.trim(), type: form.type, size: form.size.trim(), price, stock: Number(form.stock) || 0, minStock: Number(form.minStock) || 10 });
  }
  return (
    <Modal onClose={onClose}>
      <form className="modal-form" onSubmit={submit}>
        <h3>{product ? "Edit Product" : "Add New Product"}</h3>
        <label className="form-group"><span>Product Name</span><input value={form.name} onChange={(event) => update("name", event.target.value)} /></label>
        <div className="form-row">
          <label className="form-group"><span>Type</span><select value={form.type} onChange={(event) => update("type", event.target.value)}><option value="bottle">Bottle</option><option value="tank">Tank</option><option value="gallon">Gallon</option></select></label>
          <label className="form-group"><span>Size / Volume</span><input value={form.size} onChange={(event) => update("size", event.target.value)} /></label>
        </div>
        <div className="form-row">
          <label className="form-group"><span>Base Price</span><input type="number" min="0" step="0.01" value={form.price} onChange={(event) => update("price", event.target.value)} /></label>
          <label className="form-group"><span>Initial Stock</span><input type="number" min="0" value={form.stock} onChange={(event) => update("stock", event.target.value)} /></label>
        </div>
        <label className="form-group"><span>Low Stock Threshold</span><input type="number" min="0" value={form.minStock} onChange={(event) => update("minStock", event.target.value)} /></label>
        <div className="modal-actions"><button className="btn-primary" type="submit">Save Product</button><button className="btn-close-modal" type="button" onClick={onClose}>Cancel</button></div>
      </form>
    </Modal>
  );
}

function RestockModal({ product, onClose, onSave }) {
  const [qty, setQty] = useState("");
  return (
    <Modal onClose={onClose}>
      <form className="modal-form" onSubmit={(event) => {
        event.preventDefault();
        const value = Number(qty);
        if (value > 0) onSave(value);
      }}>
        <h3>Restock Product</h3>
        <p className="muted">{product.name} - current stock: {product.stock}</p>
        <label className="form-group"><span>Add Stock Quantity</span><input type="number" min="1" value={qty} onChange={(event) => setQty(event.target.value)} /></label>
        <div className="modal-actions"><button className="btn-primary" type="submit">Confirm Restock</button><button className="btn-close-modal" type="button" onClick={onClose}>Cancel</button></div>
      </form>
    </Modal>
  );
}

function RiderModal({ onClose, onSave }) {
  const [form, setForm] = useState({ name: "", area: "All Zones", phone: "" });

  function update(key, value) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submit(event) {
    event.preventDefault();
    if (!form.name.trim()) return;
    onSave({
      name: form.name.trim(),
      area: form.area.trim() || "All Zones",
      phone: form.phone.trim(),
    });
  }

  return (
    <Modal onClose={onClose}>
      <form className="modal-form" onSubmit={submit}>
        <h3>Add Rider</h3>
        <p className="muted">Create a rider record for delivery assignment.</p>
        <label className="form-group"><span>Rider Name</span><input value={form.name} onChange={(event) => update("name", event.target.value)} required /></label>
        <label className="form-group"><span>Delivery Area</span><input value={form.area} onChange={(event) => update("area", event.target.value)} /></label>
        <label className="form-group"><span>Phone Number</span><input value={form.phone} onChange={(event) => update("phone", event.target.value)} /></label>
        <div className="modal-actions"><button className="btn-primary" type="submit">Save Rider</button><button className="btn-close-modal" type="button" onClick={onClose}>Cancel</button></div>
      </form>
    </Modal>
  );
}

function LogoutConfirmModal({ user, onClose, onConfirm }) {
  return (
    <Modal onClose={onClose}>
      <div className="modal-form">
        <h3>Sign Out</h3>
        <p className="muted">{user.name} - end current session?</p>
        <div className="modal-actions">
          <button className="btn-primary" type="button" onClick={onConfirm}>Confirm Sign Out</button>
          <button className="btn-close-modal" type="button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </Modal>
  );
}

function AccountSettingsModal({ user, account, onSave, onClose }) {
  const [email, setEmail] = useState(account.email || "");
  const [currentPass, setCurrentPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [sentCode, setSentCode] = useState("");
  const [message, setMessage] = useState("");

  function sendCode() {
    const nextEmail = email.trim();
    if (!nextEmail || !nextEmail.includes("@")) {
      setMessage("Enter a valid email before sending a verification code.");
      return;
    }
    const code = makeVerificationCode();
    setSentCode(code);
    setMessage(`Verification code sent to ${nextEmail}. Demo code: ${code}`);
  }

  function saveAccount(event) {
    event.preventDefault();
    const patch = { email: email.trim() };
    const isChangingPassword = currentPass || newPass || confirmPass || verificationCode;

    if (!patch.email || !patch.email.includes("@")) {
      setMessage("Enter a valid email address.");
      return;
    }

    if (isChangingPassword) {
      if (currentPass !== account.pass) {
        setMessage("Current password is incorrect.");
        return;
      }
      if (newPass.length < 6) {
        setMessage("New password must be at least 6 characters.");
        return;
      }
      if (newPass !== confirmPass) {
        setMessage("New password and confirmation do not match.");
        return;
      }
      if (!sentCode || verificationCode.trim() !== sentCode) {
        setMessage("Enter the correct verification code.");
        return;
      }
      patch.pass = newPass;
    }

    onSave(patch);
    onClose();
  }

  return (
    <Modal onClose={onClose}>
      <form className="modal-form" onSubmit={saveAccount}>
        <h3>Account Settings</h3>
        <p className="muted">Manage your email and change your password with verification.</p>
        <div className="account-settings-list">
          <div><span>Name</span><strong>{user.name}</strong></div>
          <div><span>Username</span><strong>{user.username}</strong></div>
          <div><span>Role</span><strong>{user.role}</strong></div>
        </div>
        <label className="form-group account-field">
          <span>Email for Verification</span>
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <div className="password-change-panel">
          <h4>Change Password</h4>
          <label className="form-group compact-field"><span>Current Password</span><input type="password" value={currentPass} onChange={(event) => setCurrentPass(event.target.value)} /></label>
          <label className="form-group compact-field"><span>New Password</span><input type="password" value={newPass} onChange={(event) => setNewPass(event.target.value)} /></label>
          <label className="form-group compact-field"><span>Confirm New Password</span><input type="password" value={confirmPass} onChange={(event) => setConfirmPass(event.target.value)} /></label>
          <button className="btn-recovery-fill" type="button" onClick={sendCode}><Mail size={15} /> Send Verification Code</button>
          <label className="form-group compact-field"><span>Verification Code</span><input value={verificationCode} onChange={(event) => setVerificationCode(event.target.value)} inputMode="numeric" /></label>
        </div>
        {message && <p className="recovery-message">{message}</p>}
        <div className="modal-actions">
          <button className="btn-primary" type="submit">Save Changes</button>
          <button className="btn-close-modal" type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </Modal>
  );
}

function ReceiptModal({ order, cashier, onClose }) {
  function printReceipt() {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    printWindow.document.write(`<html><head><title>${APP_NAME} Receipt</title><style>body{font-family:Arial,sans-serif;font-size:12px;max-width:320px;margin:0 auto;padding:16px;color:#111}.row,.item{display:flex;justify-content:space-between;margin-bottom:4px}.brand{text-align:center;font-weight:700;font-size:18px}.muted{text-align:center;color:#666}.line{border-top:1px dashed #999;margin:10px 0}.grand{font-weight:700;font-size:14px;border-top:1px solid #ccc;padding-top:6px}</style></head><body>${receiptHtml(order, cashier)}</body></html>`);
    printWindow.document.close();
    printWindow.print();
  }
  return (
    <Modal onClose={onClose}>
      <div className="receipt" dangerouslySetInnerHTML={{ __html: receiptHtml(order, cashier) }} />
      <div className="receipt-actions"><button className="btn-print" onClick={printReceipt}><Printer size={16} /> Print Receipt</button><button className="btn-close-modal" onClick={onClose}>Close</button></div>
    </Modal>
  );
}

function receiptHtml(order, cashier) {
  const isDelivery = (order.orderType || "delivery") === "delivery";
  return `
    <div class="receipt-header"><div class="brand">${APP_NAME}</div><div class="muted">${APP_SUBTITLE}</div><div class="muted">BIR TIN: 123-456-789-000</div></div>
    <div class="line"></div>
    <div class="row"><span>Receipt No.</span><strong>${order.id}</strong></div>
    <div class="row"><span>Date & Time</span><span>${order.date}</span></div>
    <div class="row"><span>Cashier</span><span>${order.cashier || cashier}</span></div>
    <div class="row"><span>Order Type</span><span>${orderTypeLabel(order.orderType)}</span></div>
    <div class="row"><span>Customer</span><span>${order.customer}</span></div>
    ${isDelivery ? `<div class="row"><span>Address</span><span>${order.address}</span></div>` : ""}
    ${isDelivery && order.rider ? `<div class="row"><span>Rider</span><span>${order.rider}</span></div>` : ""}
    <div class="line"></div>
    ${order.items.map((item) => `<div class="item"><div><strong>${item.name}</strong><br><small>${item.size} x ${item.qty} @ ${money(item.unitPrice * (1 + VAT_RATE))}</small></div><span>${money(item.qty * item.unitPrice * (1 + VAT_RATE))}</span></div>`).join("")}
    <div class="line"></div>
    <div class="row"><span>Subtotal</span><span>${money(orderSubtotal(order))}</span></div>
    <div class="row"><span>VAT (12%)</span><span>${money(orderVat(order))}</span></div>
    <div class="row grand"><span>TOTAL DUE</span><span>${money(orderTotal(order))}</span></div>
    <div class="line"></div>
    <p class="muted">This serves as your official receipt.</p>
    <p class="muted">Thank you for choosing ${APP_NAME}.</p>
  `;
}

function monthlyReportHtml(report) {
  return `
    <div class="report-header">
      <div class="brand">${APP_NAME}</div>
      <div class="muted">${APP_SUBTITLE}</div>
      <h2>${report.label} Sales Report</h2>
      <div class="muted">Generated: ${now()}</div>
    </div>
    <div class="summary">
      <div><span>Total Orders</span><strong>${report.orders}</strong></div>
      <div><span>Net Revenue</span><strong>${money(report.subtotal)}</strong></div>
      <div><span>VAT Collected</span><strong>${money(report.vat)}</strong></div>
      <div><span>Gross Revenue</span><strong>${money(report.total)}</strong></div>
    </div>
    <table>
      <thead>
        <tr><th>Month</th><th>Orders</th><th>Net Revenue</th><th>VAT</th><th>Gross Revenue</th></tr>
      </thead>
      <tbody>
        <tr><td>${report.label}</td><td>${report.orders}</td><td>${money(report.subtotal)}</td><td>${money(report.vat)}</td><td>${money(report.total)}</td></tr>
      </tbody>
    </table>
    <div class="footer">Prepared for internal sales monitoring and monthly reporting.</div>
  `;
}

function OrderAction({ order, role, updateOrder }) {
  if ((role === "admin" || role === "cashier") && order.status === "pending") {
    return <button className="assign-btn" onClick={() => updateOrder(order.id, { status: "out-for-delivery" })}>Dispatch</button>;
  }
  if (order.status === "out-for-delivery") {
    return <button className="assign-btn success" onClick={() => updateOrder(order.id, { status: "delivered" })}>Delivered</button>;
  }
  return "-";
}

function PanelTitle({ title, accent, compact = false }) {
  return <h2 className={`panel-title ${compact ? "compact" : ""}`}>{title} <span>{accent}</span></h2>;
}

function Stat({ icon: Icon, value, label, delta, danger = false }) {
  return (
    <div className="glass stat-card">
      <Icon className="stat-icon" size={24} />
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
      {delta && <div className={`stat-delta ${danger ? "delta-down" : "delta-up"}`}>{delta}</div>}
    </div>
  );
}

function Table({ headers, children }) {
  return (
    <div className="glass table-wrap">
      <table>
        <thead><tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr></thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function Badge({ status }) {
  return <span className={`badge ${statusClass(status)}`}>{status}</span>;
}

function BarChart({ values, labels, format = (value) => value, actions = {}, activeLabel = "" }) {
  const max = Math.max(...values, 0) || 1;
  return (
    <div className="chart-bar-container">
      {values.map((value, index) => {
        const label = labels[index];
        const action = actions[label];
        const barStyle = { height: `${(value / max) * 100}%` };

        return (
          <div className="chart-bar-wrap" key={label}>
            <div className="chart-val">{format(value)}</div>
            {action ? (
              <button
                type="button"
                className={`chart-bar chart-bar-button ${activeLabel === label ? "active" : ""}`}
                style={barStyle}
                onClick={action}
                aria-label={`${label} weekly sales details`}
              />
            ) : (
              <div className="chart-bar" style={barStyle} />
            )}
            <div className="chart-label">{label}</div>
          </div>
        );
      })}
    </div>
  );
}

function Totals({ subtotal }) {
  return (
    <div className="cart-totals">
      <div className="total-row"><span>Subtotal</span><span>{money(subtotal)}</span></div>
      <div className="total-row"><span>VAT (12%)</span><span>{money(subtotal * VAT_RATE)}</span></div>
      <div className="total-row grand"><span>Total</span><span>{money(subtotal * (1 + VAT_RATE))}</span></div>
    </div>
  );
}

function EmptyCart() {
  return <div className="cart-empty"><ShoppingCart size={40} /><p>Cart is empty.<br />Tap a product to add.</p></div>;
}

function NoAccess({ title, text }) {
  return <div className="no-access"><Shield size={48} /><h3>{title}</h3><p>{text}</p></div>;
}

function Modal({ children, onClose }) {
  return <div className="modal-overlay active" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><div className="modal-box">{children}</div></div>;
}
