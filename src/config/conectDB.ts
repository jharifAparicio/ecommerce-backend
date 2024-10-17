import { createClient } from '@libsql/client';
import * as dotenv from 'dotenv';
dotenv.config();

const TursoUrl = process.env.TURSO_DATABASE_URL;
const TursoAuthToken = process.env.TURSO_AUTH_TOKEN;

if (!TursoUrl || !TursoAuthToken) {
    throw new Error('fatal: TursoUrl o TursoAuthToken no definidos');
}

export const conectDB = createClient({
    url: TursoUrl,
    authToken: TursoAuthToken,
});