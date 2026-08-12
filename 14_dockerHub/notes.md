# Docker Hub — Pushing & Pulling Images


Docker Hub is a public registry of repositories. Pushing an image to your Docker Hub repo makes every version (tag) of that image available for anyone to pull and use.

## Naming rule

To push an image, its name **must** start with `username/reponame`: login to dockerhub website 

```
username/reponame:tagname
```

Example (username `ritesh20047`, repo `demo`):

```
ritesh20047/demo:tagname
```

The tag (`tagname`) can be anything (`v1`, `latest`, etc.) but the `username/reponame` part is fixed — it has to match your Docker Hub account and repo.

## 1. Login / Logout

```bash
docker login      # authenticate with Docker Hub
docker logout      # sign out
```

## 2. Check existing images

```bash
docker images
```

```
IMAGE          ID           DISK USAGE   CONTENT SIZE
redis:latest   344e3945a0b4   212MB         57.4MB
```

## 3. Rename/tag the image to match your repo

If the image doesn't already start with `username/reponame`, create a new tag pointing to the same image (doesn't duplicate the image, just adds another name):

```bash
docker tag redis:latest ritesh20047/demo:v1
```

Now `docker images` shows both names pointing to the same ID:

```
IMAGE                  ID             DISK USAGE   CONTENT SIZE
redis:latest           344e3945a0b4     212MB         57.4MB
ritesh20047/demo:v1    344e3945a0b4     212MB         57.4MB
```

## 4. Push the image

```bash
docker push ritesh20047/demo:v1
```

This uploads that tag to the `ritesh20047/demo` repository on Docker Hub. Anyone can now pull it.

## 5. Pull the image (as another user, or to verify)

Remove the local copy first if you want to simulate a fresh pull:

```bash
docker rmi ritesh20047/demo:v1
docker pull ritesh20047/demo:v1
```

Output:

```
v1: Pulling from ritesh20047/demo
Digest: sha256:52334768d4a6594d8969f51a1a6fee3ffa7545f6359a4877229cdc754d2def82
Status: Downloaded newer image for ritesh20047/demo:v1
docker.io/ritesh20047/demo:v1
```

Check images again — note the ID now matches the digest of the pulled layer:

```
IMAGE                  ID             DISK USAGE   CONTENT SIZE
redis:latest           344e3945a0b4     212MB         57.4MB
ritesh20047/demo:v1    52334768d4a6     210MB         55.4MB
```

## Quick reference

| Command | Purpose |
|---|---|
| `docker login` | Authenticate to Docker Hub |
| `docker logout` | Sign out |
| `docker images` | List local images |
| `docker tag <src> <user>/<repo>:<tag>` | Rename/tag an image for pushing |
| `docker push <user>/<repo>:<tag>` | Upload image to Docker Hub |
| `docker pull <user>/<repo>:<tag>` | Download image from Docker Hub |
| `docker rmi <image>` | Remove a local image |

## Full workflow example

```bash
docker login
docker tag redis:latest ritesh20047/demo:v1
docker push ritesh20047/demo:v1
docker rmi ritesh20047/demo:v1
docker pull ritesh20047/demo:v1
docker logout
```