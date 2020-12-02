# VariateGeneration

This project generates the pdf of various variate functions.

## Supported Variate Functions
1. Bernoulli
2. Binomial
2. Exponential
3. Gamma
4. Geometric
5. Normal
6. Poisson
7. Weibull

## Initial Build

1. Install npm [NPM Documentation](https://www.npmjs.com/get-npm)
2. Install angular [Angular Documentation](https://angular.io/guide/setup-local)
3. Install project
    1. Download / unpack project
    2. Open terminal
    3. Change directory to project directory
    4. Run `npm install`
4. Run `ng serve`
5. Open http://localhost:4200 in any supported browser

## Remaining Work

* Add support for updating number of sample values (currently limited to 250)
* Add dialog for downloaded file name
    * Possbily just auto generate based on parameters (e.g. exponential_0.5_from_0_to_10.tsv)
* Refactor common code
    * Function classes all follow a similar interface
    * Function components share similar functionality and interactions with dataset
    * Add some typing around ngx-chart data
* Add potential for multiple distributions graphed at once
* Add tests around validation and expected values