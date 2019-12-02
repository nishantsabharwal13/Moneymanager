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
import formatDate from '../helpers/format-date';
import Loader from '../components/loader';
import {AsyncStorage} from 'react-native';

export default class ListScreen extends React.Component {

  state = {
    paidBills : [],
    unpaidBills: [],
    loading : false,
    walletBalance: 0
  }

  static navigationOptions = () => {
    return {
      tabBarOnPress({ navigation, defaultHandler }) {
        navigation.state.params.onTabFocus();
        defaultHandler();
      }
    };
  };

  constructor(props) {
    super(props);
    props.navigation.setParams({
      onTabFocus: this.handleTabFocus
    });
  }

  handleTabFocus = async () => {
    this.getAllBillers();
    const value = await AsyncStorage.getItem('BALANCE');
    if (value !== null) {
      this.setState({walletBalance: +value});
    }
  };

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
    });
  }

  async componentDidMount() {
    this.setState({loading: true});
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
        {paidBills.length ? (
          <View>
            <Text style={styles.billTitle}>Paid Bills</Text>
            <FlatList
              style={styles.list}
              data={paidBills}
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
                    <Text style={styles.additionalInfo}>Paid on {formatDate(item.paidDate)}</Text>
                  </View>
              </View>
              )}
              onRefresh={this.getAllBillers}
              refreshing={this.state.loading}
              keyExtractor={(bill, key) => `${key}`}
            />
          </View>
        ): null}
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
  wallet: {
    flexDirection: "row",
    marginBottom:20
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
    fontSize: 20
  },
  price: {
    fontWeight: "bold",
    fontSize: 30
  },
  additionalInfo: {
    color: Colors.lighterText
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