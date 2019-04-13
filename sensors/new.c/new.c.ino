
int  sensPin      = 19;     
                                      
double alpha   = 0.75;
int period         = 20;
double change = 0.0;

char receivedChar;
boolean newData = false;


void setup() {
  // initialize the serial communication:
  Serial.begin(9600);
  pinMode(10, INPUT); // Setup for leads off detection LO +
  pinMode(11, INPUT); // Setup for leads off detection LO -

  pinMode (sensPin, INPUT);


//connection to r-pi


  pinMode(3, OUTPUT);
  pinMode(5, OUTPUT);
  pinMode(6, OUTPUT);

}

void loop() {
  
  if((digitalRead(10) == 1)||(digitalRead(11) == 1)){
    
      Serial.println("N/A");
      Serial.print("\t");
      Serial.print("N/A");
      Serial.print("\t");
      
  }
  else{
      int x=analogRead(A0);
    // send the value of analog input 0:
      Serial.println(analogRead(A0)-395);
      Serial.print("\t");
      Serial.print(x);
      Serial.print("\t");
      Serial.flush();
  }



digitalWrite(led, HIGH);
delay(200);
digitalWrite(led, LOW);
delay(200);

}



void recvInfo() {

  if (Serial.available() > 0) {

    receivedChar = Serial.read();
    newData = true;
    
  }
  
}

void lightLED() {

  int led = (receivedChar - '0');

  while(newData == true) {

    digitalWrite(led, HIGH);
    delay(2000);
    digitalWrite(led, LOW);

    newData = false;
    
  }}
