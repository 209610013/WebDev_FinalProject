function rollDice() {
  const numDice = parseInt(document.getElementById("numDice").value);
  const numRolls = parseInt(document.getElementById("numRolls").value);

  const results = simulateDiceRoll(numDice, numRolls);

  updateFrequency(results);
  updateStatistics(results);
}

function simulateDiceRoll(numDice, numRolls) {
  const results = [];
  for (let i = 0; i < numRolls; i++) {
    const rollResult = [];
    for (let j = 0; j < numDice; j++) {
      const diceValue = Math.floor(Math.random() * 6) + 1;
      rollResult.push(diceValue);
    }
    results.push(rollResult);
  }
  return results;
}

function updateFrequency(results) {
  const frequencyTable = document.getElementById("frequency-stats");
  frequencyTable.innerHTML = "";

  const counts = {};
  results.forEach(rollResult => {
    const key = rollResult.join(", ");
    counts[key] = (counts[key] || 0) + 1;
  });

  Object.entries(counts).forEach(([combination, count]) => {
    const row = document.createElement("tr");
    row.innerHTML = "<td>" + combination + "</td><td>" + count + "</td>";
    frequencyTable.appendChild(row);
  });
}

function updateStatistics(results) {
  const meanElement = document.getElementById("mean");
  const medianElement = document.getElementById("median");
  const modeElement = document.getElementById("mode");

  const allValues = results.flat().sort((a, b) => a - b);
  const totalValues = allValues.length;

  const mean = allValues.reduce((acc, val) => acc + val, 0) / totalValues;
  meanElement.textContent = mean.toFixed(2);

  const middleIndex = Math.floor(totalValues / 2);
  const median = totalValues % 2 === 0
    ? (allValues[middleIndex - 1] + allValues[middleIndex]) / 2
    : allValues[middleIndex];
  medianElement.textContent = median.toFixed(2);

  const frequency = {};
  allValues.forEach(value => {
    frequency[value] = (frequency[value] || 0) + 1;
  });

  const maxFrequency = Math.max(...Object.values(frequency));
  const mode = Object.keys(frequency).filter(key => frequency[key] === maxFrequency);
  modeElement.textContent = mode.join(", ");
}
