var casper = require('casper').create({
    verbose: true,
    logLevel: 'debug',
    pageSettings: {
         loadImages:  false,
         loadPlugins: false,
         userAgent: 'Mozilla/5.0 (Windows NT 6.1; rv:17.0) Gecko/20100101 Firefox/17.0'
    },
    onStepComplete: function(b){
      console.log('-----------------------');
      console.log(b);
      console.log('-----------------------');
    }
});

// print out all the messages in the headless browser context
casper.on('remote.message', function(msg) {
    this.echo('remote message caught: ' + msg, "INFO");
});

// print out all the messages in the headless browser context
casper.on("page.error", function(msg, trace) {
    this.echo("Page Error: " + msg, "ERROR");
});

casper.options.viewportSize = {width: 1680, height: 924};

casper.start('http://wenku.baidu.com/', function(){
  this.click("#login");
});

var user = casper.cli.get(0);
var password = casper.cli.get(1);


casper.waitForSelector("form.pass-form input[name='userName']",
    function success() {
        console.log('user: ' + user);
        this.fill("form",{
            'userName': user,
            'password': password
        },false);
        this.click("input.pass-button-submit");
    },
    function fail() {
      //console.log(this);
    });

casper.waitFor(function check() {
    return true;//this.exists('#userNameCon');
    //return this.evaluate(function() {
    //    return document.querySelector('userNameCon') != null;
    //});
}, function then() {
    // console.log(JSON.stringify(phantom.cookies));
    this.capture('xSignIn-1.png');

    console.log("login successfull");
});



casper.thenOpen('http://wenku.baidu.com/', function(){
  this.capture('xSignIn.png');
  console.log(this.exists('#userNameCon'));
});

casper.thenEvaluate(function(){
  console.log("----------------------------");
  console.log("----------------------------");
  console.log("----------------------------");
  console.log("Page Title " + document.title);
  console.log("Page Cookie " + document.cookie);
  //console.log("Your name is " + document.querySelector(".userNameCon").innerHTML);
  console.log("----------------------------");
  console.log("----------------------------");
  console.log("----------------------------");
});


casper.run();
