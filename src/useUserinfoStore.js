import {create} from 'zustand';

const useUserinfoStore = create((set) => ({

  username: '',
  isFreelancer: false,
  name: '',
  phoneNumber: '',

  setUsername: (username) => set(() => ({ username })),
  setIsFreelancer: (isFreelancer) => set(() => ({ isFreelancer })),
  setName: (name) => set(() => ({ name })),
  setPhoneNumber: (phoneNumber) => set(() => ({ phoneNumber })),

  resetUser: () =>
    set(() => ({
      username: '',
      isFreelancer: false,
      name: '',
      phoneNumber: '',
    })),
}));

export default useUserinfoStore;
