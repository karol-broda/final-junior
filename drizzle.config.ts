import type {Config} from 'drizzle-kit';

export default {
    schema: './lib/schema.ts',
    out: './drizzle-output',
} satisfies Config;