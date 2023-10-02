import { ScreenWrapper } from '../components';
import { Button } from '../components/ui/button';
import { Text } from '../components/ui/text';
import { openSettings } from "react-native-permissions"

export const Permissions = () => {
  return (
    <ScreenWrapper>
      <Text>Yo need to give access to the storage</Text>
      <Button onPress={openSettings}  rippleColor="$primaryForeground">
        <Text>Open settings</Text>
      </Button>
    </ScreenWrapper>
  );
};
