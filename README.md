# hackathon
## WeMeta parcel streams integration with livepeer
ETH Global's HackFS

## Description
Upon opening the browser extension, you are presented with a URL and a KEY. <br/>
These are the credentials needed to plug into OBS. Settings->Stream then for <br/>
server, put in URL and for stream key, put in KEY. This will allow you to start <br/>
 your stream and end your stream. After the stream processes which can take <br/>
 around 5 minutes, the stream can be played by clicking Play Stream. To store <br/>
 the coordinates, click Get Coordinates which will pull the coordinates from <br/>
 the url of the metaverse you are playing in. Currently supported for <br/>
 decentraland and cryptovoxels. The button for in browser streaming is an <br/>
 alternate way to stream straight from your browser if OBS is something <br/>
 you don't want to use. <br/>

## Visuals
![image of UI](UI/current_UI.png)
![image of UI](UI/current_UI_1.png)
![image of UI](UI/current_UI_2.png)
![image of UI](UI/current_UI_3.png)
![image of UI](UI/current_UI_4.png)
![image of UI](UI/current_UI_5.png)
![image of UI](UI/current_UI_6.png)


[Boiler Plate Code Repo](https://github.com/upmostly/react-chrome-extension.git)

[Video Player Repo](https://github.com/google/shaka-player)

[Alt Video Player Repo](https://github.com/video-react/video-react)

[Audio/Video Repo](https://github.com/muaz-khan/RecordRTC)

[File saver Repo](https://github.com/eligrey/FileSaver.js)

[Styled components Repo](https://github.com/styled-components/styled-components)

[Stream in-browser solution](https://github.com/carrabre/landpeer-stream)

## How to run locally:
### 1. `git clone https://github.com/the-metaverse/hackathon.git`
### 2. change directory to hackathon
### 3. create livepeer api key
### 4. `npm i`
### 5. `npm start`
### 6. change directory to landpeer-stream
### 7. `npm run dev`

TODO: 
- change text to link (visit site to set up OBS)
- add link to create API key to connect
- style input box
- rearrange content on window

[LICENSE](LICENSE)
