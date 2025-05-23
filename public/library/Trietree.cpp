template <int char_size, int base>
struct Trie {
    struct Node { // 頂点を
        vector<int> next;    // 子の頂点番号を格納。存在しなければ-1
        vector<int> accept;  // 末端がこの頂点になる文字列の str_id を保存
        int c;               // base からの間隔をint型で表現したもの
        int common;          // いくつの文字列がこの頂点を共有しているか
        Node(int c_) : c(c_), common(0) {
            next.assign(char_size, -1);
        }
    };
    vector<Node> nodes;  // trie 木本体
    int root; // 根
    Trie() : root(0) {
        // 初期化。はじめは根しか無い
        nodes.push_back(Node(root));
    }

    /*
    その他のメソッド（insert や search） などを実装する
    */

}