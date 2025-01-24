import React, {FC, ReactNode} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Navigation from "../navigation/Navigation.ts";
import {Colors} from "../styles/Colors.ts";
import {Icon} from "./icons/Icon.ts";

interface IHeaderProps {
  title?: string;
  showBack?: boolean;
  rightComponent?: ReactNode;
  onBackPress?: () => void;
}

export const Header: FC<IHeaderProps> = ({showBack, title, rightComponent, onBackPress}) => {
  const handleBackNavigation = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      Navigation.pop();
    }
  };

  return (
    <View style={styles.header}>
      <View style={styles.side}>
        {showBack && (
          <TouchableOpacity onPress={handleBackNavigation}>
            <Icon name={'ic_fluent_arrow_left_24_regular'} size={24}/>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.center}>
        {title ? (
          <Text style={styles.title}>
            {title}
          </Text>
        ) : null}
      </View>

      <View style={styles.side}>{rightComponent}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minHeight: 44,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  side: {
    width: 24
  },
  center: {
    flex: 1,
    paddingHorizontal: 15
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    color: Colors.black
  }
});
