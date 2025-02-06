function dijkstraShortestPath(graph, start, end) {
  if (
    typeof graph !== "object" ||
    typeof start !== "string" ||
    typeof end !== "string"
  ) {
    return "Invalid input";
  }

  const distances = {};
  const previousNodes = {};
  const unvisitedNodes = new Set(Object.keys(graph));

  // Initialize all distances to infinity and previous nodes to null
  for (let node in graph) {
    distances[node] = Infinity;
    previousNodes[node] = null;
  }

  // Distance from the start node to itself is 0
  distances[start] = 0;

  while (unvisitedNodes.size > 0) {
    let currentNode = null;

    // Find the unvisited node with the smallest distance
    unvisitedNodes.forEach((node) => {
      if (currentNode === null || distances[node] < distances[currentNode]) {
        currentNode = node;
      }
    });

    // If the smallest distance among the unvisited nodes is infinity, we're done
    if (distances[currentNode] === Infinity) {
      break;
    }

    // Remove the current node from the unvisited set
    unvisitedNodes.delete(currentNode);

    // If we've reached the end node, build up the path to return
    if (currentNode === end) {
      const path = [];
      while (previousNodes[currentNode] !== null) {
        path.unshift(currentNode);
        currentNode = previousNodes[currentNode];
      }
      path.unshift(start);

      return {
        distance: distances[end],
        path: path,
      };
    }

    // Update distances for neighboring nodes
    const neighbors = graph[currentNode];
    for (let neighbor in neighbors) {
      if (!unvisitedNodes.has(neighbor)) continue;

      const tentativeDistance = distances[currentNode] + neighbors[neighbor];

      if (tentativeDistance < distances[neighbor]) {
        distances[neighbor] = tentativeDistance;
        previousNodes[neighbor] = currentNode;
      }
    }
  }

  // If there's no path from start to end
  return distances[end] === Infinity
    ? -1
    : {
        distance: distances[end],
        path: null,
      };
}

module.exports = dijkstraShortestPath;
