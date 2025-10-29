import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

export class CounterStore {
  count = 0;
  history: number[] = [];

  constructor() {
    makeAutoObservable(this);

    // 设置持久化
    makePersistable(this, {
      name: "CounterStore",
      properties: ["count", "history"],
      storage: window.localStorage,
    });
  }

  increment() {
    this.count++;
    this.history.push(this.count);
  }

  decrement() {
    this.count--;
    this.history.push(this.count);
  }

  reset() {
    this.count = 0;
    this.history = [];
  }

  get doubleCount() {
    return this.count * 2;
  }

  get lastFiveChanges() {
    return this.history.slice(-5);
  }
}

export const counterStore = new CounterStore();
