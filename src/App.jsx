import React, { useState, useEffect, useRef } from 'react';

// === أيقونات مخصصة بالكامل بصيغة SVG لضمان العمل دون مكتبات خارجية ===
const Icons = {
  Terminal: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  Activity: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  Shield: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  ),
  Server: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
    </svg>
  ),
  Key: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m-3.418 5.418l-3.586 3.586a1.5 1.5 0 01-1.061.44H5v-3v-1.5H3.5a1.5 1.5 0 01-1.06-.44l-1.06-1.06A1.5 1.5 0 011 9V5a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-1.418-1.418z" />
    </svg>
  ),
  Cpu: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
    </svg>
  ),
  ExternalLink: () => (
    <svg className="w-3.5 h-3.5 inline-block ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
  Sparkles: () => (
    <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  ),
  Check: () => (
    <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
  Globe: () => (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  ),
  Mail: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  Lock: () => (
    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  )
};

export default function App() {
  // === حالات التنقل والتحكم والواجهة ===
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'
  const [dashboardTab, setDashboardTab] = useState('overview'); // 'overview' | 'servers' | 'keys' | 'logs' | 'playground'
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [offerPrice, setOfferPrice] = useState('');
  const [offerEmail, setOfferEmail] = useState('');
  const [offerMessage, setOfferMessage] = useState('');
  const [notifyMsg, setNotifyMsg] = useState('');

  // === تفاعل شبكة محاكاة الحزم (Interactive Tunnel Packets Simulator) ===
  const [packetState, setPacketState] = useState('idle'); // 'idle' | 'sending' | 'routing' | 'fetched'
  const [activeTunnelServer, setActiveTunnelServer] = useState('PostgreSQL Database');

  // === خوادم MCP الافتراضية داخل النظام ===
  const [mcpServers, setMcpServers] = useState([
    { id: '1', name: 'PostgreSQL Database', status: 'online', type: 'Database', toolsCount: 6, requests: 1420, latency: 12 },
    { id: '2', name: 'GitHub Enterprise Bridge', status: 'online', type: 'API', toolsCount: 11, requests: 840, latency: 45 },
    { id: '3', name: 'Slack Team Comms', status: 'online', type: 'Messaging', toolsCount: 3, requests: 310, latency: 18 },
    { id: '4', name: 'Local File System mount', status: 'offline', type: 'Storage', toolsCount: 5, requests: 0, latency: 0 }
  ]);

  // === تراخيص المطورين ومفاتيح API ===
  const [apiKeys, setApiKeys] = useState([
    { id: 'key_01', name: 'Production Claude-3.5 Client', token: 'bm_live_7f8d2...a90e', created: '2026-02-10', status: 'active' },
    { id: 'key_02', name: 'Staging Cursor Editor', token: 'bm_test_3b2c1...d45e', created: '2026-04-18', status: 'active' }
  ]);

  // === سجل العمليات والاتصال المباشر ===
  const [logs, setLogs] = useState([
    { timestamp: '23:42:01', client: 'Claude-3.5-Sonnet', server: 'PostgreSQL Database', method: 'tools/call', payload: '{"name":"query_users", "args":{"limit":5}}', status: 'success', latency: '14ms' },
    { timestamp: '23:41:55', client: 'Cursor-Agent', server: 'GitHub Enterprise Bridge', method: 'tools/list', payload: '{}', status: 'success', latency: '38ms' },
    { timestamp: '23:41:40', client: 'Claude-Code-CLI', server: 'Slack Team Comms', method: 'tools/call', payload: '{"name":"post_alert", "args":{"channel":"#devops"}}', status: 'success', latency: '19ms' },
    { timestamp: '23:40:12', client: 'Claude-3.5-Sonnet', server: 'PostgreSQL Database', method: 'tools/call', payload: '{"name":"read_schema"}', status: 'success', latency: '9ms' }
  ]);

  // === إضافة خادم جديد ===
  const [newServerName, setNewServerName] = useState('');
  const [newServerType, setNewServerType] = useState('Database');
  const [newServerTools, setNewServerTools] = useState(3);
  const [showAddModal, setShowAddModal] = useState(false);

  // === محاكي الوكلاء والمختبر ===
  const [playgroundQuery, setPlaygroundQuery] = useState('Retrieve top 5 active premium user subscriptions.');
  const [playgroundTarget, setPlaygroundTarget] = useState('PostgreSQL Database');
  const [terminalOutput, setTerminalOutput] = useState([
    { type: 'system', text: '⚡ BeamMCP Gateway initialized. High-performance JSON-RPC tunnel ready.' },
    { type: 'system', text: '🔌 Handshake complete. Connected to local database gateway node.' },
    { type: 'info', text: '💡 Try selecting a preset below and click "Run Simulation" to see packet routing.' }
  ]);
  const [isSimulating, setIsSimulating] = useState(false);

  // === معالج تشغيل التنبيهات المؤقتة ===
  const triggerToast = (msg) => {
    setNotifyMsg(msg);
    setTimeout(() => setNotifyMsg(''), 4000);
  };

  // === محاكاة تفاعلية لنبضات الشبكة (Packet Simulation Engine) ===
  const runVisualTunnelSimulation = () => {
    if (packetState !== 'idle') return;
    setPacketState('sending');
    triggerToast("Initiating secure JSON-RPC tunnel handshake...");
    
    setTimeout(() => {
      setPacketState('routing');
      setTimeout(() => {
        setPacketState('fetched');
        triggerToast("Data returned successfully with SSL verification!");
        setTimeout(() => {
          setPacketState('idle');
        }, 1500);
      }, 1500);
    }, 1500);
  };

  // === إنشاء السيرفر الجديد ===
  const handleAddServer = (e) => {
    e.preventDefault();
    if (!newServerName) return;
    
    const newSrv = {
      id: Date.now().toString(),
      name: newServerName,
      status: 'online',
      type: newServerType,
      toolsCount: Number(newServerTools),
      requests: 0,
      latency: Math.floor(Math.random() * 25) + 8
    };

    setMcpServers([newSrv, ...mcpServers]);
    setNewServerName('');
    setShowAddModal(false);
    triggerToast(`MCP Server "${newSrv.name}" registered & exposed to Beam secure tunnel!`);
  };

  // === تجميع وإرسال بريد العرض المالي لنطاق الدومين ===
  const handleOfferSubmit = (e) => {
    e.preventDefault();
    if (!offerEmail) {
      triggerToast('Please provide a valid contact email.');
      return;
    }
    const subject = encodeURIComponent(`Inquiry for BeamMCP.com - Offer: $${offerPrice || 'Negotiable'}`);
    const body = encodeURIComponent(`Hello,\n\nI am contacting you regarding the acquisition of the domain BeamMCP.com.\n\nMy Offer: $${offerPrice || 'Flexible / Negotiable'}\nContact Email: ${offerEmail}\nMessage: ${offerMessage}\n\nPrepared via BeamMCP Interactive Portal.`);
    window.location.href = `mailto:cccvcccv3@gmail.com?subject=${subject}&body=${body}`;
    triggerToast("Your custom offer email template has been prepared!");
    setShowOfferModal(false);
  };

  // === تشغيل محاكاة الاستعلام في الـ Terminal ===
  const handlePlaygroundSubmit = () => {
    if (!playgroundQuery.trim()) return;
    setIsSimulating(true);

    const tempLogs = [...terminalOutput];
    tempLogs.push({ type: 'user', text: `🤖 LLM Intent Triggered: "${playgroundQuery}"` });
    tempLogs.push({ type: 'system', text: `📡 Tunnel routing request to [${playgroundTarget}] via securely authenticated SSL tunnel...` });
    setTerminalOutput(tempLogs);

    setTimeout(() => {
      let mockResult = '';
      let targetMethod = '';
      
      if (playgroundTarget === 'PostgreSQL Database') {
        targetMethod = 'postgres/read_premium_accounts';
        mockResult = '[{"uid": 1084, "name": "Sarah Jenkins", "tier": "Enterprise", "status": "active"}]';
      } else if (playgroundTarget === 'GitHub Enterprise Bridge') {
        targetMethod = 'github/get_open_pulls';
        mockResult = '[{"pr_id": 921, "title": "feat(core): secure-auth-gateway", "author": "dev-mcp"}]';
      } else {
        targetMethod = 'slack/post_custom_webhook';
        mockResult = '{"delivered": true, "timestamp": 1785923910}';
      }

      setTerminalOutput(prev => [
        ...prev,
        { type: 'rpc', text: `✉️ Sending JSON-RPC Frame: method "${targetMethod}"` },
        { type: 'rpc-detail', text: `--> params: {"query": "${playgroundQuery}"}` },
        { type: 'success', text: `✅ [${playgroundTarget}] returned payload securely:` },
        { type: 'response', text: mockResult },
        { type: 'ai-final', text: `🤖 Synthesized Answer: "Using the live server context fetched via BeamMCP, I located the specified record(s). Output is verified and clean."` }
      ]);
      setIsSimulating(false);

      // إضافة الطلب لسجل العمليات العام
      setLogs(prev => [
        {
          timestamp: new Date().toTimeString().split(' ')[0],
          client: 'Playground-Agent',
          server: playgroundTarget,
          method: `tools/call -> ${targetMethod}`,
          payload: `{"query":"${playgroundQuery}"}`,
          status: 'success',
          latency: '18ms'
        },
        ...prev
      ]);
    }, 1500);
  };

  const terminalEndRef = useRef(null);
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalOutput]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased selection:bg-indigo-600 selection:text-white" dir="ltr">
      
      {/* شريط بيع الدومين الصغير والأنيق جداً (Ultra-Sleek Minimal Sale Banner) */}
      <div className="bg-slate-900 border-b border-slate-800 text-xs py-2 px-4 shadow-sm relative z-50">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="bg-indigo-500/10 text-indigo-400 text-[10px] px-2 py-0.5 rounded font-mono font-bold uppercase tracking-wider">Premium Domain</span>
            <span className="text-slate-300 font-medium">The domain <strong className="text-white font-extrabold underline decoration-indigo-500 underline-offset-2">BeamMCP.com</strong> is available for purchase.</span>
          </div>
          
          <div className="flex items-center gap-3.5">
            <a 
              href="https://www.godaddy.com/domainfind/search?domainToCheck=beammcp.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-indigo-400 hover:text-indigo-300 font-bold transition flex items-center gap-1 hover:underline"
            >
              <span>Buy on GoDaddy</span>
              <Icons.ExternalLink />
            </a>
            <span className="text-slate-700 font-mono">|</span>
            <button 
              onClick={() => setShowOfferModal(true)}
              className="text-slate-300 hover:text-white font-bold transition flex items-center gap-1 hover:underline"
            >
              <Icons.Mail />
              <span>Submit Offer</span>
            </button>
          </div>
        </div>
      </div>

      {/* الرأس الرئيسي وملاحة الموقع */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-900 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* الشعار والبراند */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentView('landing')}>
            <div className="relative flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-tr from-indigo-600 to-indigo-400 shadow-lg shadow-indigo-500/20">
              <span className="text-white font-black text-lg tracking-tighter">B</span>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
              </div>
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">Beam<span className="text-indigo-400">MCP</span></span>
              <span className="text-[9px] block text-slate-500 font-mono tracking-widest leading-none uppercase">Enterprise AI Gateway</span>
            </div>
          </div>

          {/* روابط الملاحة */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            <button onClick={() => setCurrentView('landing')} className={`hover:text-white transition ${currentView === 'landing' ? 'text-indigo-400' : ''}`}>Platform</button>
            <a href="#how-it-works" onClick={() => { setCurrentView('landing'); setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-white transition">Network Map</a>
            <a href="#features" onClick={() => { setCurrentView('landing'); setTimeout(() => document.getElementById('features')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-white transition">Features</a>
            <a href="#pricing" onClick={() => { setCurrentView('landing'); setTimeout(() => document.getElementById('pricing')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-white transition">Pricing</a>
            <button onClick={() => { setCurrentView('dashboard'); setDashboardTab('playground'); }} className="text-indigo-300 hover:text-indigo-200 bg-indigo-950/50 hover:bg-indigo-900/40 px-3 py-1.5 rounded-lg border border-indigo-900/50 transition flex items-center gap-2">
              <Icons.Terminal />
              <span>Interactive Simulator</span>
            </button>
          </nav>

          {/* أزرار الإجراءات */}
          <div className="flex items-center gap-3">
            {currentView === 'landing' ? (
              <>
                <button 
                  onClick={() => setCurrentView('dashboard')} 
                  className="text-xs font-semibold text-slate-300 hover:text-white px-3.5 py-2 transition"
                >
                  Developer Login
                </button>
                <button 
                  onClick={() => {
                    setCurrentView('dashboard');
                    triggerToast("Success! Entered BeamMCP Live Interactive Sandbox.");
                  }} 
                  className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-4 py-2 rounded-xl transition shadow-lg shadow-indigo-600/20"
                >
                  Interactive Demo
                </button>
              </>
            ) : (
              <button 
                onClick={() => setCurrentView('landing')} 
                className="text-xs text-slate-400 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 px-4 py-2 rounded-xl transition"
              >
                Back to Landing Page
              </button>
            )}
          </div>
        </div>
      </header>

      {/* المساحة الرئيسية للمحتوى */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* ======================= العرض الأول: الصفحة الرئيسية والتعريفية ======================= */}
        {currentView === 'landing' && (
          <div className="space-y-32 py-10">
            
            {/* واجهة العرض الرئيسية والتوهج (Hero) */}
            <div className="text-center max-w-4xl mx-auto space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-950/80 border border-indigo-500/30 text-indigo-300 text-xs font-semibold animate-pulse">
                <Icons.Sparkles />
                <span>Exposing secure database context tunnels directly to Claude Desktop & Cursor</span>
              </div>
              
              <h1 className="text-5xl sm:text-7xl font-black text-white leading-none tracking-tight">
                Securely Expose Local Context to <br className="hidden sm:inline" />
                Your AI Agents with <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-500 bg-clip-text text-transparent">Zero Config</span>
              </h1>

              <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                <strong className="text-slate-200">BeamMCP</strong> delivers a premium, secure gateway for Anthropic's Model Context Protocol (MCP). Bridge the security gap between hosted LLMs and local PostgreSQL, Redis, APIs, and CLI shell scripts.
              </p>

              {/* أزرار النداء للتفاعل */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <button 
                  onClick={() => {
                    setCurrentView('dashboard');
                    setDashboardTab('playground');
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-4 rounded-2xl text-base transition-all shadow-xl shadow-indigo-600/30 hover:scale-[1.02] transform"
                >
                  <Icons.Terminal />
                  <span>Launch Interactive Simulator</span>
                </button>

                <button 
                  onClick={() => {
                    setCurrentView('dashboard');
                    setDashboardTab('overview');
                  }}
                  className="w-full sm:w-auto bg-slate-900 hover:bg-slate-800 border border-slate-850 text-slate-200 hover:text-white font-medium px-8 py-4 rounded-2xl text-base transition flex items-center justify-center gap-2"
                >
                  <Icons.Activity />
                  <span>Explore Admin Panel</span>
                </button>
              </div>
            </div>

            {/* محاكي مسار الشبكة التفاعلي المتطور (Interactive Visual Packet Mapper) */}
            <div id="how-it-works" className="space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-white tracking-tight">Interactive Local Tunnel Architecture</h2>
                <p className="text-slate-400 max-w-xl mx-auto text-sm">
                  Click the action trigger to watch how JSON-RPC packets securely pass through the BeamMCP proxy hub down to your local developer node.
                </p>
              </div>

              <div className="bg-slate-900/40 rounded-3xl border border-slate-850 p-6 sm:p-10 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/5 rounded-full blur-[100px] pointer-events-none" />
                
                {/* مخطط السريان والنبضات الحركية */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                  
                  {/* العميل السحابي (الذكاء الاصطناعي) */}
                  <div className="lg:col-span-3 bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-indigo-900/50 border border-indigo-500/30 flex items-center justify-center mx-auto text-indigo-400">
                      <Icons.Cpu />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">AI Agent Client</h4>
                      <p className="text-[11px] text-slate-500 mt-1">Claude 3.5 Sonnet / Cursor</p>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800/80">
                      <span className="text-[10px] text-slate-400 font-mono">Intent: query_users()</span>
                    </div>
                  </div>

                  {/* مسار النبضة والخط الناقل */}
                  <div className="lg:col-span-6 flex flex-col items-center justify-center py-4">
                    <div className="text-xs text-slate-400 mb-2 font-mono flex items-center gap-1">
                      <Icons.Lock />
                      <span>Encrypted SSL JSON-RPC Protocol</span>
                    </div>
                    
                    {/* النفق البصري */}
                    <div className="w-full bg-slate-950 h-3 rounded-full relative overflow-hidden border border-slate-800/80 p-0.5">
                      <div 
                        className={`h-full rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 transition-all duration-1000 ${
                          packetState === 'sending' ? 'w-1/2 ml-0' : 
                          packetState === 'routing' ? 'w-full' : 
                          packetState === 'fetched' ? 'w-full opacity-60' : 'w-0'
                        }`} 
                      />
                    </div>

                    <div className="mt-4 flex gap-4 text-[11px] text-slate-500 font-mono">
                      <span className={packetState === 'sending' ? 'text-indigo-400 font-bold' : ''}>1. Request</span>
                      <span className={packetState === 'routing' ? 'text-purple-400 font-bold' : ''}>2. Validation</span>
                      <span className={packetState === 'fetched' ? 'text-emerald-400 font-bold' : ''}>3. Returned Payload</span>
                    </div>

                    <button 
                      onClick={runVisualTunnelSimulation}
                      disabled={packetState !== 'idle'}
                      className="mt-6 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-indigo-300 hover:text-white px-5 py-2 rounded-xl text-xs font-semibold font-mono transition shadow-lg"
                    >
                      {packetState === 'idle' ? '⚡ Trigger Sample Query Handshake' : 'Routing Packet...'}
                    </button>
                  </div>

                  {/* الخادم المحلي والبيانات الحقيقية */}
                  <div className="lg:col-span-3 bg-slate-950 p-5 rounded-2xl border border-slate-800 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center mx-auto text-emerald-400">
                      <Icons.Server />
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-sm">Local Server Node</h4>
                      <p className="text-[11px] text-slate-500 mt-1">{activeTunnelServer}</p>
                    </div>
                    <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800/80">
                      <span className="text-[10px] text-emerald-400 font-mono">Returned: 200 OK</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            {/* تفاصيل مميزات المنصة (Core Strengths) */}
            <div id="features" className="space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-white">Full-Stack Enterprise Security Features</h2>
                <p className="text-slate-400 max-w-xl mx-auto text-sm">
                  Bridge the security gap between hosted AI engines and critical cloud and local filesystems.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div className="bg-slate-900/30 border border-slate-900 p-8 rounded-3xl space-y-4 hover:border-slate-800 transition">
                  <div className="w-11 h-11 bg-indigo-950/60 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                    <Icons.Shield />
                  </div>
                  <h3 className="text-lg font-bold text-slate-200">Role-Based Access Control (RBAC)</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Set precise query schemas. Prevent AI models from pulling blacklisted tables, files, or sensitive environment credentials without manual review protocols.
                  </p>
                </div>

                <div className="bg-slate-900/30 border border-slate-900 p-8 rounded-3xl space-y-4 hover:border-slate-800 transition">
                  <div className="w-11 h-11 bg-indigo-950/60 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                    <Icons.Activity />
                  </div>
                  <h3 className="text-lg font-bold text-slate-200">Ultra-Low Transit Latency</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Optimized SSE tunnels ensure that your JSON-RPC payloads are marshalled back and forth in under 30 milliseconds, preserving natural conversation flow.
                  </p>
                </div>

                <div className="bg-slate-900/30 border border-slate-900 p-8 rounded-3xl space-y-4 hover:border-slate-800 transition">
                  <div className="w-11 h-11 bg-indigo-950/60 border border-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400">
                    <Icons.Terminal />
                  </div>
                  <h3 className="text-lg font-bold text-slate-200">Live Handshake Logging</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Audit real-time logs with structured telemetry data. Perfect for monitoring user intents, API costs, and debugging edge cases with stack trace analytics.
                  </p>
                </div>

              </div>
            </div>

            {/* خطط التسعير البسيطة والتنافسية */}
            <div id="pricing" className="space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold text-white">Transparent Plans Built for Growth</h2>
                <p className="text-slate-400 max-w-xl mx-auto text-sm">
                  Whether you are an individual builder or securing enterprise-grade infrastructure.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                {/* خطة المطور الفردية */}
                <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-indigo-400 text-xs font-mono font-bold tracking-wider uppercase">Individual Sandbox</span>
                    <h3 className="text-xl font-bold text-white">Hobby Free</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-white">$0</span>
                      <span className="text-slate-500 text-sm">/ month</span>
                    </div>
                    <p className="text-slate-400 text-xs">Ideal for exploring basic MCP integrations and local shell commands.</p>
                    <hr className="border-slate-900" />
                    <ul className="space-y-3 text-xs text-slate-300">
                      <li className="flex items-center gap-2">🟢 Up to 2 Local Servers</li>
                      <li className="flex items-center gap-2">🟢 1,000 requests / day</li>
                      <li className="flex items-center gap-2">🟢 Static token handshake</li>
                      <li className="flex items-center gap-2 text-slate-600">🔴 Enterprise SLA support</li>
                    </ul>
                  </div>
                  <button onClick={() => { setCurrentView('dashboard'); triggerToast('Demo workspace configured under Hobby Free terms.'); }} className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-850 text-white font-medium py-2.5 rounded-xl text-xs transition mt-8">Explore Free Sandbox</button>
                </div>

                {/* الخطة الاحترافية للفرق */}
                <div className="bg-indigo-950/20 border-2 border-indigo-600 rounded-3xl p-8 relative flex flex-col justify-between shadow-xl shadow-indigo-950/25">
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white text-[9px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                    Recommended 🔥
                  </div>
                  <div className="space-y-4">
                    <span className="text-indigo-400 text-xs font-mono font-bold tracking-wider uppercase">High Performance</span>
                    <h3 className="text-xl font-bold text-white">Developer Pro</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-white">$29</span>
                      <span className="text-slate-500 text-sm">/ month</span>
                    </div>
                    <p className="text-slate-400 text-xs">For teams managing live commercial production servers and pipelines.</p>
                    <hr className="border-indigo-900/30" />
                    <ul className="space-y-3 text-xs text-slate-200">
                      <li className="flex items-center gap-2">🟢 Unlimited Connected Nodes</li>
                      <li className="flex items-center gap-2">🟢 50,000 requests / day</li>
                      <li className="flex items-center gap-2">🟢 Granular ACL table permissions</li>
                      <li className="flex items-center gap-2">🟢 Live JSON-RPC audit console</li>
                      <li className="flex items-center gap-2">🟢 Multiple project API Keys</li>
                    </ul>
                  </div>
                  <button onClick={() => { setCurrentView('dashboard'); triggerToast('Sandbox simulation is now upgraded to Pro!'); }} className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs transition mt-8 shadow-md shadow-indigo-600/30">Get Pro License</button>
                </div>

                {/* خطة الشركات الكبرى */}
                <div className="bg-slate-900/20 border border-slate-900 rounded-3xl p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <span className="text-indigo-400 text-xs font-mono font-bold tracking-wider uppercase">Enterprise Grid</span>
                    <h3 className="text-xl font-bold text-white">Custom Tier</h3>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-white">Custom</span>
                    </div>
                    <p className="text-slate-400 text-xs">For massive architectures requiring private setups, SSO, or on-premise solutions.</p>
                    <hr className="border-slate-900" />
                    <ul className="space-y-3 text-xs text-slate-300">
                      <li className="flex items-center gap-2">🟢 Dedicated custom cloud cluster</li>
                      <li className="flex items-center gap-2">🟢 On-prem private cloud integration</li>
                      <li className="flex items-center gap-2">🟢 99.9% uptime SLA commitments</li>
                      <li className="flex items-center gap-2">🟢 SSO/SAML secure team directories</li>
                    </ul>
                  </div>
                  <button onClick={() => triggerToast('Our Enterprise specialists will contact you at your email.')} className="w-full bg-slate-900 hover:bg-slate-800 border border-slate-850 text-white font-medium py-2.5 rounded-xl text-xs transition mt-8">Contact Corporate Sales</button>
                </div>

              </div>
            </div>

            {/* الفوتر و معلومات الاتصال بالمالك والبيع */}
            <footer className="border-t border-slate-900 pt-10 pb-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <div className="space-y-1 text-center sm:text-left">
                <p>© 2026 BeamMCP.com. All rights reserved.</p>
                <p className="text-indigo-400/80">For domain acquisition inquiries, write directly to <a href="mailto:cccvcccv3@gmail.com" className="underline font-bold">cccvcccv3@gmail.com</a> or use the instant offer module.</p>
              </div>
              <div className="flex gap-4">
                <a href="#" className="hover:text-slate-300">Privacy Policy</a>
                <a href="#" className="hover:text-slate-300">Terms of Use</a>
                <a href="#" className="hover:text-slate-300">Documentation</a>
              </div>
            </footer>

          </div>
        )}


        {/* ======================= العرض الثاني: لوحة تحكم تفاعلية ذكية للبيانات ======================= */}
        {currentView === 'dashboard' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 animate-in fade-in duration-300">
            
            {/* الشريط الجانبي لوحة التحكم */}
            <aside className="lg:col-span-3 space-y-4">
              
              {/* بطاقة المستخدم التجريبي */}
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-850 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-indigo-950 border border-indigo-500/20 flex items-center justify-center font-bold text-indigo-300">
                  AI
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Dev Workspace</h4>
                  <span className="text-[9px] text-emerald-400 bg-emerald-950/40 border border-emerald-900/40 px-2 py-0.5 rounded font-mono">Sandbox Active</span>
                </div>
              </div>

              {/* تبويبات الأقسام المختلفة */}
              <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-2.5 space-y-1">
                <button 
                  onClick={() => setDashboardTab('overview')} 
                  className={`w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition ${dashboardTab === 'overview' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15' : 'text-slate-400 hover:text-white hover:bg-slate-900/40'}`}
                >
                  <Icons.Activity />
                  <span>Overview & Metrics</span>
                </button>

                <button 
                  onClick={() => setDashboardTab('servers')} 
                  className={`w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition ${dashboardTab === 'servers' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15' : 'text-slate-400 hover:text-white hover:bg-slate-900/40'}`}
                >
                  <Icons.Server />
                  <span>Exposed MCP Nodes</span>
                  <span className="bg-slate-800 text-slate-300 text-[9px] ml-auto px-2 py-0.5 rounded-full font-mono">{mcpServers.length}</span>
                </button>

                <button 
                  onClick={() => setDashboardTab('keys')} 
                  className={`w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition ${dashboardTab === 'keys' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15' : 'text-slate-400 hover:text-white hover:bg-slate-900/40'}`}
                >
                  <Icons.Key />
                  <span>Secure API Credentials</span>
                  <span className="bg-slate-800 text-slate-300 text-[9px] ml-auto px-2 py-0.5 rounded-full font-mono">{apiKeys.length}</span>
                </button>

                <button 
                  onClick={() => setDashboardTab('logs')} 
                  className={`w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition ${dashboardTab === 'logs' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15' : 'text-slate-400 hover:text-white hover:bg-slate-900/40'}`}
                >
                  <Icons.Terminal />
                  <span>Live Handshake Logs</span>
                  <span className="bg-indigo-950 text-indigo-400 text-[9px] ml-auto px-2 py-0.5 rounded-full font-mono animate-pulse">MONITOR</span>
                </button>

                <button 
                  onClick={() => setDashboardTab('playground')} 
                  className={`w-full text-left flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-medium transition ${dashboardTab === 'playground' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/15' : 'text-slate-400 hover:text-white hover:bg-slate-900/40'}`}
                >
                  <Icons.Cpu />
                  <span className="text-indigo-300">Sandbox Playground</span>
                </button>
              </div>

              {/* معلومات وحالة الاتصال */}
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 text-[11px] space-y-2">
                <div className="flex items-center justify-between text-slate-500">
                  <span>SSL Handshake:</span>
                  <span className="text-emerald-400 font-bold">🟢 Connected</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Data usage:</span>
                  <span className="text-slate-300 font-mono">2,570 / 10,000 reqs</span>
                </div>
                <div className="w-full bg-slate-900 h-1 rounded-full overflow-hidden">
                  <div className="bg-indigo-500 h-full w-[25.7%]" />
                </div>
              </div>

              {/* بطاقة جانبية لشراء النطاق للترويج المستمر والأنيق */}
              <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 space-y-3">
                <p className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Icons.Globe />
                  <span>Acquire BeamMCP.com</span>
                </p>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  Establish instantaneous authority in the multi-billion dollar AI agent infrastructure space with this premium name.
                </p>
                <button 
                  onClick={() => setShowOfferModal(true)}
                  className="w-full bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 hover:text-white text-[11px] font-bold py-2 rounded-xl transition"
                >
                  Send Direct Inquiry
                </button>
              </div>

            </aside>

            {/* محتوى لوحة التحكم الفعلي */}
            <section className="lg:col-span-9 space-y-8">
              
              {/* ترويسة لوحة التحكم */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/30 p-6 rounded-3xl border border-slate-900">
                <div>
                  <h1 className="text-xl font-bold text-white">BeamMCP Admin Dashboard</h1>
                  <p className="text-xs text-slate-400">Configure access-control lists, monitor data streams, and simulate agent tool calling schemas.</p>
                </div>

                <div className="flex items-center gap-2 self-stretch sm:self-auto">
                  <button 
                    onClick={() => triggerToast("Handshaking servers to verify response latency...")} 
                    className="flex-1 sm:flex-initial text-xs bg-slate-900 hover:bg-slate-800 text-slate-300 px-3.5 py-2 rounded-xl border border-slate-800 flex items-center justify-center gap-2 transition"
                  >
                    <Icons.Refresh />
                    <span>Scan Nodes</span>
                  </button>

                  <button 
                    onClick={() => setShowAddModal(true)} 
                    className="flex-1 sm:flex-initial text-xs bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-4 py-2 rounded-xl transition"
                  >
                    + Connect MCP Node
                  </button>
                </div>
              </div>


              {/* ===================== قسم نظرة عامة (Overview Tab) ===================== */}
              {dashboardTab === 'overview' && (
                <div className="space-y-8 animate-in fade-in duration-200">
                  
                  {/* صف البطاقات الرقمية */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    
                    <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-2xl relative overflow-hidden">
                      <p className="text-xs text-slate-500 font-semibold">Total Handshakes Routed</p>
                      <h3 className="text-2xl font-bold text-white mt-1.5 font-mono">2,570</h3>
                      <p className="text-[10px] text-emerald-400 mt-1">🟢 100% routing success</p>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-2xl relative overflow-hidden">
                      <p className="text-xs text-slate-500 font-semibold">Proxy Tunnel Latency</p>
                      <h3 className="text-2xl font-bold text-white mt-1.5 font-mono">18ms</h3>
                      <p className="text-[10px] text-slate-400 mt-1">SSL Multiplexed Streaming</p>
                    </div>

                    <div className="bg-slate-900/40 border border-slate-900 p-5 rounded-2xl relative overflow-hidden">
                      <p className="text-xs text-slate-500 font-semibold">Exposed Database Schemas</p>
                      <h3 className="text-2xl font-bold text-white mt-1.5 font-mono">25 Tools</h3>
                      <p className="text-[10px] text-slate-400 mt-1">Across {mcpServers.length} connected nodes</p>
                    </div>

                  </div>

                  {/* رسم بياني مخصص لتدفق الشبكة */}
                  <div className="bg-slate-900/40 border border-slate-900 p-6 rounded-3xl space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xs font-bold text-slate-200">Traffic Throughput (requests / minute)</h3>
                        <p className="text-[10px] text-slate-500">Live request tracking for development cluster</p>
                      </div>
                      <span className="text-[9px] bg-emerald-950 text-emerald-400 px-2.5 py-1 rounded border border-emerald-900/50 font-mono">SIMULATION ACTIVE ⚡</span>
                    </div>

                    {/* الرسم البياني البصري */}
                    <div className="h-24 flex items-end gap-1.5 pt-4 bg-slate-950/50 p-2.5 rounded-xl overflow-hidden">
                      {[15, 25, 45, 30, 60, 50, 80, 75, 55, 40, 65, 95, 85, 70, 60, 45, 90, 110, 120, 95, 80, 60, 45, 65, 85, 115, 90, 75, 60, 85].map((val, idx) => (
                        <div 
                          key={idx} 
                          className="flex-1 bg-indigo-500/80 hover:bg-indigo-400 rounded-t transition-all duration-300"
                          style={{ height: `${(val / 120) * 100}%` }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* عرض سريع للخوادم النشطة */}
                  <div className="bg-slate-900/40 border border-slate-900 rounded-3xl p-5 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs font-bold text-slate-200">Active Handshake Connections</h3>
                      <button onClick={() => setDashboardTab('servers')} className="text-xs text-indigo-400 hover:text-indigo-300">View All</button>
                    </div>

                    <div className="divide-y divide-slate-900">
                      {mcpServers.slice(0, 3).map((srv) => (
                        <div key={srv.id} className="py-2.5 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2.5">
                            <span className={`w-2 h-2 rounded-full ${srv.status === 'online' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-600'}`}></span>
                            <div>
                              <p className="font-semibold text-white">{srv.name}</p>
                              <p className="text-[9px] text-slate-500">Type: {srv.type} | {srv.toolsCount} registered tool definitions</p>
                            </div>
                          </div>
                          <div className="text-right font-mono text-slate-400">
                            <p>{srv.requests} total requests</p>
                            <p className="text-[9px] text-indigo-400">⚡ {srv.latency}ms average</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}


              {/* ===================== قسم خوادم الـ MCP المتصلة ===================== */}
              {dashboardTab === 'servers' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-white">Exposed Server Connection Schemas</h2>
                      <p className="text-xs text-slate-400">Map databases and APIs as JSON-RPC nodes to make them discoverable by AI agents.</p>
                    </div>
                    
                    <button 
                      onClick={() => setShowAddModal(true)} 
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-3 py-1.5 rounded-xl transition"
                    >
                      + Register Local Node
                    </button>
                  </div>

                  {/* شبكة السيرفرات المتصلة */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {mcpServers.map((srv) => (
                      <div key={srv.id} className="bg-slate-900/40 border border-slate-900 hover:border-slate-800 p-5 rounded-2xl space-y-4 transition">
                        
                        <div className="flex items-start justify-between">
                          <div className="space-y-1">
                            <span className="text-[9px] bg-indigo-950 text-indigo-300 px-2 py-0.5 rounded border border-indigo-900 font-mono">
                              {srv.type}
                            </span>
                            <h3 className="text-sm font-bold text-white mt-1">{srv.name}</h3>
                          </div>

                          <div className="flex items-center gap-1.5 text-xs">
                            <span className={`w-1.5 h-1.5 rounded-full ${srv.status === 'online' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                            <span className={srv.status === 'online' ? 'text-emerald-400' : 'text-red-400'}>
                              {srv.status === 'online' ? 'Active' : 'Disconnected'}
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-3 gap-2 bg-slate-950/60 p-2.5 rounded-xl text-center text-xs">
                          <div>
                            <span className="text-[9px] text-slate-500 block">Exposed Tools</span>
                            <span className="font-bold text-slate-300 font-mono">{srv.toolsCount}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-500 block">Requests Routed</span>
                            <span className="font-bold text-slate-300 font-mono">{srv.requests}</span>
                          </div>
                          <div>
                            <span className="text-[9px] text-slate-500 block">Round-trip</span>
                            <span className="font-bold text-indigo-400 font-mono">{srv.latency ? `${srv.latency}ms` : 'N/A'}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-2 text-xs border-t border-slate-900/60">
                          <button 
                            onClick={() => {
                              setMcpServers(prev => prev.map(s => s.id === srv.id ? { ...s, status: s.status === 'online' ? 'offline' : 'online' } : s));
                              triggerToast(`Changed target state of node: ${srv.name}`);
                            }}
                            className="flex-1 bg-slate-950 hover:bg-slate-900 text-slate-300 py-1.5 rounded-lg border border-slate-800 transition"
                          >
                            {srv.status === 'online' ? 'Pause Transit' : 'Enable Handshake'}
                          </button>
                          
                          <button 
                            onClick={() => {
                              setMcpServers(prev => prev.filter(s => s.id !== srv.id));
                              triggerToast(`Connection deleted: ${srv.name}`);
                            }}
                            className="text-red-400 hover:bg-red-950/20 px-2.5 py-1.5 rounded-lg transition"
                          >
                            Remove Node
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              )}


              {/* ===================== قسم المفاتيح الأمنية (API Keys) ===================== */}
              {dashboardTab === 'keys' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-white">Developer API Handshake Keys</h2>
                      <p className="text-xs text-slate-400">Provide authentication parameters inside your local config file scripts.</p>
                    </div>

                    <button 
                      onClick={() => {
                        const newKey = {
                          id: `key_${Date.now().toString().slice(-2)}`,
                          name: `Sandbox Handshake Key ${apiKeys.length + 1}`,
                          token: `bm_live_${Math.random().toString(36).substring(2, 7)}...${Math.random().toString(36).substring(2, 5)}f`,
                          created: new Date().toISOString().split('T')[0],
                          status: 'active'
                        };
                        setApiKeys([...apiKeys, newKey]);
                        triggerToast("Generated unique client API Key.");
                      }}
                      className="bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs px-3 py-1.5 rounded-xl transition"
                    >
                      + Generate Token
                    </button>
                  </div>

                  <div className="bg-slate-900/40 border border-slate-900 rounded-3xl overflow-hidden">
                    <table className="w-full text-left text-xs sm:text-sm">
                      <thead className="bg-slate-950/60 border-b border-slate-900 text-slate-400">
                        <tr>
                          <th className="p-4">Key Friendly Identifier</th>
                          <th className="p-4">Handshake Token</th>
                          <th className="p-4">Created</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-900">
                        {apiKeys.map((key) => (
                          <tr key={key.id} className="hover:bg-slate-900/20 transition">
                            <td className="p-4 font-semibold text-white">{key.name}</td>
                            <td className="p-4 font-mono text-indigo-300">
                              <span className="bg-slate-950 px-2.5 py-1 rounded border border-slate-900/80 text-[11px]">
                                {key.token}
                              </span>
                            </td>
                            <td className="p-4 text-slate-400">{key.created}</td>
                            <td className="p-4">
                              <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-mono text-[9px] uppercase font-bold">
                                {key.status}
                              </span>
                            </td>
                            <td className="p-4 text-right">
                              <button 
                                onClick={() => {
                                  const tempInput = document.createElement('input');
                                  tempInput.value = `bm_live_7f8d29b0a1f2e4c8d_${key.id}`;
                                  document.body.appendChild(tempInput);
                                  tempInput.select();
                                  document.execCommand('copy');
                                  document.body.removeChild(tempInput);
                                  triggerToast("Full client token copied to clipboard!");
                                }}
                                className="text-indigo-400 hover:text-indigo-300 font-bold text-xs"
                              >
                                Copy Token
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                </div>
              )}


              {/* ===================== قسم سجلات العمليات (Live Logs) ===================== */}
              {dashboardTab === 'logs' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-base font-bold text-white">Live SSL Stream Logs</h2>
                      <p className="text-xs text-slate-400">Stream transaction records for client-side tool queries in real-time.</p>
                    </div>

                    <button 
                      onClick={() => {
                        setLogs([]);
                        triggerToast("Audit log records cleared.");
                      }}
                      className="text-xs bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 px-3 py-1.5 rounded-lg transition"
                    >
                      Clear Log
                    </button>
                  </div>

                  {/* جدول السجلات الحية */}
                  <div className="bg-slate-900/40 border border-slate-900 rounded-3xl overflow-hidden">
                    <div className="p-4 bg-slate-950/60 border-b border-slate-900 flex items-center justify-between text-xs">
                      <span className="text-indigo-400 font-mono font-bold">Active SSL Handshake Streams 📡</span>
                      <span className="text-slate-500">Capture rate: stable</span>
                    </div>

                    <div className="divide-y divide-slate-900 max-h-[400px] overflow-y-auto">
                      {logs.length === 0 ? (
                        <p className="p-8 text-center text-slate-500 text-xs">No logs recorded. Use the interactive playground to trigger mock operations!</p>
                      ) : (
                        logs.map((log, index) => (
                          <div key={index} className="p-3.5 hover:bg-slate-900/10 transition space-y-2 text-xs">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-slate-500 font-mono">{log.timestamp}</span>
                                <span className="bg-slate-900 text-slate-300 px-2 py-0.5 rounded font-mono font-medium">{log.client}</span>
                                <span className="text-slate-600">--&gt;</span>
                                <span className="text-indigo-300 font-semibold">{log.server}</span>
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-emerald-400 font-mono font-semibold">{log.latency}</span>
                                <span className="bg-emerald-950 text-emerald-400 px-1.5 py-0.5 rounded font-mono text-[9px] uppercase font-bold">SUCCESS</span>
                              </div>
                            </div>

                            <div className="flex items-center justify-between gap-4 pl-4 text-slate-400">
                              <div className="flex items-center gap-2">
                                <span className="text-purple-400 font-mono font-bold">{log.method}</span>
                                <code className="text-slate-400 font-mono bg-slate-950/80 p-1 rounded border border-slate-900 text-[10px] max-w-[400px] truncate" dir="ltr">
                                  {log.payload}
                                </code>
                              </div>
                              
                              <button 
                                onClick={() => triggerToast(`Raw Payload: ${log.payload}`)}
                                className="text-indigo-400 hover:underline hover:text-indigo-300 text-[11px]"
                              >
                                View Payload
                              </button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                </div>
              )}


              {/* ===================== قسم حقل التجربة التفاعلي (Playground) ===================== */}
              {dashboardTab === 'playground' && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  
                  <div>
                    <h2 className="text-base font-bold text-white">Agent Discovery & Execution Playground</h2>
                    <p className="text-xs text-slate-400">Simulate how a hosted model parses intents and triggers secure local MCP database methods.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    
                    {/* عمود التحكم */}
                    <div className="lg:col-span-5 bg-slate-900/40 border border-slate-900 p-5 rounded-3xl space-y-4">
                      
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">Target Node Schema:</label>
                        <select 
                          value={playgroundTarget} 
                          onChange={(e) => setPlaygroundTarget(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                        >
                          {mcpServers.filter(s => s.status === 'online').map(s => (
                            <option key={s.id} value={s.name}>{s.name} ({s.toolsCount} Tools)</option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[11px] text-slate-400 font-bold block uppercase tracking-wider">Model Prompt Query:</label>
                        <textarea 
                          rows={4}
                          value={playgroundQuery}
                          onChange={(e) => setPlaygroundQuery(e.target.value)}
                          placeholder="Type an intent here..."
                          className="w-full bg-slate-950 border border-slate-800 text-slate-100 rounded-xl p-3 text-xs focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
                        />
                      </div>

                      {/* عروض سريعة لتسريع التجربة */}
                      <div className="space-y-2">
                        <p className="text-[9px] text-slate-500 font-bold uppercase font-mono">Query Presets:</p>
                        <div className="space-y-1.5">
                          <button 
                            type="button"
                            onClick={() => {
                              setPlaygroundTarget('PostgreSQL Database');
                              setPlaygroundQuery('Show Sarah Jenkins subscription status and plan.');
                            }}
                            className="w-full text-left text-[10px] text-indigo-300 hover:text-white bg-slate-950/80 p-2 rounded border border-slate-900 block truncate transition hover:bg-slate-900"
                          >
                            📝 Select Sarah subscription (Postgres SQL)
                          </button>

                          <button 
                            type="button"
                            onClick={() => {
                              setPlaygroundTarget('GitHub Enterprise Bridge');
                              setPlaygroundQuery('Fetch the PR titled secure-auth-gateway.');
                            }}
                            className="w-full text-left text-[10px] text-indigo-300 hover:text-white bg-slate-950/80 p-2 rounded border border-slate-900 block truncate transition hover:bg-slate-900"
                          >
                            📝 Query secure-auth-gateway pull requests (GitHub API)
                          </button>
                        </div>
                      </div>

                      <button 
                        onClick={handlePlaygroundSubmit}
                        disabled={isSimulating}
                        className={`w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-xl text-xs transition flex items-center justify-center gap-2 ${isSimulating ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <Icons.Play />
                        <span>{isSimulating ? 'Routing Payload...' : 'Run Simulation'}</span>
                      </button>

                    </div>

                    {/* التيرمينال ومخرجات الباكيت البصرية */}
                    <div className="lg:col-span-7 flex flex-col bg-slate-950 rounded-3xl border border-slate-900 overflow-hidden min-h-[380px]">
                      
                      <div className="bg-slate-900 px-4 py-2.5 flex items-center justify-between border-b border-slate-950">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-red-500"></span>
                          <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                          <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">mcp_handshake_session</span>
                        <button 
                          onClick={() => setTerminalOutput([])}
                          className="text-[9px] text-slate-400 hover:text-white bg-slate-950 px-2 py-0.5 rounded"
                        >
                          Clear Terminal
                        </button>
                      </div>

                      {/* شاشة المخرجات */}
                      <div className="flex-1 p-4 font-mono text-[11px] overflow-y-auto space-y-3 max-h-[300px]">
                        {terminalOutput.map((out, idx) => {
                          if (out.type === 'system') {
                            return <p key={idx} className="text-slate-500">⚡ {out.text}</p>;
                          }
                          if (out.type === 'info') {
                            return <p key={idx} className="text-indigo-400">💡 {out.text}</p>;
                          }
                          if (out.type === 'user') {
                            return <p key={idx} className="text-white font-bold">{out.text}</p>;
                          }
                          if (out.type === 'rpc') {
                            return <p key={idx} className="text-yellow-400 font-semibold">{out.text}</p>;
                          }
                          if (out.type === 'rpc-detail') {
                            return <p key={idx} className="text-yellow-600 pl-4">{out.text}</p>;
                          }
                          if (out.type === 'success') {
                            return <p key={idx} className="text-emerald-400 font-bold">{out.text}</p>;
                          }
                          if (out.type === 'response') {
                            return (
                              <pre key={idx} className="bg-slate-900/60 p-2 rounded border border-slate-900 text-indigo-300 overflow-x-auto text-left" dir="ltr">
                                {out.text}
                              </pre>
                            );
                          }
                          if (out.type === 'ai-final') {
                            return <p key={idx} className="text-indigo-200 bg-indigo-950/40 p-3 rounded-xl border border-indigo-900/30 font-sans leading-relaxed">{out.text}</p>;
                          }
                          return null;
                        })}
                        
                        {isSimulating && (
                          <div className="flex items-center gap-2 text-indigo-400 animate-pulse pt-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping"></span>
                            <span>Awaiting secure verification checks...</span>
                          </div>
                        )}
                        <div ref={terminalEndRef} />
                      </div>

                    </div>

                  </div>

                </div>
              )}

            </section>

          </div>
        )}

      </main>

      {/* ======================= نافذة منبثقة: نموذج شراء الدومين وإرسال العرض ======================= */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-slate-850 pb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Icons.Globe />
                <span>BeamMCP.com Domain Acquisition</span>
              </h3>
              <button 
                onClick={() => setShowOfferModal(false)}
                className="text-slate-400 hover:text-white font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleOfferSubmit} className="space-y-4">
              
              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Target Domain Name:</label>
                <input 
                  type="text" 
                  disabled
                  value="BeamMCP.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400 font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Your Offer Budget (USD):</label>
                <input 
                  type="text" 
                  value={offerPrice}
                  onChange={(e) => setOfferPrice(e.target.value)}
                  placeholder="e.g. $2,500 or leave for negotiation"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Your Contact Email:</label>
                <input 
                  type="email" 
                  required
                  value={offerEmail}
                  onChange={(e) => setOfferEmail(e.target.value)}
                  placeholder="e.g. name@firm.com"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Message or Terms:</label>
                <textarea 
                  rows={3}
                  value={offerMessage}
                  onChange={(e) => setOfferMessage(e.target.value)}
                  placeholder="Optional escrow requests, delivery timeline, etc."
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-indigo-500 resize-none leading-relaxed"
                />
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850 text-[10px] text-slate-500 leading-relaxed">
                ℹ️ Clicking "Prepare Email" will create a secure template to <strong className="text-slate-300">cccvcccv3@gmail.com</strong>. Domain transfer via Escrow or certified registrars.
              </div>

              <div className="flex gap-3 pt-1">
                <button 
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs transition"
                >
                  Prepare Email Offer 📧
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowOfferModal(false)}
                  className="flex-1 bg-slate-950 hover:bg-slate-900 text-slate-400 py-2.5 rounded-xl text-xs transition"
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>
      )}


      {/* ======================= نافذة منبثقة: إضافة سيرفر MCP جديد ======================= */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl relative">
            
            <div className="flex items-center justify-between border-b border-slate-850 pb-4">
              <h3 className="text-base font-bold text-white">Register Secure Local Node</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white font-bold text-lg"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddServer} className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Server Identifier:</label>
                <input 
                  type="text" 
                  required
                  value={newServerName}
                  onChange={(e) => setNewServerName(e.target.value)}
                  placeholder="e.g. Production Redis"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Resource / Node Type:</label>
                <select 
                  value={newServerType}
                  onChange={(e) => setNewServerType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  <option value="Database">Database Schema</option>
                  <option value="API">API Middleware</option>
                  <option value="Storage">Filesystem safe-directory</option>
                  <option value="Messaging">Team Communications</option>
                  <option value="Custom">Custom CLI Shell scripts</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 font-bold block uppercase tracking-wider">Exposed Function Count:</label>
                <input 
                  type="number" 
                  min={1} 
                  max={50}
                  value={newServerTools}
                  onChange={(e) => setNewServerTools(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-850 text-[10px] text-slate-500">
                💡 BeamMCP will register these methods instantly into your cloud JSON-RPC gateway list.
              </div>

              <div className="flex gap-3 pt-1">
                <button 
                  type="submit"
                  className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 rounded-xl text-xs transition"
                >
                  Add Node Schemas
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 bg-slate-950 hover:bg-slate-900 text-slate-400 py-2.5 rounded-xl text-xs transition"
                >
                  Cancel
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}

