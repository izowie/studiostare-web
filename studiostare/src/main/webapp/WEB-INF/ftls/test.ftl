<html>  
<head>  
<title>test</title>
</head>
<body>
hahaha:
<br />
about表：id:${(about.id)!"no id"};name:${(about.manifesto)!"no manifesto"};
<br />
category表：id:${(category.id)!"no id"};name:${(category.name)!"no name"};
<br />
client表：id:${(client.id)!"no id"};name:${(client.name)!"no name"};
<br />
news表：id:${(news.id)!"no id"};name:${(news.title)!"no title"};
<br />
role表：id:${(role.id)!"no id"};name:${(role.name)!"no name"};
<br />
user表：userName:${(user.name)!"no name"};email:${(user.email)!"no email"};updateTime:${(user.updateTime?string('yyyy-MM-dd HH:mm:ss'))!"no time"};
<br />
video表：id:${(video.id)!"no id"};name:${(video.name)!"no name"};
<br />
videoref表：id:${(videoref.id)!"no id"};videoId:${(videoref.videoId)!"no videoid"};description:${(videoref.description)!"no description"}

</body>
</html>