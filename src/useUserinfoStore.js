import {create} from 'zustand';

const useUserinfoStore = create((set) => ({

  username: '',
  isFreelancer: false,
  name: '',
  phoneNumber: '',
  about: 'GreenTech Solutions Inc. Renewable Energy & Technology San Francisco, California, with operations in North America and Europe',

  setUsername: (username) => set(() => ({ username })),
  setIsFreelancer: (isFreelancer) => set(() => ({ isFreelancer })),
  setName: (name) => set(() => ({ name })),
  setPhoneNumber: (phoneNumber) => set(() => ({ phoneNumber })),
  setAbout: (about) => set(() => ({ about })),

  resetUser: () =>
    set(() => ({
      username: '',
      isFreelancer: false,
      name: '',
      phoneNumber: '',
      about: '',
    })),
}));

export default useUserinfoStore;
