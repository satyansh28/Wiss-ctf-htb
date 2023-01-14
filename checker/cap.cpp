#include<iostream>
#include<stdlib.h>
#include<sys/types.h>
#include<unistd.h>
#include<string>
using namespace std;
int main(int argc,char *argv[]){
    setuid(0);
    string command="/bin/bash cap.sh";
    if(argc<=1)
    {    
        cout<<"Provide file to scan\n";
        return(0);
    }
    for(int i=1;i<argc;i++)
        command+=" "+(string)(argv[i]);
    const char* arr=command.c_str();
    system(arr);
    return 0;
}