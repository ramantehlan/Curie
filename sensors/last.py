import serial
import time

# The second argument is the baudrate, change according to the baudrate you gave to your Serial.begin command
ser = serial.Serial("/dev/ttyACM0",9600)

# To avoid communication failure due to bad timings
ser.setDTR(True);
time.sleep(1);
ser.setDTR(False)

while True:
    print ser.readline()
