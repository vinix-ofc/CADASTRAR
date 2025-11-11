import { PanelLeft, User } from "lucide-react";
import './SideBar.css';

interface HeaderProps {
    toggleSidebar: () => void;
    isExpanded?: boolean;
}

export default function Header({ toggleSidebar, isExpanded }: HeaderProps) {
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px' }}>
                <div 
                    style={{ 
                        cursor: 'pointer',
                        padding: '8px',
                        marginLeft: '10px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }} 
                    onClick={toggleSidebar}
                >
                    <PanelLeft 
                        color="#A50702" 
                        size={24}
                        style={{ 
                            transform: isExpanded ? 'rotate(0deg)' : 'rotate(180deg)',
                            transition: 'transform 0.3s ease-in-out'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', gap: '2.5em', alignItems: 'center' }}>
                    <div style={{ cursor: 'pointer' }}>
                        {/* <Notificacao /> */}
                    </div>

                    <div className="userIconHeader" style={{ cursor: 'default' }}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                            <User color="#fff" strokeWidth={1.5} />
                        </div>
                    </div>
                </div>
            </div>
            <hr color="#C5C5C5" style={{ width: '100%' }} />
        </>
    );
}