<script setup lang="ts">
import MapServices from '../../services/MapServices';
import { useUserStore } from '../../store/user';
import { useFightStore } from '../../store/fight';

const userStore = useUserStore();
const fightStore = useFightStore();
const supabase = useSupabaseClient();

const userCards = ref([]);
const cardCount = ref(0);

const gameResult = ref('');

let playerAttacksLeft = fightStore.fightData.allies.length;
let enemyAttacksLeft = fightStore.fightData.ennemies.length;

const music = ref(true);

const attackIcon = ref('https://cdn.pixabay.com/photo/2013/07/13/09/58/attack-156413_960_720.png');
const defenseIcon = ref('https://cdn.pixabay.com/photo/2014/04/03/00/35/shield-308793_1280.png');
const staminaIcon = ref('https://cdn-icons-png.flaticon.com/512/5305/5305259.png');
const heartIcon = ref('https://cdn-icons-png.flaticon.com/512/9484/9484251.png');

/* Fight stats */

// Create an instance of the 'InvocationServices' class
const mapServices = new MapServices();

async function loadUserCardsByEmail() {
  const { data, error } = await supabase
    .from('user_cards')
    .select(
      `
      *,

      cards (
        *
      )
    `
    )
    .eq('email_user', userStore.userData.email);

  if (error) {
    console.log('Error', error);
  } else {
    userCards.value = data;
  }
}

async function updateUserData() {
  if (userStore.userData.currentZone === userStore.userData.zone) {
    try {
      const { data: updatedData, error: updateError } = await supabase
        .from('users')
        .update({
          zone: userStore.userData.zone + 1,
          coins: userStore.userData.coins + 2000,
          gems: userStore.userData.gems + 66,
        })
        .eq('email', userStore.userData.email);

      if (updateError) {
        console.error('Error updating user data:', updateError.message);
        return;
      } else {
        gameResult = 'Cats';
        console.log('User data updated successfully:', updatedData);
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
    }
  }
}

// const rarityClass = {
//   // "~/assets/img/ssr.png": card.cards.rarity === "r",
//   "~/assets/img/sr.png": card.cards.rarity === "sr",
//   "~/assets/img/ssr.png": card.cards.rarity === "ssr",
// };

async function selectUnit(selectedUnit: any) {
  fightStore.fightData.allies[cardCount.value] = selectedUnit;
  if (cardCount.value <= 3) {
    cardCount.value += 1;
  }
  if (cardCount.value === 3) {
    cardCount.value = 0;
  }
}

const isBadGuysTurn = computed(() => fightStore.fightData.player === 'Bad Guys');

async function handleBadGuysAttack() {
  // Delay between each Bad Guys attack (5 seconds)
  const attackDelay = 5000; // 5 seconds in milliseconds

  while (attacksMade < fightStore.fightData.ennemies.length) {
    // Check if there are available targets (allies with defense > 0) for Bad Guys
    const availableTargets = fightStore.fightData.allies.filter((ally) => ally.cards.defense > 0);

    if (availableTargets.length === 0) {
      // No available targets, Bad Guys' turn ends
      break;
    }

    const ennemy = fightStore.fightData.ennemies[attacksMade];

    // Randomly select an available target
    const randomPlayerIndex = Math.floor(Math.random() * availableTargets.length);
    const selectedPlayerCard = availableTargets[randomPlayerIndex];

    // Perform the attack: subtract the attack value of the Bad Guy from the defense of the defending card
    selectedPlayerCard.cards.defense -= ennemy.attack;

    // Check if the defending card's defense is below 0 and handle it
    if (selectedPlayerCard.cards.defense <= 0) {
      // Remove the defending card from the game or mark it as defeated
      // You can add your logic here
    }

    // Increment the attacksMade counter
    attacksMade++;

    // Delay before the next attack
    await new Promise((resolve) => setTimeout(resolve, attackDelay));
  }

  // Switch back to the player's turn
  fightStore.fightData.player = 'Cats';

  // Reset the attacksMade counter and reset the 'attacked' property for all cards
  attacksMade = 0;
  userCards.value.forEach((card) => {
    card.attacked = false;
  });
}
// Modify the startFight function to include the Bad Guys' attacks
async function startFight() {
  userStore.userData.inFight = true;

  // alliesAlive.value = fightStore.fightData.allies.length
  // ennemiesAlive.value = fightStore.fightData.ennemies.length

  fightStore.fightData.allies.forEach((ally) => {
    ally.cards.maxDefense = ally.cards.defense;
  });

  fightStore.fightData.ennemies.forEach((ennemy) => {
    ennemy.maxDefense = ennemy.defense;
  });

  const ennemySpeed = fightStore.fightData.ennemies.reduce((total, ennemy) => {
    return total + ennemy.speed;
  }, 0);
  const allySpeed = fightStore.fightData.allies.reduce((total, ally) => {
    return total + ally.cards.stamina;
  }, 0);

  if (allySpeed >= ennemySpeed) {
    fightStore.fightData.player = 'Cats';
    console.log('ally', allySpeed);
  } else {
    fightStore.fightData.player = 'Bad Guys';
    console.log('ennemy', ennemySpeed);
  }
}

// Watch the computed property isBadGuysTurn to trigger Bad Guys' attacks
watch(isBadGuysTurn, (isBadGuysTurn) => {
  if (isBadGuysTurn) {
    // It's the Bad Guys' turn, so trigger their attacks
    handleBadGuysAttack();
  }
});

let selectedAttackingCard = ref(null);
let selectedDefendingCard = ref(null);

function selectAttackingCard(ally) {
  selectedAttackingCard.value = ally;
}

function selectDefendingCard(ennemy) {
  selectedDefendingCard.value = ennemy;
  if (selectedAttackingCard.value && selectedDefendingCard.value) {
    launchAttack();
  }
}

function ChangeTeam() {
  fightStore.$reset();
  userStore.userData.inFight = false;
}

function LeaveMatch() {
  location.reload();
  userStore.userData.currentZone = 0;
  userStore.userData.inFight = false;
}

const isEnemyTeamDefeated = computed(() => {
  const deadEnnemies = fightStore.fightData.ennemies.every((ennemy) => ennemy.defense <= 0);
  console.log('isEnemyTeamDefeated:', deadEnnemies); // Add this line

  if (deadEnnemies && fightStore.fightData.ennemies.length > 0) {
    // All enemies are defeated
    gameResult.value = 'Cats'; // Update gameResult
    updateUserData();
    return true;
  } else {
    return false;
  }
});

const isAllyTeamDefeated = computed(() => {
  return fightStore.fightData.allies.every((ally) => ally.cards.defense <= 0);
});

let attacksMade = 0; // Initialize attacks made to 0

userCards.value.forEach((card) => {
  card.attacked = false;
});

let playerAttacksMade = 0;

function launchAttack() {
  if (!selectedAttackingCard.value || !selectedDefendingCard.value) {
    return; // Do nothing if either card is not selected
  }

  // Check if the attacking card's defense is greater than zero
  if (selectedAttackingCard.value.cards.defense > 0) {
    // Check if the attacking card is not marked as "dead"
    if (!selectedAttackingCard.value.dead) {
      // Check if the player has not used all allowed attacks for this turn
      if (playerAttacksMade < playerAttacksLeft) {
        // Mark the attacking card as attacked
        selectedAttackingCard.value.attacked = true;

        // Perform the attack: subtract the attack value of the attacking card from the defense of the defending card
        selectedDefendingCard.value.defense -= selectedAttackingCard.value.cards.attack;

        // Check if the defending card's defense is below 0 and handle it
        if (selectedDefendingCard.value.defense <= 0) {
          // Remove the defending card from the game or mark it as defeated
          // You can add your logic here
        }

        // Increment the attacksMade counter for the current turn
        playerAttacksMade++;

        // Reset the selected cards
        selectedAttackingCard.value = null;
        selectedDefendingCard.value = null;

        // Check if the player has used all allowed attacks for this turn
        if (playerAttacksMade === playerAttacksLeft) {
          // End the player's turn and switch to the opponent's turn
          endPlayerTurn();
        }
      }
    }
  }
}

function endPlayerTurn() {
  // Reset the player's attacks counter
  playerAttacksMade = 0;

  // Switch to the opponent's turn
  fightStore.fightData.player = 'Bad Guys';

  // You can add additional logic here for the opponent's turn
}

onMounted(async () => {
  const { data, error } = await supabase
    .from('user_cards')
    .select(
      `
      *,
      cards (
        *
      )
    `
    )
    .eq('email_user', userStore.userData.email);
  if (error) {
    console.log('Error', error);
  } else {
    userCards.value = data;
    console.log(userCards.value);
  }
});

watch(isEnemyTeamDefeated, (newIsEnemyTeamDefeated) => {
  if (newIsEnemyTeamDefeated) {
    // All enemies are defeated, you can perform actions here
    console.log('All enemies are defeated, gameResult:', gameResult);
    // You can trigger any other actions or logic you need here
  }
});
</script>

<template>
  <div>
    <NuxtLayout name="custom" v-if="userStore.userData.currentZone === 0">
      <div class="min-h-screen h-full w-full">
        <MapZone v-for="map in mapServices.maps" class="fixed cursor-pointer transition hover:scale-125" :class="map.className" :number="map.number" @click="mapServices.sendZone(map.number)" />
        <div class="w-full h-screen bg-[url('~/assets/img/map.png')] bg-center bg-cover fixed top-0 -z-20"></div>
      </div>
    </NuxtLayout>
  </div>

  <div v-if="userStore.userData.currentZone != 0" class="min-h-screen h-full w-full overflow-hidden bg-gray-700/30">
    <div v-if="!userStore.userData.inFight">
      <div class="w-full h-screen grid grid-cols-8">
        <div class="w-full bg-gray-400/40 h-screen overflow-x-hidden overflow-y-auto col-span-2 grid grid-cols-2 force-overflow" id="style-4">
          <div v-for="unit in userCards" :key="unit.id" class="h-full transition hover:scale-105 hover:z-20 relative" @click="selectUnit(unit)">
            <img :src="unit.cards.image" class="" />
            <div class="absolute bottom-0 z-10 bg-black/70 w-full py-[0.5vh]">
              <div class="text-center text-white">
                {{ unit.cards.name }}
              </div>
            </div>
          </div>
        </div>

        <div class="w-full h-screen col-span-6 flex flex-col">
          <div class="flex justify-center items-start p-4">
            <div class="text-[3.5vw]">Battle {{ userStore.userData.currentZone }}</div>
          </div>
          <div class="h-full flex flex-col justify-between px-[4vw]">
            <div class="flex justify-center items-end gap-x-[1vw]">
              <FightSelectedCard v-for="ennemy in fightStore.fightData.ennemies" :key="ennemy.id" class="border-2 border-red-600 rounded-xl bg-gray-300/20 h-[30vh] w-[12vw]" :imageSelected="ennemy.image" />
            </div>

            <div class="text-center font-bold text-purple-400 text-[3vw] text-yellow -mb-3">
              VS
            </div>
            <div class="flex justify-center items-start gap-x-[1vw]">
              <FightSelectedCard v-for="ally in fightStore.fightData.allies" :key="ally.id" class="border-2 border-green-600 shadow-xl rounded-xl bg-gray-300/20 h-[30vh] w-[14vw]" :imageSelected="ally.cards.image" />
            </div>
          </div>
          <div class="flex justify-between items-end pb-4">
            <button class="flex items-center transition hover:scale-110" @click="userStore.userData.currentZone = 0">
              <img src="~/assets/img/back-arrow.png" class="h-[10vh]" />
            </button>
            <button class="flex justify-center h-[7vh] w-[15vw] items-center border-[0.15vw] border-white rounded-3xl bg-gradient-to-tl from-gray-300 via-gray-500 to-gray-400 transition hover:scale-110" @click="startFight()">
              <div class="z-20 flex gap-x-1">
                <img src="https://pnghq.com/wp-content/uploads/high-quality-png-crossed-swords-crisp-quality.png" class="h-[4vh]" />
                <div class="text-[1.5vw] uppercase text-white -mb-1">Stato battole</div>
                <img src="https://pnghq.com/wp-content/uploads/high-quality-png-crossed-swords-crisp-quality.png" class="h-[4vh]" />
              </div>
            </button>
          </div>
          <audio autoplay loop src="/_nuxt/assets/audio/music_cat2.mp3"></audio>
        </div>
      </div>
      <div class="w-full h-screen bg-[url('~/assets/img/war_background.png')] bg-center bg-cover fixed top-0 -z-20"></div>
    </div>
    <div v-if="userStore.userData.inFight" class="w-full h-screen">
      <div class="h-full flex justify-between px-[4vw]">
        <div v-if="gameResult === 'Cats'" class="fixed inset-0 flex items-start justify-center z-50 pt-[5vh]">
          <div class="flex flex-col justify-between items-center bg-white p-8 rounded shadow-md w-[25vw]">
            <h2 class="text-[1.5vw] font-semibold mb-4">Congratulations!</h2>
            <p class="text-[1.1vw]">You won the game!</p>
            <button @click="LeaveMatch()" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Return to map</button>
          </div>
        </div>

        <div v-if="isAllyTeamDefeated" class="fixed inset-0 flex items-start justify-center z-50 pt-[5vh] h-[20vh]">
          <div class="flex flex-col justify-between items-center bg-white p-8 rounded shadow-md w-[30vw]">
            <h2 class="text-[1.5vw] font-semibold -mb-10">RIP</h2>
            <img src="https://i.pinimg.com/originals/80/5d/92/805d9290bf80860153c6804cc0ed2d3a.gif" class="mx-auto transform w-96 flip-horizontal" />
            <p>You lost the game!</p>
            <div class="flex justify-center items-center gap-x-4">
              <button @click="LeaveMatch()" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Return to map</button>
              <button @click="ChangeTeam()" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Change composition</button>
            </div>
          </div>
          <audio autoplay loop src="/_nuxt/assets/audio/death_music.mp3"></audio>
        </div>

        <div class="flex flex-col justify-center items-start gap-y-[1vw] relative">
          <FightSelectedCard
            v-for="ally in fightStore.fightData.allies"
            :key="ally.id"
            class="border-2 border-green-600 shadow-xl rounded-xl bg-gray-300/20 h-[30vh] w-[14vw] cursor-pointer hover:scale-105 transition duration-700"
            :class="{ 'ml-[2vw] transition duration-700': selectedAttackingCard === ally, 'ml-0 transition duration-700': selectedAttackingCard != ally }"
            :imageSelected="ally.cards.image"
            @click="selectAttackingCard(ally)"
          >
            <div class="absolute bottom-0 z-10 w-full">
              <div class="relative">
                <div>
                  <div
                    class="flex items-center justify-center h-[3vh] leading-none transition-all duration-700 bg-red-800 rounded-b-lg text-md"
                    :style="{
                      width: (100 * ally.cards.defense) / ally.cards.maxDefense + '%', // Calculate width based on current defense and max defense
                      maxWidth: '100%', // Set max width to ensure it doesn't exceed 100%
                    }"
                  >
                    <span class="p-1 text-white">{{ ally.cards.defense }}</span>
                    <img :src="heartIcon" class="h-[3vh]" />
                  </div>
                </div>
              </div>
            </div>

            <div class="absolute -bottom-2 -right-4 bg-gray-400 z-10 w-[2.5vw] h-[5vh] rounded-full border-2">
              <div class="flex justify-center items-center h-full">
                {{ ally.cards.attack }}
              </div>
            </div>

            <div v-if="ally.attacked" class="absolute bottom-0 top-0 z-10 w-full bg-gray-800/70 rounded-xl">
              <div class="h-full flex justify-center items-center text-white text-[1.5vw]">
                No actions available
              </div>
            </div>

            <div v-if="ally.cards.defense <= 0" class="absolute bottom-0 top-0 z-10 w-full bg-red-900/70 rounded-xl">
              <div class="h-full flex justify-center items-center text-white text-[1.7vw]">
                <img src="~/assets/img/dead_cat.png" class="w-1/2" />
              </div>
            </div>
            <div v-if="selectedAttackingCard === ally" class="absolute bottom-0 top-0 z-10 w-full bg-gray-800/70 rounded-xl">
              <div class="h-full flex justify-center items-center text-white text-[1.5vw]">
                <img src="~/assets/img/kitty_gun.png" />
              </div>
            </div>
          </FightSelectedCard>
        </div>
        <div class="w-full flex items-end gap-x-[1.4vw] text-[4vw] text-white pb-[20vh]" :class="{ 'justify-end': fightStore.fightData.player === 'Bad Guys', 'justify-start ': fightStore.fightData.player === 'Cats' }">
          <span :class="{ 'text-red-600 mr-[3vw] bg-red-900 px-6 rounded-lg border-2 border-red-600': fightStore.fightData.player === 'Bad Guys', 'text-green-600 ml-[4vw] bg-green-900 px-6 rounded-lg border-2 border-green-600': fightStore.fightData.player === 'Cats' }">
            <div v-if="fightStore.fightData.player === 'Cats'">Your turn</div>
            <div v-if="fightStore.fightData.player === 'Bad Guys'">Ennemy turn</div>
          </span>
        </div>
        <div class="flex flex-col justify-center items-end gap-y-[1vw] relative">
          <FightSelectedCard
            v-for="ennemy in fightStore.fightData.ennemies"
            :key="ennemy.id"
            class="border-2 border-red-600 rounded-xl h-[30vh] w-[12vw]"
            :class="{ 'transition hover:scale-105 hover:bg-red-600 hover:border-yellow-600 cursor-pointer': fightStore.fightData.player === 'Cats', 'ml-[2vw] transition duration-700': selectedAttackingCard === ennemy, 'ml-0 transition duration-700': selectedAttackingCard != ennemy }"
            :imageSelected="ennemy.image"
            @click="selectDefendingCard(ennemy)"
          >
            <div class="absolute bottom-0 z-10 w-full">
              <div class="relative">
                <div>
                  <div
                    class="flex items-center justify-center h-[3vh] leading-none transition-all duration-700 bg-red-800 rounded-b-lg text-md"
                    :style="{
                      width: (100 * ennemy.defense) / ennemy.maxDefense + '%', // Calculate width based on current defense and max defense
                      maxWidth: '100%', // Set max width to ensure it doesn't exceed 100%
                    }"
                  >
                    <div class="absolute left-[38%]">
                      <div class="flex items-center">
                        <div class="p-1 text-white">{{ ennemy.defense }}</div>
                        <img :src="heartIcon" class="h-[3vh]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="absolute -bottom-2 -left-4 bg-gray-400 z-10 w-[2.5vw] h-[5vh] rounded-full border-2">
              <div class="flex justify-center items-center h-full">
                {{ ennemy.attack }}
              </div>
            </div>
            <div v-if="ennemy.defense <= 0" class="absolute bottom-0 top-0 z-10 w-full bg-red-900/70 rounded-xl">
              <div class="h-full flex justify-center items-center text-white text-[1.7vw]">
                <img src="~/assets/img/dead_cat.png" class="w-1/2" />
              </div>
            </div>
          </FightSelectedCard>
        </div>
      </div>

      <div>
        <div class="flex justify-between items-end h-full pb-4">
          <button class="flex items-center transition hover:scale-110 relative" @click="userStore.userData.currentZone = 0">
            <img src="~/assets/img/back-arrow.png" class="h-[10vh]" />
          </button>
        </div>
      </div>
      <div class="w-full h-screen bg-[url('~/assets/img/fight_background.png')] bg-center bg-cover fixed top-0 -z-20"></div>
      <audio autoplay loop src="/_nuxt/assets/audio/music_cat1.mp3" v-if="!isAllyTeamDefeated"></audio>
    </div>
  </div>
</template>

<style>
#style-4::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #f5f5f5;
}

#style-4::-webkit-scrollbar {
  width: 10px;
  background-color: #f5f5f5;
}

#style-4::-webkit-scrollbar-thumb {
  background-color: #000000;
  border: 2px solid #555555;
}
.scrollbar {
  margin-left: 30px;
  float: left;
  height: 300px;
  width: 65px;
  background: #f5f5f5;
  overflow-y: scroll;
  margin-bottom: 25px;
}

.force-overflow {
  min-height: 450px;
}
</style>
