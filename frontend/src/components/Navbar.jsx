import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Heart, Globe, Menu, X, LogIn, User, ShieldAlert, LogOut } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { language, toggleLanguage, t } = useLanguage();
  const { user, logout, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { name: t('navHome'), path: '/' },
    { name: t('navAbout'), path: '/about' },
    { name: t('navHealth'), path: '/health-content' },
    { name: t('navGames'), path: '/games' },
    { name: t('navQuiz'), path: '/quiz' },
    { name: t('navSurvey'), path: '/survey' },
    { name: t('navReminders'), path: '/reminders' },
    { name: t('navFeedback'), path: '/feedback' },
    { name: t('navContact'), path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <Link to={user ? "/" : "/login"} className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-200 group-hover:scale-105 transition-transform">
              <Heart className="w-6 h-6 fill-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="font-extrabold text-xl tracking-tight text-emerald-950 font-sans">HealthPulse</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block">Public Health & Wellness</p>
            </div>
          </Link>

          {/* Desktop Nav Links - Highlight Active Page */}
          {user && (
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-1.5 text-sm transition-all duration-200 rounded-lg ${
                      isActive
                        ? 'bg-emerald-600 text-white font-semibold shadow-sm shadow-emerald-200 ring-2 ring-emerald-600/30'
                        : 'font-medium text-slate-600 hover:text-emerald-700 hover:bg-emerald-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 transition shadow-sm"
              title="Switch English / Telugu"
            >
              <Globe className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === 'en' ? 'తెలుగు' : 'English'}</span>
            </button>

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-2">
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className={`flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                      location.pathname === '/admin'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{t('navAdmin')}</span>
                  </Link>
                ) : (
                  <Link
                    to="/dashboard"
                    className={`flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold rounded-lg border transition ${
                      location.pathname === '/dashboard'
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                    }`}
                  >
                    <User className="w-3.5 h-3.5" />
                    <span>{t('navDashboard')}</span>
                  </Link>
                )}

                <button
                  onClick={handleLogout}
                  className="p-1.5 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition"
                  title={t('navLogout')}
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:text-emerald-700 rounded-lg hover:bg-slate-100 transition"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>{t('navLogin')}</span>
                </Link>
                <Link
                  to="/register"
                  className="px-3.5 py-1.5 text-xs font-semibold bg-emerald-600 text-white rounded-lg shadow-sm hover:bg-emerald-700 transition"
                >
                  {t('navRegister')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-2 lg:hidden">
            <button
              onClick={toggleLanguage}
              className="p-1.5 rounded-lg border border-slate-200 text-xs font-bold text-emerald-700"
            >
              {language === 'en' ? 'తె' : 'EN'}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-1 shadow-lg">
          {user &&
            navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base transition-colors ${
                    isActive
                      ? 'bg-emerald-600 text-white font-bold shadow-sm'
                      : 'font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          <div className="pt-4 border-t border-slate-100 flex flex-col space-y-2">
            {user ? (
              <>
                <Link
                  to={isAdmin ? "/admin" : "/dashboard"}
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center py-2 bg-emerald-600 text-white font-medium rounded-lg text-sm"
                >
                  {isAdmin ? t('navAdmin') : t('navDashboard')}
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}
                  className="w-full text-center py-2 bg-slate-100 text-slate-700 font-medium rounded-lg text-sm hover:bg-rose-50 hover:text-rose-600"
                >
                  {t('navLogout')}
                </button>
              </>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2 border border-slate-200 text-slate-700 font-semibold rounded-lg text-sm"
                >
                  {t('navLogin')}
                </Link>
                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="text-center py-2 bg-emerald-600 text-white font-semibold rounded-lg text-sm"
                >
                  {t('navRegister')}
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
