import React, { useState, useEffect, createContext } from 'react';


import { getCartCount } from '../services/cart';

import { signup, signin, signout, refresh, authsocial,forgotpassword } from '../services/auth';
import { getUserProfile,updateavatar,updatecover,updatePassword,updateProfile,addaddress,deleteaddresses,updateaddress } from '../services/user';
import { getUserLevel } from '../services/level';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider =  ({ children }) => {
    const [jwt, setJwt] = useState({});
    const [userProfile, setUserProfile] = useState({});
    const [countCart, setCountCart] = useState(0);
    const [level, setLevel] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [splashLoading, setSplashLoading] = useState(false);
    
    const register = (user) => {
        setIsLoading(true);
        setError('');
        setSuccess('');
        signup(user)
            .then(data => {
                if (data.success) setSuccess(data.success);
                else if (data.error) setError(data.error);
            })
            .catch(err => {
                console.log('register', err);
                setError('Server Error!');
            })
            .finally(() => {
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                    setSuccess('');
                }, 3000);
            });
    }
    const login = (user) => {
        setIsLoading(true);
        setError('');
        setSuccess('');
        signin(user)
            .then(data => {
                if (data.success) {
                    const { accessToken, refreshToken, _id, role } = data;
                    setJwt({ accessToken, refreshToken, _id, role });
                    AsyncStorage.setItem('jwt', JSON.stringify({ accessToken, refreshToken, _id, role }));
                }
                else if (data.error) setError(data.error);
            })
            .catch(err => {
                console.log('login', err);
                setError('Server Error!');
            })
            .finally(() => {
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                    setSuccess('');
                }, 3000);
            });
    }
    const loginSocial = (user) => {
        setIsLoading(true);
        setError('');
        setSuccess('');
        authsocial(user)
            .then(data => {
                if (data.success) {
                    const { accessToken, refreshToken, _id, role } = data;
                    setJwt({ accessToken, refreshToken, _id, role });
                   AsyncStorage.setItem('jwt', JSON.stringify({ accessToken, refreshToken, _id, role }));
                }
                else if (data.error) setError(data.error);
            })
            .catch(err => {
                setError('Server Error!');
            })
            .finally(() => {
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                    setSuccess('');
                }, 3000);
            });
    }
   
    const logout = (refreshToken) => {
        setIsLoading(true);
        signout(refreshToken)
            .then(data => {})
            .catch(error => {})
            .finally(() => {
                setJwt({});
                setUserProfile({});
                AsyncStorage.removeItem('jwt');
                setIsLoading(false);
            });
    }


    const resetCountCart = (userId, token) => {
        getCartCount(userId, token)
            .then(data => {
                setCountCart(data.count);
            })
            .catch(error => {});
    }


    const forgotPassword = (username) => {
        setIsLoading(true);
        setError('');
        setSuccess('');
        forgotpassword({ email: username })
            .then(data => {
                if (data.error) setError(data.error);
                else setSuccess(data.success);
            })
            .catch(err => {
                setError('Server Error!');
            })
            .finally(() => {
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                    setSuccess('');
                }, 3000);
            });
    }

    const isLoggedIn = async () => {
        try {
            setSplashLoading(true);
            let jwt = await AsyncStorage.getItem('jwt');
            jwt = JSON.parse(jwt);

            if (jwt) {
                const { refreshToken } = jwt;
                const data = await refresh(refreshToken);
                setJwt({ 
                    accessToken: data.accessToken, 
                    refreshToken: data.refreshToken, 
                    _id: jwt._id, 
                    role: jwt.role, 
                });
                AsyncStorage.setItem('jwt', JSON.stringify({ 
                    accessToken: data.accessToken, 
                    refreshToken: data.refreshToken, 
                    _id: jwt._id, 
                    role: jwt.role,
                }));
            }
                
            setSplashLoading(false);
        } catch (err) { 
            // console.log(err);
            setSplashLoading(false);
        }
    }

    const getProfile = async () => {
        try {
            setSplashLoading(true);
            let jwt = await AsyncStorage.getItem('jwt');
            jwt = JSON.parse(jwt);

            if (jwt && jwt._id && jwt.accessToken) {
                const data = await getUserProfile(jwt._id, jwt.accessToken);
                const data1 =  await getCartCount(jwt._id, jwt.accessToken);
                setUserProfile(data.user);
                setCountCart(data1.count);
            }

            setSplashLoading(false);
        } catch (err) {
            // console.log(err);
            setSplashLoading(false);
        }
    }
    const updateAvatar= async(photo)=>{
        
            setIsLoading(true);
            setError('');
         
            updateavatar(jwt._id, jwt.accessToken, photo)
            .then((data) => {
                if (data.error) {
                    setError(data.error);
                    setTimeout(() => {
                        setError('');
                    }, 3000);
               
                } 
              setUserProfile(data.user);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error)
                setError('Server Error');
                setIsLoading(false);
                setTimeout(() => {
                    setError('');
                }, 3000);
            });
    }
    const updateCover= async(photo)=>{
        
        setIsLoading(true);
        setError('');
     
        updatecover(jwt._id, jwt.accessToken, photo)
        .then((data) => {
            if (data.error) {
                setError(data.error);
                setTimeout(() => {
                    setError('');
                }, 3000);
           
            } 
          
          setUserProfile(data.user);
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error)
            setError('Server Error');
            setIsLoading(false);
            setTimeout(() => {
                setError('');
            }, 3000);
        });
}
const changePassword = (user) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    updatePassword(jwt._id, jwt.accessToken,user)
        .then(data => {
            if (data.error) setError(data.error);
            else setSuccess(data.success);
        })
        .catch(err => {
            setError('Server Error!');
        })
        .finally(() => {
            setIsLoading(false);
            setTimeout(() => {
                setError('');
                setSuccess('');
            }, 3000);
        });
}
const changeProfile = (user) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    updateProfile(jwt._id, jwt.accessToken,user)
        .then(data => {
            if (data.error) setError(data.error);
            else{
                setSuccess(data.success);
                setUserProfile(data.user); 
            }
             
        })
        .catch(err => {
            setError('Server Error!');
        })
        .finally(() => {
            setIsLoading(false);
            setTimeout(() => {
                setError('');
                setSuccess('');
            }, 3000);
        });
}
const addAddress = (address) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    addaddress(jwt._id, jwt.accessToken,address)
        .then(data => {
            if (data.error) setError(data.error);
            else{
                setSuccess(data.success);
                setUserProfile(data.user); 
            }
             
        })
        .catch(err => {
            setError('Server Error!');
        })
        .finally(() => {
            setIsLoading(false);
            setTimeout(() => {
                setError('');
                setSuccess('');
            }, 3000);
        });
}
const updateAddress = (index,address) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    updateaddress(jwt._id, jwt.accessToken,index,address)
        .then(data => {
            if (data.error) setError(data.error);
            else{
                setSuccess(data.success);
                setUserProfile(data.user); 
            }
             
        })
        .catch(err => {
            setError('Server Error!');
        })
        .finally(() => {
            setIsLoading(false);
            setTimeout(() => {
                setError('');
                setSuccess('');
            }, 3000);
        });
}
const deleteAddress = (address) => {
    setIsLoading(true);
    setError('');
    setSuccess('');
    deleteaddresses(jwt._id, jwt.accessToken,address)
        .then(data => {
            if (data.error) setError(data.error);
            else{
                setSuccess(data.success);
                setUserProfile(data.user); 
            }
             
        })
        .catch(err => {
            setError('Server Error!');
        })
        .finally(() => {
            setIsLoading(false);
            setTimeout(() => {
                setError('');
                setSuccess('');
            }, 3000);
        });
}
const getLevel = async() => {
    try {
        data =await getUserLevel(jwt._id);
    
        setLevel(data.level);
    } catch (error) { }
}
    useEffect(() => {
        isLoggedIn();
    }, []);

    useEffect(() => {
        getProfile();
    }, [jwt]);
    useEffect(() => {
        getLevel();
       
    }, [jwt._id]);
        
    return (
        <AuthContext.Provider
            value={{
                jwt,
                userProfile,
                countCart,
                isLoading,
                splashLoading,
                error,
                success,
                level,
                register,
                login,
                logout,
                loginSocial,
                resetCountCart,
                forgotPassword,
                updateAvatar,
               updateCover,
               changePassword,
               changeProfile,
               addAddress,
               deleteAddress,
               updateAddress,
                setUserProfile,
                
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}