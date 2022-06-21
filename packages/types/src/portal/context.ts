import type { TransactionResponse } from "@ethersproject/abstract-provider";

// eslint-disable-next-line no-restricted-imports
import type { CovalentTransaction } from "../covalent/transactions";

export interface PortalContextTransaction extends CovalentTransaction {
  data: TransactionResponse & { creates: string | null };
  name: string | null;
  method: string | null;
  to_ens: string | null;
  from_ens: string | null;
}

export type PortalContext = PortalContextTransaction[];
