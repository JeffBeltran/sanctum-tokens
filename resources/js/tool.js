import SanctumTokens from "./components/SanctumTokens";
import CreateTokenModal from "./components/CreateTokenModal";
import CreatedTokenModal from "./components/CreatedTokenModal";
import DeleteTokenModal from "./components/DeleteTokenModal";
import NoTokens from "./components/NoTokens";
import TokenRow from "./components/TokenRow";

Nova.booting((app, _store) => {
  app.component("SanctumTokens", SanctumTokens);
  app.component("CreateTokenModal", CreateTokenModal);
  app.component("CreatedTokenModal", CreatedTokenModal);
  app.component("DeleteTokenModal", DeleteTokenModal);
  app.component("NoTokens", NoTokens);
  app.component("TokenRow", TokenRow);
});
