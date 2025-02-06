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

const prompt = `implement a js function findMaxSubarraySum(arr) that will return the maximum sum of any subarray means a contiguous portion of the array in the given array of integers. subarray may contain both positive and negative numbers and it should also return the start and end indices of this subarray. If there are multiple subarrays with the same maximum sum, return the one that starts first. also the function should handle edge cases where input array contains negative values only. input array is empty and input array contains only one element. give complete function implementation without example usage and do module.exports in end`;

getResponses(prompt);
