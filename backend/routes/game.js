const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Route to get user data
router.get('/user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to update user balance after playing
router.post('/play', async (req, res) => {
  const { username, bet, result, reel } = req.body;
  

  const user = await User.findOne({ username });
  //console.log("hello")
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  //console.log("hello")
  //console.log(reel[0], reel[1], reel[2])


  // Update user balance based on game result
  const newBalance = result ?  (user.balance + getBonus(bet, [reel[0], reel[1], reel[2]]))  : user.balance - bet;
  user.balance = parseFloat(newBalance.toFixed(2));
  await user.save();

  res.json({ balance: user.balance });
  
});

function getBonus(bet, reels) {
  let bonus = 0;

  // Special bonus for certain reel combinations
  if (reels[0] === '🍒' && reels[1] === '🍒' && reels[2] === '🍒') {
    bonus = bet * 2; // 2x the bet for three cherries
  } else if (reels[0] === '🍉' && reels[1] === '🍉' && reels[2] === '🍉') {
    bonus = bet * 1.5; // 1.5x the bet for three watermelons
  }else if (reels[0] === '🍋' && reels[1] === '🍋' && reels[2] === '🍋') {
    bonus = bet * 1.2; // 1.2x the bet for three lemons
  }
  console.log(bet,bonus);
  return bonus;
}

module.exports = router;
