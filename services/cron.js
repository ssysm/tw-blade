const cron = require('node-cron');
const puppeteer = require('puppeteer');
const mongoose = require('mongoose');
const { endpoint, http } = require('./../config');
const { ProfileSchema, Tracker, CronLog } = require('./../models');

let browser = null;

const cronJobs = async () => {
	let startTime = new Date();
	// Try to get job list from tracker collection
	const jobList = await Tracker.find();
	// Create pptr promises
	const promises = [];
	let success = 0;
	let failedList = [];
	for (let k = 0; k < jobList.length; k++) {
		let response = {};
		promises.push(browser.newPage().then(async page => {
			// const client = await page.target().createCDPSession();
			// await client.send('Network.emulateNetworkConditions', http.network);
			try {
				await page.goto(`${endpoint.visualEp}?screen_name=${jobList[k].displayName}`, {
					waitUntil: 'domcontentloaded'
				});
				const count = await page.$eval('.count', el => el.innerText);
				const nickname = await page.$eval('.nickname', el => el.innerText);
				const displayName = await page.$eval('a[rel=\'me\']', el => el.innerText);
				const avatar = await page.$eval('.photo', el => el.src);
				const description = await page.$eval('.note', el => el.innerHTML);
				const followerCount = parseInt(count.replace(/,/g, ''));
				response = {
					nickname,
					displayName,
					followerCount,
					avatar,
					description,
					updatedAt: Date.now()
				};
			} catch (err) {
				success--;
				console.error(`Failed at No.${k}, @${jobList[k].displayName}/${jobList[k].uid}`);
				failedList.push(jobList[k].uid);
			} finally {
				page.close();
				success++;
				const model = mongoose.model('Profile', ProfileSchema, '' + jobList[k].uid);
				model.create(response, (err, docs) => {
					if (err) {
						console.error('Error at saving to database\n' + err);
					} else {
						// console.info('Success saved ' + docs.nickname);
					}
				});
			}
		}));
	}
	await Promise.all(promises);
	console.log(`Cron Job Finished ${success} of ${jobList.length} fetch on ${new Date()}.`);
	await CronLog.create({ date: startTime, failedList, finishedAt: new Date() });
};

cron.schedule('*/1 * * * *', function () {
	console.log('Cron Job Started at ' + new Date());
	cronJobs();
}, {
	scheduled: true,
	timezone: 'Asia/Tokyo'
});
(async () => {
	try {
		browser = await puppeteer.launch({ headless: http.headless, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
	} catch (e) {
		throw e;
	}
	console.log('Puppeteer Launched');
})();
