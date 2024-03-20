import { lsKeys } from "~/config/constants";

export const store = reactive({
  user: localStorage.getItem(lsKeys.activeUser),
});
