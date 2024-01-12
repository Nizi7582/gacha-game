import { useUserStore } from '../store/user'

interface Map {
  className: string;
  number: number;
}

class MapServices {
  // Define map's positions
  maps: Map[] = [
    { className: 'bottom-[35%] left-[33%]', number: 1},
    { className: 'top-[40%] left-[25%]', number: 2},
    { className: 'top-[30%] left-[33%]', number: 3},
    { className: 'top-[20%] left-[40%]', number: 4},
    { className: 'top-[42%] right-[28%]', number: 5},
    { className: 'top-[36%] right-[14%]', number: 6},
    { className: 'top-[46%] right-[41%]', number: 7},
    { className: 'top-[21%] right-[25%]', number: 8},
    { className: 'top-[25%] right-[40%]', number: 9},
  ];

  // Get map's position
  async sendZone(zoneNumber: number) {
    const userStore = useUserStore()
    if (userStore.userData.zone < zoneNumber) {
      alert("zone non débloqué ! (Oui, j'avais la flemme de faire une popup)")
    }
    else {
      userStore.userData.currentZone = zoneNumber
    }
  }
}

export default MapServices;