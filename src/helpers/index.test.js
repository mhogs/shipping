import { matrixToList,listToMatrix } from './index';


it('array sould become table', () => {
    expect(listToMatrix([1, 2, 3, 4],2)).toStrictEqual([[1, 2], [3, 4]]);
});
it('table sould become array', () => {
    expect(matrixToList([[1, 2], [3, 4]])).toStrictEqual([1, 2, 3, 4]);
});
