# include <iostream>
# include <vector>
# include <algorithm>
using namespace std;
using ll = long long;

//使い方
// 前計算の最大値と法 mod を指定（例: 最大 n = 100000, mod = 1e9+7）
// int max_n = 100000;
// ll mod = 1000000007LL;
// Combination combCalc(max_n, mod);

// // 例: 10C3 の値を求める
// int n = 10, r = 3;
// cout << "10C3 = " << combCalc.comb(n, r) << "\n";

// // 例: 入力に基づいて nCr を計算
// int N, R;
// cin >> N >> R;
// cout << N << "C" << R << " = " << combCalc.comb(N, R) << "\n";


// Combination クラス
// コンストラクタで最大値 n と mod を受け取り、事前計算を行います。
// mod は素数である必要があります。
class Combination {
    private:
        std::vector<ll> fact;     // 階乗の値
        std::vector<ll> inv_fact; // 階乗の逆元の値
        ll mod;
    
        // 繰り返し二乗法による高速な modular exponentiation
        ll mod_pow(ll base, ll exp) const {
            ll result = 1;
            while(exp > 0) {
                if(exp & 1) {
                    result = (result * base) % mod;
                }
                base = (base * base) % mod;
                exp >>= 1;
            }
            return result;
        }
    
    public:
        // コンストラクタ
        // max_n: 前計算する最大の n
        // mod: 法（素数） ※ mod は必ず素数でなければなりません
        Combination(int max_n, ll mod) : mod(mod) {
            fact.resize(max_n + 1);
            inv_fact.resize(max_n + 1);
            
            // 階乗の前計算
            fact[0] = 1;
            for (int i = 1; i <= max_n; i++) {
                fact[i] = (fact[i - 1] * i) % mod;
            }
            
            // 最大値の階乗の逆元を計算（Fermat の小定理を利用）
            inv_fact[max_n] = mod_pow(fact[max_n], mod - 2);
            
            // 逆階乗の前計算
            for (int i = max_n; i >= 1; i--) {
                inv_fact[i - 1] = (inv_fact[i] * i) % mod;
            }
        }
    
        // 組み合わせ nCr (n 個から r 個を選ぶ) の値を mod 付きで返す
        // r < 0 または n < r の場合は 0 を返します
        ll comb(int n, int r) const {
            if(r < 0 || n < r) return 0;
            return ((fact[n] * inv_fact[r]) % mod * inv_fact[n - r]) % mod;
        }
    };