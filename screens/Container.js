import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image
} from 'react-native';
import { Card } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { LOAD_ALL_BOOKING } from '../actions';
const totalRecords = require('../db.json');
import StepIndicator from 'react-native-step-indicator';

const labels = ["Request", "Service", "Payment"];
const customStyles = {
  stepIndicatorSize: 25,
  currentStepIndicatorSize:30,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: '#0892d0',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: '#0892d0',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: '#0892d0',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: '#0892d0',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: '#0892d0',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: '#0892d0'
}

function Container ({ type, position }) {

  const dispatch = useDispatch();
  const allBooking = useSelector(state => state.allBooking.allBooking);
  const PENDING_REQUEST = "Pending Request"
  const UPCOMING_SERVICE = "Upcoming Service"
  const PENDING_PAYMENT = "Pending Payment"
  const ACCEPT_REQUEST = "Accept Request"
  const GENERATE_INVOICE = "Generate Invoice"
  const RESEND_INVOICE = "Resend Invoice"
  let data = (allBooking && Array.isArray(allBooking)) ? allBooking.filter((item) => {
    return item.status === type
  }) : null
  let [limit, setLimit] = useState(5)
  let counter = 0

  useEffect(() => {
    (async function mount() {
      dispatch({type: LOAD_ALL_BOOKING, allBooking: totalRecords});
    })()
  }, []);

  const viewMore = () => {
    setLimit(limit + 5)
    if (limit >= data.length) {
      console.log("no more items")
    }
  }
  
  const handlePress = (item) => {
    const newArr = allBooking.map(obj => {
      if (obj.id === item.id && item.status === type) {
        let itemStatus
        if (item.status === "pending") {
          itemStatus = "active"
        } else if (item.status === "active") {
          itemStatus = "payment"
        } else {
          itemStatus = "pending"
        }
        return {...obj, status: itemStatus};
      }
      return obj;
    });
    dispatch({type: LOAD_ALL_BOOKING, allBooking: newArr});
  }
  
  return(
    <View style={styles.container}>
      <View style={{flex: 0.9}}>
        { data &&
          <FlatList contentContainerStyle={{ paddingBottom: 50}}
            disableScrollViewPanResponder={true}
            data={data.slice(counter, limit)}
            renderItem={({ item }) => (
            <View>
            { item.status === type &&
            <Card style={{margin: 20, marginBottom: -10, borderRadius: 5, borderWidth: 1}}>
              <View style={{marginLeft: 4, marginRight: 8}}>
                <View style={{flexDirection: 'row', marginTop: 5, marginBottom: 10}}>
                  <View style={{flex: 3, marginLeft: "3%", marginRight: "3%", marginTop: 10}}>
                    <Text style={{fontWeight: 'bold', color: "#fc6047",paddingBottom: "1%", fontSize: 14}}>{(item.status === "pending") ? PENDING_REQUEST : (item.status === "active") ? UPCOMING_SERVICE : PENDING_PAYMENT}</Text>
                  </View>
                  <View style={{flex: 4.5, marginLeft: "3%", marginRight: "3%"}}>
                    <StepIndicator
                      stepCount={3}
                      customStyles={customStyles}
                      currentPosition={position}
                      labels={labels}
                    />
                  </View>
                </View>    
                <View style={{flexDirection: 'row', marginRight: 10}}>
                  <Image
                    style={{flex: 2, height: 60, width: 48, borderRadius: 1000}}
                    source={require('../images/user.png')}
                  />
                  <View style={{flex: 4, marginLeft: "3%", marginRight: "3%", marginTop: 10}}>
                    <Text style={{fontWeight: 'bold', color: "#0892d0",paddingBottom: "1%"}}>{item.name}</Text>
                    <Text style={{fontWeight: 'bold', fontSize: 12, paddingBottom: "1%"}}>{item.location}</Text>
                  </View>
                  <Text style={{flex: 4, marginTop: 10, fontSize: 13, fontWeight: 'bold'}}>You two had 12 deals before</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handlePress(item)}
                  >
                    <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold', margin: 5}}>
                      {(item.status === "pending") ? ACCEPT_REQUEST : (item.status === "active") ? GENERATE_INVOICE : RESEND_INVOICE}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
            }
            </View>
            )}
            keyExtractor={item => item.id}
          />
        }
      </View>
      <View style={{flex: 0.1}}>
        { (data && Array.isArray(data) && data.length > limit) ?
          (<View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => viewMore()}
            >
              <Text style={{color: '#fff', fontSize: 15, fontWeight: 'bold', margin: 5}}>
                View more
              </Text>
            </TouchableOpacity>
          </View>) :
          (<View  style={{alignItems: 'center'}}>
            <Text style={{fontWeight: 'bold', color: '#999999'}}>No more booking</Text>
          </View>)
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  button: {
    elevation: 8,
    margin: 10,
    backgroundColor: "#0892d0",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#0892d0'
  }
})

export default Container;