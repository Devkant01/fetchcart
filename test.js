/*
    test.js
    Examples to demonstrate Number.prototype.toLocaleString, Date.prototype.toLocaleString,
    and Date.prototype.toLocaleDateString across locales and options.
    Run with: node test.js
*/

const locales = ['en-US', 'en-GB', 'de-DE', 'ja-JP', 'ar-EG'];
const number = 1234567.89;
const date = new Date('2025-11-14T15:30:45Z'); // ISO date (UTC)

console.log(date.toLocaleDateString());
console.log(date.toLocaleDateString("en-IN"));
console.log(date.toLocaleString("en-IN"));


function showNumbers() {
    console.log('--- Number formatting examples ---');
    for (const loc of locales) {
        // default number formatting (grouping, decimals)
        console.log(`${loc} (number):`, number.toLocaleString(loc));

        // fixed fraction digits
        console.log(`${loc} (2 fraction digits):`, number.toLocaleString(loc, { minimumFractionDigits: 2, maximumFractionDigits: 2 }));

        // currency using Intl.NumberFormat (common for currency)
        const usd = new Intl.NumberFormat(loc, { style: 'currency', currency: 'USD' });
        console.log(`${loc} (USD):`, usd.format(number));

        // compact notation
        const compact = new Intl.NumberFormat(loc, { notation: 'compact', compactDisplay: 'short' });
        console.log(`${loc} (compact):`, compact.format(number));
        console.log('');
    }
}

function showDates() {
    console.log('--- Date/time formatting examples ---');
    const dateLocales = ['en-US', 'en-GB', 'de-DE', 'ja-JP'];
    const timeZones = ['UTC', 'America/New_York', 'Asia/Tokyo'];

    for (const loc of dateLocales) {
        // default toLocaleString (date + time)
        console.log(`${loc} (default):`, date.toLocaleString(loc));

        // with explicit options (weekday, long month, time, timezone)
        const opts = {
            weekday: 'short',
            year: 'numeric',
            month: 'long',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
            timeZone: 'UTC'
        };
        console.log(`${loc} (detailed, UTC):`, date.toLocaleString(loc, opts));

        // toLocaleDateString: only date parts
        const dateOnlyOpt = { year: 'numeric', month: 'short', day: 'numeric' };
        console.log(`${loc} (date only):`, date.toLocaleDateString(loc, dateOnlyOpt));

        // show different time zones with same options
        for (const tz of timeZones) {
            const tzOpt = { ...opts, timeZone: tz, hour12: true };
            console.log(`${loc} (${tz}, hour12=true):`, date.toLocaleString(loc, tzOpt));
        }

        console.log('');
    }
}

function simpleAssertions() {
    console.log('--- Simple runtime checks ---');
    // Ensure formatted outputs are non-empty strings
    const s1 = number.toLocaleString('en-US');
    const s2 = date.toLocaleString('en-GB');
    console.log('number -> string?', typeof s1 === 'string' && s1.length > 0);
    console.log('date -> string?', typeof s2 === 'string' && s2.length > 0);
}

// showNumbers();
// showDates();
// simpleAssertions();