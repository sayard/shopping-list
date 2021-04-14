import {
  action,
  computed,
  makeObservable,
  observable,
  runInAction,
} from "mobx";
import Firebase from "../../utils/Firebase";
import RootStore from "../Root";
import { UserDetails } from "./types";

export default class AuthStore {
  store: RootStore;

  isLoading = false;

  error?: Error;

  userDetails: UserDetails;

  constructor(store: RootStore) {
    this.store = store;
    this.userDetails = {
      userUID: undefined,
      nickname: undefined,
    };

    makeObservable(this, {
      isLoading: observable,
      error: observable,
      userDetails: observable,
      signIn: action.bound,
      signOut: action.bound,
      setUserDetails: action.bound,
      isLoggedIn: computed,
    });
  }

  async signIn(email: string, password: string): Promise<void> {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      const { user } = await Firebase.auth().signInWithEmailAndPassword(
        email,
        password
      );
      if (!user) {
        throw new Error("There was an error logging in");
      }
    } catch (e) {
      runInAction(() => {
        this.error = e;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async signOut(): Promise<void> {
    try {
      runInAction(() => {
        this.isLoading = true;
      });
      await Firebase.auth().signOut();
      runInAction(() => {
        this.userDetails = {
          userUID: undefined,
          nickname: undefined,
        };
      });
    } catch (e) {
      runInAction(() => {
        this.error = e;
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  setUserDetails(userDetails: UserDetails): void {
    this.userDetails = userDetails;
  }

  get isLoggedIn(): boolean {
    return !!this.userDetails.userUID;
  }
}
