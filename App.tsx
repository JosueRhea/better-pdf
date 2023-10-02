import { ThemeProvider } from '@shopify/restyle';
import Routes from './src';
import { PdfProvider } from './src/context/pdf';
import { theme } from './src/theme';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { usePermissions } from './src/hooks/use-permissions';
import { Permissions } from './src/screens/permissions';

export default function App() {
  const { accepted, loaded } = usePermissions();
  return (
    <PdfProvider>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          {loaded && <>{accepted ? <Routes /> : <Permissions />}</>}
        </SafeAreaProvider>
      </ThemeProvider>
    </PdfProvider>
  );
}
