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
  ActivityIndicator,
  Alert
} from 'react-native';

const BaseUrl = "https://billers-app.herokuapp.com/api";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Loader from '../components/loader';

import formatDate from '../helpers/format-date';
import {AsyncStorage} from 'react-native';

export default class ListScreen extends React.Component {

  state = {
    paidBills : [],
    unpaidBills: [],
    loading : false,
    walletBalance: 0
  }

  getAllBillers = () => {
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
      })
      .catch(e => {
        console.log(e);
      });
  }

  payBill = (billId, amount) => {

    fetch(`${BaseUrl}/bills/paid/${billId}`, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({paidChannel: "MoneyManager"})
    })
      .then(res =>res.json())
      .then(res => {
        let index = this.state.unpaidBills.findIndex(i => i._id == billId);
        this.setState({
          loading: false,
          unpaidBills: [
            ...this.state.unpaidBills.slice(0, index),
            ...this.state.unpaidBills.slice(index+1)
          ],
          walletBalance: this.state.walletBalance - amount
        },() => {
          Alert.alert(
            'Payment Complete',
            `Payment of ${amount} is completed`,
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            {cancelable: false},
          );
          AsyncStorage.setItem("BALANCE", `${this.state.walletBalance}`);
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  async componentDidMount() {
    this.setState({loading: true});
    this.getAllBillers();
    const value = await AsyncStorage.getItem('BALANCE');
    if (value !== null) {
      this.setState({walletBalance: +value});
    }
  }

  render() {
    const {paidBills, unpaidBills, walletBalance} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.wallet}>
          <MaterialCommunityIcons
            style={styles.icon}
            color={Colors.tintColor}
            name="wallet"
            size={40}
          />
          <View style={styles.info}>
            <Text styles={styles.title}>MoneyManager Wallet Balance</Text>
            <Text style={styles.price}>$ {walletBalance}</Text>
            <Text style={styles.additionalInfo}>Issued by Money Manager Bank</Text>
          </View>
        </View>
        {unpaidBills.length ? (
          <View>
            <Text style={styles.billTitle}>Unpaid Bills</Text>
            <FlatList
              style={styles.list}
              data={unpaidBills}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Image
                    style={{width: 50, height: 50, margin: 10}}
                    source={{uri: item.billerInfo[0].logoUrl}}
                  />
                  <View style={styles.info}>
                  <Text styles={styles.title}>{item.billType}</Text>
                    <Text styles={styles.title}>by {item.billerInfo[0].name}</Text>
                    <Text style={styles.price}>$ {item.amount}</Text>
                    <Text style={styles.additionalInfo}>Bill Generated on {formatDate(item.date)}</Text>
                    <TouchableOpacity
                      onPress={() => this.payBill(item._id, item.amount)}
                      style={styles.payButton}
                    >
                      <Text style={styles.payText}>Pay</Text>
                  </TouchableOpacity>
                  </View>

              </View>
              )}
              onRefresh={this.getAllBillers}
              refreshing={this.state.loading}
              keyExtractor={(bill, key) => `${key}`}
            />
          </View>
        ) : null}
        {this.state.loading ? (
          <Loader/>
        ) : null}
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
  wallet: {
    flexDirection: "row",
    marginBottom:20
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
  },
  payButton: {
    backgroundColor: "#86CF00",
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 10
  },
  payText: {
    color: "#fff",
  },
  billTitle: {
    backgroundColor: Colors.lightGrey,
    paddingVertical: 10,
    paddingLeft: 20,
    fontWeight: "bold"
  },
  list: {
    marginBottom: 120
  }
});