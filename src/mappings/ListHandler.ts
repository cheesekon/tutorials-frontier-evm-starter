import {SopoItem} from "../types";
import { FrontierEvmEvent } from '@subql/contract-processors/dist/frontierEvm';

import { BigNumber } from "ethers";

// Setup types from ABI
type ListEventArgs = [string, string, BigNumber, BigNumber, string] & { from: string; to: string; sopo_id: BigNumber; nft_id: BigNumber; nft_programe_address: string; };


export async function handleListEvent(event: FrontierEvmEvent<ListEventArgs>): Promise<void> {
    const sopoItem = new SopoItem(event.transactionHash);

    sopoItem.owner = event.args.from;
    sopoItem.contractAddress = event.args.nft_programe_address;
    sopoItem.tokenId = event.args.nft_id.toBigInt();
    sopoItem.sopoId = event.args.sopo_id.toBigInt();
    sopoItem.onSale = false;
    sopoItem.price = undefined;

    await sopoItem.save();
}