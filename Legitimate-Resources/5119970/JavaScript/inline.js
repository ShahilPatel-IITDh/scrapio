
// QUOTATIONS
Quotation = [
'I just want to say a very BIG thank you for this wonderful site. I am using it to refresh my math skills and to teach my kids maths. Once again thank you very very much for making mathematics as simple as A B C bravo',
'You guys have created an amazing website. I have been using it for years to understand math concepts. The quizzes really help solidify the content, and everything is thoroughly explained. Thanks for all you do!', 'I have a PhD in Computer Science but occasionally access your website for a good refresher. Thanks a lot for your quality content!',
'... I love you so much because I have a 20 in math right now so your website really help me out.',
'This is one of the best math websites!  Your expertise is very much appreciated!',
'I just discovered your site and used it to help me solve a spreadsheet problem.  Explanations here are brilliant. Read once and understood the first time.  I continued to explore the topic beyond what I needed (variance/deviation)and this, I`ve never done with math.  This will really be useful for my 2 home-school seniors. Thank you.',
'Normally I never do these sorts of things. But Math is Fun, let me tell you, that the content on your Matrices page was far more helpful than my college textbook. So thank you for being a free source that was far more superior than that 85 dollar book. Keep it up all of you.',
'Thank you for creating this. It has been very helpful in my pursuit to become an electrical engineer.',
'Amazing! I have never seen a site making math so much fun and easy to understand. Why isn`t it taught like this in schools? Thank you all!',
'A fantastic website, me and my son spent all night on this learning new things, we loved the bonding time together.',
'... my gratitude for explaining complex problems in such an easy to understand manner!',
'This is one of the best math websites I`ve come across, especially the various interactive tools which are embedded. This site helps me a lot. So, thank you. Keep up the good work!',
'This is the Best Math site. A Big Thank you.',
'I`m a college student and I`ve used this site for a long time now. It always seems to come in handy. I love the way you teach. I love the way things are organized. Good organization = flow to learning = easy learning. Plus everything is well explained. Thank you!',
'Thanks for this website! I am using it to review Algebra and, eventually I hope, Calculus. This website is very clear and helpful, as it explains mathematical concepts in a way which I find much easier to understand than most of the textbooks I`ve come across.',
'I wish this is how maths was taught when I was in school. Absolutely love your site. Relearning the basics now and actually having fun!',
'I just love your website. its so reliable and I just really want to say thank you for all the things you built on this website. It helped me do my homework AND it is RELEVANT to the stuff we are learning. THANK YOU!!!',
'Thank you so much for all your math stuff. Whenever I need to know something math related, I know I can come to your site and find a right and accurate explanation. Math Is Fun!!',
'I love your website. The explanations are so well done. I`m a parent who has always adhered to your premise that math is fun, but sometimes I need a refresher when faced with the need to explain concepts to my children. I`ve never been disappointed turning to your website.',
'I would like to take a minute to thank you so much for helping me to understand limits, probability, and asymptotes! I absolutely love and appreciate your work!',
'I thank you so much for this precious site.',
'I looove this site! it is simple and easy to understand. You saved my report card!! Keep it up!!',
'OH MY GOSH you`ve helped me so much i`m now getting A s instead of C s in math thank you so much :)',
'Great site!!!!! I use it in class all the time THANK YOUUUUU',
'I struggled in Math and then I discovered Mathisfun.com which is easy and the best source to learn and improve Math skills. I share to people who were struggling like me and they are Improving a lot ... Thank You Mathisfun.',
'I think your site is truly wonderful.  It is comprehensive, accurate and intuitive. And, most importantly for me - the explanations are beautiful.  As simple as they can be',
'Thanks for the amazing site! I`ve used this site since secondary school and now am well into working life but I still come here occasionally to refresh some concepts. Keep up the great work :)',
'Thanks, this site has given the best mathematics experience to me. As a professional teacher I find it easier to explain concepts using your models. Thanks again :-)',
'Your website made me like maths. I am now top in the grade and got full marks. Thank you.',
'This website is awesome and has helped me learn so much! The explanations are simple, direct, and concise ... I cannot say thank you enough and hope you continue to keep the website going!',
'hey, you people are doing great job. Maths is really fun with your site. thank you, keep doing well',
'... I always visit your website whenever i can`t understand something related to math. i hope you continue helping more students. I will highly recommend this to my friends, 10/10',
'This website is great!!!! I am learning so much & my baby child will know of this website before twitter or facebook.',
'Thank you! This helps me with all my math assignments (which were really confusing before!)',
'I love this website. I realize that I can do math. Thank you so very much!!!!!!! :)',
'this web site has been a blessing to my home school. Thanks for all your wonderful worksheets and tutorials.',
'Oh my word this is a great site! I used your article on writing equations for parallel and perp. lines and it helped sooo much! The teaching is clear and has examples and is awesome! Keep it up!',
'I am a math teacher. I teach at GED level. Just want to say that your program or website is fantastic, it is great, it is wonderful. Any time I have difficulty of way of explanation, I immediately apply to your website. I thank you very much.',
'I`m sure people write to tell you this all the time, but your site is pretty amazing. Thank you for explaining math in such an accessible way. It`s been my site of choice for ages, and explains concepts equally clearly, whether for fifth grade or GCSE math.',
'Your website has helped me so much.... Keep up the great work... thanks a million.',
'Thank you for creating this website. I discovered it last year ... and I come at least once a day on this website. For example, when I need to study for a math test I just come here to review. :) This is my favorite math website.',
'I would just like to thank you for the very helpful Unit Circle page. I was having trouble memorizing the sin/cos/tan values, and the `1-2-3` trick was really helpful. I got an A on my test. :)',
'Thank you SO MUCH for this site. I missed out on developing any kind of basis in maths in high school and have had trouble getting personal tutoring now I`m all grown up and need maths for statistical work. This site explains it so that I get it.',
'Man! your site is fabulous, The way you have described each single concept has helped me a lot in my studies Thanks a lot.',
'Thank you for making this website available. I am currently a teacher - tutor of children from about age 8 to 14. Your site explains math concepts and examples in a very clear way. ',
'Really liked your website! I am a tutor and it helps me a lot while i prepare myself before trying ti teach new concepts!',
'Thank you very much for this website :) I`ve been using this site from my GCSE years and even during my degree! Thank you once again!',
'Whenever I search for a math-related term, I am happy when mathisfun shows up in the search results, because I know I will get an explanation that allows me to understand it.',
'Your website is such a great help! Reading this in about five minutes gives me much more clarity than I have had all year. I am reviewing for my AP Calculus AB exam and this is going to be a life saver. Thank you very much!',
'i thank you guys because i passed my matric last year because of your help ....'];
Array.prototype.shuffle = function() {
var i = this.length, j, temp;
if ( i == 0 ) return this;
while ( --i ) {
j = Math.floor( Math.random() * ( i + 1 ) );
temp = this[i];
this[i] = this[j];
this[j] = temp;
}
return this;
}
Quotation.shuffle();
var alpha = 1;
var alphaTgt = 0;
var quoteNo = 0;
//var hold = 2;
function rotateMe() {
alpha = alpha*0.8+alphaTgt*0.2;
if (alpha>0.9999) alphaTgt = 0;
if (alpha<0.1) {
alphaTgt = 1;
//var quoteNo = parseInt(Math.random()*Quotation.length);
document.getElementById('textrotator').innerHTML = ' &nbsp; &nbsp; "' + Quotation[quoteNo] + '"';
//quoteNo = Math.floor(Math.random() * Quotation.length);
quoteNo++;
if (quoteNo>Quotation.length-1) quoteNo = 0;
}
document.getElementById('textrotator').style.opacity = alpha;
setTimeout('rotateMe()', 100);
}
rotateMe();
