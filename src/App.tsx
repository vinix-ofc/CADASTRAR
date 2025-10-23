import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './assets/SideBar';
import CadastroMaquinas from './CadastroMaquinas';

const HomePage = () => <h1 style={{ padding: '40px' }}>Bem-vindo à Página Principal</h1>;

const TarefasPage = () => <h1 style={{ padding: '40px' }}>Página de Tarefas</h1>;

const DocumentosPage = () => <h1 style={{ padding: '40px' }}>Página de Documentos</h1>;

const DashboardPage = () => <h1 style={{ padding: '40px' }}>Página do DashBoard</h1>;

const EquipesPage = () => <h1 style={{ padding: '40px' }}>Página de Equipes</h1>;

const ConfiguracoesPage = () => <h1 style={{ padding: '40px' }}>Página de Configurações</h1>;

import './App.css';

export function  App () {
  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/tarefas" element={<TarefasPage />} />
            <Route path="/documentos" element={<DocumentosPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/equipes" element={<EquipesPage />} />
            <Route path="/maquinas" element={<CadastroMaquinas />} />
            <Route path="/configuracoes" element={<ConfiguracoesPage />} />

            <Route
              path="*"
              element={<h1 style={{ padding: '40px' }}>404 - Página Não Encontrada</h1>}
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}