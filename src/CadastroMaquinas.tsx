import React, { useState } from 'react';
import styles from './CadastroMaquinas.module.css';
import { Wrench, Hammer, Zap, Bell, UserCircle, Pencil, Trash2 } from 'lucide-react';

interface Maquina {
  id: number;
  nome: string;
  idMaquina: string;
  oficina: string;
  icone: React.ReactElement;
  iconClass: string;
}

const maquinasCadastradas: Maquina[] = [
  {
    id: 1,
    nome: 'Quinadora',
    idMaquina: '123456',
    oficina: 'Oficina Mecânica',
    icone: <Wrench size={32} />,
    iconClass: styles.iconQuinadora,
  },
  {
    id: 2,
    nome: 'Crimpagem',
    idMaquina: '123456',
    oficina: 'Oficina Hidráulica',
    icone: <Hammer size={32} />,
    iconClass: styles.iconCrimpagem,
  },
  {
    id: 3,
    nome: 'Gerador',
    idMaquina: '123456',
    oficina: 'Oficina Elétrica',
    icone: <Zap size={32} />,
    iconClass: styles.iconGerador,
  },
  {
    id: 4,
    nome: 'Torno mini',
    idMaquina: '123456',
    oficina: 'Oficina de Treinamento',
    icone: <Wrench size={32} />,
    iconClass: styles.iconTorno,
  },
  {
    id: 5,
    nome: 'Retífica',
    idMaquina: '123456',
    oficina: 'Oficina Manutenção',
    icone: <Wrench size={32} />,
    iconClass: styles.iconRetifica,
  },
];

const CadastroMaquinas: React.FC = () => {
  const [nomeMaquina, setNomeMaquina] = useState('');
  const [idDaMaquina, setIdDaMaquina] = useState('');
  const [oficina, setOficina] = useState('');
  const [conjuntos, setConjuntos] = useState('');

  const handleCadastro = (event: React.FormEvent) => {
    event.preventDefault();

    if (!nomeMaquina || !idDaMaquina || !oficina) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    console.log('Cadastrando máquina:', {
      nome: nomeMaquina,
      id: idDaMaquina,
      oficina,
      conjuntos,
    });

    alert(`Máquina "${nomeMaquina}" cadastrada com sucesso!`);

    setNomeMaquina('');
    setIdDaMaquina('');
    setOficina('');
    setConjuntos('');
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

            <button type="submit" className={styles.submitButton}>
              Cadastrar Máquina
            </button>
          </form>
        </div>

        <div className={styles.panel}>
          <div className={styles.listHeader}>
            <h2 className={styles.listTitle}>Máquinas cadastradas</h2>
            <button className={styles.seeMoreButton} onClick={() => alert('Ver mais máquinas')}>
              Ver mais
            </button>
          </div>

          <div className={styles.machineList}>
            {maquinasCadastradas.map((maquina) => (
              <div key={maquina.id} className={styles.machineItem}>
                <div className={`${styles.machineIcon} ${maquina.iconClass}`}>
                  {maquina.icone}
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
                    onClick={() => alert(`Editar máquina: ${maquina.nome}`)}
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    className={styles.actionButton}
                    aria-label={`Excluir ${maquina.nome}`}
                    onClick={() => alert(`Excluir máquina: ${maquina.nome}?`)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CadastroMaquinas;