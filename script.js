// this for the review answer html page.

// //$("#save-imagery").click(function () {
//    $("#overlay-success").toggleClass("d-flex d-none");
// });

$("#create-error").click(function () {
   $("#overlay-danger").toggleClass("d-flex d-none");
});

$("#delete").hide();

$("#check-box").click(function () {
   $("#delete").toggle("#delete");
});

$("#drop-assign, #sign-up-text").hide();

// for the sign up button in the index page

$("#sign-up").click(function () {
   $("#drop-assign, #sign-up-text").slideDown("#drop-assign, #sign-up-text");
});

$("#sign-up").click(function () {
   $("#sign-up").hide();
});

function addPadding(num) {
   // turning num into String. String is a constructor.
   if (String(num).length < 2) {
      return "0" + String(num);
   } else {
      return num;
   }
}
let idNumber = ""; //
let allTodaysDate = "";
function getDate() {
   let todaysDate = new Date();
   //grabbing each part of the date from the date object using dot notation
   let todaysYear = todaysDate.getYear() - 100; // subtract getYear by 100 because it spits out 3 digit number if you don't
   // console.log(todaysYear);
   let todaysMonth = todaysDate.getMonth() + 1; //needs to add one because it is zero indexed
   // console.log(todaysMonth);
   let todaysDay = todaysDate.getDate();
   // console.log(todaysDay);
   let todaysHour = todaysDate.getHours();
   // console.log(todaysHour);
   let todaysMin = todaysDate.getMinutes();
   // console.log(todaysMin);
   let todaysSec = todaysDate.getSeconds();
   // console.log(todaysSec);
   let todaysMilli = todaysDate.getMilliseconds().toString();
   // console.log(todaysMilli);

   allTodaysDate =
      "" + //turns it into a readable string
      addPadding(todaysYear) +
      addPadding(todaysMonth) +
      addPadding(todaysDay) +
      addPadding(todaysHour) +
      addPadding(todaysMin) +
      addPadding(todaysSec);
   console.log(allTodaysDate);

   // _id should have millseconds concatenating with a rand num between 000 & 999
   let milli = todaysMilli.padStart(3, "0"); // will always produce 3 digits. padStart is a string
   let randNumber = Math.floor(Math.random() * 1000); // should generate random number betweeen 000-999
   console.log();
   idNumber = milli + randNumber; /// log should show 6 digits (millis + randomnumber)
}
// this function work for the inside of the sign up card
function passwordEncrypt() {
   let encryptingPassword = $("#password-required").val().split("");
   for (let i = 0; i < encryptingPassword.length; i++) {
      const character = encryptingPassword[i];
      // captial letters in ascii start from 65 to 90
      // lower case letters in ascii start from 97 to 122
      // numbers in ascii start from 48 to 57
      // if charCodeAt is not in range of a number will return NaN. 0 is the default index
      if (
         (encryptingPassword[i].charCodeAt(0) >= 65 &&
            encryptingPassword[i].charCodeAt(0) <= 90) ||
         (encryptingPassword[i].charCodeAt(0) >= 97 &&
            encryptingPassword[i].charCodeAt(0) <= 122) ||
         (encryptingPassword[i].charCodeAt(0) >= 48 &&
            encryptingPassword[i].charCodeAt(0) <= 57)
      ) {
         if (character === "z") {
            // make sure the lowercase z wraps around to the lowercase a
            encryptingPassword[i] = "a";
         } else if (character === "Z") {
            // make sure the capital Z wraps around to the captial A
            encryptingPassword[i] = "A";
         } else if (character === "9") {
            // make sure the 9 wraps around the 0 instead of moving to the number from the ascii list.
            encryptingPassword[i] = "0";
         } else {
            // takes the number and coverts it to a string from the ascii list and then increases the charCode by 1 to go through the condition.
            encryptingPassword[i] = String.fromCharCode(
               encryptingPassword[i].charCodeAt(0) + 1
            );
         }
      }
   }
   return encryptingPassword.join("");
}

$("#lets-go").click(function () {
   let emailInput = $("#email-identity").val(); // .val gets the value of the user entered
   console.log(emailInput);
   let emailLocalPart = emailInput.split("@")[0]; // splits the emailInput into an array and only focus everything before the @ symbol
   let brokenDownChars = emailLocalPart.split(""); // split the emailInput into individual characters into an array.
   const uniqueChars = brokenDownChars.filter((char, index, arr) => {
      // brokenDownChars is being filtered with three parameters. character, position of the character and the orginal array.
      if (arr.indexOf(char) === index) {
         // from the original array if any char matches the index then return true, otherwise return false
         return true;
      } else {
         return false;
      }
   });
   console.log(uniqueChars);

   let passwordInput = $("#password-required").val(); // . val gets the value from the user on the password box
   console.log(passwordInput);

   let filteredPasswords = commonPasswords.filter(
      (word) => word === passwordInput
   ); //if the word of matches user input then it will be placed in the common array.
   // with filter if its true, it will keep in the array. if false, it will discard it
   if (emailInput.length === 0) {
      // make sure if emailLength equals 0, then the if statement will run test under its condition
      $("#email-identity").addClass("is-invalid"); //.addClass will pull up the id from the html. then the in-valid will trigger the empty field box
      $("#error-email").html("Please enter your email address."); // error message pop up in red if there is no characters
   } else if (uniqueChars.length < 3) {
      $("#email-identity").addClass("is-invalid");
      $("#error-email").html("Email must have at least 3 unique characters");
   } else {
      // if the conditon on the if are not met, then else will run test
      $("#email-identity").removeClass("is-invalid"); //. removeClass will take down whatever is inside of the parathesis
      $("#email-identity").addClass("is-valid"); // .addClass will take is-valid and let the email box work properly
      $("#error-email").html(""); // the error message will not appear.
   }

   if (passwordInput.length === 0) {
      // make sure if passwordInput equals 0 the if statement will run test under its condition
      $("#password-required").addClass("is-invalid"); // addClass will take is-valid and let the password box work properly
      $("#invalid-characters").html("Please enter password."); // error message will appear
   } else if (passwordInput.length < 9) {
      // make sure the password character has to be over 9. if not the else if will run test

      $("#password-required").addClass("is-invalid"); //addClass will take is-valid and let the password box work properly
      $("#invalid-characters").html(
         "Your password must be at least 9 characters."
      ); // error message will appear
   } else if (passwordInput.indexOf(emailLocalPart) !== -1) {
      $("#password-required").addClass("is-invalid");
      $("#invalid-characters").html(
         "Your email address cannot be used in your password"
      );
   } else if (filteredPasswords.length > 0) {
      // if the common length is greater than 0, then a match was made.
      $("#password-required").addClass("is-invalid");
      $("#invalid-characters").html("You've entered a common password");
   } else {
      // if the condition on the if are not met, then else will run test
      getDate();
      $("#password-required").removeClass("is-invalid"); // will remove the bootstrap error class
      $("#password-required").addClass("is-valid"); // will validate the password box to work
      $("#invalid-characters").html(""); // wont display any error message

      console.log({
         _id: idNumber,
         email: emailInput,
         password: passwordEncrypt(),
         CreatedOn: Number(allTodaysDate),
      });
   }
});

// this for the create-answer html page. keeps count on how many characters are placed from the user.
$("#textBox").keyup(function () {
   let textAreaCount = $("#textBox").val().length; //values of form elements such as input, select and textarea.
   $("#count").html(`${textAreaCount}/240`); // reference to the html page, and keeps count of the textareacount. textareacount is a placeholder.
   if (textAreaCount > 240) {
      $("#count").addClass("text-danger");
   } else {
      $("#count").removeClass("text-danger");
   }
});

// create-imagery html page
$("#textImagery").keyup(function () {
   let textAreaCount = $("#textImagery").val().length;
   $("#imageryCount").html(`${textAreaCount}/240`);
   if (textAreaCount > 240) {
      $("#imageryCount").addClass("text-danger");
   } else {
      $("#imageryCount").removeClass("text-danger");
   }
});

$("#save-imagery").click(function () {
   let textAreaCount = $("#textImagery").val().length;
   let textArea = $("#textImagery").val();
   if (textAreaCount !== 0 && textAreaCount <= 240) {
      getDate();

      console.log({
         _id: idNumber,
         imagery: `?x=${encodeURIComponent(
            "A delicious shishkebab but the first bite of meat after the pointy end is spicy & makes an exclamation point appear over my head like in a JRPG."
         )}`,
         answer: `?x=${encodeURIComponent(
            "The syntax for making a comment in HTML is <!-- Mike's comment here -->"
         )}`,
         levelNum: 1,
         successfulAttemptsNum: 0,
         createdOn: allTodaysDate,
         lastAttemptedOn: allTodaysDate, // same as createdOn
      });
   }
});
