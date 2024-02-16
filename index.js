import { createServer } from 'http';
import config from './config.json' assert { type: "json"};

/** Hosted port number */
const PORT = config.port;

// Create a server object
const server = createServer((req, res) => {
  // Set the response HTTP header with HTTP status and Content type
  res.writeHead(200, {'Content-Type': 'application/json'});

  // Routing
  if (req.url === '/inventory' && req.method === 'GET') {
    // Return the inventory as JSON
    res.end(JSON.stringify(config.inventory));
  } else if (req.url === '/inventory/add' && req.method === 'POST') {
    let body = '';

    // Collect data from the request
    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    // When data is fully collected
    req.on('end', () => {
      // Parse the JSON data
      const newItem = JSON.parse(body);

      // Add the new item to the inventory
      inventory[newItem.id] = { name: newItem.name, quantity: newItem.quantity };

      // Send a success response
      res.end(JSON.stringify({ message: 'Item added successfully' }));
    });
  } else {
    // Handle 404 - Not Found
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('404 Not Found');
  }
});

// Start the server on the specified port
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
