// Pogledaj ApiFilterGroup.js za objasnjenje
class ApiFilter {
    type: string = 'filter'; // ovo polje nije neophodno, ali olaksava backend support

    operator: string;
    operandA: any;
    operandB: any;


    static Filter(op, a, b): ApiFilter {
        return {
            type: 'filter',
            operator: op,
            operandA: a,
            operandB: b
        };
    }

    static Equals(a, b): ApiFilter {
        return ApiFilter.Filter('=', a, b);
    }
    static NotEquals(a, b): ApiFilter {
        return ApiFilter.Filter('<>', a, b);
    }
    static Greater(a, b): ApiFilter {
        return ApiFilter.Filter('>', a, b);
    }
    static GreaterEq(a, b): ApiFilter {
        return ApiFilter.Filter('>=', a, b);
    }
    static Lower(a, b): ApiFilter {
        return ApiFilter.Filter('<', a, b);
    }
    static LowerEq(a, b): ApiFilter {
        return ApiFilter.Filter('<=', a, b);
    }
}

export default ApiFilter;
