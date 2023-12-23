const {normalizeURL} = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizeURL strip protocol', () => {
        const input = 'https://boot.dev/path'
        const actual = normalizeURL(input)
        const expected = 'boot.dev/path'
        expect(actual).toEqual(expected)
})

test('normalizeURL trim trailing slash', () => {
    const input = 'https://boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => { //! new URL constructor is already taking care of this
    const input = 'https://Boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})


test('normalizeURL strip http', () => { 
    const input = 'http://Boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'boot.dev/path'
    expect(actual).toEqual(expected)
})

