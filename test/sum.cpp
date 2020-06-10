#include <bits/stdc++.h>
using namespace std;

int main(int argc, const char** argv) {

    int s = 0;
    int res = 0;
    vector<int> nums;
    // std::cout << argc << endl;
    while ( argc > 1 ) {
        string s(argv[argc-1]);
        stringstream stream;
        stream << s;
        int a;
        stream >> a;
        nums.push_back( a );
        argc--;
    }
    
    std::cout << "Add (type 1) ou Multiply (type anything) ? " << endl;
    string val;
    cin >> val;
    bool do_mult = val.compare("1") != 0; 
    res = do_mult ? 1 : 0;
    for (auto n : nums) {
        if ( do_mult ) res *= n;
        else res += n;
    }
    std::cout << "The answer is " << res << endl;
    return 0;
}