import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { styles } from './OptionCard.styles';
import { OptionCardProps } from './OptionCard.types';

const OptionCard: FC<OptionCardProps> = () => (
  <View style={styles.container}>
    <Text>OptionCard</Text>
  </View>
);

export default OptionCard;
