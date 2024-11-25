import { create } from "zustand";

export const useAppStore = create((set, get) => ({
    projectsPosts: [],
    addNewProjectPost: (newProject) => {
        set((state) => ({ projectsPosts: [...state.projectsPosts, newProject] }));
    },
    print: () => {
        get().projectsPosts.forEach((project) => {
            console.log(project);
        });
    }
}));
