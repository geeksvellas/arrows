import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {RNCamera as Camera} from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
export default function ScanBarcode({navigation}) {
  const [torch, settorch] = useState(false);
  const [Diclaimer, setDiclaimer] = useState(false);
  const [scanResult, setscanResult] = useState('');
  const [barcodeEnabled, setbarcodeEnabled] = useState(true);
  const onBarCodeRead = ({data, rawData, type}) => {
    if (barcodeEnabled) {
      console.log(data, rawData, type);
      setbarcodeEnabled(false);
      setDiclaimer(true);
      setscanResult(data);
      //   // if (barcodes[0].data.indexOf('errorCode') == -1) {
      //   this.setState({
      //     isBarcodeScannerEnabled: false,
      //     showAlert: true,
      //   });

      //   // }
    }
  };
  return (
    <View style={styles.container}>
      <Modal
        onRequestClose={() => setDiclaimer(false)}
        animationType="fade"
        transparent={true}
        visible={Diclaimer}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.6)',
          }}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              width: '70%',
              paddingVertical: 20,
              borderRadius: 6,
            }}>
            <Text
              style={{
                fontSize: Dimensions.get('window').width / 25,
                fontFamily: 'sans-serif-condensed',
                fontWeight: '700',
                textAlign: 'center',
              }}>
              {'Scan Result:'}
            </Text>
            <Text
              style={{
                fontSize: Dimensions.get('window').width / 25,
                fontFamily: 'sans-serif-condensed',
                fontWeight: '700',
                textAlign: 'center',
                color: 'black',
              }}>
              {scanResult}
            </Text>

            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => {
                  //   navigation.navigate('Inventory', {scan: scanResult});
                  navigation.reset({
                    index: 0,
                    routes: [{name: 'Inventory', params: {scan: scanResult}}],
                  });
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: Dimensions.get('window').width / 30,
                    fontFamily: 'sans-serif-condensed',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    textAlign: 'center',
                    margin: 10,
                    backgroundColor: 'black',
                    borderRadius: 6,
                    fontWeight: '700',
                  }}>
                  Correct
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setDiclaimer(false);
                  setbarcodeEnabled(true);
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: Dimensions.get('window').width / 30,
                    fontFamily: 'sans-serif-condensed',
                    paddingHorizontal: 20,
                    paddingVertical: 10,
                    textAlign: 'center',
                    margin: 10,
                    backgroundColor: 'black',
                    borderRadius: 6,
                    fontWeight: '700',
                  }}>
                  Rescan
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <View style={styles.cameraContainer}>
        <Camera
          style={styles.preview}
          onBarCodeRead={onBarCodeRead}
          flashMode={torch ? Camera.Constants.FlashMode.torch : null}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}>
          <BarcodeMask edgeColor={'rgb(250, 204, 4)'} outerMaskOpacity={0} />
        </Camera>
      </View>
      <View style={styles.bottomOverlay}>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: 'rgb(250, 204, 4)',
            margin: 10,
            borderRadius: 10,
          }}
          onPress={() => settorch(!torch)}>
          <Icon name="ios-flash" size={30} color={torch ? 'white' : 'black'} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  cameraIcon: {
    height: 40,
    width: 40,
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
  preview: {
    flex: 1,
    width: '100%',
  },
});
