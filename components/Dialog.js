import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
// import SignaturePad from 'react-native-signature-pad';
import SignatureCapture from 'react-native-signature-capture';

const {width, height} = Dimensions.get('window');

export default function Dialog({visibleAlert, type, onAccept, onReject}) {
  const [imageBase, setimageBase] = useState(null);
  const sign = useRef(null);
  const types = {
    timeout: {
      title: 'Please sign below',
      button1: 'Confirm',
      button2: 'Cancel',
      nextState: 'Time In',
    },
  };
  signaturePadError = (error) => {
    console.log(error);
  };

  signaturePadChange = (base64DataUrl) => {
    // console.log('Got new signature: ', base64DataUrl);
    onAccept(
      types[type].nextState,
      'data:image/png;base64,' + base64DataUrl.encoded,
    );
    // setimageBase(base64DataUrl);
  };
  return (
    <Modal animationType="fade" transparent={true} visible={visibleAlert}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
        }}>
        {types[type] && (
          <View
            style={
              type == 'timeout'
                ? {
                    flex: 1,
                    backgroundColor: '#002e71',
                    padding: 20,
                    borderRadius: 8,
                    width: width * 0.7,
                  }
                : {
                    backgroundColor: '#002e71',
                    padding: 20,
                    borderRadius: 8,
                    width: width * 0.7,
                  }
            }>
            <Text
              style={[
                {color: 'white', fontSize: width / 25, textAlign: 'center'},
              ]}>
              {types[type].title}
            </Text>
            {type == 'timeout' ? (
              // <SignaturePad
              //   onError={signaturePadError}
              //   onChange={signaturePadChange}
              //   style={{flex: 1, backgroundColor: 'white', borderRadius: 6}}
              // />
              <SignatureCapture
                style={[{flex: 1}]}
                ref={sign}
                onSaveEvent={signaturePadChange}
                // onDragEvent={signaturePadChange}
                saveImageFileInExtStorage={false}
                showNativeButtons={false}
                showTitleLabel={false}
                backgroundColor="white"
                strokeColor="black"
                minStrokeWidth={4}
                maxStrokeWidth={4}
                viewMode={'landscape'}
              />
            ) : (
              <></>
            )}
            <View
              style={{
                flexDirection: 'row',
                padding: 20,
              }}>
              <TouchableOpacity
                style={{
                  backgroundColor: 'green',
                  paddingVertical: 5,
                  flex: 1,
                  marginRight: 10,
                  borderRadius: 5,
                }}
                onPress={() => {
                  sign.current.saveImage();
                }}>
                <Text
                  style={[
                    {color: 'white', fontSize: width / 25, textAlign: 'center'},
                  ]}>
                  {types[type].button1}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: 'red',
                  paddingVertical: 5,
                  flex: 1,
                  borderRadius: 5,
                }}
                onPress={() => {
                  sign.current.resetImage();
                  onReject();
                }}>
                <Text
                  style={[
                    {color: 'white', fontSize: width / 25, textAlign: 'center'},
                  ]}>
                  {types[type].button2}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
