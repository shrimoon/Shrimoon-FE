export const genders = ['male', 'female', 'not-applicable'] as const;

export type Gender = typeof genders[number] | null;
