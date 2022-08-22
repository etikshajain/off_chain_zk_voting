pragma circom 2.0.6;


template IsZero() {
    signal input in;
    signal output out;

    signal inv;

    inv <-- in!=0 ? 1/in : 0;

    out <== -in*inv +1;
    in*out === 0;
}

template checkIfOptionA() {
    signal input in;
    signal output out;

    var x = 65;

    component isz = IsZero();

    in - x ==> isz.in;

    isz.out ==> out;
}

// out is 1 if equal, 0 otherwise
component main = checkIfOptionA();
