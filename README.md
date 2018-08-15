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
