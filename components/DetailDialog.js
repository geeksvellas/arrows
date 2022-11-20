import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Ionicons';

const DetailDialog = ({onClose, data}) => {
  return (
    <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)'}}>
      <View
        style={{
          alignItems: 'flex-end',
        }}>
        <TouchableOpacity style={{padding: 5}} onPress={onClose}>
          <Icons name="close-circle" color="red" size={30} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          marginHorizontal: 20,
          marginBottom: 10,
          backgroundColor: '#002e71',
          borderRadius: 15,
          padding: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: Dimensions.get('window').width / 35,
              }}>
              Description:
            </Text>
          </View>
          <View
            style={{
              flex: 3,
              borderTopStartRadius: 10,
              borderTopEndRadius: 10,
              backgroundColor: 'white',
              justifyContent: 'flex-start',
              paddingHorizontal: 10,
            }}>
            <Text style={{fontSize: Dimensions.get('window').width / 35}}>
              {data.DESC_ENG}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: Dimensions.get('window').width / 35,
              }}>
              GRN No.:
            </Text>
          </View>
          <View
            style={{
              flex: 3,
              backgroundColor: 'white',
              justifyContent: 'flex-start',
              paddingHorizontal: 10,
            }}>
            <Text style={{fontSize: Dimensions.get('window').width / 35}}>
              {data.SKU}
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: Dimensions.get('window').width / 35,
              }}>
              Shipment Ref:
            </Text>
          </View>
          <View
            style={{
              flex: 3,
              backgroundColor: 'white',
              justifyContent: 'flex-start',
              paddingHorizontal: 10,
            }}>
            <Text style={{fontSize: Dimensions.get('window').width / 35}}>
              AIR - 12/04/2019
            </Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
              paddingHorizontal: 10,
            }}>
            <Text
              style={{
                color: 'white',
                fontSize: Dimensions.get('window').width / 35,
              }}>
              Carton No:
            </Text>
          </View>
          <View
            style={{
              flex: 3,
              borderBottomStartRadius: 10,
              borderBottomEndRadius: 10,
              backgroundColor: 'white',
              justifyContent: 'flex-start',
              paddingHorizontal: 10,
            }}>
            <Text style={{fontSize: Dimensions.get('window').width / 35}}>
              23492
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
    alignItems: 'center',
  },
});

export default DetailDialog;
