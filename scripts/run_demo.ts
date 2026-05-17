import { payload, summary } from "../src/services/honeypotService";

console.log("honeypot-form-validator demo");
console.log(JSON.stringify(summary(), null, 2));
console.log(JSON.stringify(payload().signals, null, 2));
