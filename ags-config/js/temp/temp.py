#sensors k10temp-pci-00c3 -jA

import json
import subprocess

class Temp(object):
    sensor = subprocess.run('sensors k10temp-pci-00c3 -jA', shell=True, capture_output=True)
    if sensor.returncode != 1:
        json_read = json.loads(sensor.stdout)['k10temp-pci-00c3']['Tctl']['temp1_input']
    else:
        sensor = subprocess.run('sensors coretemp-isa-0000 -jA', shell=True, capture_output=True)
        json_read = json.loads(sensor.stdout)['coretemp-isa-0000']['Package id 0']['temp1_input']
    @property
    def curr_cpu_temp(self) -> float:
        return self.json_read


tp = Temp()
cpu_temp = tp.curr_cpu_temp
print(cpu_temp)