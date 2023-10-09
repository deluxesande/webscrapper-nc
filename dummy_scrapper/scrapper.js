const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

const writeStream = fs.createWriteStream("post.csv");

// Write Headers
writeStream.write(`Title, Image-link \n`);

request("https://demo.cosmoswp.com/", (error, response, html) => {
	// console.log(response);
	if (!error && response.statusCode === 200) {
		// Code goes here
		const $ = cheerio.load(html);

		let div_text_list = [];
		let image_link_list = [];

		// Getting the item titles
		const title = $(".gutentor-text-wrap").each((i, el) => { 
			const div_text = $(el).find(".gutentor-text").text();
			//console.log(div_text);
			div_text_list.push(div_text);
		});

		// Getting the image links
		const image_links = $(".gutentor-image-thumb").each((i, el) => {
			const image_tag = $(el).find(".normal-image");
			const image_link = image_tag.attr("src");
			//console.log(image_link);
			image_link_list.push(image_link);
		});

		// Looping the list to save them
		for (var i=0; i<=div_text_list.length+1;i++) {
			// Write row to csv
			writeStream.write(`${div_text_list[i]} ${image_link_list[i]} \n`);
		};

		console.log("Scrapping done");
	};
});
