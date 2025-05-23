// n以下の素数リストを入れた配列を返す
#include <bits/stdc++.h>
#include <atcoder/all>
using namespace std;
using namespace atcoder;

using ll = long long;



vector<ll> Prime(int n){
    vector<bool>is_Prime;
    is_Prime.resize(n,true);
    vector<ll>prime;
    is_Prime[0]=false;
    is_Prime[1]=false;
    for( ll i = 2;i<n;i++) is_Prime[i] = true;
    for( ll i = 2;i<n;i++){
        if(is_Prime[i]){
            prime.push_back(i);
            for( ll j = 2*i;j<n;j+=i){
                is_Prime[j] = false;
            }
        }
    }

    return prime;
}
