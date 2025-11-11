import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';

export interface Maquina {
  id: string;
  nome: string;
  idMaquina: string;
  oficina: string;
  conjuntos?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UseMaquinasReturn {
  maquinas: Maquina[];
  loading: boolean;
  error: string | null;
  cadastrarMaquina: (maquina: Omit<Maquina, 'id'>) => Promise<void>;
  atualizarMaquina: (id: string, maquina: Omit<Maquina, 'id'>) => Promise<void>;
  excluirMaquina: (id: string) => Promise<void>;
}

export function useMaquinas(): UseMaquinasReturn {
  const [maquinas, setMaquinas] = useState<Maquina[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

// Carrega a lista de máquinas
  useEffect(() => {
    async function loadMaquinas() {
      try {
        const response = await fetch(`${API_URL}/maquinas`);
        if (!response.ok) throw new Error('Erro ao carregar máquinas');
        const data = await response.json();
        setMaquinas(data);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    }

    loadMaquinas();
  }, []);

  // Função para cadastrar uma nova máquina
  const cadastrarMaquina = async (maquina: Omit<Maquina, 'id'>) => {
    try {
      const response = await fetch(`${API_URL}/maquinas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(maquina),
      });

      if (!response.ok) throw new Error('Erro ao cadastrar máquina');
      
      const novaMaquina = await response.json();
      setMaquinas(prev => [novaMaquina, ...prev]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao cadastrar');
      throw err;
    }
  };

  // Função para atualizar uma máquina existente
  const atualizarMaquina = async (id: string, maquina: Omit<Maquina, 'id'>) => {
    try {
      const response = await fetch(`${API_URL}/maquinas/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(maquina),
      });

      if (!response.ok) throw new Error('Erro ao atualizar máquina');
      
      const maquinaAtualizada = await response.json();
      setMaquinas(prev => prev.map(m => m.id === id ? maquinaAtualizada : m));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar');
      throw err;
    }
  };

  // Função para excluir uma máquina
  const excluirMaquina = async (id: string) => {
    try {
      const response = await fetch(`${API_URL}/maquinas/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Erro ao excluir máquina');
      
      setMaquinas(prev => prev.filter(m => m.id !== id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao excluir');
      throw err;
    }
  };

  return {
    maquinas,
    loading,
    error,
    cadastrarMaquina,
    atualizarMaquina,
    excluirMaquina,
  };
}