import { makeAutoObservable } from "mobx";

export const createCompetitorModal = makeAutoObservable({
  visible: false,

  open() {
    this.visible = true;
  },

  close() {
    this.visible = false;
  },
});
