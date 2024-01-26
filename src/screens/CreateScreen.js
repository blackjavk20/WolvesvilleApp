import AccountNavigation from '../navigation/index2';
import React, { useRef, useState } from 'react'
import { View, Text, ScrollView, Image, TextInput, TouchableOpacity } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon, ArrowRightOnRectangleIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

export default function MyDiskScreen() {
    const navigation = useNavigation();
    const [HDD, SetHDD] = useState("");
    const [Ten, setTen] = useState("");
    const [MoTa, setMoTa] = useState("");
    const [KP, setKP] = useState("");
    const [TGN, setTGN] = useState("");
    const [DK, SetDK] = useState('Easy');
    const [ingredients, setIngredients] = useState(['']);
    const [steps, setSteps] = useState([{ text: '', image: '' }]);    

    const pickImage2 = async () => {
        let result = {};
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        })
        if (!result.canceled) {
            SetHDD(result.assets[0].uri);
        }
    };

    const handleX = (index) => {
        const updatedIngredients = [...ingredients];
        updatedIngredients.splice(index, 1);
        setIngredients(updatedIngredients);
    };
    
    const handleNL = () => {
        setIngredients([...ingredients, '']);
    };

    const handleXCL = (index) => {
        const updatedSteps = [...steps];
        updatedSteps.splice(index, 1);
        setSteps(updatedSteps);
    };
    
    const handleCL = () => {
        setSteps([...steps, { text: '', image: '' }]);
    };
    const pickImage = async (index) => {
        let result = {};
        await ImagePicker.requestMediaLibraryPermissionsAsync();
        result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        })
        if (!result.canceled) {
            const updatedSteps = [...steps];
            updatedSteps[index] = { ...steps[index], image: result.assets[0].uri };
            setSteps(updatedSteps);
        }
    };
    const handleDK = (index) => {
        SetDK(index);
    };

    return(
        <View style={{ flex: 1 , backgroundColor: 'white' }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{paddingBottom: 50}}
          >
            <View style={{ paddingVertical: hp(1) , flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', marginTop:hp(2)}}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: hp(3), backgroundColor: 'white' }}>
                    <ChevronLeftIcon size={hp(4)} strokeWidth={3.5} color="#fbbf24" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{justifyContent: 'center' , alignItems: 'center', marginRight: wp(5), height: hp(5),width: wp(30), backgroundColor: '#fbbf24', borderRadius: 10}}>
                    <Text style={{fontWeight: 800 ,fontSize:18, color: 'white'}}>Lên Sóng</Text>
                </TouchableOpacity>
            </View>
            <View style={{backgroundColor: 'gainsboro',paddingVertical: hp(2)}}>
                <TouchableOpacity style={{justifyContent: 'center', alignItems: 'center'}} onPress={() => pickImage2()}>
                    <Image
                        source={HDD ? { uri: HDD } : require('../../assets/images/food.png')}
                        resizeMode="contain" 
                        style={{width: wp(100), height: hp(25)}}
                    />
                    {HDD? <Text/>:<Text style={{fontWeight: 800 ,fontSize:15, color: 'gray'}}>Đăng hình đại diện món ăn</Text>}
                </TouchableOpacity>
            </View >
            <View style={{ paddingVertical: hp(2), marginLeft: wp(3), marginRight: wp(3)}}>
                <TextInput
                    value = {Ten}
                    onChangeText = {text => setTen(text)}
                    className="p-3 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                    placeholder="Nhập vào tên món ăn"
                />
                <TextInput
                    value = {MoTa}
                    onChangeText = {text => setMoTa(text)}
                    className="pt-3 pb-12 pl-3 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                    placeholder="Nhập vào mô tả"
                />
                <View style={{paddingVertical: hp(1) ,  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontWeight: 500 ,fontSize:18, color: 'gray'}}>Khẩu phần</Text>
                    <TextInput
                        value = {KP}
                        onChangeText = {text => setKP(text)}
                        className="p-3 bg-gray-100 text-gray-700 rounded-2xl"
                        style={{width: wp(60)}}
                        placeholder="Nhập vào số người"
                    />
                </View>
                <View style={{paddingVertical: hp(1) ,  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontWeight: 500 ,fontSize:18, color: 'gray'}}>Thời gian nấu</Text>
                    <TextInput
                        value = {TGN}
                        onChangeText = {text => setTGN(text)}
                        className="p-3 bg-gray-100 text-gray-700 rounded-2xl"
                        style={{width: wp(60)}}
                        placeholder="Nhập vào thời gian nấu"
                    />
                </View>
                <View style={{paddingVertical: hp(1),  flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                    <Text style={{fontWeight: 500 ,fontSize:18, color: 'gray', paddingBottom: hp(1)}}>Chọn độ khó</Text>
                    <TouchableOpacity 
                        onPress={() => handleDK('Easy')} 
                        style={{ justifyContent: 'center', alignItems: 'center',  height: hp(6), width: wp(16), borderRadius: 10 ,
                            backgroundColor: DK === 'Easy' ? '#fbbf24' : 'gray',
                        }}
                    >
                        <Text style={{ fontWeight: 600, fontSize: 15, color: 'white' }}>Easy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => handleDK('Medium')} 
                        style={{ justifyContent: 'center', alignItems: 'center', height: hp(6), width: wp(16), borderRadius: 10 ,
                            backgroundColor: DK === 'Medium' ? '#fbbf24' : 'gray',
                        }}
                    >
                        <Text style={{ fontWeight: 600, fontSize: 15, color: 'white' }}>Medium</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        onPress={() => handleDK('Hard')} 
                        style={{ justifyContent: 'center', alignItems: 'center', height: hp(6), width: wp(16), borderRadius: 10 ,
                            backgroundColor: DK === 'Hard' ? '#fbbf24' : 'gray',
                        }}
                    >
                        <Text style={{ fontWeight: 600, fontSize: 15, color: 'white' }}>Hard</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{paddingVertical: hp(1)}}>
                <Text style={{fontWeight: 800 ,fontSize:23, color: 'black', marginLeft: wp(5)}}>Khẩu phần</Text>
                {ingredients.map((ingredient, index) => (
                    <View key={index} style={{ paddingVertical:  hp(1), flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                        <TextInput
                            style={{ width: wp(70), marginLeft: wp(5), padding: 10, backgroundColor: '#f0f0f0', borderRadius: 10 }}
                            placeholder="Nhập vào nguyên liệu"
                            value={ingredient}
                            onChangeText={(text) => {
                            const updatedIngredients = [...ingredients];
                            updatedIngredients[index] = text;
                            setIngredients(updatedIngredients);
                            }}
                        />
                        <TouchableOpacity onPress={() => handleX(index)} style={{ justifyContent: 'center', alignItems: 'center', marginRight: 20, height: hp(6), width: wp(15), backgroundColor: '#fbbf24', borderRadius: 10 }}>
                            <Text style={{ fontWeight: 800, fontSize: 18, color: 'white' }}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity onPress={handleNL} style={{justifyContent: 'center' , alignItems: 'center', height: hp(6),width: wp(40), backgroundColor: 'white', borderRadius: 10, marginLeft: wp(25)}}>
                        <Text style={{fontWeight: 800 ,fontSize:18, color: 'black'}}>+  Nguyên liệu</Text>
                </TouchableOpacity>
            </View>
            <View style={{paddingVertical: hp(1)}}>
                <Text style={{fontWeight: 800 ,fontSize:23, color: 'black', marginLeft: wp(5)}}>Cách làm</Text>
                {steps.map((step, index) => (
                    <View key={index} style={{ paddingVertical:  hp(1), flexDirection: 'row', justifyContent: "space-between", alignItems: 'center'}}>
                        <View> 
                            <TextInput
                                style={{ width: wp(70), marginLeft: wp(5), padding: 10, backgroundColor: '#f0f0f0', borderRadius: 10 }}
                                placeholder="Nhập vào cách làm"
                                value={step.text}
                                onChangeText={(text) => {
                                    const updatedSteps = [...steps];
                                    updatedSteps[index] = { ...step, text: text };
                                    setSteps(updatedSteps);
                                }}
                            />
                            <TouchableOpacity onPress={() => pickImage(index)}>
                                <Image
                                    source={step.image ? { uri: step.image } : require('../../assets/images/food.png')}
                                    style={{ width: wp(25), height: hp(12), marginLeft: 20 }}
                                />
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity onPress={() => handleXCL(index)} style={{ justifyContent: 'center', alignItems: 'center', marginRight: 20, height: hp(6), width: wp(15), backgroundColor: '#fbbf24', borderRadius: 10 }}>
                            <Text style={{ fontWeight: 800, fontSize: 18, color: 'white' }}>Xóa</Text>
                        </TouchableOpacity>
                    </View>
                ))}
                <TouchableOpacity onPress={handleCL} style={{justifyContent: 'center' , alignItems: 'center', height: hp(6),width: wp(30), backgroundColor: 'white', borderRadius: 10, marginLeft: wp(30)}}>
                        <Text style={{fontWeight: 800 ,fontSize:18, color: 'black'}}>+  Bước</Text>
                </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
    )
}