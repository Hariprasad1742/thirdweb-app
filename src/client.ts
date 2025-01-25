import { createThirdwebClient } from "thirdweb";

// For development and testing purposes only
// Get your client ID from https://portal.thirdweb.com/typescript/v5/client
const clientId = "test-client-id";

export const client = createThirdwebClient({
  clientId: "test-client-id",
});
