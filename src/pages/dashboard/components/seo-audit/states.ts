import { TaskLink } from "@/query/analysis/types";
import { makeAutoObservable } from "mobx";

export const linkDrawer = makeAutoObservable({
  visible: false,
  currentLink: null as TaskLink | null,

  open(link: TaskLink) {
    this.currentLink = link;
    this.visible = true;
  },

  close() {
    this.visible = false;
    this.currentLink = null;
  },
});
