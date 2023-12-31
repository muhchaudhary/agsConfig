import * as Utils from 'resource:///com/github/Aylur/ags/utils.js';
import Service from 'resource:///com/github/Aylur/ags/service.js';
import options from '../options.js';
import GLib from 'gi://GLib';
import { dependencies } from '../utils.js';

const KBD = options.brightnessctlKBD;

const screen_avail = GLib.file_test('/sys/class/backlight/intel_backlight/brightness', GLib.FileTest.EXISTS);

class Brightness extends Service {
    static {
        Service.register(this, {}, {
            'screen': ['float', 'rw'],
            'kbd': ['int', 'rw'],
            'screen_available': ['bool', 'rw'],
        });
    }

    #kbd = 0;
    #kbdMax = 2;
    #screen = 0;
    #screen_available = screen_avail;

    get kbd() { return this.#kbd; }
    get screen() { return this.#screen; }
    get screen_available() { return this.#screen_available; }
    
    set kbd(value) {
        if (!dependencies(['brightnessctl']))
            return;

        if (value < 0 || value > this.#kbdMax)
            return;

        Utils.execAsync(`brightnessctl -d ${KBD} s ${value} -q`)
            .then(() => {
                this.#kbd = value;
                this.changed('kbd');
            })
            .catch(console.error);
    }

    set screen(percent) {
        if (!dependencies(['brightnessctl']))
            return;
        // check if backlight is present
        if (percent < 0)
            percent = 0;

        if (percent > 1)
            percent = 1;

        Utils.execAsync(`brightnessctl -c backlight s ${percent * 100}% -q`)
            .then(() => {
                this.#screen = percent;
                this.changed('screen');
            })
            .catch(console.error);
    }

    constructor() {
        super();

        if (dependencies(['brightnessctl'])) {
            this.#kbd = Number(Utils.exec(`brightnessctl -d ${KBD} g`));
            this.#kbdMax = Number(Utils.exec(`brightnessctl -d ${KBD} m`));
            this.#screen = Number(Utils.exec('brightnessctl -c backlight g')) / Number(Utils.exec('brightnessctl m'));
        }
    }
}


export default new Brightness();
