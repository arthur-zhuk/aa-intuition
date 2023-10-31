import { magicApiKey } from "@/config/client";
import { WalletClientSigner, type SmartAccountSigner } from "@alchemy/aa-core";
import { OAuthExtension } from "@magic-ext/oauth";
import { Magic } from "magic-sdk";
import { WalletClient, createWalletClient, custom } from "viem";

export const useMagicSigner = () => {
  if (typeof window === "undefined") {
    return { magic: null, signer: null };
  }

  const magic = new Magic(magicApiKey, {
    extensions: [new OAuthExtension()],
  });

  const magicClient: WalletClient = createWalletClient({
    transport: custom(magic.rpcProvider),
  });

  const magicSigner: SmartAccountSigner = new WalletClientSigner(
    magicClient as any,
    "magic"
  );

  return { magic, signer: magicSigner };
};
