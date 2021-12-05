import mpg_data from "./data/mpg_data.js";
import {getStatistics} from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: {
        city: findCityAvg(object),
        highway: findHighWayAvg(object),
    },
    allYearStats: findAllStats(object),
    ratioHybrids: findRatioHybrids(mpg_data),
};

function findCityAvg(object) {
    return object.map(c => {return c.city_mpg}).reduce((a, b) => a + b) / object.length;
}

function findHighWayAvg(object) {
    return object.map(c => {return c.highway_mpg}).reduce((a, b) => a + b) / object.length;
}

function findAllStats(object) {
    return getStatistics(object.map(c => c.year))
}

function findRatioHybrids(object) {
    return object.filter(c => {return c.hybrid}).length / object.length;
}
/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: findMakerHybrids(mpg_data),
    avgMpgByYearAndHybrid: findAvgMpgByYearAndHybrid(mpg_data)
};


function findMakerHybrids(object) {
    return object.filter(c => c.hybrid).reduce(doThing(a, o), {});
}

function doThing(a, o) {
    let k = o["make"];
    if (!a[k]) {
        a[k] = {};
        a[k]["make"] = o["make"];
        a[k]["hybrids"] = [o["id"]];
    }

    return a;

}

function findAvgMpgByYearAndHybrid(object) {
    return object.reduce(doAnother(a, o), {});
}

function doAnother(a, o) {
    let k = o["year"];
    if (!a[k]) {
        a[k] = {};
        a[k].hybrid = {city: 0, highway: 0};

        a[k].notHybrid = {city: 0, highway: 0};
    }

    if (!o.hybrid) {
        a[k].notHybrid.city = o.city_mpg + a[k].notHybrid.city;
        a[k].notHybrid.highway = o.highway_mpg + a[k].notHybrid.highway;
    } else {
        a[k].hybrid.city = o.city_mpg + a[k].hybrid.city_mpg;
        a[k].hybrid.highway = o.highway_mpg + a[k].hybrid.highway_mpg;
    }
}
