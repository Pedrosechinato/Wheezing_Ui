import React, { useState, useEffect } from 'react';
import { Image, StyleSheet } from 'react-native';

import AVATAR_DEFAULT from '../images/user.png';

function Avatar({ style, img }) {
  const [avatar, setAvatar] = useState('');
  const [avatarStyle, setAvatarStyle] = useState({ ...styles.avatar });

  useEffect(() => {
    setAvatar(img);
  }, [img]);

  useEffect(() => {
    setAvatarStyle({ ...styles.avatar, ...style });
  }, [style]);

  const URL_IMG = avatar ? { uri: avatar } : AVATAR_DEFAULT;

  return <Image source={URL_IMG} style={avatarStyle} />;
}

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 50,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default Avatar;
