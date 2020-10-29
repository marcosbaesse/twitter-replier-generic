function Sum(a:number, b: number) {
    return a + b;
}

describe('Exemplo usando soma', () => {
    expect(Sum(1, 2)).toBe(3);
});