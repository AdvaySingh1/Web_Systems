// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces

type User = {
  id: number;
  email: string;
  role: string;
};

type something = {
  height: number;
};
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: User | null;
      some: something | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
}

export {};
