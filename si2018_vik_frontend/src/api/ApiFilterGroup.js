/*
 Za eventualne nejasnoce javiti se autoru (Adnan Elezović)

 primjer izgleda jednog ApiFilterGroup objekta:

 {
   "type": "group",
   "operator": "or",
   "operands": [
     {
       "type": "filter",
       "operator": "=",
       "operandA": "id",
       "operandB": 5
     },
     {
       "type": "group",
       "operator": "and",
       "operands": [
         {
            "type": "filter",
            "operator": ">=",
            "operandA": "pressure",
            "operandB": 2
         },
         {
            "type": "filter",
            "operator": "<",
            "operandA": "max_pressure",
            "operandB": 100
         }
       ]
     }
   ]
 }

 treba da se prevede u where klauzu:

 where id = 5 OR ( pressure >= 2 AND max_pressure < 100 )

 treba da se podrze operatori:

 greater than equal ( >= )
 greater than ( > )
 lower than ( < )
 lower than equal ( <= )
 equals ( = )
 not equals ( <> )
 in range ( in )

 // todo dodati vise (focus na string comparison, case insensitive )

*/

import ApiFilter from "./ApiFilter";

class ApiFilterGroup {
    type: string = 'group'; // ovo polje nije neophodno, ali olaksava backend support


    operator: string; // 'and' or 'or'
    operands: (ApiFilter|ApiFilterGroup)[];


    static Group(operator, ...operands: (ApiFilter|ApiFilterGroup) ): ApiFilterGroup {
        return {
            type: 'group',
            operator: operator,
            operands: operands
        };
    }

    static GroupAnd(...operands: (ApiFilter|ApiFilterGroup) ): ApiFilterGroup {
        return ApiFilterGroup.Group('and', ...operands);
    }

    static GroupOr(...operands: (ApiFilter|ApiFilterGroup) ): ApiFilterGroup {
        return ApiFilterGroup.Group('or', ...operands);
    }
}

export default ApiFilterGroup;
