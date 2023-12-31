/**
 * A Theme is a set of options that will be applied
 * ontop of the default values. see options.js for possible options
 */
import { Theme, WP, lightColors } from './settings/theme.js';

export default [
    Theme({
        name: 'Kitty Dark',
        icon: '󰄛',
        'desktop.wallpaper.img': WP + 'kittybl.jpeg',
    }),
    Theme({
        name: 'Kitty Light',
        icon: '󰄛',
        'desktop.wallpaper.img': WP + 'kitty.jpeg',
        ...lightColors,
        'theme.widget.bg': '$accent',
        'theme.widget.opacity': 64,
    }),
    Theme({
        name: 'Leaves',
        icon: '󰌪',
        'desktop.wallpaper.img': WP + 'leaves.jpg',
        'theme.accent.accent': '$green',
        'theme.accent.gradient': 'to right, $accent, darken($accent, 14%)',
        'theme.widget.opacity': 92,
        'border.opacity': 86,
        'theme.bg': 'transparentize(#171717, 0.3)',
        'bar.style': 'floating',
        'radii': 0,
    }),
    Theme({
        name: 'Ivory',
        icon: '󰟆',
        ...lightColors,
        'desktop.wallpaper.img': WP + 'ivory.png',
        'desktop.wallpaper.fg': '$bg_color',
        'desktop.screen_corners': false,
        'bar.style': 'separated',
        'theme.widget.bg': '$accent',
        'theme.widget.opacity': 64,
        'desktop.drop_shadow': false,
        'border.width': 2,
        'border.opacity': 0,
        'theme.accent.gradient': 'to right, $accent, darken($accent, 6%)',
        'hypr.inactive_border': 'rgba(111111FF)',
        'bar.separators': false,
    }),
    Theme({
        name: 'Space',
        icon: '',
        'desktop.wallpaper.img': WP + 'space.jpg',
        'spacing': 11,
        'padding': 10,
        'radii': 12,
        'theme.accent.accent': '$magenta',
        'desktop.screen_corners': false,
        'desktop.clock.enable': false,
        'bar.separators': false,
        'bar.icon': '',
        'theme.bg': 'transparentize(#171717, 0.3)',
        'theme.widget.opacity': 95,
        'bar.flat_buttons': false,
    }),
    Theme({
        name: 'My Theme',
        icon: '',
        "spacing": 14,
        "padding": 10,
        "radii": 12,
        "popover_padding_multiplier": 1,
        "color.red": "#e55f86",
        "color.green": "#00D787",
        "color.yellow": "#EBFF71",
        "color.blue": "#51a4e7",
        "color.magenta": "#9077e7",
        "color.teal": "#51e6e6",
        "color.orange": "#E79E64",
        "theme.scheme": "dark",
        "theme.bg": "transparentize(#00000F,0.1)",
        "theme.fg": "#D2FDFE",
        "theme.accent.accent": "#4AC8FA",
        "theme.accent.fg": "#033163",
        "theme.accent.gradient": "to right, $accent, lighten($accent, 6%)",
        "theme.widget.bg": "$fg-color",
        "theme.widget.opacity": 93,
        "border.color": "$fg-color",
        "border.opacity": 97,
        "border.width": 2,
        "hypr.inactive_border": "rgba(333333ff)",
        "hypr.wm_gaps_multiplier": 0.8,
        //"font.font": "Roboto 10",
        //"font.mono": "Mononoki Nerd Font",
        "font.size": 11,
        "applauncher.width": 500,
        "applauncher.height": 500,
        "applauncher.icon_size": 52,
        "bar.position": "top",
        "bar.style": "separated",
        "bar.flat_buttons": false,
        "bar.separators": false,
        "bar.icon": "distro-icon",
        "battery.bar.width": 90,
        "battery.bar.height": 15,
        "battery.bar.full": false,
        "battery.low": 30,
        "battery.medium": 50,
        "desktop.wallpaper.fg": "#fff",
        "desktop.wallpaper.img": "/home/muhammad/Pictures/lfndtoirttvx.jpg",
        "desktop.avatar": "/var/lib/AccountsService/icons/muhammad",
        "desktop.screen_corners": false,
        "desktop.clock.enable": false,
        "desktop.clock.position": "center center",
        "desktop.drop_shadow": true,
        "desktop.shadow": "rgba(0, 0, 0, 1.6)",
        "notifications.black_list": [
          "Spotify"
        ],
        "notifications.position": [
          "top"
        ],
        "notifications.width": 450,
        "dashboard.sys_info_size": 60,
        "mpris.black_list": [
          "Caprine"
        ],
        "mpris.preferred": "spotify",
        "workspaces": 7
      })
];
