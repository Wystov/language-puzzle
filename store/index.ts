import { lsKeys } from "~/constants";

export const store = reactive({
  user: localStorage.getItem(lsKeys.activeUser),
});
