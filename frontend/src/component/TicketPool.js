class TicketPool {
    constructor(initialTickets) {
        this.availableTickets = initialTickets; // Initialize available tickets
    }

    // Method to add tickets
    addTickets(tickets) {
        this.availableTickets += tickets; // Add tickets to the pool
        console.log(`${tickets} tickets added. Available tickets: ${this.availableTickets}`);
    }

    // Method to get the current number of available tickets
    getAvailableTickets() {
        return this.availableTickets;
    }
}

export default TicketPool;