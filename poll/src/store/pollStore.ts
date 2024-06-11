import { writable } from "svelte/store";

const PollStore = writable([
        {
          id: 1,
          question: 'Python or JavaScript?',
          answer1: 'Python',
          answer2: 'JavaScript',
          votesA: 9,
          votesB: 15,
        },
]);

export default PollStore;