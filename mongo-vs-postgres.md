# from a blog post comparing mongodb to postgres

How much will you need to modify your JSON data?
If you want to modify your JSON data inside the data store, though, MongoDB will work better — it has tools for updating individual fields.

To modify JSON fields in Postgres, on the other hand, you’d need to extract the whole document and then rewrite it back in when you’ve made your changes.

Do you need to make dynamic queries?
MongoDB is perfect for dynamic queries of frequently written or read data. That’s because it is designed to work with data of all different types that are changing all the time, without requiring complex transactions between objects. You’re going to get good performance, even when running ad hoc queries on small subsets of fields, contained in documents with loads of fields.

## over all postgres seems better
