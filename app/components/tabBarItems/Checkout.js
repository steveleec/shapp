'use strict';

import React from 'react-native';
import Dimensions from 'Dimensions';

var window = Dimensions.get('window');

let {
  View,
  Text,
  StyleSheet
} = React;

export default class Checkout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
     <View style={{ flex: 1, backgroundColor: 'white' }}>

      <Text>Checkout</Text>
     </View>
    );
  }
}

var styles = StyleSheet.create({
});
