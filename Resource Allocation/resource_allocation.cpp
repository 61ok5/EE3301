#include <iostream>

using namespace std;

int main()
{
    int x = 6, n = 4; // n rows e.g. r4(x4), 0 to x, x + 1 items 
    int r[n][x+1] = {
        {0, 3, 6, 8, 10, 13, 13},
        {0, 2, 3, 5, 7, 9, 12},
        {0, 1, 3, 7 ,9 ,11, 13},
        {0, 2, 4, 7, 10, 11, 12}
    };
    int a[x+1] = {0};
    for (int i = 0; i < x + 1; i++){
        cout << "f" << n << "(" << i << ") = " << r[n-1][i];
        if (i != x)
            cout << ", ";
    }
    cout << endl;
    for (int i = n - 1; i > 0; i--){
        cout << "f" << i << endl;
        for (int j = 0; j < x + 1; j++){
            cout << "f" << i << "(" << j << ") = max[";
            int t = -1;
            int m = -1;
            int tp = -1;
            string p = "";
            for (int k = 0; k <= j; k++){
                t = r[i-1][k] + r[i][j-k];
                tp++;
                cout << r[i-1][k] << " + " << r[i][j-k];
                if (j != k)
                    cout << ", ";
                if (t == m){
                    p += (" or " + to_string(tp));
                }
                if (t > m){
                    m = t;
                    p = to_string(tp);
                }
            }
            a[j] = m;
            cout << "] = " << m << ", p" << i << "(" << j << ") = " << p << endl;
        }
        for (int j = 0; j < x + 1; j++){
            r[i-1][j] = a[j];
        }
        cout << endl;
    }
    return 0;
}
