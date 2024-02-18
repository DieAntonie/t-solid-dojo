/**
 * Inventory Manager. 
 */
export class InventoryManager {
    /**
     * Inventory Manager. 
     * @param {Request} request Incoming Server Request
     * @param {Response} response Returning Server Response
     */
    serverOptions = (request, response) => {
        switch (request.method) {
            case "GET":
                this.getHandler(request, response);
                break;
            case "POST":
                this.postHandler(request, response);
                break;
            default:
                this.methodNotAllowedHandler(request, response);
                break;
        }
    };

    getHandler = (request, response) => {
        response.end(JSON.stringify(config.inventory));
    }
    
    postHandler = (request, response) => {
        let body = '';
    
        // Collect data from the request
        request.on('data', (chunk) => {
            body += chunk.toString();
        });
    
        // When data is fully collected
        request.on('end', () => {
            // Parse the JSON data
            const newItem = JSON.parse(body);
    
            // Add the new item to the inventory
            inventory[newItem.id] = { name: newItem.name, quantity: newItem.quantity };
    
            // Send a success response
            response.end(JSON.stringify({ message: 'Item added successfully' }));
        });
    }
    
    methodNotAllowedHandler = (request, response) => {
        response.writeHead(405, { 'Content-Type': 'text/plain' });
        response.end('405 Method Not Allowed');
    }
}

