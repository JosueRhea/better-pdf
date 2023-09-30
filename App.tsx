import React, {useEffect, useState} from 'react';
import {
  Button,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import DocumentPicker, {
  DocumentPickerResponse,
  isCancel,
  isInProgress,
} from 'react-native-document-picker';
import Pdf from 'react-native-pdf';
import {request, PERMISSIONS, openSettings} from 'react-native-permissions';

function App(): JSX.Element {
  const [result, setResult] = useState<
    DocumentPickerResponse | undefined | null
  >();
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    request(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE).then(result => {
      console.log(result);
    });
    // openSettings().catch(() => console.warn('cannot open settings'));
  }, []);

  useEffect(() => {
    console.log(result);
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
            source={{uri: result.fileCopyUri}}
            onLoadProgress={percent => {
              console.log(percent);
            }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`Number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`Current page: ${page}`);
            }}
            onError={error => {
              console.log(error);
            }}
            onPressLink={uri => {
              console.log(`Link pressed: ${uri}`);
            }}
            style={styles.pdf}
          />
        ) : (
          <Button
            onPress={async () => {
              try {
                const pickerResult = await DocumentPicker.pickSingle({
                  presentationStyle: 'fullScreen',
                  copyTo: 'cachesDirectory',
                  allowMultiSelection: false,
                  type: [DocumentPicker.types.pdf],
                });
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
