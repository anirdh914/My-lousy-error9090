.past-result-value {
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .past-result-circle {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #FFFFFF;
      font-size: 0.8rem;
      font-weight: 600;
      border: 2px solid rgba(255, 255, 255, 0.5);
    }
    .results-container {
      display: flex;
      overflow-x: auto;
      padding: 10px 0;
      margin-bottom: 20px;
      gap: 16px;
      scrollbar-width: thin;
      scrollbar-color: var(--secondary-color) var(--border-color);
    }
    .results-container::-webkit-scrollbar {
      height: 6px;
    }
    .results-container::-webkit-scrollbar-thumb {
      background: var(--secondary-color);
      border-radius: 6px;
    }
    .result-circle {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      color: #FFFFFF;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      box-shadow: 0 3px 10px var(--shadow-dark);
      border: 2px solid rgba(255, 255, 255, 0.5);
      animation: bounceIn 0.6s ease-out forwards;
    }
    .result-circle .number {
      font-size: 1.2rem;
      font-weight: 700;
    }
    .result-circle .size {
      font-size: 0.75rem;
      font-weight: 500;
    }
    @keyframes bounceIn {
      0% { transform: scale(0); opacity: 0; }
      50% { transform: scale(1.15); opacity: 1; }
      100% { transform: scale(1); }
    }
    .history-container {
      background: rgba(0, 0, 0, 0.2);
      border-radius: 16px;
      padding: 16px;
      box-shadow: 0 4px 16px var(--shadow-light);
      backdrop-filter: blur(5px);
      flex-grow: 1;
      height: 100%;
    }
    .history-item {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 0.5fr;
        gap: 10px;
        align-items: center;
        padding: 10px;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.05);
        margin-bottom: 8px;
        transition: background 0.2s ease;
    }
    .history-item:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    .history-period, .history-prediction {
        font-size: 0.85rem;
        font-weight: 500;
        color: var(--text-color);
        word-break: break-word;
        text-align: center;
    }
    .history-actual {
        display: flex;
        justify-content: center;
        align-items: center;
    }
