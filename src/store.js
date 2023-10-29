import { createStore } from "vuex";


const suits = ["@", "#", "^", "*"];

const nums = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
const defaultCards = nums.map(num => {
  return suits.map(suit => {
    return {
      num,
      suit,
    }
  });
}).flat();

const players = [{
  key: 1,
  name: "玩家一",
}, {
  key: 2,
  name: "玩家二",
}, {
  key: 3,
  name: "玩家三",
}, {
  key: 4,
  name: "玩家四",
}];

export const store = createStore({
  state() {
    return {
      cards: defaultCards,
      players: [],
      winner: null,
    }
  },
  mutations: {
    cards(state, cards) {
      state.cards = cards;
    },
    players(state, players) {
      state.players = players;
    },
    winner(state, winner) {
      state.winner = winner;
    }
  },
  actions: {
    async startGame({ commit }) {
      // before starting the game, restore the cards
      commit('cards', [...defaultCards]);
      commit('players', players.map(item => ({ ...item, cards: [] })));
      commit('winner', null);
      // step 1: shuffle the cards
      let shuffledCards = await shuffleCard();
      commit("cards", shuffledCards);
      // step 2: Divide the playing cards among four players in sequence
      let playersInfo = await dealCards(shuffledCards);
      commit("players", playersInfo);
      // step 3: Determine the winner
      const winner = await determineWinner(playersInfo);
      console.log(winner);
      commit("winner", winner);
    }
  }
});

// 洗牌
async function shuffleCard() {
  let count = defaultCards.length;
  let shuffledCards = [...defaultCards];
  for (let i = 0; i < count; i++) {
    let j = i + Math.floor(Math.random() * (count - i));
    let temp = shuffledCards[j];
    shuffledCards[j] = shuffledCards[i];
    shuffledCards[i] = temp;
  }
  return shuffledCards;
}

async function dealCards(cards) {
  const playerCount = players.length;
  let result = players.map(item => ({
    ...item,
    cards: []
  }));
  for (let i = 0; i < cards.length; i += playerCount) {
    for (let j = 0; j < playerCount; j++) {
      result[j].cards.push(cards[i + j]);
    }
  }
  return result;
}

async function determineWinner(palyersInfo) {
  const playerMaxCardGroup = await Promise.all(palyersInfo.map(item => {
    return new Promise(async (resolve) => {
      let maxCardGroup = await findMaxScoreGroup(item.cards);
      resolve({
        key: item.key,
        name: item.name,
        maxCardGroup
      });
    });

  }));
  // 获取所有玩家中牌组的出现次数
  const cardCounts = playerMaxCardGroup.map(item => item.maxCardGroup.length);
  // 计算最多出现次数
  const maxCount = Math.max(...cardCounts);
  // 获取最多出现次数的玩家
  const playersWidthMaxCardCount = playerMaxCardGroup.filter(item => item.maxCardGroup.length == maxCount);
  // 按照规则对玩家进行排序

  const sortedPlayers = playersWidthMaxCardCount.sort((a, b) => {
    const aItems = a.maxCardGroup;
    const bItems = b.maxCardGroup;
    const aNum = aItems[0].num;
    const bNum = bItems[0].num;
    // 第一步：比较牌面
    const aNumIndex = nums.indexOf(aNum);
    const bNumIndex = nums.indexOf(bNum);
    if (aNumIndex !== bNumIndex) {
      return bNumIndex - aNumIndex;
    }
    // 第二步:比较花色
    const aSuit = Math.max(...aItems.map(item => suits.indexOf(item.suit)));
    const bSuit = Math.max(...bItems.map(item => suits.indexOf(item.suit)));
    return bSuit - aSuit;

  });
  return {
    key: sortedPlayers[0].key,
    name: sortedPlayers[0].name
  }
}

// 选择单个玩家的最大牌组
async function findMaxScoreGroup(playerCards) {
  // 统计同一组卡牌
  let cardCache = {};
  for (let i = 0; i < playerCards.length; i++) {
    let item = playerCards[i];
    if (cardCache[item.num]) {
      cardCache[item.num].push(item);
    } else {
      cardCache[item.num] = [item];
    }
  }
  // 计算出现次数最多的牌组的次数
  let displayCounts = Object.keys(cardCache).map(key => cardCache[key].length);
  let maxDisplay = Math.max(...displayCounts);

  // 过滤出出现此次数最多的牌组编号
  let maxDisplayKeys = Object.keys(cardCache).filter(key => cardCache[key].length == maxDisplay);
  // 寻找最大编号
  let maxKey = maxDisplayKeys[0];
  let maxKeyIndex = nums.indexOf(maxKey);
  for (let i = 1; i < maxDisplayKeys.length; i++) {
    let item = maxDisplayKeys[i];
    let index = nums.indexOf(item);
    if (index > maxKeyIndex) {
      maxKey = item;
      maxKeyIndex = index;
    }
  }
  return cardCache[maxKey];
}