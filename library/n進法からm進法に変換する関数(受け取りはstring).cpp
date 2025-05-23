string n_ary(string str, int n, int m){
    unsigned long tmp = 0;
    string ret;

    for(int i=0; i<str.length(); i++){
        tmp += (unsigned long) ntodec(str[str.length()-1-i]) * pow_ll(n, i);
    }

    if(tmp==0) return "0";
    while(tmp!=0){
        ret = decton(tmp%m) + ret;
        tmp/=m;
    }
    return ret;
}


ll f(string s,ll k){ // K 進法表記の S を、10 進法表記で表す関数
    ll ans=0;
    for(char x:s){
        ans *= k;
        ans += x - '0';
    }
    return ans;
}