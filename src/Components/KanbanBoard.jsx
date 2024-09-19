import React, { useState, useEffect } from 'react';
import { fetchData } from '../Services/api'; 
import KanbanColumn from './KanbanColumn';
import './KanbanBoard.css';
import display from '../icons_FEtask/Display.svg';
import down from '../icons_FEtask/down.svg';

const priorityLabels = ['No priority', 'Low', 'Medium', 'High', 'Urgent'];
const statusLabels = {
    'Backlog': 'Backlog',
    'Todo': 'Todo',
    'In Progress': 'In Progress',
    'Done': 'Done',
    'Cancelled': 'Cancelled'
};
const allStatuses = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];

const KanbanBoard = () => {
    const [tickets, setTickets] = useState([]);
    const [groupBy, setGroupBy] = useState('status');
    const [sortBy, setSortBy] = useState('priority');
    const [showOptions, setShowOptions] = useState(false);

    useEffect(() => {
        const getTickets = async () => {
            const data = await fetchData();
            setTickets(Array.isArray(data) ? data : []);
        };
        getTickets();
    }, []);

    useEffect(() => {
        const savedGroupBy = localStorage.getItem('groupBy');
        const savedSortBy = localStorage.getItem('sortBy');
        if (savedGroupBy) setGroupBy(savedGroupBy);
        if (savedSortBy) setSortBy(savedSortBy);
    }, []);

    useEffect(() => {
        localStorage.setItem('groupBy', groupBy);
        localStorage.setItem('sortBy', sortBy);
    }, [groupBy, sortBy]);

    const groupTickets = () => {
        const groups = {};
        if (groupBy === 'status') {
            allStatuses.forEach(status => {
                groups[status] = [];
            });
        }

        tickets.forEach(ticket => {
            const key = groupBy === 'priority'
                ? priorityLabels[ticket.priority]
                : groupBy === 'status'
                ? statusLabels[ticket.status] || ticket.status
                : groupBy === 'user'
                ? ticket.userName
                : ticket[groupBy];

            if (!groups[key]) {
                groups[key] = [];
            }
            groups[key].push(ticket);
        });

        return groups;
    };

    const sortTickets = (group) => {
        return group.sort((a, b) => {
            if (sortBy === 'priority') {
                return b.priority - a.priority;
            } else {
                return a.title.localeCompare(b.title);
            }
        });
    };

    const groupedTickets = groupTickets();

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    return (
        <div className="kanban-board">
            <div className="controls">
                <button onClick={toggleOptions} className="display-button">
                    <img 
                        src={display} 
                        alt="Add" 
                        className="more-options-icon" 
                    />
                    Display
                    <img 
                        src={down} 
                        alt="Add" 
                        className="more-options-icon" 
                    />
                </button>
                {showOptions && (
                    <div className="options-menu">
                        <div className="option-group">
                            <label>Grouping </label>
                            <select onChange={(e) => setGroupBy(e.target.value)} value={groupBy}>
                                <option value="status">Status</option>
                                <option value="user">User</option>
                                <option value="priority">Priority</option>
                            </select>
                        </div>
                        <div className="option-sort">
                            <label>Sorting  </label>
                            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                                <option value="priority">Priority</option>
                                <option value="title">Title</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>
            <div className="columns">
                {groupBy === 'status'
                    ? allStatuses.map(status => (
                        <KanbanColumn
                            key={status}
                            title={status}
                            tickets={sortTickets(groupedTickets[status] || [])}
                            groupBy={groupBy}  // Pass the groupBy prop
                        />
                    ))
                    : Object.keys(groupedTickets).map(groupKey => (
                        <KanbanColumn
                            key={groupKey}
                            title={groupKey}
                            tickets={sortTickets(groupedTickets[groupKey])}
                            groupBy={groupBy}  // Pass the groupBy prop
                        />
                    ))
                }
            </div>
        </div>
    );
};

export default KanbanBoard;
