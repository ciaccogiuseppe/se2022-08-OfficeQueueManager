'use strict';

const { estimateTime, decTimeToDeg } = require('../routes/Tickets');

// TEST SUITE: ESTIMATE TIME
describe('estimateTimeTests', () => {

    describe('invalidCases', () => {
        // Tests
        test('T1: tr not integer', () => {
            expect(estimateTime("PIPPO", 1, [1], [1])).toBe(-1);
        });
        test('T2: tr equals 0', () => {
            expect(estimateTime(0, 1, [1], [1])).toBe(-1);
        });
        test('T3: tr equals -inf', () => {
            expect(estimateTime(Number.NEGATIVE_INFINITY, 1, [1], [1])).toBe(-1);
        });
        test('T4: nr not integer', () => {
            expect(estimateTime(1, "PLUTO", [1], [1])).toBe(-1);
        });
        test('T5: nr negative', () => {
            expect(estimateTime(1, -1, [1], [1])).toBe(-1);
        });
        test('T6: nr equals -inf', () => {
            expect(estimateTime(1, Number.NEGATIVE_INFINITY, [1], [1])).toBe(-1);
        });
        test('T7: klist partially integer v1', () => {
            expect(estimateTime(1, 0, [0, "pippo", true, 2], [1, 1, 1, 1])).toBe(-1);
        });
        test('T8: klist partially integer v2', () => {
            expect(estimateTime(1, 1, [1, 2, 3, false], [1, 1, 1, 1])).toBe(-1);
        });
        test('T9: klist not integer array', () => {
            expect(estimateTime(1, 1, [1.99, false, "PIPPO"], [1, 1, 1])).toBe(-1);
        });
        test('T10: klist not array', () => {
            expect(estimateTime(1, 1, 1, [1])).toBe(-1);
        });
        test('T11: klist negative values', () => {
            expect(estimateTime(1, 1, [-1], [1])).toBe(-1);
        });
        test('T12: klist -inf value', () => {
            expect(estimateTime(1, 1, [Number.NEGATIVE_INFINITY], [1])).toBe(-1);
        });
        test('T13: klist values all 0', () => {
            expect(estimateTime(1, 1, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [1, 0, 0, 0, 0, 0, 0, 0, 0, 0])).toBe(-1);
        });
        test('T14: srlist partially integer', () => {
            expect(estimateTime(1, 1, [0, 1, 0, 1, 1, 1], [null, 1, 0, 1, 0, "pippo"])).toBe(-1);
        });
        test('T15: srlist no integer values', () => {
            expect(estimateTime(1, 1, [0, 1, 0, 1], [null, "pippo", "pluto", true])).toBe(-1);
        });
        test('T16: srlist not array', () => {
            expect(estimateTime(1, 1, [0, 1, 0, 1], 1)).toBe(-1);
        });
        test('T17: srlist negative values with boundaries', () => {
            expect(estimateTime(1, 1, [0, 2, 0, 0], [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY, 1, 0])).toBe(-1);
        });
        test('T18: srlist values all 0', () => {
            expect(estimateTime(1, 1, [0, 2, 3, 1], [0, 0, 0, 0])).toBe(-1);
        });
        test('T19: srlist values higher than 1 v1', () => {
            expect(estimateTime(1, 1, [0, 0, 0, 4], [2, 3, 4, 6])).toBe(-1);
        });
        test('T20: srlist values higher than 1 v2', () => {
            expect(estimateTime(1, 1, [1, 0, 0], [Number.MAX_VALUE, Number.MAX_VALUE, 2])).toBe(-1);
        });
        test('T25: klist and srlist different length', () => {
            expect(estimateTime(1, 1, [1, 0, 200], [1, 0])).toBe(-1);
        });
        test('T26: everything undefined', () => {
            expect(estimateTime(undefined, undefined, undefined, undefined)).toBe(-1);
        });
    });

    describe('validCases', () => {
        // Algorithm that should have been applied
        const estimationAlgorithm = (tr, nr, k_list, sr_list) => {
            let sum_list = 0;
            for (let i = 0; i < k_list.length; i++)
                sum_list = sum_list + (k_list[i] == 0 ? 0 : 1 / k_list[i] * sr_list[i]);
            return tr * (nr / sum_list + 1 / 2);
        };

        // Definition of valid test parameters
        const t21_params = [1, 1, [1, 2, 0], [1, 0, 0]];
        const t22_params = [4, 5, [3, 0, 0, 100, 200], [0, 0, 0, 1, 1]];
        const t23_params = [800, 273, [200, 350, 870], [1, 1, 1]];
        const t24_params = [10, 3512, [8937182, 231321, Number.MAX_VALUE], [1, 1, 1]];

        // Tests
        test('T21: Sr List partially 0 v1', () => {
            expect(estimateTime(...t21_params)).toBe(estimationAlgorithm(...t21_params));
        });
        test('T22: Sr List partially 0 v2', () => {
            expect(estimateTime(...t22_params)).toBe(estimationAlgorithm(...t22_params));
        });
        test('T23: Sr List All 1 v1', () => {
            expect(estimateTime(...t23_params)).toBe(estimationAlgorithm(...t23_params));
        });
        test('T24: Sr List All 1 v2', () => {
            expect(estimateTime(...t24_params)).toBe(estimationAlgorithm(...t24_params));
        });
    });
});


// TEST SUITE: decTimeToDeg
describe('decTimeToDegTests', () => {

    describe('invalidCases', () => {
        // Tests
        test('T1: not number v1', () => {
            expect(decTimeToDeg(null)).toBe(-1);
        });
        test('T2: not number v2', () => {
            expect(decTimeToDeg("Pippo")).toBe(-1);
        });
        test('T3: negative param v1', () => {
            expect(decTimeToDeg(-1)).toBe(-1);
        });
        test('T4: negative param v2', () => {
            expect(decTimeToDeg(Number.NEGATIVE_INFINITY)).toBe(-1);
        });
    });

    describe('validCases', () => {
        // Tests
        test('T5: working test case v1', () => {
            expect(decTimeToDeg(0)).toBe("00:00");
        });
        test('T6: working test case v2', () => {
            expect(decTimeToDeg(1237.75647)).toBe("1237:46");
        });
        test('T7: working test case v3', () => {
            expect(decTimeToDeg(Number.MAX_VALUE)).toBe(Number.MAX_VALUE + ":00");
        });
        test('T8: working test case v4', () => {
            expect(decTimeToDeg(0.99999999)).toBe("01:00");
        });
    });
});

