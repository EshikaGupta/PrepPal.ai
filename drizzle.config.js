import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./configs/schema.js",
  dbCredentials:{
    //url:'postgresql://neondb_owner:HJA8TMk2QZDn@ep-odd-sun-a57wprt9.us-east-2.aws.neon.tech/preppal.ai?sslmode=require'
    url:process.env.NEXT_PUBLIC_DATABASE_CONNECTION_STRING
  }
});
