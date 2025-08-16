import Phaser from 'phaser';
import { Plugin as NineSlicePlugin } from 'phaser3-nineslice'

export default {
  type: Phaser.AUTO,
  parent: 'game',
  backgroundColor: '#33A5E7',
  scale: {
    width: 800,
    height: 600,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  plugins: {
    global: [NineSlicePlugin.DefaultCfg],
  },
};
