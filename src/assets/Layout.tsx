import { useState } from 'react';
import Sidebar from './SideBar'; // Ajuste o caminho
import Header from './Header';   // Ajuste o caminho
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const toggleSidebar = () => {
    setIsExpanded(prev => !prev);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      {/* Passa o estado para a Sidebar (toggle agora é feito pelo Header) */}
      <Sidebar
        isExpanded={isExpanded}
      />

      <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Passa a função de alternância e o estado para o Header */}
        <Header
          toggleSidebar={toggleSidebar}
          isExpanded={isExpanded}
        />

        {/* Área de Conteúdo Principal - agora usamos Outlet para rotas aninhadas */}
        <main style={{ padding: '20px 20px', flexGrow: 1, backgroundColor: '#f5f5f5' }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
