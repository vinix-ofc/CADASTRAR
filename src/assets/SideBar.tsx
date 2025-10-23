// Arquivo: src/components/Sidebar.tsx

import './SideBar.css'; // Importa o arquivo de estilo

// ## AQUI ESTÁ A MUDANÇA ##
// O caminho da logo foi corrigido para usar a imagem do projeto, não a do Vite.
import logo from '../assets/img/logoBranca.png'; 

// Importando os ícones que serão usados
import {
  Home,
  FileText,
  Users,
  Settings,
  LogOut,
  ChartColumnIncreasing,
  SquareCheckBig,
  Grid2X2Plus
} from 'lucide-react';

// Importa o NavLink para criar os links de navegação
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  // Array de objetos para criar os itens do menu
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
    <aside className="sidebar">
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
                <span className="label">{item.label}</span>
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
        <span className="label">Sair da conta</span>
      </button>
    </aside>
  );
}