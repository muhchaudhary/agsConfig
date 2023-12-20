import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Indicator from '../services/onScreenIndicator.js';
import FontIcon from '../misc/FontIcon.js';
import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import Audio from 'resource:///com/github/Aylur/ags/service/audio.js';
import Brightness from '../services/brightness.js';

const VolumeSliderLevel = () => Widget.LevelBar({
    class_name: 'level-box',
    connections: [[
        Audio,
        self => self['value'] = `${Audio['speaker']?.volume}`,
    ]],
})

const BrightnessSlider = () => Widget.Slider({
    draw_value: false,
    hexpand: true,
    binds: [['visible', Brightness, 'screen_available'],
            ['value', Brightness, 'screen']
    ],
});

const BrightnessSliderLevel = () => Widget.LevelBar({
    class_name: 'level-box',
    connections: [[
        Brightness,
        self => self['value'] = Brightness.screen
    ]]
});

export const OnScreenIndicator = ({ height = 200, width = 35 } = {}) => Widget.Box({
    class_name: 'indicator',
    css: 'padding: 1px;',
    child: Widget.Revealer({
        transition: 'slide_left',
        connections: [[Indicator, (revealer, value, _) => {
            revealer.reveal_child = value > -1;
        }]],
        child: 
            Widget.Stack({
                vpack: 'start',
                hpack: 'center',
                hexpand: false,
                items: [
                    ['speaker', Widget.Box({
                        class_name: 'progress',
                        children: [
                            Widget.Icon({
                                hpack: 'center',
                                size: width,
                                connections: [[Indicator, (icon, _v, name) => icon.icon = name || '']],
                            }),
                            VolumeSliderLevel(),
                        ],
                    })],
                    ['display', Widget.Box({
                        class_name: 'progress',
                        children: [
                            Widget.Icon({
                                hpack: 'center',
                                size: width,
                                connections: [[Indicator, (icon, _v, name) => icon.icon = name || '']],
                            }),
                            BrightnessSliderLevel(),
                        ]})
                    ],
                ],
                connections: [[Indicator, (stack, _v, name,r) => {
                    stack.shown = r;
                }]]
            }),
    }),
});

/** @param {number} monitor */
export default monitor => Widget.Window({
    name: `indicator${monitor}`,
    monitor,
    class_name: 'indicator',
    layer: 'overlay',
    anchor: ['bottom'],
    margins: [100,],
    child: OnScreenIndicator(),
});
