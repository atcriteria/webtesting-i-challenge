// test away!
const Item = require('./enhancer');

let sword = new Item.Item('longsword');

test('sanity', () => {
    const testname = 'longsword'
    const sword = new Item.Item(testname);
    expect(sword.name).toBe('longsword')
});

it('can be repaired properly', () => {
    sword.durability = 10;
    expect(sword.durability).toBe(10);
    sword = Item.repair(sword);
    expect(sword.durability).toBe(100);
});

it('can be enhanced successfully', () => {
    expect(sword.enhancement).toBe(0);
    Item.success(sword);
    expect(sword.enhancement).toBe(1);
});

describe('failure tests', () => {
    let enhancedSword;
    beforeEach(() => {
        enhancedSword = new Item.Item('broadsword');
    })
    it('fails successfully less than 10enh', () => {
        enhancedSword.enhancement = 10;
        Item.fail(enhancedSword);
        expect(enhancedSword.durability).toBe(95)
    });

    it('fails successfully @ 16enh', () => {
        enhancedSword.enhancement = 16;
        Item.fail(enhancedSword);
        expect(enhancedSword.durability).toBe(90);
        expect(enhancedSword.enhancement).toBe(16);
    });

    it('fails successfully above 16', () => {
        enhancedSword.enhancement = 18;
        Item.fail(enhancedSword);
        expect(enhancedSword.durability).toBe(90);
        expect(enhancedSword.enhancement).toBe(17);
    })
});

it('successfully updates name on enhancement', () => {
    let newWeap = new Item.Item('sword');
    newWeap.enhancement = 5;
    // console.log(newWeap);
    // let newerWeap = Item.get({ name: "sword", durability: 100, enhancement: 6});
    Item.get(newWeap)
        .then(res => {
            expect(res.name).toBe("[+6] sword")
        });
    // Note to future self: When calling the function using a Class constructor 
    // I had to string a .then and have the function return a Promise.resolve
    // to handle the Promise, otherwise the test would fail before the new name
    // would be updated. HOWEVER, I found that submitting an anonymous object
    // inside of the method resolved correctly right away and did not require
    // work with promises. Kinda weird but w/e. It works.
});