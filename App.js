/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { 
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Styled from 'styled-components/native';

//CSS는 나중에 해야겠다..ㅎ
//이곳에 사용하고자하는 컴포넌트를 명시(import)해야 <Text>, <View>이런식으로 사용 가능

import WeatherView from './src/OpenWeatherAPI';
import ModalClass from './src/UserInfo';

const Container = Styled.SafeAreaView
`   flex: 1;
background-color: #EEE;
`;

const App: () => React$Node = () => {
  return (
    <Container>
      <ModalClass/>
      <MainContainer/>
    </Container>
  );
};



const MainContainer= ()=>{
  

  return(

      <View style={{
        flex:1,
        flexDirection:'column', //자식개체를 위에서 아래로정렬
        justifyContent:'center', //자식개체 수직 중앙정렬
        alignItems:'center', //자식개체 수평중앙정렬
      }}>

      <WeatherView/>

        <Text style={styles.sectionTitle}>오늘의 날씨는?</Text>
        <View style={{width:200, height:100, backgroundColor:'skyblue'}}>
          <Text>기온 정보 기입= 오늘날씨 문장</Text>
        </View>
        <View style={{width:100, height:50, backgroundColor: 'steelblue'}}>
          <Text>특수 기상</Text>
        </View>

      </View>
  )
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
