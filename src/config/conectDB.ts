import { createClient } from '@libsql/client';

const TursoUrl = process.env.TURSO_DATABASE_URL;
const TursoAuthToken = process.env.TURSO_DATABASE_AUTH_TOKEN;

if (!TursoUrl || !TursoAuthToken) {
    throw new Error('fatal: TursoUrl o TursoAuthToken no definidos');
}

export const conectDB = createClient({
    url: TursoUrl,
    authToken: TursoAuthToken,
});