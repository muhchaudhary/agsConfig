import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import Widget from 'resource:///com/github/Aylur/ags/widget.js';
import PowerProfiles from 'resource:///com/github/Aylur/ags/service/powerprofiles.js';
import icons from '../../icons.js';
import { ArrowToggleButton, Menu } from '../ToggleButton.js';

export const ProfileToggle = () => ArrowToggleButton({
    name: 'asusctl-profile',
    icon: Widget.Icon({ binds: [['icon', PowerProfiles, 'icon-name']] }),
    label: Widget.Label({ binds: [['label', PowerProfiles, 'active-profile']]}),
    connection: [PowerProfiles, () => PowerProfiles.active_profile !== 'power-saver'],
    activate: () => PowerProfiles.active_profile = 'performance',
    deactivate: () => PowerProfiles.active_profile = 'power-saver',
    activateOnArrow: false,
});

export const ProfileSelector = () => Menu({
    name: 'asusctl-profile',
    icon: Widget.Icon("power-profile-balanced-symbolic"),
    title: Widget.Label('Profile Selector'),
    content: [
        Widget.Box({
            vertical: true,
            hexpand: true,
            children: [
                Widget.Box({
                    vertical: true,
                    children: PowerProfiles.profiles.map(perf => Widget.Button({
                        on_clicked: () => PowerProfiles.active_profile = perf.Profile,
                        child: Widget.Box({
                            children: [
                                Widget.Icon(perf.icon_name),
                                Widget.Label(perf.Profile),
                            ],
                        }),
                    })),
                }),
            ],
        }),
    ],
});
