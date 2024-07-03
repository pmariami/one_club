import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {LoginScreen} from '../screens/LoginScreen/LoginScreen';
import {RegistrationScreen} from '../screens/RegistrationScreen/RegistrationScreen';
import {ExpensesCategoriesScreen} from '../screens/ExpensesCategoriesScreen/ExpensesCategoriesScreen';
import {ExpenseDetailsScreen} from '../screens/ExpenseDetailsScreen/ExpenseDetailsScreen';
import {NewExpenseScreen} from '../screens/NewExpenseScreen/NewExpenseScreen';
import {AddExpenseScreen} from '../screens/AddExpenseScreen/AddExpenseScreen';
import {MainStackParamsList} from './types';

const Stack = createStackNavigator<MainStackParamsList>();

export function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegistrationScreen" component={RegistrationScreen} />
      <Stack.Screen
        name="ExpensesCategoriesScreen"
        component={ExpensesCategoriesScreen}
      />
      <Stack.Screen
        name="ExpenseDetailsScreen"
        component={ExpenseDetailsScreen}
      />
      <Stack.Screen name="NewExpenseScreen" component={NewExpenseScreen} />
      <Stack.Screen name="AddExpenseScreen" component={AddExpenseScreen} />
    </Stack.Navigator>
  );
}
