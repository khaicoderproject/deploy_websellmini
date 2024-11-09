const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
module.exports.sendMail = async (email, subject, html) => {
  const msg = {
    to: email,
    from: "khaicopyright@gmail.com", // Use the email address or domain you verified above
    subject: subject,
    html: html,
  };
  //ES6
  sgMail.send(msg).then(
    () => {},
    (error) => {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  );
  //ES8
  // (async () => {
  //   try {
  //     await sgMail.send(msg);
  //   } catch (error) {
  //     console.error(error);

  //     if (error.response) {
  //       console.error(error.response.body);
  //     }
  //   }
  // })();
};
