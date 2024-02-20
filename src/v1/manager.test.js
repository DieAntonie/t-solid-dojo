import assert from 'assert/strict';
import { describe, it } from 'node:test';
import theoryData from './theory.test.json' assert { type: 'json'};

describe('Library', () => {
    describe('Add Book to Library', () => {
        theoryData.add.missing.forEach(missingData =>
            it(`should not add ${JSON.stringify(missingData)} with missing infromation to invertory`, () => {
                // given
                let inventory = new Inventory();

                // when
                let inventoryAdd = () => inventory.add(missingData);

                // then
                assert.throws(inventoryAdd, /^Error: Missing Information$/);
            })
        );

        theoryData.add.invalid.forEach(invalidData =>
            it(`should not add ${JSON.stringify(invalidData)} with invalid infromation to invertory`, () => {
                // given
                let inventory = new Inventory();
    
                // when
                let inventoryAdd = () => inventory.add(invalidData);
    
                // then
                assert.throws(inventoryAdd, /^Error: Invalid Information$/);
            })
        );

        theoryData.add.duplicate.forEach(duplicateData =>
            it(`should not add ${JSON.stringify(duplicateData.duplicate)} as duplicate of ${duplicateData.first} to invertory`, () => {
                // given
                let inventory = new Inventory();
                inventory.add(duplicateData.first);

                // when
                let inventoryAdd = () => inventory.add(duplicateData.duplicate);

                // then
                assert.throws(inventoryAdd, /^Error: Duplicate Entry$/);
            })
        );

        theoryData.add.valid.forEach(validData =>
            it(`should add ${JSON.stringify(validData)} to invertory`, () => {
                // given
                let inventory = new Inventory();

                // when
                validData.forEach(entry => inventory.add(entry));

                // then
                assert.equal(inventory.count, validData.length);
                assert.equal(inventory.items, validData);
            })
        );
    });

    describe('Remove Item from Library', () => {
        it('should not remove from library when library is empty', () => {
            // given
            let inventory = new Inventory();
            let book = { isdn: 123, printNr: 123 };

            // when
            let inventoryRemove = () => inventory.remove(book);

            // then
            assert.throws(inventoryRemove, /^Error: Inventory Empty$/);
        });

        it('should not add to inventory when information is invalid', () => {
            // given
            let inventory = new Inventory();
            let book = { isdn: 123, printNr: 123 };

            // when
            let inventoryRemove = () => inventory.remove(book);

            // then
            assert.throws(inventoryAdd, /^Error: Item not Found$/);
        });
    });

    describe('List Items in Library', () => {
        it('should not remove from library when library is empty', () => {
            // given
            let inventory = new Inventory();
            let book = { isdn: 123, printNr: 123 };

            // when
            let inventoryRemove = () => inventory.remove(book);

            // then
            assert.throws(inventoryRemove, /^Error: Inventory Empty$/);
        });

        it('should not add to inventory when information is invalid', () => {
            // given
            let inventory = new Inventory();
            let book = { isdn: 123, printNr: 123 };

            // when
            let inventoryRemove = () => inventory.remove(book);

            // then
            assert.throws(inventoryAdd, /^Error: Item not Found$/);
        });
    });
});