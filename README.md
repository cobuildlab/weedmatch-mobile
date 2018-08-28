# Weedmatch

Weedmatch uniendo amantes del cannabis

## Installation

### Steps
* $ npm install
* $ react-native link
* $ cd ios
* $ pod install

### Mac OSX. changing java version:

You don't need to down grade. You can run more than one version of Java on MacOS. You can set the version of your terminal with this command in MacOS.

# List Java versions installed
/usr/libexec/java_home -V

# Java 10
export JAVA_HOME=$(/usr/libexec/java_home -v 10)

# Java 9
export JAVA_HOME=$(/usr/libexec/java_home -v 9)

# Java 1.8
export JAVA_HOME=$(/usr/libexec/java_home -v 1.8)

# Java 1.7
export JAVA_HOME=$(/usr/libexec/java_home -v 1.7)

# Java 1.6
export JAVA_HOME=$(/usr/libexec/java_home -v 1.6)

NOTA: actualment la version para Android solo se puede compilar con Java 8 (Java 9 / Java 10 no estan soportados por ReactNative)


## Compilar version para Android

- Actualizar la version en el app.gradle
- cd android 
- ./gradlew assembleRelease --info  


## compilar la version para IOS

- abrir el archivo .xcodeproject de la carpeta /ios
- Actualizar la version en el INFO.plist
- Generar y firmar la aplicacion con XCODE
