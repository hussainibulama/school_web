import { useMediaQuery, useTheme } from '@mui/material';
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react';

interface IGeneralContextType {
  showIconsOnly: boolean;
  setShowIconsOnly: Dispatch<SetStateAction<boolean>>;
}

const GeneralContext = createContext<IGeneralContextType | undefined>(undefined);

export const GeneralProvider = ({ children }: { children: ReactNode }) => {
  const [showIconsOnly, setShowIconsOnly] = useState<boolean>(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    if (isMobile && showIconsOnly) setShowIconsOnly((prev) => !prev);
  }, [isMobile, showIconsOnly]);

  return (
    <GeneralContext.Provider value={{ showIconsOnly, setShowIconsOnly }}>
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) throw new Error('General context must be used within a General Context Provider');
  return context;
};
