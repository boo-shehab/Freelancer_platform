import {create} from 'zustand';

const useUserinfoStore = create((set) => ({

  username: '',
  isFreelancer: false,
  name: '',
  phoneNumber: '',
  companyName: '',
  projects: '',
  profilePicture: '',
  email: '',
  about: '',
  id: '',

  setUsername: (username) => set(() => ({ username })),
  setIsFreelancer: (isFreelancer) => set(() => ({ isFreelancer })),
  setName: (name) => set(() => ({ name })),
  setPhoneNumber: (phoneNumber) => set(() => ({ phoneNumber })),
  setCompanyName: (companyName) => set(() => ({companyName})),
  setProjects: (projects) => set(() => ({projects})),
  setProfilePicture: (profilePicture) => set(() => ({profilePicture})),
  setEmail: (email) => set(() => ({email})),
  setId: (id) => set(() => ({id})),
  setAbout: (about) => set(() => ({ about })),

  addUserInfo: (userData) => 
    set(() => ({
      username: userData.username || '',
      companyName: userData.companyName || '',
      projects: userData.projects || [],
      profilePicture: userData.profilePicture || '',
      id: userData.id || '',
      name: userData.name || '',
      email: userData.email || '',
      about: userData.about || '',
      phoneNumber: userData.phoneNumber || '',
      isFreelancer: userData.userType === 'freelancer' || false,

    })),

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
