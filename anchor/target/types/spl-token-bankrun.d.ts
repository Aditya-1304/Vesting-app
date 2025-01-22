
declare module 'spl-token-bankrun' {

  import { BanksClient } from 'solana-bankrun';

  import { Keypair, PublicKey } from '@solana/web3.js';



  export function createMint(

      banksClient: BanksClient,

      payer: Keypair,

      mintAuthority: PublicKey,

      freezeAuthority: PublicKey | null,

      decimals: number

  ): Promise<PublicKey>;

}
