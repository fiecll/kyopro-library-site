// 繰り返し二乗法による累乗計算（グローバル名前空間に定義）
template<typename T, typename Exponent>
T power(T base, Exponent exp) {
    T result = 1;
    while(exp > 0) {
        if(exp & 1) {
            result *= base;
        }
        base *= base;
        exp >>= 1;
    }
    return result;
}

// 繰り返し二乗法によるmod付き累乗計算（グローバル名前空間に定義）
template<typename T, typename Exponent>
T mod_power(T base, Exponent exp, T mod) {
    T result = 1;
    base %= mod;
    while(exp > 0) {
        if(exp & 1) {
            result = (result * base) % mod;
        }
        base = (base * base) % mod;
        exp >>= 1;
    }
    return result;
}