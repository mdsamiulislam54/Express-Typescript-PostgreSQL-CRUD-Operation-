import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') });

export const config = {
    port: process.env.PORT || 3000,
    dbConnectionString: process.env.DB || '',
    jwt_secret:process.env.JWT_SECRET || "jkfhjkfhfy83278dsdhjh"
};