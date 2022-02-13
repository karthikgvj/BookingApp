import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Container from './Container';

function Payments () {

  const type = "payment"
  const position = 2

  return(
    <View style={styles.container}>
      <Container type={type} position={position} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
})

export default Payments;