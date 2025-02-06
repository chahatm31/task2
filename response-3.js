function dijkstraShortestPath(graph, start, end) {
    // Validation for the input graph, start, and end nodes
    if (typeof graph !== 'object' || graph === null || Array.isArray(graph)) {
        return "Invalid input";
    }
    if (!graph.hasOwnProperty(start) || !graph.hasOwnProperty(end)) {
        return "Invalid input";
    }

    // Initialize distances and predecessors
    const distances = {};
    const predecessors = {};
    const visited = new Set();

    // Initialize distances to infinity and predecessor to null
    for (let node in graph) {
        distances[node] = Infinity;
        predecessors[node] = null;
    }
    distances[start] = 0;

    const priorityQueue = new Set(Object.keys(graph));

    while (priorityQueue.size > 0) {
        // Find the node with the smallest distance
        let minNode = null;
        for (let node of priorityQueue) {
            if (minNode === null || distances[node] < distances[minNode]) {
                minNode = node;
            }
        }

        // If the smallest distance is infinity, the remaining nodes are unreachable
        if (distances[minNode] === Infinity) break;

        priorityQueue.delete(minNode);
        visited.add(minNode);

        // Calculate the distance to the neighboring nodes
        for (let neighbor in graph[minNode]) {
            const weight = graph[minNode][neighbor];
            if (typeof weight !== 'number') {
                return "Invalid input";
            }
            
            const newDist = distances[minNode] + weight;
            if (newDist < distances[neighbor]) {
                distances[neighbor] = newDist;
                predecessors[neighbor] = minNode;
            }
        }
    }

    // Construct the shortest path
    const path = [];
    let currentNode = end;
    while (currentNode !== null) {
        path.unshift(currentNode);
        currentNode = predecessors[currentNode];
    }

    if (distances[end] === Infinity) {
        return -1; // No path exists
    }

    return {
        distance: distances[end],
        path: path.length ? path : null
    };
}

module.exports = dijkstraShortestPath;