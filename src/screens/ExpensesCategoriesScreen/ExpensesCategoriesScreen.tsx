import React, {FC, useEffect} from 'react';
import {FlatList, Text, View} from 'react-native';
import {Chip} from 'react-native-paper';
import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {StackScreenProps} from '@react-navigation/stack';
import {MainStackParamsList} from '../../navigation/types';

export const ExpensesCategoriesScreen: FC<
  StackScreenProps<MainStackParamsList>
> = ({navigation}) => {
  const [categories, setCategories] = React.useState<
    FirebaseFirestoreTypes.DocumentData[]
  >([]);

  useEffect(() => {
    const subscriber = firestore()
      .collection('categories')
      .onSnapshot(documentSnapshot => {
        const promise = documentSnapshot.docs.map(async doc => {
          const total = await firestore()
            .collection('categories')
            .doc(doc.id)
            .collection('expenses')
            .get();
          return {
            id: doc.id,
            total: total.docs.reduce(
              (acc, doc) => acc + Number(doc.data().amount),
              0,
            ),
            ...doc.data(),
          };
        });

        Promise.all(promise).then(data => {
          setCategories(data);
        });
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, []);

  return (
    <View style={{marginHorizontal: 16, flex: 1}}>
      <View style={{height: 120}}>
        <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 20}}>
          ხარჯის კატეგორიები
        </Text>
        <Chip
          onPress={() => navigation.navigate('NewExpenseScreen')}
          style={{
            paddingVertical: 6,
            backgroundColor: '#fff',
            marginTop: 20,
          }}>
          <View>
            <View>
              <Text
                style={{
                  fontSize: 12,
                  color: '#7D7D7D',
                  paddingTop: 6,
                  paddingBottom: 6,
                }}
                numberOfLines={2}>
                კატეგორიის დამატება
              </Text>
            </View>
          </View>
        </Chip>
      </View>
      <FlatList
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}
        data={categories}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        renderItem={({item}) => (
          <Chip
            onPress={() => {
              navigation.navigate('ExpenseDetailsScreen', {
                categoryId: item.id,
                oil: item.oil,
              });
            }}
            style={{
              marginBottom: 16,
              height: 80,
              paddingVertical: 6,
              backgroundColor: '#fff',
              flex: 0.48,
            }}>
            <View>
              <View>
                <Text>{(item.total ?? 0) + 'ლ'}</Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#7D7D7D',
                    paddingTop: 6,
                    paddingBottom: 6,
                  }}
                  numberOfLines={2}>
                  {item.name}
                </Text>
              </View>
            </View>
          </Chip>
        )}
        numColumns={2}
      />
    </View>
  );
};
