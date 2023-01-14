#include<iostream>
#include<stdlib.h>
#include<sys/types.h>
#include<unistd.h>
int main(){
    setuid(0);
    system("bash /home/node/webapp/scripts/Cleanup.sh");
    return 0;
}