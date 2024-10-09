import { createContext, Dispatch, SetStateAction } from 'react';

interface IThemeContext {
  theme: string;
  setTheme: Dispatch<SetStateAction<string>>;
}

const contextDefaultValue = {
  theme: 'light',
  setTheme: () => {},
};

export const ThemeContext = createContext<IThemeContext>(contextDefaultValue);
