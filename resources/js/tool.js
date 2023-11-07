import SanctumTokens from "./components/SanctumTokens";
import CreateTokenModal from "./components/CreateTokenModal";
import CreatedTokenModal from "./components/CreatedTokenModal";
import DeleteTokenModal from "./components/DeleteTokenModal";
import NoTokens from "./components/NoTokens";
import TokenRow from "./components/TokenRow";
import SanctumLoadingButton from "./components/SanctumLoadingButton.vue";

Nova.booting((app, _store) => {
  app.component("SanctumTokens", SanctumTokens);
  app.component("CreateTokenModal", CreateTokenModal);
  app.component("CreatedTokenModal", CreatedTokenModal);
  app.component("DeleteTokenModal", DeleteTokenModal);
  app.component("NoTokens", NoTokens);
  app.component("TokenRow", TokenRow);

  // Fix because it was deleted from laravel nova core
  app.component("SanctumLoadingButton", SanctumLoadingButton);
});
