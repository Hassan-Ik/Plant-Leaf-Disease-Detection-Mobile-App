import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, FlatList} from 'react-native';
import {
  PageSafeAreaView,
  PageView,
  Title,
  AppbarHeader,
} from '../components/CustomComponents';
import {
  IconButton,
  ActivityIndicator,
  Colors,
  Searchbar,
} from 'react-native-paper';
import axios from 'axios';
import SizedBox from '../components/SizedBox';
import LibraryListItem from '../components/LibraryListItem';
import {baseURL} from '../baseURL';
import NetInfo from '@react-native-community/netinfo';
import NoInternetModal from '../components/NoInternetModal';
import ErrorModal from '../components/ErrorModal';

const LibraryScreen = ({navigation}) => {
  const [data, setData] = useState([]);
  const [filterOptions, setFilterOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [isOffline, setOfflineStatus] = useState(false);

  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener(state => {
      const offline = !(state.isConnected && state.isInternetReachable);
      setOfflineStatus(offline);
    });
    fetchLibrary();
    setIsLoading(false);
    return () => removeNetInfoSubscription();
  }, []);

  const fetchLibrary = useCallback(() => {
    setIsLoading(true);
    axios
      .get(`${baseURL}/leaf-library/`)
      .then(res => {
        const results = res.data;
        setData(results);
        setFilterOptions(results);
        isOffline && setOfflineStatus(false);
      })
      .catch(error => {
        alert(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [isOffline]);

  const searchFilterFunction = searchQuery => {
    setSearchQuery(searchQuery);
    const filterRegex = new RegExp(searchQuery, 'i');
    if (!searchQuery) {
      setFilterOptions(data);
      return;
    }
    const filterdata = data.filter(data => {
      return data.label.match(filterRegex);
    });
    setFilterOptions(filterdata);
  };
  return (
    <PageSafeAreaView>
      <AppbarHeader>
        <Searchbar
          theme={{
            colors: {
              primary: 'black',
              secondary: 'pink',
            },
          }}
          style={{borderRadius: 50}}
          placeholder="Search"
          onChangeText={query => searchFilterFunction(query)}
          value={searchQuery}
        />
      </AppbarHeader>
      <PageView>
        {isLoading ? (
          <Text>Loading.... Library</Text>
        ) : (
          <>
            <Title
              style={{
                textShadowColor: 'rgba(0, 0, 0, 0.75)',
                textShadowOffset: {width: 1, height: 1},
                textShadowRadius: 3,
                textAlign: 'left',
              }}>
              Leaf Library
            </Title>
            <SizedBox height={20} />
            <View style={{flex: 1}}>
              <FlatList
                listMode="SCROLLVIEW"
                nestedScrollEnabled={true}
                data={filterOptions}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <LibraryListItem
                    navigation={navigation}
                    id={item._id}
                    name={item.label}
                    type={item.leafType}
                    details={item.details}
                    symptoms={item.symptoms}
                    causes={item.causes}
                    effects={item.effects}
                    management={item.management}
                    image={item.image}
                  />
                )}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      width: '100%',
                      height: 10,
                    }}
                  />
                )}
              />
            </View>
          </>
        )}
      </PageView>
      <NoInternetModal
        show={isOffline}
        onRetry={fetchLibrary}
        isRetrying={isLoading}
      />
      {/* <ErrorModal
        show={error}
        setShow={setError}
        errorMessage={errorMessage}
        onRetry={fetchLibrary}
        isRetrying={isLoading}
      /> */}
    </PageSafeAreaView>
  );
};

export default LibraryScreen;
