export const fetchData = async () => {
    try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        const data = await response.json();
        console.log('Fetched Data:', data); // Log the data to inspect the structure
        
        const tickets = data.tickets || [];
        const users = data.users || [];

        // Create a map of user IDs to user names
        const userMap = users.reduce((acc, user) => {
            acc[user.id] = user.name;
            return acc;
        }, {});

        // Add user names to tickets
        const ticketsWithUserNames = tickets.map(ticket => ({
            ...ticket,
            userName: userMap[ticket.userId] || 'Unknown'
        }));

        return ticketsWithUserNames;
    } catch (error) {
        console.error('Error fetching data:', error);
        return [];
    }
};
