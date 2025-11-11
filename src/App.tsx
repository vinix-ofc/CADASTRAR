import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './assets/Layout';
import CadastroMaquinas from './CadastroMaquinas';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<div style={{padding:20}}>Bem-vindo ao sistema</div>} />
          <Route path="maquinas" element={<CadastroMaquinas />} />
          {/* Adicione aqui outras rotas filhas conforme necessário */}
        </Route>
        {/* Redireciona qualquer rota desconhecida para / */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
 