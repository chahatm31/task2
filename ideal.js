function dijkstraShortestPath(graph, start, end) {
  // Input validation
  if (!graph || typeof graph !== "object" || !start || !end) {
    return "Invalid input";
  }

  // Check if start and end nodes exist in graph
  if (!(start in graph) || !(end in graph)) {
    return "Invalid input";
  }

  // Validate edge weights
  for (let node in graph) {
    for (let neighbor in graph[node]) {
      if (
        typeof graph[node][neighbor] !== "number" ||
        graph[node][neighbor] < 0
      ) {
        return "Invalid input";
      }
    }
  }

  // Initialize distances and previous nodes
  const distances = {};
  const previous = {};
  const unvisited = new Set();

  // Set initial distances to Infinity for all nodes except start
  for (let node in graph) {
    distances[node] = Infinity;
    previous[node] = null;
    unvisited.add(node);
  }
  distances[start] = 0;

  while (unvisited.size > 0) {
    // Find unvisited node with minimum distance
    let minDistance = Infinity;
    let current = null;

    for (let node of unvisited) {
      if (distances[node] < minDistance) {
        minDistance = distances[node];
        current = node;
      }
    }

    // If no reachable nodes remain or we've reached the end, break
    if (current === null || current === end) {
      break;
    }

    unvisited.delete(current);

    // Update distances to neighboring nodes
    for (let neighbor in graph[current]) {
      if (unvisited.has(neighbor)) {
        const newDistance = distances[current] + graph[current][neighbor];

        if (newDistance < distances[neighbor]) {
          distances[neighbor] = newDistance;
          previous[neighbor] = current;
        }
      }
    }
  }

  // If end node is unreachable
  if (distances[end] === Infinity) {
    return -1;
  }

  // Reconstruct the shortest path
  const path = [];
  let current = end;

  while (current !== null) {
    path.unshift(current);
    current = previous[current];
  }

  return {
    distance: distances[end],
    path: path,
  };
}

describe("dijkstraShortestPath", () => {
  test("should find the shortest path in a simple graph", () => {
    const graph = {
      A: { B: 4, C: 2 },
      B: { D: 3 },
      C: { B: 1, D: 5 },
      D: {},
    };
    expect(dijkstraShortestPath(graph, "A", "D")).toEqual({
      distance: 6,
      path: ["A", "C", "B", "D"],
    });
  });

  test("should handle graph with multiple possible paths", () => {
    const graph = {
      A: { B: 4, C: 2 },
      B: { C: 1, D: 5 },
      C: { D: 8, E: 10 },
      D: { E: 2 },
      E: {},
    };
    expect(dijkstraShortestPath(graph, "A", "E")).toEqual({
      distance: 11,
      path: ["A", "B", "D", "E"],
    });
  });

  test("should return -1 when no path exists", () => {
    const graph = {
      A: { B: 4 },
      B: { C: 3 },
      C: {},
      D: { E: 2 },
      E: {},
    };
    expect(dijkstraShortestPath(graph, "A", "E")).toBe(-1);
  });

  test("should handle graph with single node", () => {
    const graph = {
      A: {},
    };
    expect(dijkstraShortestPath(graph, "A", "A")).toEqual({
      distance: 0,
      path: ["A"],
    });
  });

  test("should handle direct path between nodes", () => {
    const graph = {
      A: { B: 5 },
      B: {},
    };
    expect(dijkstraShortestPath(graph, "A", "B")).toEqual({
      distance: 5,
      path: ["A", "B"],
    });
  });

  test('should return "Invalid input" for undefined graph', () => {
    expect(dijkstraShortestPath(undefined, "A", "B")).toBe("Invalid input");
  });

  test('should return "Invalid input" for non-object graph', () => {
    expect(dijkstraShortestPath("not a graph", "A", "B")).toBe("Invalid input");
  });

  test('should return "Invalid input" for missing start node', () => {
    const graph = {
      A: { B: 4 },
      B: {},
    };
    expect(dijkstraShortestPath(graph, "C", "B")).toBe("Invalid input");
  });

  test('should return "Invalid input" for missing end node', () => {
    const graph = {
      A: { B: 4 },
      B: {},
    };
    expect(dijkstraShortestPath(graph, "A", "C")).toBe("Invalid input");
  });

  test('should return "Invalid input" for negative edge weights', () => {
    const graph = {
      A: { B: -4 },
      B: {},
    };
    expect(dijkstraShortestPath(graph, "A", "B")).toBe("Invalid input");
  });

  test('should return "Invalid input" for non-numeric edge weights', () => {
    const graph = {
      A: { B: "4" },
      B: {},
    };
    expect(dijkstraShortestPath(graph, "A", "B")).toBe("Invalid input");
  });

  test("should handle graph with cycle", () => {
    const graph = {
      A: { B: 1 },
      B: { C: 2, A: 1 },
      C: { B: 2 },
    };
    expect(dijkstraShortestPath(graph, "A", "C")).toEqual({
      distance: 3,
      path: ["A", "B", "C"],
    });
  });

  test("should handle complex graph with multiple cycles", () => {
    const graph = {
      A: { B: 4, C: 2 },
      B: { A: 4, C: 1, D: 5 },
      C: { A: 2, B: 1, D: 8, E: 10 },
      D: { B: 5, C: 8, E: 2 },
      E: { C: 10, D: 2 },
    };
    expect(dijkstraShortestPath(graph, "A", "E")).toEqual({
      distance: 10,
      path: ["A", "C", "B", "D", "E"],
    });
  });
});
