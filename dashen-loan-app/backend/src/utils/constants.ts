export const USER_ROLES = ['LOAN_OFFICER', 'MANAGER', 'ADMIN'] as const;
export type UserRole = typeof USER_ROLES[number];

export const DEFAULT_PAGE_SIZE = 20;
