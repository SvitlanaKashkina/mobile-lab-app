import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import axios from 'axios';

// This function registers the device for push notifications and stores the token on your server
async function registerForPushNotificationsAsync(userId) {
  try {
      //Check if the app is running on a physical device (push only works there)
      if (!Device.isDevice) {
        console.log('Push notifications are only available on physical devices');
        return null;  // Abort, no token possible
      }

      // Check current authorization status for push notifications
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      // If permission is not yet available, ask the user
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;  // Save updated status
      }

      // If the user has not given permission, cancel the function
      if (finalStatus !== 'granted') {
        console.log('User has not granted permission for push notifications');
        return null;
      }

      // Read Expo project ID from the app configuration (required for new Expo push tokens)
      const projectId = Constants.expoConfig?.extra?.eas?.projectId;

      // Request push token from server, optionally with project ID
      const tokenData = await Notifications.getExpoPushTokenAsync({
        ...(projectId ? { projectId } : {}),
      });

      // Extract the actual token from the response
      const token = tokenData.data;

      //  Ensure that userId and token exist and token is a string before sending
      if (!userId || !(token && typeof token === 'string')) {
        console.log("No valid userId or push token available");
        return token;
      }

      // Send token and userId to server so that it can send the push messages
      await axios.post(`https://********.com:****/api/push-token`, { userId, token });

      // Return the token so that it can be used further in the frontend
      return token;
  } catch (error) {
      // Catch errors and output them to the console
      console.log('Error registering for push notifications:', error);
      return null;
  }
}


export default registerForPushNotificationsAsync;