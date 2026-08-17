```text
To build the image: docker build -t image_name . 
. means current directory ke andar ie /app ke andar
```

```text
Check the image: docker images
Check any contianer is running : docker ps 
Check any contianer is stopped: docker ps -a
run the image: docker run -t my_image

PS D:\docker\15_docker_image> docker run -t image_name:latest 
15_docker_image@1.0.0 start
nodemon index.js
[nodemon] 3.1.14
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,cjs,json
[nodemon] starting `node index.js`
Server is running at 8000

Now nodejs application is running in docker container

map the 8000(docker) with some other port(like 300 ie of host machine) so that we can access it

after recreating the image.
PS D:\docker\15_docker_image>  docker build -t my_image .
[+] Building 3.5s (12/12) FINISHED                                  docker:desktop-linux
 => [internal] load build definition from Dockerfile                                0.1s
 => => transferring dockerfile: 720B                                                0.0s
 => [internal] load metadata for docker.io/library/node:23-alpine                   1.8s
 => [auth] library/node:pull token for registry-1.docker.io                         0.0s
 => [internal] load .dockerignore                                                   0.0s
 => => transferring context: 2B                                                     0.0s
 => [1/6] FROM docker.io/library/node:23-alpine@sha256:a34e14ef1df25b58258956049ab  0.0s
 => => resolve docker.io/library/node:23-alpine@sha256:a34e14ef1df25b58258956049ab  0.0s
 => [internal] load build context                                                   0.1s
 => => transferring context: 63.12kB                                                0.1s
 => CACHED [2/6] WORKDIR /app                                                       0.0s
 => CACHED [3/6] COPY package.json .                                                0.0s
 => CACHED [4/6] COPY package-lock.json .                                           0.0s
 => CACHED [5/6] RUN npm install                                                    0.0s
 => [6/6] COPY . .                                                                  0.4s
 => exporting to image                                                              1.0s
 => => exporting layers                                                             0.3s
 => => exporting manifest sha256:6b7a7038e46a2bfa7da15672cd216f3043b48d7e4dff72514  0.0s
 => => exporting config sha256:17e4d7ebc6c3cc717c26d79eb265d54b63985f200c064ceae03  0.0s
 => => exporting attestation manifest sha256:4b20497dd78d37789ae25c4eb203adf50be08  0.1s
 => => exporting manifest list sha256:dec0e24c81cac63ef34d5fd6eae55514d9c64914ebdb  0.0s
 => => naming to docker.io/library/my_image:latest                                  0.0s
 => => unpacking to docker.io/library/my_image:latest                               0.4s
PS D:\docker\15_docker_image> 

CACHED means wo layer abb dobara se create nhi hogi so it will saves time.
Base layer was not cached 
and working dir means /app me we didnot make any changes so iske niche wala sara code cached hai. 


while running the image put the port no
docker run -it -p 3000:8000 my_image 

now this http://localhost:3000/product will run 


RUN npm install will only work when there is a changes amde in package.json.

If any file me changes hua hai lets suppose index.js me then code 
COPY . .
CMD ["npm", "start"]
idhar se execute hoga. 

we can map multiple port: docker run -it -p 3000:8000 -p 3001:8000 -p 3002:8000 my_image 

If we want to map multiple port. For this first write EXPOSE 8000 in dockerfile then then rebuild the image as we made changes then run it: docker run -it -P my_image
-P means it will automatic map the ports

To see all the mapped ports: docker ps -a



Pushing the image to hub.docker.com 
1.  docker build -t ritesh20047/demo . 
 ritesh20047/demo = name of the docker hub repo

2.  docker login

3. docker push ritesh20047/demo:latest


To pull it.
first delete the image: docker image rm ritesh20047/demo:latest
then puyll it: docker pull ritesh20047/demo:latest 
Now check: docker images 
```