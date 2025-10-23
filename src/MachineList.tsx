import React from 'react';
import machineStyles from './CadastroMaquinas.module.css';
import { Pencil, Trash2 } from 'lucide-react';

interface Maquina {
  id: number;
  nome: string;
  idMaquina: string;
  oficina: string;
  icone: React.ReactElement;
  iconClass?: string;
}

interface MachineListProps {
  maquinas: Maquina[];
}

export const MachineList: React.FC<MachineListProps> = ({ maquinas }) => {
  return (
    <div className={machineStyles.machineList}>
      {maquinas.map((maquina) => (
        <div key={maquina.id} className={machineStyles.machineItem}>
          
          {/* Machine Icon */}
          <div className={`${machineStyles.machineIcon} ${maquina.iconClass}`}>
            {maquina.icone}
          </div>

          
          <div className={machineStyles.machineDetails}>
            <div className={machineStyles.machineName}>{maquina.nome}</div>
            <div className={machineStyles.machineId}>ID: {maquina.idMaquina}</div>
          </div>

         
          <div className={machineStyles.machineOficina}>{maquina.oficina}</div>

      
          <div className={machineStyles.actionIcons}>
            <button className={machineStyles.actionButton} aria-label="Editar">
              <Pencil size={16} />
            </button>
            <button className={machineStyles.actionButton} aria-label="Excluir">
              <Trash2 size={16} />
            </button>
          </div>

        </div>
      ))}
    </div> )}
