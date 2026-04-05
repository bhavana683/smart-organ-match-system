import { createContext, useContext, useState } from "react";

type DonorDraft = {
  basicDetails?: any;
  selectedOrgans?: string[];
  consentDetails?: any;
};

type DonorContextType = {
  donorDraft: DonorDraft;
  setDonorDraft: React.Dispatch<React.SetStateAction<DonorDraft>>;
};

const DonorContext = createContext<DonorContextType | null>(null);

export const DonorProvider = ({ children }: { children: React.ReactNode }) => {
  const [donorDraft, setDonorDraft] = useState<DonorDraft>({});

  return (
    <DonorContext.Provider value={{ donorDraft, setDonorDraft }}>
      {children}
    </DonorContext.Provider>
  );
};

export const useDonor = () => {
  const ctx = useContext(DonorContext);
  if (!ctx) throw new Error("useDonor must be used inside DonorProvider");
  return ctx;
};
