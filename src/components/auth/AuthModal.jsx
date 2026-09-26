import React, { useState } from 'react';
import { 
  X, 
  LogIn, 
  UserPlus, 
  Mail, 
  Lock, 
  User, 
  MapPin, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Sprout,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { useAuth, DEFAULT_DEMO_USER } from '../../context/AuthContext';

export default function AuthModal({ lang = 'en', t }) {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authModalTab, 
    setAuthModalTab, 
    login, 
    register, 
    isLoading, 
    authError 
  } = useAuth();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('selvaraj@grambiz.ai');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regLocation, setRegLocation] = useState('Kallupatti Village, Madurai');

  const [localSuccess, setLocalSuccess] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(loginEmail, loginPassword);
      setLocalSuccess(lang === 'ta' ? 'வெற்றிகரமாக உள்நுழைந்தீர்கள்!' : 'Logged in successfully!');
      setTimeout(() => {
        setLocalSuccess('');
      }, 1500);
    } catch {
      // Error handled by AuthContext
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({
        full_name: regName,
        email: regEmail,
        password: regPassword,
        location: regLocation,
      });
      setLocalSuccess(lang === 'ta' ? 'கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது!' : 'Account registered successfully!');
      setTimeout(() => {
        setLocalSuccess('');
      }, 1500);
    } catch {
      // Error handled by AuthContext
    }
  };

  const fillDemoCredentials = () => {
    setLoginEmail('selvaraj@grambiz.ai');
    setLoginPassword('password123');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-100 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-800 p-6 text-white relative">
          <button
            onClick={closeAuthModal}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
              <Sprout className="w-4 h-4 text-emerald-200" />
            </div>
            <span className="text-xs uppercase tracking-widest font-black text-emerald-200">
              GramBiz AI Auth
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            {authModalTab === 'login' 
              ? (lang === 'ta' ? 'வணிக கணக்கில் உள்நுழையவும்' : 'Welcome to GramBiz AI')
              : (lang === 'ta' ? 'புதிய தொழில்முனைவோர் பதிவு' : 'Create Enterprise Account')
            }
          </h2>
          <p className="text-xs text-emerald-100/90 mt-1">
            {authModalTab === 'login'
              ? (lang === 'ta' ? 'உங்கள் திட்ட அறிக்கைகள் மற்றும் சேமித்த ஆவணங்களை அணுகவும்' : 'Access your saved DPR reports, viability scores & subsidies')
              : (lang === 'ta' ? 'கிராமப்புற வணிக உளவுத்துறை மற்றும் மானிய திட்டங்களை பெறவும்' : 'Join 2,400+ rural entrepreneurs securing credit & subsidies')
            }
          </p>

          {/* Tab Selector */}
          <div className="flex rounded-xl bg-black/20 p-1 mt-5 border border-white/10">
            <button
              type="button"
              onClick={() => setAuthModalTab('login')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authModalTab === 'login'
                  ? 'bg-white text-emerald-950 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'உள்நுழைக' : 'Sign In'}</span>
            </button>
            <button
              type="button"
              onClick={() => setAuthModalTab('register')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                authModalTab === 'register'
                  ? 'bg-white text-emerald-950 shadow-sm'
                  : 'text-white/80 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'பதிவு செய்க' : 'Register'}</span>
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6">
          {/* Error Alert */}
          {authError && (
            <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2 animate-shake">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500 mt-0.5" />
              <div className="leading-snug">{authError}</div>
            </div>
          )}

          {/* Success Alert */}
          {localSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-semibold">{localSuccess}</span>
            </div>
          )}

          {/* Sign In Form */}
          {authModalTab === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {lang === 'ta' ? 'மின்னஞ்சல் முகவரி' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="selvaraj@grambiz.ai"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  {lang === 'ta' ? 'கடவுச்சொல்' : 'Password'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3 pointer-events-none" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                  />
                </div>
              </div>

              {/* Quick Demo Fill Pill */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={fillDemoCredentials}
                  className="w-full py-2 px-3 rounded-xl bg-emerald-50/80 hover:bg-emerald-100 text-emerald-800 border border-emerald-200/80 text-[11px] font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{lang === 'ta' ? '⚡ மாதிரி கணக்கு: செல்வராஜ் குமார்' : '⚡ Quick Demo Account: Selvaraj Kumar'}</span>
                </button>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{lang === 'ta' ? 'சரிபார்க்கிறது...' : 'Authenticating...'}</span>
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    <span>{lang === 'ta' ? 'உள்நுழையவும்' : 'Sign In with JWT'}</span>
                  </>
                )}
              </button>
            </form>
          ) : (
            /* Register Form */
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ta' ? 'முழு பெயர் / தொழில்முனைவோர்' : 'Full Name / Entrepreneur'}
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    placeholder="Muthukumar S."
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ta' ? 'மின்னஞ்சல்' : 'Email Address'}
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="muthu@grambiz.ai"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ta' ? 'கடவுச்சொல் (குறைந்தது 4 எழுத்துகள்)' : 'Password (min 4 chars)'}
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="password"
                    required
                    minLength={4}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {lang === 'ta' ? 'கிராமம் / மாவட்டம்' : 'Village / District Location'}
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={regLocation}
                    onChange={(e) => setRegLocation(e.target.value)}
                    placeholder="Kallupatti Village, Madurai"
                    className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 px-4 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-extrabold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 mt-3"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>{lang === 'ta' ? 'உருவாக்குகிறது...' : 'Creating Account...'}</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    <span>{lang === 'ta' ? 'கணக்கை உருவாக்கு' : 'Register & Auto Sign-In'}</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Trust badge footer */}
          <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Secure JWT Bearer Session • Bank-Grade 256-bit encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
}
