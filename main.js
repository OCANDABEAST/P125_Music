song = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;

song1_status = "";
song2_status = "";

scoreRightWrist = 0;
scoreLeftWrist = 0;

function preload()
{
song1 = loadSound("Farishton.mp3");
song2 = loadSound("videoplayback.m4a");
}


function setup() {
canvas = createCanvas(600, 500);
canvas.center();


video = createCapture(VIDEO);
video.hide()

poseNet = ml5.poseNet(video, modelLoaded)
}

function modelLoaded() {
console.log('PoseNet Is Initalized');
poseNet.on('pose', gotPoses);
}

function draw() {
image(video, 0, 0, 600, 500);

fill("#53bced");
stroke("#53bced");

if(scoreRightWrist > 0.2)
{circle(rightWristX, rightWristY, 20);
song2.stop()
if(song1_status == false)
{
song1.play();
document.getElementById("song").innerHTML = "Playing - Naat";
}
}
if(scoreLeftWrist > 0.2)
{circle(leftWristX, leftWristY, 20);
song1.stop()
if(song2_status == false)
{
song2.play();
document.getElementById("song").innerHTML = "Playing - Farishte";
}
}}

function play()
{
song1.setVolume(1);
song1.rate(1);
song2.setVolume(1);
song2.rate(1);
}

function gotPoses(results)
{
if(results.lenght > 0)
{
scoreRightWrist = results[0].pose.keypoints[10].score;
scoreLeftWrist = results[0].pose.keypoints[9].score;
console.log(results);
leftWristX = results[0].pose.leftWrist.x;
leftWristY = results[0].pose.leftWrist.y;
console.log("leftWristX =" + leftWristX +" leftWristY = "+ leftWristY);

rightWristX = results[0].pose.rightWrist.x;
rightWristY = results[0].pose.rightWrist.y;
console.log("rightWrstX = " + rightWristX +" rightWristY = "+ rightWristY);
}
}