const url = "https://2000-01hzkq91ad81aw7qbwnsgv5z49.cloudspaces.litng.ai/";
const duration = 10000; // Test duration in milliseconds
const concurrency = 1000; // Number of concurrent requests

let requestsSent = 0;
let responsesReceived = 0;

async function sendRequest() {
  requestsSent++;
  try {
    const response = await fetch(url);
    await response.text(); // Consume the body
    responsesReceived++;
  } catch (error) {
    console.error("Error:", error);
  }
}

const startTime = Date.now();

async function runTest() {
  if (Date.now() - startTime < duration) {
    const requests = Array(concurrency)
      .fill()
      .map(() => sendRequest());
    await Promise.all(requests);
    setImmediate(runTest);
  } else {
    const totalTime = (Date.now() - startTime) / 1000;
    const rps = responsesReceived / totalTime;
    console.log(`Requests sent: ${requestsSent}`);
    console.log(`Responses received: ${responsesReceived}`);
    console.log(`Test duration: ${totalTime} seconds`);
    console.log(`Requests per second: ${rps.toFixed(2)}`);
  }
}

runTest();
