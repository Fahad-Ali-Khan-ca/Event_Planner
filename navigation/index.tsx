import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import EventStack from './EventStack';

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <EventStack />
    </NavigationContainer>
  );
}
