import ApiFilter from "./ApiFilter";
import ApiFilterGroup from "./ApiFilterGroup";

it('simple filter', () => {
    let filter = ApiFilter.Equals('a', '5');

    expect(filter.type).toBe('filter');

    expect(filter.operandA).toBe('a');
    expect(filter.operandB).toBe('5');

    expect(filter.operator).toBe('=');
});

it('simple filter group', () => {
    let group = ApiFilterGroup.Group('and');

    expect(group.type).toBe('group');
    expect(group.operator).toBe('and');
    expect(group.operands.length).toBe(0);
});

it('filter group of filters', () => {
    let group = ApiFilterGroup.GroupAnd(
        ApiFilter.Equals('id', 10),
        ApiFilter.NotEquals('name', '\'meho\'')
    );

    expect(group.type).toBe('group');
    expect(group.operator).toBe('and');
    expect(group.operands.length).toBe(2);

    expect(group.operands[0].type).toBe('filter');
    expect(group.operands[1].type).toBe('filter');

    expect(group.operands[0].operandB).toBe(10);
    expect(group.operands[1].operandB).toBe('\'meho\'');

    expect(group.operands[0].operandA).toBe('id');
    expect(group.operands[1].operandA).toBe('name');
});

it('filter group of filters and groups', () => {
    let group = ApiFilterGroup.GroupOr(
        ApiFilter.Equals('id', 10),
        ApiFilter.NotEquals('name', '\'meho\''),
        ApiFilterGroup.GroupAnd(
            ApiFilter.Equals('id', 5),
            ApiFilter.Greater('pressure', 100),
            ApiFilter.LowerEq('max_pressure', 150)
        )
    );

    expect(group.type).toBe('group');
    expect(group.operator).toBe('or');
    expect(group.operands.length).toBe(3);

    expect(group.operands[0].type).toBe('filter');
    expect(group.operands[1].type).toBe('filter');
    expect(group.operands[2].type).toBe('group');

    expect(group.operands[0].operandB).toBe(10);
    expect(group.operands[1].operandB).toBe('\'meho\'');
    expect(group.operands[2].operator).toBe('and');

    expect(group.operands[0].operandA).toBe('id');
    expect(group.operands[1].operandA).toBe('name');
    expect(group.operands[2].operands.length).toBe(3);
});

