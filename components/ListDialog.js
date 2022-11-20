import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
  FlatList,
} from 'react-native';

export default function ListDialog({
  list,
  visibleModal,
  onSelect,
  type,
  onClose,
}) {
  return (
    <Modal animationType="slide" transparent={true} visible={visibleModal}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'rgba(0,0,0,0.8)',
          padding: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              color: 'white',
              fontSize: Dimensions.get('window').width / 30,
            }}>
            {type == 'Rack'
              ? 'Select Rack'
              : type == 'Driver'
              ? 'Select Driver'
              : 'Select Warehouse'}
          </Text>
          <TouchableOpacity onPress={onClose}>
            <Text
              style={{
                color: 'white',
                fontSize: Dimensions.get('window').width / 40,
              }}>
              Close
            </Text>
          </TouchableOpacity>
        </View>
        {/* <ScrollView> */}
        <View
          style={{
            flex: 1,
          }}>
          <FlatList
            data={list}
            numColumns={5}
            initialNumToRender={18}
            maxToRenderPerBatch={18}
            keyExtractor={item =>
              type == 'Rack'
                ? item.RACK_LABEL
                : type == 'Driver'
                ? item.DRIVER_NAME
                : item.NAME
            }
            columnWrapperStyle={{flex: 1}}
            renderItem={({item}) => (
              <>
                <TouchableOpacity
                  onPress={() =>
                    onSelect(
                      type == 'Rack'
                        ? item.RACK_LABEL
                        : type == 'Driver'
                        ? [item.DRIVER_NAME, item.ID]
                        : item.NAME,
                    )
                  }
                  style={{
                    flex: 1 / 5,
                    backgroundColor:
                      type == 'Rack'
                        ? item.RACK_LABEL == ''
                          ? 'transparent'
                          : 'white'
                        : item.NAME == ''
                        ? 'transparent'
                        : 'white',
                    padding: 10,
                    margin: 10,
                    borderRadius: 6,
                  }}>
                  <Text style={{textAlign: 'center', color: 'black'}}>
                    {type == 'Rack'
                      ? item.RACK_LABEL
                      : type == 'Driver'
                      ? item.DRIVER_NAME
                      : item.NAME}
                  </Text>
                </TouchableOpacity>
              </>
            )}
          />
          {/* {list.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    onSelect(type == 'Rack' ? item.RACK_LABEL : type == 'Driver' ? [item.DRIVER_NAME,item.ID] : item.NAME)
                  }
                  style={{
                    width: Dimensions.get('window').width * 0.2,
                    backgroundColor: 'white',
                    padding: 10,
                    margin: 10,
                    borderRadius: 6,
                  }}>
                  <Text style={{textAlign: 'center'}}>
                    {type == 'Rack' ? item.RACK_LABEL : type == 'Driver' ? [item.DRIVER_NAME,item.ID] : item.NAME}
                  </Text>
                </TouchableOpacity>
              );
            })} */}
        </View>
        {/* </ScrollView> */}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
