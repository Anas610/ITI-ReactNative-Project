import React from 'react';
import {ReactChild} from 'react';
import {StyleSheet, ViewStyle, Pressable, Text} from 'react-native';
import {COLORS, FONTS} from './Theme';

function PrimaryButton(props) {
  const {
    text,
    customCls,
    disable = false,
    width = '100%',
    fullButton = true,
    children,
    onPress = () => {},
  } = props;

  return (
    <Pressable
      style={[
        styles.primaryButton,
        customCls,
        disable ? styles.disabledButton : null,
      ]}
      onPress={onPress}
      android_ripple={{color: COLORS.primary[300], borderless: true}}
      disabled={disable}>
      {text && <Text style={[styles.text, FONTS.primaryFam]}>{text}</Text>}
      {children}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  primaryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 0,
    borderRadius: 4,
    backgroundColor: COLORS.primary[400],
  },
  disabledButton: {
    backgroundColor: COLORS.primary[400],
    opacity: 0.7,
  },
  text: {
    color: 'white',
  },
});

export default PrimaryButton;
