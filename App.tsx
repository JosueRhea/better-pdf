import { ThemeProvider } from '@shopify/restyle';
import Routes from './src';
import { PdfProvider } from './src/context/pdf';
import { theme } from './src/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <PdfProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <Routes />
        </SafeAreaProvider>
      </ThemeProvider>
    </PdfProvider>
  );
}
