import React, { useState, useEffect } from 'react';
import { 
  Plus, Minus, TrendingUp, Calendar, Award, DollarSign, Heart, 
  ShieldAlert, Settings, RefreshCw, Flame, Clock, CheckCircle2, 
  AlertCircle, ChevronRight, BarChart2, PieChart, ShieldCheck, 
  Smartphone, Monitor, Sparkles
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell 
} from 'recharts';

export default function App() {
  // Estados principales
  const [cigsToday, setCigsToday] = useState(4);
  const [dailyGoal, setDailyGoal] = useState(10);
  const [pricePerPack, setPricePerPack] = useState(5.50);
  const [cigsPerPack, setCigsPerPack] = useState(20);
  const [moneySaved, setMoneySaved] = useState(42.80);
  const [resistedCravings, setResistedCravings] = useState(7);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [notification, setNotification] = useState(null);

  // Historial de la semana (ejemplo en tiempo real)
  const [weeklyData, setWeeklyData] = useState([
    { day: 'Lun', consumidos: 12, meta: 10 },
    { day: 'Mar', consumidos: 9, meta: 10 },
    { day: 'Mié', consumidos: 11, meta: 10 },
    { day: 'Jue', consumidos: 8, meta: 10 },
    { day: 'Vie', consumidos: 7, meta: 10 },
    { day: 'Sáb', consumidos: 6, meta: 10 },
    { day: 'Dom', consumidos: 4, meta: 10 },
  ]);

  const costPerCigarette = pricePerPack / cigsPerPack;

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddCigarette = () => {
    setCigsToday(prev => prev + 1);
    showNotification("Cigarrillo registrado. ¡Tú puedes con el siguiente!");
  };

  const handleRemoveCigarette = () => {
    if (cigsToday > 0) {
      setCigsToday(prev => prev - 1);
      showNotification("Registro corregido.");
    }
  };

  const handleResist = () => {
    setResistedCravings(prev => prev + 1);
    const savedAmount = costPerCigarette;
    setMoneySaved(prev => +(prev + savedAmount).toFixed(2));
    showNotification("¡Excelente! Has resistido una tentación y ahorrado dinero.");
  };

  const progressPercent = Math.min(Math.round((cigsToday / dailyGoal) * 100), 100);
  const isOverGoal = cigsToday > dailyGoal;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white pb-20 md:pb-6">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 bg-emerald-600 text-white px-4 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-emerald-400 animate-bounce">
          <Sparkles className="w-5 h-5" />
          <span className="text-sm font-medium">{notification}</span>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/55 backdrop-blur sticky top-0 z-40 px-4 py-3.5">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-tr from-emerald-600 to-teal-400 p-2.5 rounded-xl shadow-lg shadow-emerald-900/30">
              <Flame className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight flex items-center gap-2">
                SmokeFree <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full font-mono">PRO V2</span>
              </h1>
              <p className="text-xs text-slate-400">Control inteligente y en tiempo real</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs bg-slate-800 text-slate-300 px-3 py-1.5 rounded-lg border border-slate-700">
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <Monitor className="w-3.5 h-3.5 text-teal-400" />
              Multiplataforma
            </span>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-slate-900/80 border-b border-slate-800 px-4 py-2">
        <div className="max-w-5xl mx-auto flex gap-2 overflow-x-auto">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'dashboard' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`}
          >
            <BarChart2 className="w-4 h-4" /> Panel Principal
          </button>
          <button 
            onClick={() => setActiveTab('health')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'health' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`}
          >
            <Heart className="w-4 h-4" /> Salud y Metas
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'settings' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/40' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'}`}
          >
            <Settings className="w-4 h-4" /> Configuración
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="max-w-5xl mx-auto px-4 py-6 flex-1 w-full space-y-6">

        {activeTab === 'dashboard' && (
          <>
            {/* Top Quick Counter Card */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-850 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left space-y-1">
                  <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Consumo de Hoy</span>
                  <div className="flex items-baseline justify-center md:justify-start gap-2">
                    <span className="text-6xl font-black tracking-tight text-white">{cigsToday}</span>
                    <span className="text-slate-400 text-lg">/ meta máx {dailyGoal}</span>
                  </div>
                  <p className={`text-xs font-medium flex items-center justify-center md:justify-start gap-1 mt-1 ${isOverGoal ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {isOverGoal ? <AlertCircle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                    {isOverGoal ? 'Has superado tu límite diario establecido' : 'Manteniéndote dentro de la meta diaria'}
                  </p>
                </div>

                {/* Big Action Buttons */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-center">
                  <button 
                    onClick={handleRemoveCigarette}
                    className="p-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 active:scale-95 transition-transform shadow-lg"
                    title="Restar uno"
                  >
                    <Minus className="w-6 h-6" />
                  </button>
                  <button 
                    onClick={handleAddCigarette}
                    className="flex-1 md:flex-none px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold shadow-xl shadow-emerald-900/40 active:scale-95 transition-all flex items-center justify-center gap-3 text-lg"
                  >
                    <Plus className="w-6 h-6" /> Fumé un cigarro
                  </button>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Progreso de la meta diaria</span>
                  <span className="font-mono font-semibold text-slate-200">{progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${isOverGoal ? 'bg-gradient-to-r from-amber-500 to-rose-500' : 'bg-gradient-to-r from-emerald-500 to-teal-400'}`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl shadow-lg flex items-center gap-4">
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                  <DollarSign className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Dinero Ahorrado</span>
                  <span className="text-2xl font-bold text-white font-mono">{moneySaved.toFixed(2)} €</span>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl shadow-lg flex items-center gap-4">
                <div className="p-3 bg-teal-500/10 border border-teal-500/20 rounded-xl text-teal-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs text-slate-400 block font-medium">Tentaciones Superadas</span>
                  <span className="text-2xl font-bold text-white font-mono">{resistedCravings}</span>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 block font-medium">¡Registra tentación vencida!</span>
                  <span className="text-sm font-semibold text-slate-200">¿Ganas de fumar?</span>
                </div>
                <button 
                  onClick={handleResist}
                  className="px-4 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl text-xs shadow-lg shadow-teal-900/30 active:scale-95 transition-all"
                >
                  ¡Resistí! 💪
                </button>
              </div>
            </div>

            {/* Weekly Chart */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-base text-white">Consumo de la Semana</h3>
                  <p className="text-xs text-slate-400">Comparativa diaria frente a tu objetivo máximo</p>
                </div>
                <Calendar className="w-5 h-5 text-slate-400" />
              </div>

              <div className="h-64 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.4} />
                    <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} />
                    <YAxis stroke="#94a3b8" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', color: '#fff' }} 
                    />
                    <Bar dataKey="consumidos" fill="#10b981" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </>
        )}

        {activeTab === 'health' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-emerald-900/40 to-teal-900/40 border border-emerald-500/30 rounded-3xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-emerald-500/20 rounded-2xl text-emerald-400 border border-emerald-500/30">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-white">Recuperación Corporal</h3>
                  <p className="text-xs text-emerald-300">Beneficios inmediatos al reducir o eliminar el consumo</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-white">
                    <span>Presión arterial y pulso</span>
                    <span className="text-emerald-400 font-mono text-xs bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">20 min</span>
                  </div>
                  <p className="text-xs text-slate-400">Tu ritmo cardíaco y presión arterial vuelven a niveles normales.</p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-white">
                    <span>Niveles de Monóxido de Carbono</span>
                    <span className="text-emerald-400 font-mono text-xs bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">12 horas</span>
                  </div>
                  <p className="text-xs text-slate-400">El monóxido de carbono en sangre baja a la normalidad.</p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-white">
                    <span>Circulación y función pulmonar</span>
                    <span className="text-emerald-400 font-mono text-xs bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">2 semanas - 3 meses</span>
                  </div>
                  <p className="text-xs text-slate-400">Mejora sustancial en la capacidad física y oxigenación.</p>
                </div>

                <div className="bg-slate-900/90 border border-slate-800 p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-sm font-semibold text-white">
                    <span>Riesgo coronario reducido</span>
                    <span className="text-emerald-400 font-mono text-xs bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">1 año</span>
                  </div>
                  <p className="text-xs text-slate-400">El riesgo de enfermedad cardíaca se reduce a la mitad.</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
            <h3 className="font-bold text-lg text-white">Configuración de Metas y Precios</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Meta máxima de cigarrillos por día</label>
                <input 
                  type="number" 
                  value={dailyGoal} 
                  onChange={(e) => setDailyGoal(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Precio por cajetilla (€)</label>
                <input 
                  type="number" 
                  step="0.10" 
                  value={pricePerPack} 
                  onChange={(e) => setPricePerPack(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-300">Cigarrillos por cajetilla</label>
                <input 
                  type="number" 
                  value={cigsPerPack} 
                  onChange={(e) => setCigsPerPack(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex justify-end">
              <button 
                onClick={() => showNotification("Configuración guardada correctamente.")}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm shadow-lg shadow-emerald-900/30 transition-all"
              >
                Guardar Cambios
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
