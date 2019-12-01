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
  ActivityIndicator

} from 'react-native';

const BaseUrl = "https://billers-app.herokuapp.com/api";

import { MaterialCommunityIcons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import Loader from '../components/loader';

import formatDate from '../helpers/format-date';

export default class ListScreen extends React.Component {

  state = {
    paidBills : [],
    unpaidBills: [],
    loading : false
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

  payBill = billId => {
    this.setState({loading: true});

    fetch(`${BaseUrl}/bills/paid/${billId}`, {
      method: 'PUT',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify({paidChannel: "MoneyManager"})
    })
      .then(res =>res.json())
      .then(res => {
        console.log(res)
        this.setState({loading: false});
      })
      .catch(e => {
        console.log(e);
      });
  }

  componentDidMount() {
    this.setState({loading: true});
    this.getAllBillers();
  }

  render() {
    const {paidBills, unpaidBills} = this.state;
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
            <Text style={styles.price}>$ 8,500</Text>
            <Text style={styles.additionalInfo}>Issued by Money Manager Bank</Text>
          </View>
        </View>
        {unpaidBills.length ? (
          <View>
            <Text style={styles.billTitle}>Unpaid Bills</Text>
            <FlatList
              data={unpaidBills}
              renderItem={({ item }) => (
                <View style={styles.card}>
                  <Image
                    style={{width: 50, height: 50, margin: 10}}
                    source={{uri: 'https://cdn-images-1.medium.com/max/1200/1*ty4NvNrGg4ReETxqU2N3Og.png'}}
                  />
                  <View style={styles.info}>
                    <Text styles={styles.title}>{item.biller}</Text>
                    <Text style={styles.price}>$ {item.amount}</Text>
                    <Text style={styles.additionalInfo}>Bill Generated on {formatDate(item.date)}</Text>
                    <TouchableOpacity
                      onPress={() => this.payBill(item._id)}
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
  }
});