import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';
import Container from './Container';

function Services () {

  const type = "active"
  const position = 1
  
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

export default Services;