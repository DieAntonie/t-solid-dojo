import assert from 'assert/strict';
import { describe, it } from 'node:test';
import theoryData from './theory.test.json' assert { type: 'json'};

describe('Library', () => {
    describe('Add Book to Library', () => {
        theoryData.add.missing.forEach(missingData =>
            it(`should not add ${JSON.stringify(missingData)} with missing infromation to invertory`, () => {
                // given
                const library = new Library();

                // when
                const libraryAdd = () => library.add(missingData);

                // then
                assert.throws(libraryAdd, /^Error: Missing Information$/);
            })
        );

        theoryData.add.invalid.forEach(invalidData =>
            it(`should not add ${JSON.stringify(invalidData)} with invalid infromation to invertory`, () => {
                // given
                const library = new Library();

                // when
                const libraryAdd = () => library.add(invalidData);

                // then
                assert.throws(libraryAdd, /^Error: Invalid Information$/);
            })
        );

        theoryData.add.duplicate.forEach(duplicateData =>
            it(`should not add ${JSON.stringify(duplicateData.duplicate)} as duplicate of ${duplicateData.first} to invertory`, () => {
                // given
                const library = new Library();
                library.add(duplicateData.first);

                // when
                const libraryAdd = () => library.add(duplicateData.duplicate);

                // then
                assert.throws(libraryAdd, /^Error: Duplicate Book$/);
            })
        );

        theoryData.add.valid.forEach(validData =>
            it(`should add ${JSON.stringify(validData)} to invertory`, () => {
                // given
                const library = new Library();

                // when
                validData.forEach(book => {

                    // then
                    assert.ok(library.add(book));
                });
            })
        );
    });

    describe('Remove Book from Library', () => {
        it(`should not remove with missing query data`, () => {
            // given
            let library = new Library();
            invalidData.library.forEach(library.add)

            // when
            let libraryRemove = () => library.remove(invalidData.remove);

            // then
            assert.throws(libraryRemove, /^Error: Book not Found$/);
        })

        theoryData.remove.missing.forEach(missingdData =>
            it(`should not remove ${JSON.stringify(missingdData.remove)} with no match in library`, () => {
                // given
                let library = new Library();
                missingdData.library.forEach(library.add)

                // when
                let libraryRemove = () => library.remove(missingdData.remove);

                // then
                assert.throws(libraryRemove, /^Error: Book not Found$/);
            })
        );
    });

    describe('List Items in Library', () => {
        it('should not remove from library when library is empty', () => {
            // given
            let library = new Library();
            let book = { isdn: 123, printNr: 123 };

            // when
            let libraryRemove = () => library.remove(book);

            // then
            assert.throws(libraryRemove, /^Error: Library Empty$/);
        });

        it('should not add to library when information is invalid', () => {
            // given
            let library = new Library();
            let book = { isdn: 123, printNr: 123 };

            // when
            let libraryRemove = () => library.remove(book);

            // then
            assert.throws(libraryAdd, /^Error: Item not Found$/);
        });
    });
});