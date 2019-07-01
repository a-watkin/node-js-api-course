# Node notes

Node is a runtime environment it uses Chromes V8 engine to execute Javascript.

Node applications are asynchronous or non-blocking by default.

Node is fast and scalable for intensive I/O tasks because it is asynchronous - it can serve many clients while waiting for resources to become available. It's perfect for APIs.

Node is single threaded.

Node is not suited to CPU bound tasks, it uses threads that will get bogged down with CPU intensive tasks.

In Node, we don’t have browser environment objects such as window or the
document object. Instead, we have other objects that are not available in
browsers, such as objects for working with the file system, network, operating
system, etc.

---
