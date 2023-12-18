import Widget from 'resource:///com/github/Aylur/ags/widget.js'
import prayerService from '../../services/PrayerTimesService.js'
import PanelButton from '../PanelButton.js'

export default () =>
  PanelButton({
    class_name: 'bar-prayer-times-box panel-button',
    content: Widget.Label({
      truncate: 'end',
      xalign: 0,
      maxWidthChars: 24,
      label: '',
      connections: [
        [
          prayerService,
          self => {
            {
              if (prayerService.nextPrayerName != '') {
                if (!prayerService.prayerNow) {
                  self.label =
                    `${prayerService.nextPrayerName}` +
                    `(${prayerService.nextPrayerTime})`
                } else {
                  self.label = `حان الان وقت صلاة ${prayerService.prayerNow}`
                }
              } else {
                self.label = `غير متاحة`
              }
            }
          }
        ]
      ]
    })
  })
