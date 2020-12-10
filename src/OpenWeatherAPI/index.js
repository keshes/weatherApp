import React, {useEffect, useState} from 'react'; 
import {FlatList, Alert} from 'react-native';
import { 
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
  } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import Styled from 'styled-components/native';



//import Styled from 'styled-components/native';

//주의!! 주석은 제 개인적인 주관으로 코드를 해석한 것입니다. 잘 못 이해하고 있는 부분도 있음!!

//useEffect/useState 참고:https://velog.io/@solmii/React%EC%9D%98-%ED%95%A8%EC%88%98%ED%98%95-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-feat.Hooks
//fetch() 참고:https://lcw126.tistory.com/239 , https://velog.io/@rhftnqls/map%EA%B3%BC-filter-%EC%A0%81%EC%9A%A9%ED%95%9C-%EA%B3%BC%EC%A0%9C
//에뮬레이터 위치정보 setting 참고:https://qastack.kr/programming/2279647/how-to-emulate-gps-location-in-the-android-emulator , https://www.jesusamieiro.com/android-studio-simulate-multiple-gps-points-with-mock-location-plugin/
//https://dev-yakuza.posstree.com/ko/react-native/react-native-geolocation-service/
//함수형컴포넌트에서 Hooks 기능을 통해 상태관리를 할 수 있게 해준다.(useState, useEffect 등의 기능을 제공)

const API_key= '7823ba39b6b8be327455c2d00ffbb009';
const city_name='London'; //임시로 London으로 함

const WeatherView=(props)=>{ 
    //import React, {useEffect, useState} from 'react'; <이 문장을 통해 useState를 사용할 수 있다.
    //weatherInfo라는 원소를 setWeatherInfo를 통해 원소의 상태값을 설정할 수 있다.
    const [weatherInfo, setWeatherInfo]=useState({
        //useState를 통해 weatherInfo의 원소의 상태값를 초기화한다.
        temperature: undefined, //기온
        weather: undefined, //날씨
        icon: undefined, //날씨 아이콘
        isLoading: false //이건 뭔 용도지
    });
    
    const getCurrentWeather =()=>{

        //위치컴포넌트의 getCurrentPosition함수의 position 파라미터를 통해 위치값을 가져온다. 
                Geolocation.getCurrentPosition(
                  position => { //log로 확인해보니까 position이 가져오는게 객체(object)임
                    const {latitude, longitude} = position.coords; //위도,경도 비구조화 할당(공부 필요)
                    //const weatherIcon; //fetch로 호출한 아이콘아이디를 입력하기위한 변수
                    console.log("현재 좌표: "+latitude+","+longitude);
                    

                    //이를 보다 자세히 이해하기 위해선 PromiseAPId와 XMLHttpRequest 이해해야할 것 같은데 시간이 촉박한 관계로 패스
                
                    //fetch()를 사용해서 URL로 부터 리소스(OpenWeatherAPI)를 요청한다. 제이쿼리의 ajax랑 비슷한 것 같다.
                    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_key}`)
            
                    //.then은 fetch()가 끝나면 실행할 콜백함수인 것 같다.
                    //response를 json 형태로 변환
                    //OpenWeatherAPI의 데이터는 json형태로 호출이 되는데 굳이 json으로 변환하는 것은 키값을 사용하기 위한 것같다.ex>json.main.temp, json.weather[0].main 등
                    .then(response=>response.json())
            
                    //요청한 리소스(json파일)를 json으로 받아서 json을 통해 원하는 파라미터 불러와 사용하는 것 같다.
                    .then(json=> {
                        console.log(json)
                        //json
                        setWeatherInfo({ //weather뒤에 [0]을 왜 넣어야하는걸까.. weather이 배열인가??
                            temperature: json.main.temp, 
                            weather: json.weather[0].main,
                            icon:json.weather[0].icon,
                            isLoading: true
                        });

                        //weatherIcon =icon; 
                    })
                    .catch(error=>{
                        //상태 isLoading값을 true로 변경
                        setWeatherInfo({
                            isLoading: true
                        });
                        console.log(error); //에러출력같음 
                        Alert.alert("날씨 정보 가져오기 실패ㅜㅜ");
                    });

                    

                  },
                  error => {
                    console.log(error.code, error.message);
                  },
                  {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}, //무슨용도인지모르겠다.
                );



    }

    //참고: https://kosaf04pyh.tistory.com/43
    //mount:컴포넌트가 생성되고 DOM에 주입하는 것을 의미하며 처음에 한번만 실행
    //render:DOM에 그려주는 작업으로, props나 state값이 변할때마다 실행

    //useEffect(): 렌더링 될 때마다 특정 작업을 수행하도록 설정할 수 있는 기능
    //유니티로 따지면 Update()같은 기능을 하는 것 같다. 
    //날씨정보가 바뀔때마다 함수를 불러와야해서 시간간격이 필요할 것같다.(계속 불러오면 과부하걸리지않을까?)
   useEffect(()=>{ 
    console.log("렌더링완료");
    getCurrentWeather();
   },[]); 
   //마지막에 ,[]는 []의 값이 바뀔 때마다 계속 실행한다는 의미다.(즉 콜)
   //즉 []는 빈배열이니까 처음 한 번만 실행된다. 
   //사실 이 두번째 파라미터는 불변값을 넣어주기만 하면되는거라서 "hello"나 숫자 등 기본형 데이터타입을 넣어도 잘 작동한다.

   const {temperature, weather, icon, isLoading} = weatherInfo; 
   //키값을 통해 비구조화 할당(weather에 있는 변수들을 같은 이름으로 재할당)

    return(
        <View style={{width:100, height:100, backgroundColor:'powderblue'}}>
            <Text>날씨 아이콘</Text>
            <Image
                style={{height:100, width:100}}
                source={{uri:`http://openweathermap.org/img/wn/${icon}@2x.png`}}/>
    </View>
    );
}
export default WeatherView;