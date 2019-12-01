import React from 'react';

import {
  StyleSheet,
  ActivityIndicator,
  View,
  Modal
} from 'react-native';

import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 999999,
    transform: [{scale: 1.3}]
  }
})
class Loader extends React.Component {
  render() {
    return (
      // <View style={[styles.loader, {
      //   opacity: this.props.opacity,
      //   backgroundColor: this.props.bgColor
      // }]}>
      //   <ActivityIndicator
      //     size={this.props.size}
      //     color={this.props.loaderColor}
      // />
      // </View>
      <Modal
        transparent={true}
        animationType={'none'}
        visible={true}
        onRequestClose={() => {console.log('close modal')}}>
        <View style={styles.loader}>
        <ActivityIndicator
          animating={true}
          color={this.props.loaderColor}
          size={this.props.size}
        />
        </View>
      </Modal>
    )
  }
}

Loader.defaultProps = {
  opacity: 1,
  bgColor: 'transparent',
  loaderColor: Colors.lightText,
  size: 'small'
}

export default Loader;
