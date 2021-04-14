import { MobXProviderContext } from "mobx-react";
import React from "react";
import { Stores } from "../stores/Root/types";

export const useStore = (): Stores =>
  React.useContext((MobXProviderContext as unknown) as React.Context<Stores>);
