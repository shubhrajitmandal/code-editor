'use client';
import { useState } from 'react';
import './globals.css';

import { ThemeContext, WorksheetContextProvider } from '@/context';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [theme, setTheme] = useState<string>('light');

  return (
    <html lang="en">
      <head>
        <title>Code Editor</title>
      </head>
      <body data-theme={theme}>
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <WorksheetContextProvider>{children}</WorksheetContextProvider>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
