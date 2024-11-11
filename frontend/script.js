const spinButton = document.getElementById('spin-button');
const balanceText = document.getElementById('balance');

const reels = ['🍒', '🍋', '🍉'];
let balance = 100;

async function spin() {
  const reel1 = reels[Math.floor(Math.random() * reels.length)];
  const reel2 = reels[Math.floor(Math.random() * reels.length)];
  const reel3 = reels[Math.floor(Math.random() * reels.length)];

  document.getElementById('reel1').textContent = reel1;
  document.getElementById('reel2').textContent = reel2;
  document.getElementById('reel3').textContent = reel3;

  const win = reel1 == reel2 && reel2 == reel3;
  console.log(win)
  const bet = 100;

  try {
    const response = await fetch('http://localhost:3000/api/game/play', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'player1', bet: bet, result: win, reel:[reel1, reel2, reel3] }),
    });
  
    if (!response.ok) {
      console.error('Error:', response.status);
      const errorText = await response.text();
      console.error('Response:', errorText);
      return;
    }
  
    const data = await response.json();

    console.log(data);
    balance = data.balance;
    balanceText.textContent = `Balance: $${balance}`;
  } catch (error) {
    console.error('Fetch error:', error);
  }

  
}

spinButton.addEventListener('click', spin);
