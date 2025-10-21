import type { STATUS } from '@/constants/status';

export type Status = (typeof STATUS)[keyof typeof STATUS];
