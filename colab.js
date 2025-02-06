const AIModelHandler = require("./core.js");
const fs = require("fs");
const path = require("path");

const chat = new AIModelHandler();

function extractJavaScript(markdownText) {
  const jsRegex = /```(?:js|javascript)\n([\s\S]*?)```/g;
  let match,
    extractedCode = "";

  while ((match = jsRegex.exec(markdownText)) !== null) {
    extractedCode += match[1] + "\n";
  }

  return extractedCode.trim();
}

const getResponses = async (prompt) => {
  for (let i = 1; i <= 5; i++) {
    try {
      const response = await chat.ask(prompt);
      const responseContent = response.choices[0].message.content;

      const filePath = path.join(`response-${i}.js`);
      fs.writeFileSync(filePath, extractJavaScript(responseContent), "utf-8");
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  }

  console.log("Responses saved in the current root folder.");
};

const prompt = `Implement a js function dijkstraShortestPath(graph, start, end) that will take a weighted directed graph represented by an adjacency list instead of a matrix and finds the shortest path from a given start node to an end node using Dijkstra algorithm. Each node is represented by a key and the corresponding value is an object of neighboring nodes with their edge weights. If no path exists from start to end, return -1 and if the input is invalid like non numeric values, incorrect start end nodes), return "Invalid input". return distance: distances[end], path: path. give complete function implementation without example usage and do module.exports in end`;

getResponses(prompt);
