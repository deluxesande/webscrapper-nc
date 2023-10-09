const cheerio = require("cheerio");
const request = require("request");
const fs = require("fs");

function search_series() {
    const writeStream = fs.WriteStream("Series.csv");

    // Headers
    writeStream.write(`Title, Type, Rating \n`);

    request("https://www.goojara.to/watch-series", (error, response, html) => {
        if (error) throw error;

        if (!error && response.statusCode === 200) {
            const $ = cheerio.load(html);

            const movies_div = $(".dflex")
                .find("div")
                .each((i, el) => {
                    const movie_title = $(el).find(".mtl").text();

                    const movie_type = $(el).find(".hda").text();

                    const movie_rating = $(el).find(".hdy").text();

                    // Write the rows
                    writeStream.write(
                        `${movie_title}, ${movie_type}, ${movie_rating} \n`
                    );
                });
        }
    });
}

function search_popular() {
    const writeStream = fs.WriteStream("Popular.csv");

    // Headers
    writeStream.write(`Title, Type, Rating \n`);

    request(
        "https://www.goojara.to/watch-series-popular",
        (error, response, html) => {
            if (error) throw error;

            if (!error && response.statusCode === 200) {
                const $ = cheerio.load(html);

                const movies_div = $(".dflex")
                    .find("div")
                    .each((i, el) => {
                        const movie_title = $(el).find(".mtl").text();

                        const movie_type = $(el).find(".hda").text();

                        const movie_rating = $(el).find(".hdy").text();

                        // Write the rows
                        writeStream.write(
                            `${movie_title}, ${movie_type}, ${movie_rating} \n`
                        );
                    });
            }
        }
    );
}

search_popular();
search_series();
