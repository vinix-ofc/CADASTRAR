import React, { useState } from 'react';
import styles from './CadastroMaquinas.module.css';
import { Wrench, Hammer, Zap, Bell, UserCircle, Pencil, Trash2, Loader2, AlertTriangle } from 'lucide-react';
import { useMaquinas } from './hooks/useMaquinas';
import type { Maquina } from './hooks/useMaquinas';

// interface MaquinaUI extends Omit<Maquina, 'createdAt' | 'updatedAt'> {
//   icone: React.ReactElement;
//   iconClass: string;
// }

// Mapeamento dos ícones por tipo de máquina
const iconMap: Record<string, { icon: React.ReactElement; class: string }> = {
  quinadora: { icon: <Wrench size={24} />, class: styles.iconQuinadora },
  crimpagem: { icon: <Hammer size={24} />, class: styles.iconCrimpagem },
  gerador: { icon: <Zap size={24} />, class: styles.iconGerador },
  torno: { icon: <Wrench size={24} />, class: styles.iconTorno },
  retifica: { icon: <Hammer size={24} />, class: styles.iconRetifica },
};

const CadastroMaquinas: React.FC = () => {
  const [nomeMaquina, setNomeMaquina] = useState('');
  const [idDaMaquina, setIdDaMaquina] = useState('');
  const [oficina, setOficina] = useState('');
  const [conjuntos, setConjuntos] = useState('');

  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const { maquinas, loading, error, cadastrarMaquina, atualizarMaquina, excluirMaquina } = useMaquinas();

  const handleCadastro = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!nomeMaquina || !idDaMaquina || !oficina) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const data = {
        nome: nomeMaquina,
        idMaquina: idDaMaquina,
        oficina,
        conjuntos: conjuntos || undefined,
      };

      if (editingId) {
        await atualizarMaquina(editingId, data);
      } else {
        await cadastrarMaquina(data);
      }

      setNomeMaquina('');
      setIdDaMaquina('');
      setOficina('');
      setConjuntos('');
      setEditingId(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao salvar a máquina');
    }
  };

  const startEdit = (maquina: Maquina) => {
    setEditingId(maquina.id);
    setNomeMaquina(maquina.nome);
    setIdDaMaquina(maquina.idMaquina);
    setOficina(maquina.oficina);
    setConjuntos(maquina.conjuntos || '');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setNomeMaquina('');
    setIdDaMaquina('');
    setOficina('');
    setConjuntos('');
  };

  const confirmDelete = async (id: string) => {
    try {
      await excluirMaquina(id);
      setDeleteConfirmId(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Erro ao excluir a máquina');
    }
  };

  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>Cadastrar Máquinas</h1>
        <div className={styles.headerIcons}>
          <Bell size={28} className={styles.icon} />
          <UserCircle size={28} className={styles.icon} />
        </div>
      </header>

      <main className={styles.mainContent}>
        <div className={styles.panel}>
          <p className={styles.formTitle}>Informe os dados para liberar o cadastro:</p>
          <form onSubmit={handleCadastro}>
            <div className={styles.formGroup}>
              <label htmlFor="nome-maquina">Nome da Máquina</label>
              <input
                id="nome-maquina"
                type="text"
                className={styles.input}
                placeholder="Nome da Máquina"
                value={nomeMaquina}
                onChange={(e) => setNomeMaquina(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="id-maquina">ID da Máquina</label>
              <input
                id="id-maquina"
                type="text"
                className={styles.input}
                placeholder="ID da Máquina"
                value={idDaMaquina}
                onChange={(e) => setIdDaMaquina(e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="oficina">Oficina</label>
              <select
                id="oficina"
                className={styles.select}
                value={oficina}
                onChange={(e) => setOficina(e.target.value)}
              >
                <option value="" disabled>
                  Selecionar
                </option>
                <option value="mecanica">Oficina Mecânica</option>
                <option value="hidraulica">Oficina Hidráulica</option>
                <option value="eletrica">Oficina Elétrica</option>
                <option value="treinamento">Oficina de Treinamento</option>
                <option value="manutencao">Oficina Manutenção</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="conjuntos">Conjuntos</label>
              <input
                id="conjuntos"
                type="text"
                className={styles.input}
                placeholder="Nome do Conjunto"
                value={conjuntos}
                onChange={(e) => setConjuntos(e.target.value)}
              />
            </div>

            <div className={styles.buttonGroup}>
              {editingId && (
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={cancelEdit}
                >
                  Cancelar
                </button>
              )}
              <button type="submit" className={styles.submitButton}>
                {editingId ? 'Salvar Alterações' : 'Cadastrar Máquina'}
              </button>
            </div>
          </form>
        </div>

        <div className={styles.panel}>
          <div className={styles.listHeader}>
            <h2 className={styles.listTitle}>Máquinas cadastradas</h2>
            <button className={styles.seeMoreButton} onClick={() => alert('Ver mais máquinas')}>
              Ver mais
            </button>
          </div>

          {error && (
            <div className={styles.errorState}>
              <AlertTriangle size={32} className={styles.errorIcon} />
              <p>{error}</p>
            </div>
          )}

          {loading && (
            <div className={styles.loadingState}>
              <Loader2 size={32} className={styles.spinIcon} />
              <p>Carregando...</p>
            </div>
          )}

          {!loading && !error && (
            <div className={styles.machineList}>
              {maquinas.map((maquina) => (
                <div key={maquina.id} className={styles.machineItem}>
                  <div className={`${styles.machineIcon} ${iconMap[maquina.oficina.toLowerCase()]?.class || styles.iconGerador}`}>
                    {iconMap[maquina.oficina.toLowerCase()]?.icon || <Wrench size={24} />}
                  </div>
                  <div className={styles.machineDetails}>
                    <div className={styles.machineName}>{maquina.nome}</div>
                    <div className={styles.machineId}>ID: {maquina.idMaquina}</div>
                  </div>
                  <div className={styles.machineOficina}>{maquina.oficina}</div>
                  <div className={styles.actionIcons}>
                    <button
                      className={styles.actionButton}
                      aria-label={`Editar ${maquina.nome}`}
                      onClick={() => startEdit(maquina)}
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      className={styles.actionButton}
                      aria-label={`Excluir ${maquina.nome}`}
                      onClick={() => setDeleteConfirmId(maquina.id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal de Confirmação de Exclusão */}
          {deleteConfirmId && (
            <div className={styles.modalBackdrop}>
              <div className={styles.modal}>
                <h3>Confirmar Exclusão</h3>
                <p>Tem certeza que deseja excluir esta máquina?</p>
                <div className={styles.modalActions}>
                  <button
                    className={styles.cancelButton}
                    onClick={() => setDeleteConfirmId(null)}
                  >
                    Cancelar
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => confirmDelete(deleteConfirmId)}
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default CadastroMaquinas;