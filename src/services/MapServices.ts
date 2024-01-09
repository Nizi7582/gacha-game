import { useUserStore } from '../store/user'

interface Map {
  className: string;
  number: string;
}

class MapServices {
  maps: Map[] = [
    { className: 'top-[40%] left-[25%]', number: '1'},
    { className: 'top-[30%] left-[33%]', number: '2'},
    { className: 'top-[20%] left-[40%]', number: '3'},
    { className: 'top-[42%] right-[28%]', number: '4'},
    { className: 'top-[36%] right-[14%]', number: '5'},
    { className: 'top-[46%] right-[41%]', number: '6'},
    { className: 'top-[21%] right-[25%]', number: '7'},
    { className: 'top-[25%] right-[40%]', number: '8'},
  ];
  async sendZone(zoneNumber: number) {
    const userStore = useUserStore()
    userStore.userData.currentZone = zoneNumber
  }
}

export default MapServices;