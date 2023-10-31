"use client";
import { entryPointAddress } from "@/config/client";
import { useAlchemyProvider } from "@/hooks/useAlchemyProvider";
import { useMagicSigner } from "@/hooks/useMagicSigner";
import { AlchemyProvider } from "@alchemy/aa-alchemy";
import { Address } from "@alchemy/aa-core";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

type WalletContextProps = {
  // Functions
  login: () => Promise<void>;
  logout: () => Promise<void>;

  // Properties
  provider: AlchemyProvider;
  ownerAddress?: Address;
  scaAddress?: Address;
  username?: string;
  isLoggedIn: boolean;
  userTwitterInfo: any;
};

const defaultUnset: any = null;
const WalletContext = createContext<WalletContextProps>({
  // Default Values
  provider: defaultUnset,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  isLoggedIn: defaultUnset,
  userTwitterInfo: {},
});

export const useWalletContext = () => useContext(WalletContext);

export const WalletContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [ownerAddress, setOwnerAddress] = useState<Address>();
  const [scaAddress, setScaAddress] = useState<Address>();
  const [username, setUsername] = useState<string>();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userTwitterInfo, setUserTwitterInfo] = useState<any>();

  const { magic, signer } = useMagicSigner();
  const { provider, connectProviderToAccount, disconnectProviderFromAccount } =
    useAlchemyProvider({ entryPointAddress });

  const login = useCallback(async () => {
    if (!magic || !magic.user || !signer) {
      throw new Error("Magic not initialized");
    }

    const didToken = await magic.oauth.loginWithRedirect({
      provider: "twitter",
      redirectURI: window.location.origin,
      scope: ["user:email"] /* optional */,
    });

    const metadata = await magic.user.getMetadata();

    if (!didToken || !metadata.publicAddress) {
      throw new Error("Magic login failed");
    }

    // setIsLoggedIn(true);
    // connectProviderToAccount(signer);
    // setUsername(metadata.email);
    // setOwnerAddress(metadata.publicAddress as Address);
    // setScaAddress(await provider.getAddress());
  }, [magic, signer]);

  const logout = useCallback(async () => {
    if (!magic || !magic.user) {
      throw new Error("Magic not initialized");
    }

    if (!(await magic.user.logout())) {
      throw new Error("Magic logout failed");
    }

    setIsLoggedIn(false);
    disconnectProviderFromAccount();
    setUsername(undefined);
    setOwnerAddress(undefined);
    setScaAddress(undefined);
  }, [magic, disconnectProviderFromAccount]);

  // Ideally use react-query to cache and avoid race conditions of async calls in useEffect.
  useEffect(() => {
    async function fetchData() {
      if (!magic || !magic.user || !signer) {
        throw new Error("Magic not initialized");
      }

      const isLoggedIn = await magic.user.isLoggedIn();
      console.log({ isLoggedIn });
      // Ideal flow: if not logged in, show default view. If logged in, take DID and call to
      // backend to make association between DID and login metadata. This would tell us what
      // Oauth method was used. From there we can obtain the Social ID, pass that to the respective
      // social "user data" endpoint to obtain the full payload of user info. That info data to build
      // would then be used to build the rest of the "Profile UI" and more.
      if (!isLoggedIn) {
        return;
      }

      // Runs after Twitter auth for PoC. Ideal implemenation would be to store id
      // associations between Twitter IDs and Ethereum accounts in a database.
      const result = await magic.oauth.getRedirectResult();
      setUserTwitterInfo(result.oauth.userInfo);
      const metadata = await magic.user.getMetadata();
      console.log({ result, metadata });

      if (!metadata.publicAddress) {
        throw new Error("Magic login failed");
      }

      setIsLoggedIn(isLoggedIn);
      connectProviderToAccount(signer);
      setUsername(result.oauth.userInfo.preferredUsername);
      setOwnerAddress(metadata.publicAddress as Address);
      setScaAddress(await provider.getAddress());
    }
    fetchData();
  }, [magic, connectProviderToAccount, signer, provider]);

  return (
    <WalletContext.Provider
      value={{
        login,
        logout,
        isLoggedIn,
        provider,
        ownerAddress,
        scaAddress,
        username,
        userTwitterInfo,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};
