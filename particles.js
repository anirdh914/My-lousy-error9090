.nav-button.active::before {
      opacity: 1;
      border-radius: 12px;
      box-shadow: var(--button-shadow);
    }
    .nav-button i, .nav-button span {
      transition: transform 0.3s ease;
    }
    .nav-button:hover i {
      transform: translateY(-2px);
    }
    .nav-button.active i {
      transform: scale(1.1);
    }
  </style>
</head>
<body>
  <div class="app-container">
    <div id="loginView" class="login-container">
      <div class="login-title">ANIKESH AI LOGIN</div>
      <div class="login-box">
        <div class="device-id" id="deviceId"></div>
        <input type="text" id="accessKey" placeholder="Enter Access Key">
        <button id="loginButton">Login</button>
        <button class="secondary" id="getKeyButton">Get Access Key</button>
        <div class="loading" id="loading">Authenticating...</div>
        <div class="error" id="error"></div>
      </div>
    </div>

    <div id="mainAppView" class="main-container" style="display: none;">
      <div id="keyTimer" class="timer-container">Key Expiry: Loading...</div>
      <div class="header">ANIKESH AI</div>

      <div id="homePage" class="page-section active">
        <div class="card">
          <div id="currentPeriod"><i class="fas fa-calendar-day"></i> Current Period: Loading...</div>
          <div id="liveTime"><i class="fas fa-hourglass-half"></i> Time: --:--:--</div>
          <div id="predictionBox" class="prediction-box">
            <div class="loading-spinner"></div>
          </div>
        </div>
        <div class="results-header">
          <span class="results-title">New Results</span>
          <span class="past-results-toggle" id="pastResultsToggle">Past Results</span>
        </div>
        <div class="results-container" id="resultsContainer"></div>
        <div class="past-results-container" id="pastResultsContainer"></div>
      </div>

      <div id="historyPage" class="page-section">
        <div class="history-container">
          <div class="history-header-grid">
              <div>Period</div>
              <div>Prediction</div>
              <div>Actual</div>
              <div>Status</div>
          </div>
          <div id="historyList">No Predictions Yet</div>
        </div>
      </div>

      <div id="profilePage" class="page-section">
          <div class="card">
              <h3 style="text-align:center; margin-bottom: 20px; color: var(--accent-color);">Profile</h3>
              <div class="profile-info">
                  <div class="profile-info-item"><span>Access Key:</span> <br><span id="profileAccessKey">Loading...</span></div>
                  <div class="profile-info-item"><span>Device ID:</span> <br><span id="profileDeviceId">Loading...</span></div>
              </div>
              <div class="profile-stats">
                  <div class="profile-stat-item">
                      <i class="fas fa-trophy win-color"></i>
                      <div class="label">Total Wins</div>
                      <div class="value win-color" id="totalWins">0</div>
                  </div>
                  <div class="profile-stat-item">
                      <i class="fas fa-frown-open loss-color"></i>
                      <div class="label">Total Losses</div>
                      <div class="value loss-color" id="totalLosses">0</div>
                  </div>
              </div>
              <button id="logoutButton" class="logout-button">Logout</button>
          </div>
      </div>
      
      <div class="bottom-nav">
          <button class="nav-button active" data-page="home">
              <i class="fas fa-home"></i>
              <span>Home</span>
          </button>
          <button class="nav-button" data-page="history">
              <i class="fas fa-history"></i>
              <span>History</span>
          </button>
          <button class="nav-button" data-page="profile">
              <i class="fas fa-user-circle"></i>
              <span>Profile</span>
          </button>
      </div>
    </div>
  </div>
const BIG_NUMBERS = [5, 6, 7, 8, 9];
  const SMALL_NUMBERS = [0, 1, 2, 3, 4];
  const GREEN_NUMBERS = [1, 3, 7, 9, 5];
  const RED_NUMBERS = [2, 4, 6, 8, 0];
  const VIOLET_NUMBERS = []; // According to new rules, no numbers are purely violet.

  function getBigSmall(num) { return num >= 5 ? "BIG" : "SMALL"; }
  function getColorName(num) {
    if (GREEN_NUMBERS.includes(num)) return "GREEN";
    if (RED_NUMBERS.includes(num)) return "RED";
    return "VIOLET";
  }
  
  function getColor(num) {
    if (GREEN_NUMBERS.includes(num)) return { name: "Green", hex: "var(--green-color)" };
    if (RED_NUMBERS.includes(num)) return { name: "Red", hex: "var(--red-color)" };
    return { name: "Violet", hex: "var(--violet-color)" };
  }
  
  function getOppositeNumbers(size) {
    const pool = size === "BIG" ? SMALL_NUMBERS : BIG_NUMBERS;
    let numbers = [];
    while(numbers.length < 2) {
      const randomIndex = Math.floor(Math.random() * pool.length);
      const number = pool[randomIndex];
      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }
    return numbers;
  }
  
  function getOppositeColors(color) {
    const pool = color === "GREEN" ? RED_NUMBERS : GREEN_NUMBERS;
    let numbers = [];
    while(numbers.length < 2) {
      const randomIndex = Math.floor(Math.random() * pool.length);
      const number = pool[randomIndex];
      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }
    return numbers;
  }

  function updateLiveTime() {
    const options = { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: '2-digit', second: '2-digit' };
    document.getElementById("liveTime").innerText = `Time: ${new Date().toLocaleTimeString('en-US', options)}`;
  }
const seconds = Math.floor((remaining / 1000) % 60);
          const minutes = Math.floor((remaining / (1000 * 60)) % 60);
          const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
          const days = Math.floor(remaining / (1000 * 60 * 60 * 24));

          timerElement.innerHTML = `Key Expiry: ${days}d ${hours}h ${minutes}m ${seconds}s`;
      }, 1000);
  }

  function hashHistory(history) {
    return history.map(item => item.period + item.number).join(',');
  }
  
  function getShortPeriod(period) {
    return period.slice(-3);
  }
  
  function getCombinedPrediction(history) {
    if (!history || history.length < 1) {
      return { text: "Analyzing...", predictedSize: null, predictedColor: null };
    }
    
    const last3Results = history.slice(0, 3);
    const sizeCounts = {};
    const colorCounts = {};

    for (const item of last3Results) {
        const size = getBigSmall(item.number);
        const color = getColorName(item.number);
        sizeCounts[size] = (sizeCounts[size] || 0) + 1;
        colorCounts[color] = (colorCounts[color] || 0) + 1;
    }
    
    let predictedSize = null;
    let maxCountSize = 0;
    for (const size in sizeCounts) {
        if (sizeCounts[size] > maxCountSize) {
            maxCountSize = sizeCounts[size];
            predictedSize = size;
        }
    }

    let predictedColor = null;
    let maxCountColor = 0;
    for (const color in colorCounts) {
        if (colorCounts[color] > maxCountColor) {
            maxCountColor = colorCounts[color];
            predictedColor = color;
        }
    }
    
    // Always return a prediction, even if the count is low
    const predictionText = `${predictedSize}/${predictedColor}`;
    
    return {
      text: predictionText,
      predictedSize: predictedSize,
      predictedColor: predictedColor
    };
  }
  
  async function updateWinLossInDb(type) {
      const accessKey = localStorage.getItem("access_key");
      if (!accessKey) return;
      
      const updates = {};
      if (type === "win") {
          userWinCount++;
          updates.winCount = userWinCount;
      } else if (type === "loss") {
          userLossCount++;
          updates.lossCount = userLossCount;
      }

      try {
          await update(ref(db, `accessKeys/${accessKey}`), updates);
      } catch (e) {
          console.error("Failed to update win/loss in database:", e);
      }
  }

  function renderResults(results) {
    const container = document.getElementById("resultsContainer");
    container.innerHTML = results.slice(0, 5).map((item, index) => {
      const color = getColor(item.number);
      const sizeText = getBigSmall(item.number).charAt(0);
      return `
        <div class="result-circle" style="background: ${color.hex}; animation-delay: ${index * 0.15}s;">
          <div class="number">${item.number}</div>
          <div class="size">${sizeText}</div>
        </div>`;
    }).join("");
  }
  function renderPastResults(results) {
    const container = document.getElementById("pastResultsContainer");
    container.innerHTML = results.slice(0, 20).map(item => {
      const color = getColor(item.number);
      const sizeText = getBigSmall(item.number).charAt(0);
      const shortPeriod = item.period.slice(-3);
      return `
        <div class="past-result-item">
          <span class="past-result-period">${shortPeriod}</span>
          <div class="past-result-value">
            <div class="past-result-circle" style="background: ${color.hex};">
              <div>${item.number}</div>
              <div>${sizeText}</div>
            </div>
          </div>
        </div>`;
    }).join("");
  }
  function renderHistory() {
      const historyList = document.getElementById("historyList");
      if (predictionHistory.length === 0) {
          historyList.innerHTML = "No predictions yet";
          return;
      }
      historyList.innerHTML = predictionHistory.slice(0, 20).map(item => {
          const icon = item.status === "Win" ? "✔" : item.status === "Loss" ? "✖" : "⌛";
          const shortPeriod = getShortPeriod(item.period);
          const actualContent = item.actualNum !== "--" ? `
              <div class="result-circle" style="background: ${getColor(item.actualNum).hex}; width: 36px; height: 36px; font-size: 0.9rem;">
                  <div class="number">${item.actualNum}</div>
              </div>` : "--";
          const statusClass = item.status.toLowerCase();

          return `
              <div class="history-item">
                  <div class="history-period">${shortPeriod}</div>
                  <div class="history-prediction">${item.prediction}</div>
                  <div class="history-actual">${actualContent}</div>
                  <div><span class="status-icon ${statusClass}">${icon}</span></div>
              </div>
          `;
      }).join("");
  }
  
  function renderProfile() {
      document.getElementById('profileAccessKey').innerText = localStorage.getItem("access_key") || 'Not Found';
      document.getElementById('profileDeviceId').innerText = localStorage.getItem("device_id") || 'Not Found';
      document.getElementById('totalWins').innerText = userWinCount;
      document.getElementById('totalLosses').innerText = userLossCount;
  }
  
  async function fetchData() {
    try {
      const periodRes = await fetch(CURRENT_API, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...REQUEST_DATA, timestamp: Math.floor(Date.now() / 1000) })
      });
      const periodData = await periodRes.json();
      const period = periodData?.data?.issueNumber || "Unavailable";
      document.getElementById("currentPeriod").innerText = `Current Period: ${getShortPeriod(period)}`;
  
      const res = await fetch(HISTORY_API + '?ts=' + Date.now());
      const data = await res.json();
      if (!data?.data?.list) {
        document.getElementById("predictionBox").innerText = "Error: Invalid or Empty Dataset.";
        return;
      }
      const newResults = data.data.list.slice(0, 100).map(item => {
        const num = parseInt(item.number);
        return { period: item.issueNumber, number: num };
      });
  
      const newHash = hashHistory(newResults);
      last100Results = newResults;
  
      const existingPrediction = predictionHistory.find(p => p.period === period);
      if (existingPrediction) {
        document.getElementById("predictionBox").innerHTML = existingPrediction.prediction;
      } else {
        const prediction = getCombinedPrediction(last100Results);
        document.getElementById("predictionBox").innerHTML = prediction.text || "Prediction Error";
        
        if (prediction.predictedSize && period !== "Unavailable") {
          predictionHistory.unshift({
            period,
            prediction: prediction.text,
            actual: "--",
            actualNum: "--",
            status: "Pending",
            predictedSize: prediction.predictedSize,
            predictedColor: prediction.predictedColor
          });
          if (predictionHistory.length > 20) predictionHistory.pop();
        }
      }
  
      let historyUpdated = false;
      predictionHistory.forEach(ph => {
        if (ph.status === "Pending") {
          const match = last100Results.find(h => h.period === ph.period);
          if (match) {
            const actualSize = getBigSmall(match.number);
            const actualColor = getColorName(match.number);
            ph.actual = `${actualSize}/${actualColor}`;
            ph.actualNum = match.number;
            
            let newStatus = "Loss";
            
            // Win if either the size or the color prediction matches
            if (ph.predictedSize === actualSize || ph.predictedColor === actualColor) {
                newStatus = "Win";
            }
            
            if (newStatus !== ph.status) {
                ph.status = newStatus;
                if(newStatus === "Win") {
                    updateWinLossInDb("win");
                } else {
                    updateWinLossInDb("loss");
                }
            }
            historyUpdated = true;
          }
        }
      });
  
      renderResults(last100Results);
      renderPastResults(last100Results);
      if (historyUpdated || newHash !== lastHistoryHash) {
        renderHistory();
      }
      lastHistoryHash = newHash;
    } catch (e) {
      document.getElementById("predictionBox").innerHTML = "Prediction Error";
      console.error("Fetch error:", e.message);
    }
  }

  // --- Main App Logic for starting the services ---
  function startApp() {
    clearInterval(fetchInterval);
    clearInterval(timeInterval);
    
    const expiry = localStorage.getItem("access_key_expiry");
    startKeyTimer(expiry === "none" ? "none" : parseInt(expiry));

    timeInterval = setInterval(updateLiveTime, 1000);
    fetchInterval = setInterval(fetchData, 3000);
    fetchData(); 
  }

  // --- Initial Setup and Event Listeners ---
  document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("loginButton").addEventListener("click", handleLogin);
    document.getElementById("getKeyButton").addEventListener("click", getKey);
    document.getElementById("logoutButton").addEventListener("click", handleLogout);
    
    document.getElementById("pastResultsToggle").addEventListener("click", () => {
      const container = document.getElementById("pastResultsContainer");
      container.classList.toggle("show");
    });
    
    document.querySelectorAll('.nav-button').forEach(button => {
        button.addEventListener('click', () => {
            showPage(button.dataset.page);
        });
    });
    
    if (localStorage.getItem("access_key")) {
      showMainApp();
      startApp();
    } else {
      getDeviceId();
    }
  });

</script>
</body>
</html>
