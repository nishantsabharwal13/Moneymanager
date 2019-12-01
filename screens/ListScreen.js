import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,

} from 'react-native';

const BaseUrl = "https://billers-app.herokuapp.com/api";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';


export default class ListScreen extends React.Component {

  state = {
    paidBills : [],
    unpaidBills: [],
    loading : false
  }

  getAllBillers = () => {
    this.setState({loading: true});
    fetch(`${BaseUrl}/bills`)
    .then(res =>res.json())
    .then(res => {
      this.setState({
        loading: false,
        paidBills: res.filter(bill => !!bill.paid),
        unpaidBills: res.filter(bill => !bill.paid)
      },() => {
        console.log(this.state)
      });
    });
  }

  componentDidMount() {
    this.getAllBillers();
  }

  render() {
    const {paidBills, unpaidBills} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.card}>
          <MaterialCommunityIcons
            style={styles.icon}
            color={Colors.tintColor}
            name="wallet"
            size={30}
          />
          <View style={styles.info}>
            <Text styles={styles.title}>MoneyManager Wallet Balace</Text>
            <Text style={styles.price}>$ 8,500</Text>
            <Text style={styles.additionalInfo}>Issued by Money Manager Bank</Text>
          </View>
        </View>
        {/* {unpaidBills.length && (
          <View>
            <Text>Unpaid Bills</Text>
            <FlatList
              data={paidBills}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <MaterialCommunityIcons
                    style={styles.icon}
                    color={Colors.tintColor}
                    name="wallet"
                    size={30}
                  />
                  <View style={styles.info}>
                    <Text styles={styles.title}>MoneyManager Wallet Balace</Text>
                    <Text style={styles.price}>$ {item.amount}</Text>
                    <Text style={styles.additionalInfo}>Issued by Money Manager Bank</Text>
                  </View>
              </View>
              )}
              keyExtractor={(bill, key) => `${key}`}
            />
          </View>
        )}
        {paidBills.length && (
          <View>
            <Text>Paid Bills</Text>
            <FlatList
              data={paidBills}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <MaterialCommunityIcons
                    style={styles.icon}
                    color={Colors.tintColor}
                    name="wallet"
                    size={30}
                  />
                  <View style={styles.info}>
                    <Text styles={styles.title}>MoneyManager Wallet Balace</Text>
                    <Text style={styles.price}>$ {item.amount}</Text>
                    <Text style={styles.additionalInfo}>Issued by Money Manager Bank</Text>
                  </View>
              </View>
              )}
              keyExtractor={(bill, key) => `${key}`}
            />
          </View>
        )} */}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  icon: {
    margin: 20,

  },
  card: {
    borderWidth: 1,
    borderColor: Colors.lightGrey,
    flexDirection: "row",
    marginVertical: 10,
  },
  info: {
    justifyContent: "center"
  },
  title: {
    fontWeight: "bold",
  },
  price: {
    fontWeight: "bold",
    fontSize: 30
  },
  additionalInfo: {
    color: Colors.lighterText
  }
});