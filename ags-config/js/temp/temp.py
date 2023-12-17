#sensors -jA | python -c 'import json,sys;obj=json.load(sys.stdin);print(obj["k10temp-pci-00c3"]["Tctl"]["temp1_input"])'

import json
import subprocess

class Temp(object):
    json_read = json.loads(subprocess.check_output(['sensors', 'k10temp-pci-00c3', '-jA']))['k10temp-pci-00c3']

    @property
    def curr_cpu_temp(self) -> float:
        return self.json_read['Tctl']['temp1_input']


tp = Temp()
cpu_temp = tp.curr_cpu_temp
print(cpu_temp)