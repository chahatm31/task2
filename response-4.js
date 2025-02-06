function dijkstraShortestPath(graph, start, end) {
  // Validate input types and check if start and end nodes are valid in the graph
  if (typeof graph !== 'object' || typeof start !== 'string' || typeof end !== 'string' || !graph[start] || !graph[end]) {
    return "Invalid input";
  }

  const distances = {};
  const previousNodes = {};
  const unvisitedNodes = new Set();

  // Initialize distances and previousNodes, and populate the set of unvisited nodes
  for (const node in graph) {
    if (graph.hasOwnProperty(node)) {
      distances[node] = Infinity;
      previousNodes[node] = null;
      unvisitedNodes.add(node);
    }
  }
  distances[start] = 0;

  while (unvisitedNodes.size > 0) {
    // Get the unvisited node with the smallest distance
    let closestNode = null;
    for (const node of unvisitedNodes) {
      if (closestNode === null || distances[node] < distances[closestNode]) {
        closestNode = node;
      }
    }

    // If closestNode is the end node or its distance is infinity, stop
    if (closestNode === end || distances[closestNode] === Infinity) {
      break;
    }

    // Remove the closest node from the set of unvisited nodes
    unvisitedNodes.delete(closestNode);

    // Update distances for neighboring nodes
    for (const neighbor in graph[closestNode]) {
      if (graph[closestNode].hasOwnProperty(neighbor)) {
        const actualDistance = distances[closestNode] + graph[closestNode][neighbor];
        
        if (actualDistance < distances[neighbor]) {
          distances[neighbor] = actualDistance;
          previousNodes[neighbor] = closestNode;
        }
      }
    }
  }

  // If the end node is still infinity, return -1 as no path exists
  if (distances[end] === Infinity) {
    return -1;
  }

  // Reconstruct the shortest path
  const path = [];
  for (let at = end; at !== null; at = previousNodes[at]) {
    path.unshift(at);
  }

  return {
    distance: distances[end],
    path: path,
  };
}

// Export the module
module.exports = dijkstraShortestPath;