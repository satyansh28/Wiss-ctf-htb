#include<iostream>
#include<stdlib.h>
#include<sys/types.h>
#include<unistd.h>
#include<string>
using namespace std;
int main(int argc,char *argv[]){
    setuid(0);
    string command="bash /home/node/webapp/scripts/Cleancache.sh ";
    if(argc>1)
        command+=" -f "+(string)(argv[1]);
    const char* arr=command.c_str();
    system(arr);
    return 0;
}