import React, { useEffect, useState } from 'react';
import {
  Button,
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen';
import DocumentPicker, {
  DocumentPickerResponse,
  isCancel,
  isInProgress,
} from 'react-native-document-picker';
import Pdf from 'react-native-pdf';
import { request, PERMISSIONS } from 'react-native-permissions';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): JSX.Element {
  const [result, setResult] = useState<
    DocumentPickerResponse | undefined | null
  >();
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then((result) => {
      console.log(result);
    });
    // openSettings().catch(() => console.warn('cannot open settings'));
  }, []);

  useEffect(() => {
    AsyncStorage.getItem('paths').then((paths) => {
      if (paths) {
        setResult(JSON.parse(paths));
      }
    });
  }, [result]);

  const handleError = (err: unknown) => {
    if (isCancel(err)) {
      console.warn('cancelled');
      // User cancelled the picker, exit any dialogs or menus and move on
    } else if (isInProgress(err)) {
      console.warn(
        'multiple pickers were opened, only the last will be considered',
      );
    } else {
      throw err;
    }
  };

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      {/* <View style={styles.container}> */}
      {result && result.fileCopyUri ? (
        <Pdf
          source={{ uri: result.fileCopyUri }}
          onLoadProgress={(percent) => {
            console.log(percent);
          }}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      ) : (
        <Button
          onPress={async () => {
            try {
              const pickerResult = await DocumentPicker.pickSingle({
                type: [DocumentPicker.types.pdf],
                copyTo: 'documentDirectory',
              });

              if (pickerResult.fileCopyUri) {
                await AsyncStorage.setItem(
                  'paths',
                  JSON.stringify(pickerResult),
                );
              }
              setResult(pickerResult);
            } catch (e) {
              handleError(e);
            }
          }}
          title="Pick a file"
        />
      )}
      {/* </View> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default App;
