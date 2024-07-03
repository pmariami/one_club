import {StackScreenProps} from '@react-navigation/stack';
import React, {FC, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {Button, Chip, Text} from 'react-native-paper';
import {MainStackParamsList} from '../../navigation/types';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';

export const ExpenseDetailsScreen: FC<
  StackScreenProps<MainStackParamsList, 'ExpenseDetailsScreen'>
> = ({navigation, route}) => {
  const [expenses, setExpenses] = React.useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('categories')
      .doc(route.params?.categoryId)
      .collection('expenses')
      .onSnapshot(documentSnapshot => {
        setExpenses(
          documentSnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          })),
        );
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, [route.params?.categoryId]);

  return (
    <View style={{marginHorizontal: 16}}>
      <Button
        mode="outlined"
        onPress={() =>
          navigation.navigate('AddExpenseScreen', {
            categoryId: route.params?.categoryId,
            oil: route.params?.oil,
          })
        }
        style={{marginTop: 20}}>
        ხარჯის დამატება
      </Button>

      <Text
        style={{
          marginTop: 40,
          marginBottom: 20,
          fontSize: 16,
          fontWeight: 'bold',
        }}>
        ხარჯები
      </Text>
      <FlatList
        data={expenses}
        renderItem={({item}) => (
          <Chip
            onPress={() => {
              navigation.navigate('AddExpenseScreen', {
                categoryId: route.params?.categoryId,
                expenseId: item.id,
              });
            }}
            style={{
              marginBottom: 16,
              height: 60,
              paddingVertical: 6,
              backgroundColor: '#fff',
              flex: 0.48,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
                alignItems: 'center',
              }}>
              <View>
                <Text
                  style={{
                    fontSize: 12,
                    paddingTop: 6,
                    paddingBottom: 6,
                  }}>
                  {item.companyName.name}
                </Text>
              </View>
              <View>
                <Text>{(item.amount ?? 0) + 'ლ'}</Text>
              </View>
            </View>
          </Chip>
        )}
      />
    </View>
  );
};
