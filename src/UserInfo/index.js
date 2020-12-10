import React, {Component, useEffect, useState} from 'react'; 
import {FlatList, Alert,Modal, TouchableOpacityBase} from 'react-native';
import { 
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Image,
    Icon,
    TouchableOpacity,
    Button,
  } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Styled from 'styled-components/native';


  //모달을 사용하려면 npm install react-native-modal --save를 다운받아야한다.
const ModalClass=()=>{ 
    //모달1 상태
    const [modal1_open,setmodal1_open]=useState(false);

    //모달2 상태
    const [modal2_open,setmodal2_open]=useState(false);

        return(
            <View>
                

                <TouchableOpacity  
                    style={styles.UserInfoIButton}

                onPress={()=> setmodal1_open(true)}>
                    <Text style={styles.UserInfoText}>+</Text>
                </TouchableOpacity>
                <View >
                </View>

                {/* 첫 번째 modal */}
                
                <Modal 
                    animationType={'fade'} //애니메이션효과
                    visible={modal1_open}
                    onRequestClose={() => { //뒤로가거 버튼 혹은 홈버튼을 눌러도 모달이 닫힘
                        setmodal1_open(false)
                      }}
                    transparent={true}  //모달 전체화면, 부분화면 bool
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                            <Text style={styles.headerTitle}>현재 위치</Text>
                                <View 
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between', 
                                    alignItems:'center', 
                                    width:180,
                                }}>
                                <TouchableOpacity onPress={()=>{ setmodal2_open(true); setmodal1_open(false)}} style={styles.ButtonCSS}><Text style={styles.bodyTitle}>실외</Text></TouchableOpacity>
                                 <TouchableOpacity onPress={()=>{ Alert.alert("실외에서 다시 시도해주세요 :)"); setmodal1_open(false) }} style={styles.ButtonCSS}><Text style={styles.bodyTitle}>실내</Text></TouchableOpacity>
                                </View>
                                
                            </View>
                        </View>
                </Modal>

                {/* 두 번쨰 modal */}
                <Modal 
                    animationType={'fade'} //애니메이션효과
                    visible={modal2_open}
                    onRequestClose={() => { //뒤로가거 버튼 혹은 홈버튼을 눌러도 모달이 닫힘
                        setmodal2_open(false)
                      }}
                    transparent={true}  //모달 전체화면, 부분화면 bool
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                            <Text style={styles.headerTitle}>오늘 날씨는 어떤가요?</Text>
                                <View 
                                style={{
                                    flexDirection: 'column',
                                    justifyContent: 'space-around', 
                                    alignItems:'center', 
                                    height:250
                                }}>
                            
                                {/* 아래 버튼 중 하나를 클릭헸을 때 데이터 전송 */}
                                <TouchableOpacity style={styles.ButtonCSS2}><Text style={styles.bodyTitle}>매우추움</Text></TouchableOpacity>
                                 <TouchableOpacity style={styles.ButtonCSS2}><Text style={styles.bodyTitle}>조금추움</Text></TouchableOpacity>
                                 <TouchableOpacity style={styles.ButtonCSS2}><Text style={styles.bodyTitle}>보통</Text></TouchableOpacity>
                                 <TouchableOpacity style={styles.ButtonCSS2}><Text style={styles.bodyTitle}>조금더움</Text></TouchableOpacity>
                                 <TouchableOpacity style={styles.ButtonCSS2}><Text style={styles.bodyTitle}>매우더움</Text></TouchableOpacity>
                                </View>
                                
                            </View>
                        </View>
                </Modal>
            </View>
        );
}

const styles = StyleSheet.create({
    
    headerTitle: {
      fontSize: 30,
      fontWeight: '600',
      color: Colors.black,
    },
    bodyTitle:{
        fontSize: 18,
        textAlign:'center',
        color:Colors.white,
    },
    UserInfoIButton: {
        height:40, 
        width:40,
        borderRadius: 20,
        margin:10,
        backgroundColor: 'pink'
      },
    UserInfoText:{
        fontSize: 40,
        textAlign: 'center',
        justifyContent:'center',
        height:40, 
        width:40,
        position: 'absolute',
        top: -8,
        color:Colors.white
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    }, 
    modalView:{
        margin: 0,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 10
    },
    ButtonCSS:{
        backgroundColor:'#2196F3',
        borderRadius:10,
        width:80,
        height:60,
        justifyContent: "center",
        elevation: 5
    },
    ButtonCSS2:{
        backgroundColor:'#2196F3',
        borderRadius:10,
        width:130,
        height:45,
        justifyContent: "center",
        elevation: 5
    }
   
  });

  export default ModalClass;