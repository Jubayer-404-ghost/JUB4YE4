const axios = require("axios");

const baseApiUrl = "https://jubayer-birth-api20-raiwzrvum-jubayer-404-ghosts-projects.vercel.app";

module.exports.config = {
  name: "age",
  aliases: ["agecheck", "getage", "birthdayage"],
  version: "1.0",
  author: "Jubayer",
  cooldown: 5,
  description: "Calculate age from birthdate (DD-MM-YYYY)",
  usage: "age [DD-MM-YYYY]",
};

onStart:async function({ api, event, args }) {
  try {
    if (!args[0]) {
      return api.sendMessage(
        "Please provide your birthdate in DD-MM-YYYY format.",
        event.threadID,
        event.messageID
      );
    }

    const date = args[0];
    const validFormat = /^\d{2}-\d{2}-\d{4}$/;
    if (!validFormat.test(date)) {
      return api.sendMessage(
        "Wrong format! Use DD-MM-YYYY.\nExample: age 22-12-2022",
        event.threadID,
        event.messageID
      );
    }

    const apiUrl = `${baseApiUrl}/age?birth_date=${encodeURIComponent(date)}`;

    const res = await axios.get(apiUrl);
    const data = res.data;

    if (!data.birthDate) {
      return api.sendMessage(
        "Could not find any data. Double check the date you entered.",
        event.threadID,
        event.messageID
      );
    }

    let message = `🎂 Birth Date: ${data.birthDate}\n\n`;
    message += `Age: ${data.ageYears} years\n`;
    message += `Total Days: ${data.ageDays}\n`;
    message += `Total Hours: ${data.ageHours}\n`;
    message += `Total Minutes: ${data.ageMinutes}\n`;
    message += `Total Seconds: ${data.ageSeconds}\n\n`;
    message += `🎉 Next Birthday: ${data.nextBirthday}\n`;
    message += `Time Left Until Next Birthday:\n`;
    message += `- Days: ${data.timeToNextBirthday.days}\n`;
    message += `- Hours: ${data.timeToNextBirthday.hours}\n`;
    message += `- Minutes: ${data.timeToNextBirthday.minutes}\n`;
    message += `- Seconds: ${data.timeToNextBirthday.seconds}`;

    return api.sendMessage(message, event.threadID, event.messageID);
  } catch (e) {
    return api.sendMessage(
      "Something went wrong. Please try again later.",
      event.threadID,
      event.messageID
    );
  }
};
