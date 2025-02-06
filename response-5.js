function dijkstraShortestPath(graph, start, end) {
  if (
    typeof graph !== "object" ||
    graph === null ||
    typeof start !== "string" ||
    typeof end !== "string"
  ) {
    return "Invalid input";
  }

  if (!graph.hasOwnProperty(start) || !graph.hasOwnProperty(end)) {
    return "Invalid input";
  }

  const distances = {};
  const previous = {};
  const queue = new Set();

  // Initialize distances and queue
  for (let node in graph) {
    if (!graph.hasOwnProperty(node) || typeof node !== "string") {
      return "Invalid input";
    }

    distances[node] = node === start ? 0 : Infinity;
    previous[node] = null;
    queue.add(node);
  }

  while (queue.size > 0) {
    let currentNode = null;
    let smallestDistance = Infinity;

    // Find the node with the smallest distance
    for (let node of queue) {
      if (distances[node] < smallestDistance) {
        smallestDistance = distances[node];
        currentNode = node;
      }
    }

    // If smallestDistance is Infinity, remaining nodes are unreachable
    if (smallestDistance === Infinity || currentNode === null) {
      break;
    }

    queue.delete(currentNode);

    if (currentNode === end) {
      break;
    }

    // Update distances for neighbours
    for (let neighbor in graph[currentNode]) {
      if (
        !graph[currentNode].hasOwnProperty(neighbor) ||
        typeof graph[currentNode][neighbor] !== "number"
      ) {
        return "Invalid input";
      }

      let weight = graph[currentNode][neighbor];
      let alt = distances[currentNode] + weight;

      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = currentNode;
      }
    }
  }

  // If the end node is still Infinity, there's no path
  if (distances[end] === Infinity) {
    return -1;
  }

  // Reconstruct the shortest path
  let path = [];
  let current = end;
  while (previous[current] !== null) {
    path.unshift(current);
    current = previous[current];
  }

  if (start === end || path.length) {
    path.unshift(start);
  }

  return { distance: distances[end], path: path };
}

module.exports = dijkstraShortestPath;
