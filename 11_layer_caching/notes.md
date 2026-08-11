# Docker Layer Caching

Docker builds images in **layers**.

Each Dockerfile instruction can create a layer, and Docker can **reuse previously built layers** when building the image again.

This is called **Layer Caching**.

https://youtu.be/OOaKTnoPr0Y?si=9Jo5gDjL3IdTtu10&t=7483


---

## Example

Suppose we have this Dockerfile:

```dockerfile
FROM python:3.12

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["python", "app.py"]
```

When we build it:

```bash
docker build -t my-app .
```

Docker creates layers roughly like:

```text
FROM python:3.12
       ↓
WORKDIR /app
       ↓
COPY requirements.txt .
       ↓
RUN pip install -r requirements.txt
       ↓
COPY . .
       ↓
CMD ["python", "app.py"]
```

---

# What Is Layer Caching?

Suppose you build the image once.

Docker stores the resulting layers in its cache.

Now you modify only `app.py` and build again:

```bash
docker build -t my-app .
```

Docker doesn't need to rebuild everything.

It can reuse the layers that haven't changed:

```text
FROM python:3.12           → CACHED ✅
WORKDIR /app               → CACHED ✅
COPY requirements.txt .    → CACHED ✅
RUN pip install ...        → CACHED ✅
COPY . .                   → REBUILD 🔄
CMD ...                    → REBUILD 🔄
```

This makes subsequent builds **much faster**.

---

# Why Dockerfile Order Matters

Consider this Dockerfile:

```dockerfile
FROM python:3.12

WORKDIR /app

COPY . .

RUN pip install -r requirements.txt

CMD ["python", "app.py"]
```

Imagine you change only `app.py`.

The:

```dockerfile
COPY . .
```

layer changes.

Because later layers depend on the result of previous layers, Docker may need to rebuild the subsequent:

```dockerfile
RUN pip install -r requirements.txt
```

layer too.

This is inefficient.

---

# Better Dockerfile

Instead, separate dependency files from application source code:

```dockerfile
FROM python:3.12

WORKDIR /app

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["python", "app.py"]
```

Now suppose you only modify:

```text
app.py
```

Docker can reuse:

```text
FROM python:3.12
        ↓
WORKDIR /app
        ↓
COPY requirements.txt .
        ↓
RUN pip install -r requirements.txt
```

and only rebuild the application-copy layer.

```text
FROM python:3.12           → CACHED ✅
WORKDIR /app               → CACHED ✅
COPY requirements.txt .    → CACHED ✅
RUN pip install ...        → CACHED ✅
COPY . .                   → REBUILD 🔄
CMD ...                    → REBUILD 🔄
```

---

# The Main Rule

**Put instructions that change less frequently before instructions that change frequently.**

For example:

```dockerfile
FROM python:3.12

WORKDIR /app

# Changes less frequently
COPY requirements.txt .
RUN pip install -r requirements.txt

# Changes frequently
COPY . .

CMD ["python", "app.py"]
```

This improves Docker build performance.

---

# What Happens When a Layer Changes?

Docker's cache works sequentially.

If an instruction doesn't match a cached layer, Docker rebuilds that layer.

More importantly, **subsequent layers can also need to be rebuilt** because they depend on the changed layer.

Example:

```text
Layer 1 → CACHED ✅
Layer 2 → CACHED ✅
Layer 3 → CHANGED ❌
Layer 4 → REBUILD 🔄
Layer 5 → REBUILD 🔄
```

So you want frequently changing instructions toward the **bottom** of the Dockerfile whenever practical.

---

# Example: Node.js

A common Node.js Dockerfile pattern is:

```dockerfile
FROM node:22

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "start"]
```

If you modify only:

```text
src/app.js
```

Docker can reuse the expensive:

```dockerfile
RUN npm install
```

layer as long as the dependency files haven't changed.

But if you modify:

```text
package.json
```

the dependency layer needs to be rebuilt.

```text
package.json unchanged
        ↓
npm install → CACHED ✅

package.json changed
        ↓
npm install → REBUILD 🔄
```

---

# Benefits of Layer Caching

### 1. Faster Builds

Docker doesn't rebuild unchanged layers.

### 2. Saves Resources

Unnecessary work is avoided.

### 3. Faster Development

You can modify your application code and rebuild quickly.

### 4. Efficient CI/CD

Caching can significantly reduce Docker image build times in CI/CD pipelines.

---

# Quick Summary

```text
Dockerfile
    ↓
Instruction 1 → Layer 1 → Cache
    ↓
Instruction 2 → Layer 2 → Cache
    ↓
Instruction 3 → Layer 3 → Cache
    ↓
Instruction 4 → Layer 4 → Cache
```

If something changes:

```text
Layer 1 → CACHED ✅
Layer 2 → CACHED ✅
Layer 3 → CHANGED ❌
Layer 4 → REBUILD 🔄
Layer 5 → REBUILD 🔄
```

### Remember

> **Docker reuses cached layers to avoid rebuilding unchanged work.**

And when designing a Dockerfile:

> **Keep stable instructions earlier and frequently changing instructions later.**
