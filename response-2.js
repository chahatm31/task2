function dijkstraShortestPath(graph, start, end) {
    // Validate input
    if (typeof start !== 'string' || typeof end !== 'string') {
        return "Invalid input";
    }
    if (!graph[start] || !graph[end]) {
        return "Invalid input";
    }

    const distances = {};
    const previousNodes = {};
    const visited = new Set();
    const priorityQueue = [];

    // Initialize all distances as infinity and distance of start node as 0
    for (const node in graph) {
        distances[node] = Infinity;
        previousNodes[node] = null;
    }
    distances[start] = 0;
    priorityQueue.push([start, 0]);

    while (priorityQueue.length > 0) {
        // Dequeue the node with the smallest distance
        priorityQueue.sort((a, b) => a[1] - b[1]);
        const [currentNode, currentDistance] = priorityQueue.shift();

        if (currentNode === end) {
            // Build the path from start to end
            const path = [];
            let step = end;
            while (step !== null) {
                path.unshift(step);
                step = previousNodes[step];
            }
            return { distance: distances[end], path };
        }

        if (!visited.has(currentNode)) {
            visited.add(currentNode);

            for (const neighbor in graph[currentNode]) {
                const weight = graph[currentNode][neighbor];
                const totalDistance = currentDistance + weight;

                if (totalDistance < distances[neighbor]) {
                    distances[neighbor] = totalDistance;
                    previousNodes[neighbor] = currentNode;
                    priorityQueue.push([neighbor, totalDistance]);
                }
            }
        }
    }

    return -1; // Return -1 if no path is found
}

module.exports = dijkstraShortestPath;