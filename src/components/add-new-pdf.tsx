import React from 'react';
import DocumentPicker from 'react-native-document-picker';
import { usePdfs } from '../context/pdf';
import { Button } from './ui/button';
import { Plus } from 'lucide-react-native';
const SIZE = 50;
const MARGIN = 20;

export const AddNewPdf = () => {
  const { addNewDoc } = usePdfs();

  const onPress = async () => {
    try {
      const pickerResult = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.pdf],
        copyTo: 'documentDirectory',
      });

      if (pickerResult.fileCopyUri) {
        addNewDoc(pickerResult);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Button
      rippleColor="$primaryForeground"
      backgroundColor="$transparent"
      style={{
        borderRadius: SIZE / 2,
      }}
      position="absolute"
      width={SIZE}
      height={SIZE}
      bottom={SIZE}
      right={MARGIN}
      onPress={onPress}
    >
      <Plus color='white' size={SIZE - MARGIN} />
    </Button>
  );
};
