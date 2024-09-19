import React from 'react';
import './KanbanCard.css';

// Import icons
import urgentIcon from '../icons_FEtask/Cancelled.svg';
import highIcon from '../icons_FEtask/Done.svg';
import mediumIcon from '../icons_FEtask/in-progress.svg';
import lowIcon from '../icons_FEtask/To-do.svg';
import noPriorityIcon from '../icons_FEtask/Backlog.svg';
import threedot from '../icons_FEtask/3 dot menu.svg';

const statusIconMap = {
    "Cancelled" : urgentIcon,  // Urgent
    "Done": highIcon,    // High
    "In progress": mediumIcon,  // Medium
    "Todo": lowIcon,     // Low
    "Backlog": noPriorityIcon,  // No priority
};

const KanbanCard = ({ ticket }) => {
    const { id, title, status, tag, userName } = ticket;

    const priorityLabels = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];

    // Get the first letter of the userName
    const userInitial = userName ? userName.charAt(0).toUpperCase() : '';

    return (
        <div className="kanban-card">
            <div className="card-header">
                <span className="ticket-id">{id}</span>
                <div className="user-label">
                    {/* Display the user's first letter */}
                    <div className="user-initial">{userInitial}</div>
                </div>
            </div>
            <div className="title-priority-container">
                {statusIconMap[status] && (
                    <img 
                        src={statusIconMap[status]} 
                        alt={priorityLabels[status]} 
                        className="priority-icon" 
                    />
                )}
                <h3 className="ticket-title">{title}</h3>
                {/* Dynamically show the priority icon next to the title */}
                
            </div>
            <div className="card-footer">
                <img 
                    src={threedot} 
                    alt="More options" 
                    className="more-options-icon" 
                />
                <span className="ticket-tag">{tag[0]}</span>
            </div>
        </div>
    );
};

export default KanbanCard;
