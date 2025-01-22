import * as anchor from "@coral-xyz/anchor";
import { Keypair, PublicKey } from "@solana/web3.js";
import { BanksClient, ProgramTestContext, startAnchor } from "solana-bankrun";
import IDL from "../target/idl/tokenvesting.json";
import { SYSTEM_PROGRAM_ID } from "@coral-xyz/anchor/dist/cjs/native/system";
import { BankrunProvider } from "anchor-bankrun";
import { Program } from "@coral-xyz/anchor";
import { Tokenvesting } from "../target/types/tokenvesting";
import { createMint } from "spl-token-bankrun";


describe("Vesting Smart Contract Tests", () => {
  let beneficiary: Keypair;
  let context : ProgramTestContext;
  let provider : BankrunProvider;
  let program : Program<Tokenvesting>;
  let banksClient : BanksClient;
  let employer : Keypair;
  let mint : PublicKey;

  beforeAll(async () => {
    beneficiary = new anchor.web3.Keypair();

    context = await startAnchor(
      "",
      [{name :"tokenvesting",programId : new PublicKey(IDL.address)},

      ],
      [
        {
          address: beneficiary.publicKey,
          info: {
            lamports: 1_000_000_000,
            data: Buffer.alloc(0),
            owner: SYSTEM_PROGRAM_ID,
            executable: false,
          }
        }
      ]
    ); 

    provider = new BankrunProvider(context);
    anchor.setProvider(provider);

    program = new Program<Tokenvesting>(IDL as Tokenvesting);

    banksClient = context.banksClient;

    employer = provider.wallet.payer;

    mint = await createMint(banksClient , employer , employer.publicKey, null ,2);
  });
});
