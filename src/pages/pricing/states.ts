import { makeAutoObservable } from "mobx";
import { Period, Subscription } from "@/query/subscription/types";


export const subscriptionModal = makeAutoObservable({
  visible: false,
  currentSubscription: null as Subscription | null,

  open(subscription: Subscription) {
    this.currentSubscription = subscription;
    this.visible = true;
  },

  close() {
    this.visible = false;
    this.currentSubscription = null;
  },
});

export const notMemberModal = makeAutoObservable({
  visible: false,
  currentMessage: "",
  open(msg = "") {
    this.visible = true;
    this.currentMessage = msg;
  },
  close() {
    this.visible = false;
  },
});
