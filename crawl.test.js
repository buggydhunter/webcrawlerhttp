const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
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

test('getURLsFromHtml absolute', () => { 
    const input = `
    <html>
        <body>
            <a href="https://bolg.boot.dev/path/">
            Boot.dev Blog
            </a>
        </body>
    </html>  //!Just a pseudo test html body for the test           
    `

    const inputBaseURL = "https://bolg.boot.dev/path/"
    const actual = getURLsFromHTML(input, inputBaseURL)
    const expected = ["https://bolg.boot.dev/path/"]
    expect(actual).toEqual(expected)
})


test('getURLsFromHtml relatvie', () => { 
    const input = `
    <html>
        <body>
            <a href="/path/">
            Boot.dev Blog
            </a>
        </body>
    </html>  //!Just a pseudo test html body for the test           
    `

    const inputBaseURL = "https://bolg.boot.dev"
    const actual = getURLsFromHTML(input, inputBaseURL)
    const expected = ["https://bolg.boot.dev/path/"]
    expect(actual).toEqual(expected)
})



test('getURLsFromHtml relatvie and absolute', () => { 
    const input = `
    <html>
        <body>
            <a href="https://bolg.boot.dev/path1/">
            Boot.dev Blog Path One
            </a>
            <a href="/path2/">
            Boot.dev Blog Path Two
            </a>
      
        </body>
    </html>  //!Just a pseudo test html body for the test           
    `

    const inputBaseURL = "https://bolg.boot.dev"
    const actual = getURLsFromHTML(input, inputBaseURL)
    const expected = ["https://bolg.boot.dev/path1/" ,"https://bolg.boot.dev/path2/" ]
    expect(actual).toEqual(expected)
})



test('getURLsFromHtml invalid', () => { 
    const input = `
    <html>
        <body>
            <a href="invalid">
            Invalid URL
            </a>
        </body>
    </html>  //!Just a pseudo test html body for the test           
    `

    const inputBaseURL = "https://bolg.boot.dev"
    const actual = getURLsFromHTML(input, inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected)
})