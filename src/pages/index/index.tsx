import * as React from 'react';
import { View, Text, Image } from 'remax/one';
import { Button } from 'annar'
import styles from './index.scss';

export default () => {
  return (
    <View className={styles.app}>
      <View className={styles.header}>
        <Image
          src="https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*OGyZSI087zkAAAAAAAAAAABkARQnAQ"
          className={styles.logo}
        />
        <View className={styles.text}>
          编辑 <Text className={styles.path}>src/pages/index/index.js</Text>{' '}
          开始
        </View>
        <Button type="primary" size="large">开始</Button>
      </View>
    </View>
  );
};
