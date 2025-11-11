import './SideBar.css'; 
import logo from './img/logoBranca.png';

import {
  Home,
  FileText,
  Users,
  Settings,
  LogOut,
  ChartColumnIncreasing,
  SquareCheckBig,
  Grid2X2Plus,
  // ChevronLeft REMOVIDO
} from 'lucide-react';

import { NavLink } from 'react-router-dom';
// useState REMOVIDO

// Definição de Tipos para as Props
interface SidebarProps {
 isExpanded: boolean;
}

// O componente agora recebe as props tipadas
export default function Sidebar({ isExpanded }: SidebarProps) {

  const menuItems = [
    { key: 'home', label: 'Home', icon: <Home size={22} strokeWidth={1.6} />, to: '/home' },
    { key: 'transfers', label: 'Tarefas', icon: <SquareCheckBig size={22} strokeWidth={1.6} />, to: '/tarefas' },
    { key: 'documents', label: 'Documentos', icon: <FileText size={22} strokeWidth={1.6} />, to: '/documentos' },
    { key: 'dashboard', label: 'DashBoard', icon: <ChartColumnIncreasing size={22} strokeWidth={1.6} />, to: '/dashboard' },
    { key: 'teams', label: 'Equipes', icon: <Users size={22} strokeWidth={1.6} />, to: '/equipes' },
    { key: 'machine', label: 'Maquinas', icon: <Grid2X2Plus size={22} strokeWidth={1.6} />, to: '/maquinas' },
    { key: 'settings', label: 'Configurações', icon: <Settings size={22} strokeWidth={1.6} />, to: '/configuracoes' },
  ];

  return (
    <aside className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      {/* Botão de toggle interno removido */}

      <div className="logo">
        <img src={logo} alt="Maintech" className="logo-img" />
      </div>

      <nav className="sidebar-nav">
        <ul className="menu-list">
          {menuItems.map(item => (
            <li key={item.key}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  isActive ? "menu-link active" : "menu-link"
                }
              >
                <span className="icon">{item.icon}</span>
                {isExpanded && <span className="label">{item.label}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Botão de sair no final da sidebar */}
      <button className="signout" type="button">
        <span className="icon">
          <LogOut size={22} strokeWidth={1.6} />
        </span>
        {isExpanded && <span className="label">Sair da conta</span>}
      </button>
    </aside>
  );
}
