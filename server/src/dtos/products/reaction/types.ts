export const REACTION_ACTION = {
  like: 1,
  dislike: -1,
} as const;

type ObjectValues<T> = T[keyof T];

export type ReactionAction = ObjectValues<typeof REACTION_ACTION>;
