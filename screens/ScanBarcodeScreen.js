import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";
import { BarCodeScanner, Permissions } from "expo";

import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBgColor
  }
});

class ScanBarcodeScreen extends React.Component {
  static navigationOptions = {
    title: "Scan Barcode"
  };

  state = {
    hasCameraPermission: null
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  handleBarCodeScanned = ({ data }) => {
    const { navigation } = this.props;
    navigation.goBack();
    navigation.state.params.onSelected(data);
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <View style={styles.container} />;
    }
    if (hasCameraPermission === false) {
      return (
        <View style={styles.container}>
          <Text>
            Please grant Tupelo camera permission to use the barcode scanner.
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeScanned}
          style={StyleSheet.absoluteFill}
          barCodeTypes={[BarCodeScanner.Constants.BarCodeType.ean13]}
        />
      </View>
    );
  }
}

ScanBarcodeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
};

export default ScanBarcodeScreen;
