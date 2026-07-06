const path = require("node:path");
const dotenv = require("dotenv");

const dotenvOptions = { quiet: true };

dotenv.config({ path: path.resolve(process.cwd(), ".env.local"), ...dotenvOptions });
dotenv.config({ path: path.resolve(process.cwd(), ".env"), ...dotenvOptions });
