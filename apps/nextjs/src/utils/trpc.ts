import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '@lt/api';

export const trpc = createTRPCReact<AppRouter>();
