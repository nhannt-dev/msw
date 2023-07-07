import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Colors from '../../themes/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../../context/AuthContext';
import { STATIC_URL } from '../../config';
import { Avatar } from 'react-native-elements';
import ImagePicker from 'react-native-image-crop-picker';
import { ListItem} from 'react-native-elements'
import { ScrollView } from 'react-native-gesture-handler';

const ChangeProfile = ({ navigation }) => {
  const { jwt, userProfile, updateAvatar, updateCover } = useContext(AuthContext);
   
  const list = [
    {
      title: 'First Name',
      value:userProfile.firstname
    },
    {
      title: 'Last name',
      value:userProfile.lastname
    },
    {
      title: 'Email',
      value:userProfile.email
    },
    {
      title: 'Phone',
      value:userProfile.phone
      
    },
    {
      title: 'Id card',
      value:userProfile.id_card

    },
  ];

  {!userProfile.googleId && !userProfile.facebookId && (
    list.push({title:'Change Password'})
  )}
  
  const chooseAvatarImage= () => {
    ImagePicker.openPicker({}).then(image => {
      const formData = new FormData();
      formData.append('photo',{type:'image/jpg',uri:image.path,name:'123.jpg'})
      updateAvatar(formData)
    });
  }

  const chooseCoverImage = () => {
    ImagePicker.openPicker({}).then(image => {
      const formData = new FormData();
      formData.append('photo',{type:'image/jpg',uri:image.path,name:'123.jpg'})
      updateCover(formData)
    });
  }

  const handleChange= (i) => {
    if(i==0)
    {
      navigation.navigate('EditProfile',{title:'Edit Firstname',value:userProfile.firstname,valid:'isValidFirstname',validator:'name',type:'firstname'});
    }
    if (i==1)
    {
      navigation.navigate('EditProfile',{title:'Edit Lastname',value:userProfile.lastname,valid:'isValidLastname',validator:'name',type:'lastname'});
    }
    if (i==2 && !userProfile.googleId && !userProfile.facebookId)
    {
      navigation.navigate('EditProfile',{title:'Edit email',value:userProfile.email,valid:'isValidEmail',validator:'email',type:'email'});
    }
    if (i==3)
    {
      navigation.navigate('EditProfile',{title:'Edit phone',value:userProfile.phone,valid:'isValidPhone',validator:'phone',type:'phone'});
    }
    if(i==4)
      {
        navigation.navigate('EditProfile',{title:'Edit ID card',value:userProfile.id_card,valid:'isValidIdCard',validator:'id_card',type:'id_card'});
      }
    if (i==5)
    {
      navigation.navigate('ChangePassword');
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
      <ImageBackground 
          source={{uri: STATIC_URL + userProfile.cover }} 
          style={styles.cover}
      >
        <View style={styles.wrapper}>
          <Avatar
            rounded
            size="large"
            source={{
                uri:
                STATIC_URL + userProfile.avatar
            }}
          >
            <Avatar.Accessory iconProps={'camera'} size={23} onPress={()=>chooseAvatarImage()} />
          </Avatar>
          <TouchableOpacity
              style={styles.cover_icon}
              onPress={()=>chooseCoverImage()}
          >
              <Icon style={styles.icon} name={'camera'} />
          </TouchableOpacity>
          {/* <Icon style={styles.cover_icon} name={'camera'} onPress={()=>chooseCoverImage()}/> */}
        </View>
      </ImageBackground>
          
      {list.map((item, i) => (
        <ListItem key={i} bottomDivider onPress={()=>{handleChange(i)}} >
          <ListItem.Content>
            <ListItem.Title>{item.title}</ListItem.Title>
          </ListItem.Content>
          <Text>{item.value}</Text>
          <ListItem.Chevron  />
      </ListItem>
      ))}
      </ScrollView>
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:'100%',
    backgroundColor: Colors.highMuted,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 12,
    backgroundColor: Colors.shadow,
  },
  cover: {
    resizeMode: 'cover',
    width: '100%',
    height: 200,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderColor: Colors.white,
    borderWidth: 3,
    opacity: 1,
  },
  profile: {
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    margin: 12,
    borderRadius: 6,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
  },
  level: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
    color: Colors.white,
    // marginRight: 3,
  },
  point: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.white,
    marginRight: 6,
  },
  cover_icon: {
    position: 'absolute',
    bottom: 6,
    right: 4,
    backgroundColor: Colors.muted,
    width: 32,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
  }
});

export default ChangeProfile;