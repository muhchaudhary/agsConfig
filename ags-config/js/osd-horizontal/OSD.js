import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import Indicator from '../services/onScreenIndicator.js';
import Audio from 'resource:///com/github/Aylur/ags/service/audio.js';
import Brightness from '../services/brightness.js';

const VolumeSliderLevel = () => Widget.LevelBar({
    class_name: 'level-box',
    connections: [[
        Audio,
        self => self['value'] = `${Audio['speaker']?.volume}`,
    ]],
})


const BrightnessSliderLevel = () => Widget.LevelBar({
    class_name: 'level-box',
    connections: [[
        Brightness,
        self => self['value'] = Brightness.screen
    ]],
});

const KeyboardSliderLevel = () => Widget.LevelBar({
    class_name: 'level-box',
    connections: [[
        Brightness,
        self => self['value'] = Brightness.kbd / 2 
    ]],
})

const OverlayBox = (SliderType,width) => Widget.Overlay({
    class_name: 'progress-overlay',
    child: SliderType(),
    pass_through: true,
    overlays: [Widget.Box({
        hpack: 'center',
        children: [
            Widget.Icon({
                hpack: 'center',
                size: width,
                connections: [
                    [Indicator, (icon, _v, name) => icon.icon = name || '']
                ],
            }),
        ],
    })]
});

export const OnScreenIndicator = ({ height = 200, width = 40} = {}) => Widget.Box({
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
                    ['speaker', 
                        Widget.Box({ class_name: 'progress',
                                     children:[OverlayBox(VolumeSliderLevel,width)]
                                    })],
                    ['display', 
                        Widget.Box({ class_name: 'progress',
                                     children:[OverlayBox(BrightnessSliderLevel,width)]
                                    })],
                    ['kbd', 
                    Widget.Box({ class_name: 'progress',
                                 children:[OverlayBox(KeyboardSliderLevel,width)]
                                })],
                ],
                connections: [
                    [Indicator, (stack, _v, _i, osdName) => { stack.shown = `${osdName}`; }]
                ]
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
