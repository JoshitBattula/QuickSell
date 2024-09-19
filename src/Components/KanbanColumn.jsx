import React from 'react';
import KanbanCard from './KanbanCard';
import './KanbanColumn.css';
import threedot from '../icons_FEtask/3 dot menu.svg';
import add from '../icons_FEtask/add.svg';

// Import icons for status and priority
import urgentIcon from '../icons_FEtask/Cancelled.svg';
import highIcon from '../icons_FEtask/Done.svg';
import mediumIcon from '../icons_FEtask/in-progress.svg';
import lowIcon from '../icons_FEtask/To-do.svg';
import noPriorityIcon from '../icons_FEtask/Backlog.svg';
import urgent from '../icons_FEtask/SVG - Urgent Priority grey.svg';
import high from '../icons_FEtask/Img - High Priority.svg';
import medium from '../icons_FEtask/Img - Medium Priority.svg';
import low from '../icons_FEtask/Img - Low Priority.svg';
import noPriority from '../icons_FEtask/No-priority.svg';
const statusIconMap = {
    "Cancelled" : urgentIcon,
    "Done": highIcon,
    "In progress": mediumIcon,
    "Todo": lowIcon,
    "Backlog": noPriorityIcon,
};

const priorityIconMap = {
    0: noPriority,
    1: low,
    2: medium,
    3: high,
    4: urgent,
};

const KanbanColumn = ({ title, tickets, groupBy }) => {
    console.log("Rendering KanbanColumn:", { title, tickets, groupBy });

    return (
        <div className="kanban-column">
            <div className="column-header">
                <div className="column-header-content">
                    {groupBy === 'user' && tickets.length > 0 && (
                        <div className="user-initial">
                            {tickets[0].userName ? tickets[0].userName.charAt(0).toUpperCase() : ''}
                        </div>
                    )}
                    {groupBy === 'status' && (
                        <img
                            src={statusIconMap[title]}
                            alt={title}
                            className="status-icon"
                        />
                    )}
                    {groupBy === 'priority' && (
                        <img
                            src={priorityIconMap[tickets[0].priority]}
                            alt={`Priority ${tickets[0].priority}`}
                            className="priority-icon"
                        />
                    )}
                    <h2 className="column-title">{title}</h2>
                </div>
                <div className="column-icons">
                    <img 
                        src={threedot} 
                        alt="More options" 
                        className="more-options-icon" 
                    />
                    <img 
                        src={add} 
                        alt="Add" 
                        className="more-options-icon" 
                    />
                </div>
            </div>
            {tickets.map(ticket => (
                <KanbanCard key={ticket.id} ticket={ticket} />
            ))}
        </div>
    );
};

export default KanbanColumn;
