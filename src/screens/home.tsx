import { Button, Text } from 'react-native';
import { AddNewPdf, ScreenWrapper } from '../components';
import { usePdfs } from '../context/pdf';
import { PdfList } from '../components/pdf-list';

export function HomeScreen() {
  const { docs, addNewDoc } = usePdfs();
  
  return (
    <ScreenWrapper>
      <PdfList data={docs} />
      <AddNewPdf />
    </ScreenWrapper>
  );
}
